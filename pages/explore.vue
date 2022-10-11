<template>
  <app-main-content
    :loading="loading"
    :posts="posts">
    <template
      #title>
      <template
        v-if="$route.query.tag">
        <span>
          Explore
        </span>
        
        <span
          class="explore-page__title-tag"
          @click="$router.push('/explore')">
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

useHead({
  title: 'Explore | VOICE | Our Voice Matters'
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
  type: '',
  auth,
  store
})

onMounted(_onMounted)
onBeforeUnmount(_onBeforeUnmount)
</script>

<style lang="scss">
.explore-page {
  &__title-tag {
    position: relative;
    margin-left: 6px;
    color: var(--color-primary);
    cursor: pointer;
    overflow: hidden;
    
    &::after {
      content: '';
      position: absolute;
      top: 50%;
      left: 0;
      width: 100%;
      height: 3px;
      background: var(--color-primary);
      transform: translateX(-100%);
      transition: all .1s ease;
    }
    
    &:hover {
      &::after {
        transform: translateX(0);
      }
    }
  }
}
</style>