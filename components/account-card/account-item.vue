<template>
  <div
    class="account-item"
    @click="$router.push(`/${data.screen_name}`)">
    <v-avatar
      class="account-item__avatar"
      :alt="data.screen_name"
      :hash="data.address"
      size="small"
      :src="data.avatar || ''">
    </v-avatar>
    
    <div
      class="account-item__content">
      <div
        class="account-item__name"
        :to="data.address">
        {{ $formatScreenName(data.screen_name) }}
      </div>
    </div>
    
    <el-button
      class="account-item__follow-button"
      :class="{
        'is-unfollow': !data.is_following
      }"
      @click.stop="submit">
      {{ data.is_following ? 'Following' : 'Follow' }}
    </el-button>
  </div>
</template>

<script setup>
import { ElButton, ElMessage } from 'element-plus'
import useStore from '~~/store'
import { v4 as uuidv4 } from 'uuid'
import useSign from '~~/compositions/sign'
import useAuth from '~~/compositions/auth'
import { API } from '~~/libs/api'

const { $bus } = useNuxtApp()

const store = useStore()
const sign = useSign()
const auth = useAuth(store)

let loading = ref(false)

const props = defineProps({
  data: {
    type: Object,
    required: true
  }
})

const submit = async () => {
  const data = props.data

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
      props.data.is_following = true
    } else {
      await $fetch(API.UNFOLLOW.replace(':address', encodeURIComponent(address)), params)
      props.data.is_following = false
    }
  } catch (e) {
    if (e.response._data && e.response._data.msg) {
      ElMessage.error(e.response._data.msg)
    } else {
      ElMessage.error(e.message)
    }
  } finally {
    loading.value = false
  }
}
</script>

<style lang="scss">
.account-item {
  display: flex;
  align-items: center;
  padding: 12px;
  border-radius: var(--border-radius);
  cursor: pointer;
  transition: all .3s ease;
  
  &:hover {
    background: white;
  }

  &__content {
    flex: 1;
    margin: 0 12px;
  }
  
  &__name {
    font-size: 14px;
    font-weight: 500;
    color: var(--text-color-primary);
  }
  
  &__follow-button {
    &,
    &:focus:not(.el-button:hover) {
      background: transparent;
    }
    
    &.is-unfollow {
      &,
      &:focus:not(.el-button:hover) {
        border-color: var(--color-primary);
        background: transparent;
        color: var(--color-primary);
      }
    }
    
    &:hover,
    &:focus {
      background: var(--color-primary);
      color: white;
    }
  }
}
</style>