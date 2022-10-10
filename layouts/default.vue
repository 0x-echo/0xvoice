<template>
  <div
    class="app">
    <app-sidebar>
    </app-sidebar>
    
    <main
      class="app-main">
      <slot />
      
      <app-side-content>
      </app-side-content>
    </main>
    
    <dialog-connect
      v-model="connectDialogVisible"
      @connect-wallet="connectWallet">
    </dialog-connect>
  </div>
</template>

<script setup>
import { providers, ethers } from "ethers"
import useStore from '~~/store'
import commonConfig from '../config'
import useSign from '~~/compositions/sign'
import useAuth from '~~/compositions/auth'
import { ElMessage } from 'element-plus'
import { API } from '../libs/api'

const { $bus, $showLoading } = useNuxtApp()
const store = useStore()
const sign = useSign()
const { getCommonHeader, tryAutoLogin } = useAuth(store)

tryAutoLogin()

const getAuthMessage = (chain, address) => {
  const signKeys = sign.generateKeyPair()
  return {
    message: commonConfig.wallet.auth_message
    .replace('ADDRESS', `${chain}/${address}`)
    .replace('TIMESTAMP', new Date().getTime())
    .replace('PUBLIC_KEY', signKeys.publicKey.replace(/^0x/, '')),
    signKeys
  }
}

let connectDialogVisible = ref(false)
$bus.on('show-connect-wallet-dialog', () => {
  connectDialogVisible.value = true
})

let provider = null
let web3provider = null

// WalletConnect cannot reopen dialog, so recreate an instance each time dialog is closed.
const getProvicer = async () => {
  const { default: WalletConnectProvider } = await GetWalletConnectProvider()
  const provider = new WalletConnectProvider ({
    infuraId: "dda2473ca43f4555926534d427abc648",
    // bridge: "https://bridge.walletconnect.org",
    qrcode: true,
    rpc: {
      10: 'https://mainnet.optimism.io',
      137: 'https://matic-mainnet.chainstacklabs.com',
      80001: 'https://matic-mumbai.chainstacklabs.com'
    }
  });
  const web3provider =  new providers.Web3Provider(provider)

  return {
    provider,
    web3provider
  }
}

//  Enable session (triggers QR Code modal)
const setUpProvider = async () => {
  const rs = await getProvicer()
  provider = rs.provider
  web3provider = rs.web3provider

  try {
    provider.on("accountsChanged", async (accounts) => {
      store.setData('wallet', {
        connectedWallets: accounts
      })
      if (store.wallet.loginType === 'tip') {
        return
      }
      const chain = await web3provider.getNetwork()
      const networkId = chain.chainId
      const account = accounts[0]
      const { message, signKeys } = getAuthMessage('EVM', account)
      $bus.emit('show-connect-loading', `Please sign the message.`)
      try {
        const signature = await provider.request({ method: 'personal_sign', params: [ message, account ] })
        $bus.emit('hide-connect-loading')
        await requestLogin(account, message, signature, 'EVM', signKeys)
      } catch (e) {
        $bus.emit('hide-connect-loading')
        ElMessage.error({
          message: e.message
        })
      }
    })

    provider.on("chainChanged", (chainId) => {
      console.log(chainId);
    });

    // Subscribe to session disconnection
    provider.on("disconnect", (code, reason) => {
      $bus.emit('hide-connect-loading')
    });

    provider.on("error", (error) => {
      console.log('error', error);
    });
  } catch (e) {
    console.log('walletconnect error', e)
  }
}

const login = async () => {
  if (store.wallet.loginApp === 'metamask') {
    if (!window.ethereum) {
      ElMessage.error({
        message: 'Please install MetaMask first.'
      })
      return
    }
  }
  const network = window.ethereum.networkVersion
  if (!network) {
    ElMessage.error({
      message: 'Seems MetaMask are swithing network. Wait a moment.'
    })
    return
  }
  
  // if (!commonConfig.supportedNetworks[`EVM/${network}`]) {
  //   // if mumbai is supported
  //   if (network.toString() === '80001' && store.widgetConfig.support_mumbai) {
  //   } else {
  //     ElMessage.error({
  //       message: `Sorry. The network is not supported. Current supported networks are: ${Object.values(commonConfig.supportedNetworks).join(', ')}.`
  //     })
  //     return
  //   }
  // }

  try {
    let account
    let accounts = await ethereum.request({ method: 'eth_accounts' })
    let signature

    if (!accounts.length) {
      accounts = await ethereum.request({ method: 'eth_requestAccounts' })
    }

    const { message, signKeys } = getAuthMessage('EVM', accounts[0])
    $bus.emit('show-connect-loading', `Connecting...`)

    if (accounts.length) {
      account = accounts[0]
      signature = await ethereum.request({ method: 'personal_sign', params: [ message, account ] })
      try {
        await requestLogin(account, message, signature, 'EVM', signKeys)
      } catch (e) {}
    }
  } catch (e) {
    console.log('login error:', e)
  } finally {
    $bus.emit('hide-connect-loading')
  }
}

const requestLogin = async (account, message, signature, chain, signKeys) => {
  const loadingMessage = $showLoading()
  
  try {
      const { data: rs } = await $fetch(API.CREATE_USER, {
        method: 'POST',
        body: {
          chain,
          address: account,
          message,
          signature,
          public_key: signKeys.publicKey.replace(/^0x/, '')
        },
        headers: getCommonHeader()
      })

      connectDialogVisible.value = false

      sign.save(signKeys.privateKey)

      store.setData('auth', {
        hasLogined: true,
        token: rs.token
      })

      store.setLoginInfo({
        chain: rs.chain,
        address: rs.address,
        token: rs.token,
        screen_name: rs.screen_name,
        avatar: rs.avatar,
        ens: rs.ens,
        dotbit: rs.dotbit
      })

      loadingMessage.close()

      ElMessage.success({
        message: 'Sign in successfully!'
      })

      if (provider) {
        try {
          await provider.disconnect()
        } catch (e) {}
      }

      setTimeout(async () => {
        await store.getScreenName(true)
      }, 10)

    } catch (e) {
      console.log(e)
      loadingMessage.close()
      if (e.response && e.response._data) {
        ElMessage.error({
          message: e.response._data.msg
        })
      } else {
        ElMessage.error({
          message: 'Unknown login error.'
        })
      }
    } finally {
      $bus.emit('hide-connect-loading')
    }
}

const connectWallet =  async (item) => {
   store.setWallet({
     loginApp: item.value
   })
  if (item.value === 'metamask') {
    await login()
  } else if (item.value === 'walletconnect') {
    await setUpProvider()
    try {
      await provider.enable()
    } catch (e) {
      console.log('walletconnect enable error', e)
      await provider.disconnect()
    }
  } 
}
</script>

<style lang="scss">
.app {
  display: flex;
  padding: 0 20px;
  max-width: 1400px;
  margin: 0 auto;
}

.app-main {
  flex: 1;
  min-width: 0;
  display: flex;
}

@media screen and (max-width: 1200px) {
  .app {
    padding-left: 0;
  }
}

@media screen and (max-width: #{$tablet-width - 1}) {
  .app {
    padding-right: 0;
  }
}
</style>