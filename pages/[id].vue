<template>
  <app-main-content
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

// const posts = [{
//   id: '1',
//   name: 'Airyland',
//   posted_at: '10h',
//   author: {
//     screen_name: 'Airyland',
//     address: '0x12323',
//     avatar: ''
//   },
//   content: 'hello world',
//   link: {
//     cover: 'https://www.goldenball.finance/images/logo-white.png',
//     title: 'Golden Ball Finance | Decentralized Gambling Ecosystem Token',
//     url: 'https://mirror.xyz'
//   }
// }, {
//   id: '2',
//   name: 'Airyland',
//   posted_at: 'Sep 10',
//   author: {
//     screen_name: 'Airyland',
//     address: '0x12323',
//     avatar: ''
//   },
//   content: 'hello world',
//   replied_to: {
//     screen_name: '0xJoanne'
//   },
//   is_reposted: true,
//   ori_post: {
//     author: {
//       screen_name: '0xJoanne',
//       address: '0x12323',
//       avatar: ''
//     },
//     content: 'ApolloX announced partnership with LaunchZone',
//     posted_at: 'Sep 10'
//   }
// }, {
//   id: '3',
//   author: {
//     screen_name: 'Airyland',
//     address: '0x12323',
//     avatar: ''
//   },
//   is_reposted: true,
//   ori_post: {
//     author: {
//       screen_name: '0xJoanne',
//       address: '0x12323',
//       avatar: ''
//     },
//     content: 'ApolloX announced partnership with LaunchZone',
//     posted_at: 'Sep 10',
//     link: {
//       cover: 'https://www.goldenball.finance/images/logo-white.png',
//       title: 'Golden Ball Finance | Decentralized Gambling Ecosystem Token'
//     }
//   }
// }]
</script>

<style lang="scss">

</style>