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
let loading = ref(false)
let page = ref(1)
let done = ref(false)

const handleScroll = async (e) => {
  let element = document.querySelector('.app-main-content__wrapper')
  if (element.getBoundingClientRect().bottom <= window.innerHeight + 100) {
    if (loading.value) {
      return
    }
    if (done.value) {
      return
    }
    page.value++
    await fetch()
  }
};

const fetch = async () => {
  loading.value = true
  try {
    const data = await $fetch(API.GET_POST, {
      params: {
        page: page.value
      }
    })

    if (!data.data.list.length) {
      done.value = true
    } else {
      data.data.list.forEach(one => {
        posts.push(one)
      })
    }
  } catch (e) {

  } finally {
    loading.value = false
  }
}

onMounted(async () => {
  await fetch()
  const element = document.querySelector('.app-main-content')
  element.addEventListener('scroll', handleScroll)
})

$bus.on('post.create', (data) => {
  posts.unshift(data)
})
</script>

<style lang="scss">

</style>