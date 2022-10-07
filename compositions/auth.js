export default (store) => {
  const tryAutoLogin = () => {
    try {
      const info = localStorage.getItem('login_info')
      const _info = JSON.parse(info)
      if (_info && _info.chain) {
        store.setLogined(true)
        store.setData('profile', {
          chain: _info.chain,
          address: _info.address,
          screen_name: _info.screen_name,
          avatar: _info.avatar
        })
        store.setData('auth', {
          hasLogined: true,
          token: _info.token
        })
        setTimeout(async () => {
          await store.getScreenName()
        }, 100)
      }
    } catch (e) {
      console.log('get login_info:', e)
    }
  }

  const getCommonHeader = () => {
    const token = store.auth.token
    return {
      Authorization: `Bearer ${token}`
    }
  }

  return {
    tryAutoLogin,
    getCommonHeader
  }
}