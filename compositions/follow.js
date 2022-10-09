import { v4 as uuidv4 } from 'uuid'
import useSign from '~~/compositions/sign'
import useAuth from '~~/compositions/auth'
import { ElMessage } from 'element-plus'
import { API } from '~~/libs/api'

const sign = useSign()

export default ({
  store,
  loading
}) => {
  const auth = useAuth(store)

  const submit = async (data) => {
    if (!store.auth.hasLogined) {
      $bus.emit('show-connect-wallet-dialog')
      return
    }
    const address = data.chain + '/' + data.address
    const body = {
      id: uuidv4(),
      type: data.is_following ? 'follow' : 'unfollow',
      protocol_version: '0.1',
      target_uri: address
    }
  
    const signed = sign.sign(body)
  
    body.public_key = signed.publicKey
    body.signature = signed.signature
  
    const params = {
      method: !data.is_following ? 'POST' : 'DELETE',
      body,
      headers: auth.getCommonHeader()
    }
  
    loading.value = true
    try {
      if (!data.is_following) {
        await $fetch(API.FOLLOW, params)
        data.is_following = true
      } else {
        await $fetch(API.UNFOLLOW.replace(':address', encodeURIComponent(address)), params)
        data.is_following = false
      }
    } catch (e) {
      console.log(e)
      if (e.response && e.response._data && e.response._data.msg) {
        ElMessage.error(e.response._data.msg)
      } else {
        ElMessage.error(e.message)
      }
    } finally {
      loading.value = false
    }
  }

  return {
    submit
  }
}