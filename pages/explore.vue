<template>
  <main
    class="app-main">
    <app-main-content
      :posts="posts"
      title="Explore">
    </app-main-content>
    
    <app-side-content>
    </app-side-content>
  </main>
</template>

<script setup>
const posts = [{
  id: '1',
  name: 'Airyland',
  posted_at: '10h',
  author: {
    screen_name: 'Airyland',
    address: '0x12323',
    avatar: ''
  },
  content: 'hello world',
  link: {
    cover: 'https://www.goldenball.finance/images/logo-white.png',
    title: 'Golden Ball Finance | Decentralized Gambling Ecosystem Token',
    url: 'https://mirror.xyz'
  }
}, {
  id: '2',
  name: 'Airyland',
  posted_at: 'Sep 10',
  author: {
    screen_name: 'Airyland',
    address: '0x12323',
    avatar: ''
  },
  content: 'hello world',
  replied_to: {
    screen_name: '0xJoanne'
  },
  is_reposted: true,
  ori_post: {
    author: {
      screen_name: '0xJoanne',
      address: '0x12323',
      avatar: ''
    },
    content: 'ApolloX announced partnership with LaunchZone',
    posted_at: 'Sep 10'
  }
}, {
  id: '3',
  author: {
    screen_name: 'Airyland',
    address: '0x12323',
    avatar: ''
  },
  is_reposted: true,
  ori_post: {
    author: {
      screen_name: '0xJoanne',
      address: '0x12323',
      avatar: ''
    },
    content: 'ApolloX announced partnership with LaunchZone',
    posted_at: 'Sep 10',
    link: {
      cover: 'https://www.goldenball.finance/images/logo-white.png',
      title: 'Golden Ball Finance | Decentralized Gambling Ecosystem Token'
    }
  }
}]
</script>

<style lang="scss">

</style>