<template>
  <app-main-content
    title="Post">
    <post-item
      :border="false"
      :clickable="false"
      :data="data"
      is-full>
    </post-item>
  </app-main-content>
</template>

<script setup>
const data = {
  id: '1',
  name: 'Airyland',
  posted_at: 'September 22, 2022 at 2:58 PM',
  author: {
    screen_name: 'Airyland',
    address: '0x12323',
    avatar: ''
  },
  content: 'https://0xecho.com/widget, it already supported comment layer for @viamirror',
  link: {
    cover: 'https://www.goldenball.finance/images/logo-white.png',
    title: 'Golden Ball Finance | Decentralized Gambling Ecosystem Token',
    url: 'https://mirror.xyz'
  }
}
</script>

<style lang="scss">

</style>