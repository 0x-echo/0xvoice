<template>
  <app-main-content
    :loading="loading"
    :posts="posts">
    <template
      #top>
      <profile-box
        :data="profile">
      </profile-box>
    </template>
  </app-main-content>
</template>

<script setup>
import { API } from '~~/libs/api'
import useList from '~~/compositions/list'
import useAuth from '~~/compositions/auth'
import useStore from '~~/store'

const store = useStore()
const { $bus } = useNuxtApp()
const auth = useAuth(store)
const route = useRoute()

let profile = reactive({
  avatar: '',
  address: '',
  screen_name: '',
  chain: '',
  bio: ''
})
let posts = reactive([])
let loading = ref(false)
let page = ref(1)
let done = ref(false)

const { fetch, handleScroll, _onMounted, _onBeforeUnmount } = useList({
  posts,
  loading,
  page,
  done,
  auth,
  createdBy: route.params.id,
  profile
})

onMounted(_onMounted)
onBeforeUnmount(_onBeforeUnmount)
</script>

<style lang="scss">

</style>