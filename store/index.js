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
    }
  }
})

export default useStore
