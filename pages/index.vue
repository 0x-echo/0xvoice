<template>
  <app-main-content
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
const { $bus } = useNuxtApp()

let posts = reactive([])

onMounted(async () => {
  const data = await $fetch(API.GET_POST)
  data.data.list.forEach(one => {
    posts.push(one)
  })
})

$bus.on('post.create', (data) => {
  posts.unshift(data)
})
</script>

<style lang="scss">

</style>