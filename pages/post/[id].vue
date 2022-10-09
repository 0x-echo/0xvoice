<template>
  <app-main-content
    has-back
    title="Post">
    <post-item
      :border="false"
      :data="data"
      is-detail>
    </post-item>
  </app-main-content>
</template>

<script setup>
import { react } from '@babel/types';
import { API } from '~~/libs/api'

const route = useRoute()

const data = reactive({
  author: {}
})

onMounted(async () => {
  const _data = await $fetch(API.GET_POST_INFO.replace(':id', route.params.id))
  Object.assign(data, _data.data)
})
</script>

<style lang="scss">

</style>