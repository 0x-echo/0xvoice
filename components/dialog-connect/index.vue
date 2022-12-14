<template>
  <v-dialog
    class="dialog-connect"
    title="Connect Wallet"
    title-icon="ri-wallet-3-line"
    @on-close="$emit('update:modelValue', false)">
    <div
      class="dialog-connect__list">
      <wallet-item
        class="dialog-connect__item"
        v-for="item in list"
        :key="item.value"
        :icon="item.icon"
        :label="item.label"
        @click="connectWallet(item)">
      </wallet-item>
    </div>
    
    <div
      v-if="store.wallet.loginType === 'login'"
      class="dialog-connect__tip">
      By connecting your wallet and signing a message, you agree to VOICE's
      <a
        href="https://0xecho.com/tos" 
        target="_blank">
        Term's & Conditions
      </a> and 
      <a
        href="https://0xecho.com/privacy" 
        target="_blank">
        Privacy Policy
      </a>
    </div>

    <div
      v-if="store.wallet.loginType === 'tip'"
      class="dialog-connect__tip">
      Tip: You can use another address to tip the author.
    </div>
  </v-dialog>
</template>

<script setup>
import { ElLoading } from 'element-plus'
import WalletItem from './wallet-item'
import iconMatemask from '@/assets/metamask.svg'
import iconWalletConnect from '@/assets/walletconnect.svg'
import iconPhantom from '@/assets/phantom.png'

import useStore from '~~/store';

const { $bus } = useNuxtApp()

const store = useStore()

const loading = ref(true)

const emits = defineEmits([
  'connect-wallet',
  'update:modelValue'
])

const list = computed(() => {
  const list = [{
    label: 'MetaMask',
    icon: iconMatemask,
    value: 'metamask',
    disabled: !window.ethereum
  }, {
    label: 'WalletConnect',
    icon: iconWalletConnect,
    value: 'walletconnect'
  }
  // {
  //   label: 'Fortmatic',
  //   icon: iconMatemask,
  //   value: '1'
  // }
  ]

  // if (store.wallet.loginType === 'login') {
  //   list.push({
  //     label: 'Phantom',
  //     icon: iconPhantom,
  //     value: 'phantom',
  //     disabled: !window.solana
  //   })
  // }

  return list
})

$bus.on('show-connect-loading', (text = '') => {
  getLoading(text)
})

$bus.on('hide-connect-loading', () => {
  loadingService && loadingService.close()
})

const connectWallet = (item) => {
  emits('connect-wallet', item)
}

let loadingService
const getLoading = (text) => {
  loadingService = ElLoading.service({
    target: '.dialog-connect',
    text
  }) 
}
</script>

<style lang="scss">
.dialog-connect {
  &__list {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }
  
  &__item {
    margin-bottom: 15px;
  }
  
  &__tip {
    margin-top: 15px;
    font-size: 12px;
    text-align: center;
    color: var(--text-color-secondary);
  }
}

@media screen and (max-width: #{$tablet-width - 1}) {
  .dialog-connect {
    &__item {
      width: 100%;
    }
  }
}
</style>