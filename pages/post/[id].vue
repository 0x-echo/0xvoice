<template>
  <app-main-content
    has-back
    title="Post">
    <post-item
      :border="false"
      :data="data"
      is-detail>
    </post-item>
    
    <iframe
      class="echo-iframe"
      frameborder="0"
      :src="echo">
    </iframe>
  </app-main-content>
</template>

<script setup>
import { API } from '~~/libs/api'
import qs from 'qs'
import useStore from '~~/store'

const store = useStore()
const { $showLoading } = useNuxtApp()
const route = useRoute()

useHead({
  title: 'Post | VOICE | Our Voice Matters'
})

const data = reactive({
  id: '',
  author: {}
})

const echo = computed(() => {
  return 'https://embed.0xecho.com.ipns.page?' + qs.stringify({
    modules: 'comment,like,tip',
    target_uri: `dapp/voice/${data.id}`,
    'color-theme': 'light',
    height: 600,
    'hide_wallet': store.auth.hasLogined ? 'true' : 'false',
    receiver: data.author.screen_name,
    'no-padding-in-mobile': 'true'
  })
})

onMounted(async () => {
  const loadingMessage = $showLoading()
  try {
    const _data = await $fetch(API.GET_POST_INFO.replace(':id', route.params.id))
    Object.assign(data, _data.data)
  } catch (e) {
    console.log(e)
  } finally {
    loadingMessage.close()
  }
})
</script>

<style lang="scss">
.echo-iframe {
  width: 100%;
  height: 600px;
}
</style>