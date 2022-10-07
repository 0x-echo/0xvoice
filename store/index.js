// @important All new keys must be UpperCase

import { defineStore } from 'pinia'

const useStore = defineStore('global', {
	state: () => ({
    wallet: {
      loginType: 'login', // or tip
      loginApp: 'metamask', // or walletconnect
      connectedAccounts: [],
      tipWallet: ''
    }
  }),
	actions: {
    setData (module, data) {
      if (!module) {
        return
      }
      if (typeof data !== 'object') {
        return
      }
      for (let i in data) {
        this[module][i] = data[i]
      }
    },
    setLogined (val) {
      this.hasLogined = val
    },
    setLoginInfo (val) {
      for (let i in val) {
        this[i] = val[i]
      }
      try {
        if (val.address) {
          localStorage.setItem('login_info', JSON.stringify(val))
        }
      } catch (e) {}
    },
    setWallet (data) {
      for (let i in data) {
        this.wallet[i] = data[i]
      }
    },
    async getScreenName (force) {
      if (!this.chain || !this.address) {
        console.error('user: fail to get screen name')
        return
      }
      try {
        const { data: rs } = await $fetch(config.api().GET_USER_INFO, {
          params: {
            address: this.chain + '/' + this.address,
            force: force ? 'true' : ''
          }
        })
        if (!rs) {
          return
        }
        if (rs.dotbit || rs.ens) {
          this.screen_name = rs.dotbit || rs.ens
        }
        if (rs.avatar) {
          this.avatar = rs.avatar
        }

        // logout user if JWT expires
        // @todo need improvement
        // if (!rs.has_logined && this.hasLogined) {
        //   console.log('NOT IN LOGINED STATUS')
        //   this.logout()
        // }
      } catch (e) {
        console.log(e)
        if (e.message.includes('404')) {
          console.log('USER NOT FOUND')
          this.logout()
        }
      }
    }
  }
})

export default useStore
