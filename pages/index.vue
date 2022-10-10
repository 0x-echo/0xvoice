<template>
  <app-main-content
    :loading="loading"
    :posts="posts"
    title="Home">
    <template
      #top>
      <editor-box
        placeholder="Anything to voice?">
      </editor-box>
    </template>
  </app-main-content>
</template>

<script setup>
import { API } from '~~/libs/api'
import useList from '~~/compositions/list'
import useAuth from '~~/compositions/auth'
import useStore from '~~/store'

const router = useRouter()
const store = useStore()
const { $bus } = useNuxtApp()
const auth = useAuth(store)

if (!store.auth.hasLogined) {
  router.replace('/explore')
}

let posts = reactive([])
let loading = ref(false)
let page = ref(1)
let done = ref(false)

const { fetch, handleScroll, _onMounted, _onBeforeUnmount } = useList({
  posts,
  loading,
  page,
  done,
  type: 'following',
  auth
})

onMounted(_onMounted)
onBeforeUnmount(_onBeforeUnmount)

$bus.on('post.create', (data) => {
  posts.unshift(data)
})
</script>

<style lang="scss">

</style>