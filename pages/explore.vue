<template>
  <app-main-content
    :posts="posts">
    <template
      #title>
      <template
        v-if="$route.query.tag">
        <span>
          Explore
        </span>
        
        <span
          class="explore-page__title-tag">
          #{{ $route.query.tag }}
        </span>
      </template>
      
      <template
        v-else>
        Explore
      </template>
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

let posts = reactive([])
let loading = ref(false)
let page = ref(1)
let done = ref(false)

const { fetch, handleScroll, _onMounted, _onBeforeUnmount } = useList({
  posts,
  loading,
  page,
  done,
  type: '',
  auth
})

onMounted(_onMounted)
onBeforeUnmount(_onBeforeUnmount)
</script>

<style lang="scss">
.explore-page {
  &__title-tag {
    color: var(--color-primary);
  }
}
</style>