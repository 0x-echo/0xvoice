<template>
  <div
    class="app-main-content">
    <div
      class="app-main-content__wrapper">
      <div
        class="app-main-content__header"
        v-if="title || $slots.title || isMobile">
        <div
          class="app-main-content__back-icon"
          v-if="hasBack"
          @click="$router.back()">
          <i
            class="ri-arrow-left-line">
          </i>
        </div>

        <h2
          class="app-main-content__title"
          v-if="title || $slots.title">
          <slot
            name="title">
            {{ title }}
          </slot>
        </h2>

        <div
          class="app-main-content__nav-icon"
          v-if="isMobile"
          @click="navDrawerVisible = true">
          <i
            class="ri-menu-line">
          </i>
        </div>
      </div>
      
      <slot
        name="top">
      </slot>
      
      <slot>
        <div
          class="app-main-content__post-list"
          v-if="!loading || posts.length">
          <post-item
            v-for="item in posts"
            :key="item.id"
            :data="item">
          </post-item>
        </div>
        
        <div
          class="app-main-content__empty"
          v-if="!loading && !posts.length">
          <img 
            class="app-main-content__empty-image"
            alt="No Data"
            src="@/assets/empty.svg" >
          
          <div
            class="app-main-content__empty-text">
            Coming soon
          </div>
        </div>
      </slot>
    </div>
    
    <nav-drawer
      v-model="navDrawerVisible">
    </nav-drawer>
  </div>
</template>

<script setup>
import NavDrawer from './nav-drawer'

const props = defineProps({
  hasBack: {
    type: Boolean,
    default: false
  },
  loading: {
    type: Boolean,
    default: false
  },
  posts: {
    type: Array
  },
  title: {
    type: String
  }
})

let navDrawerVisible = ref(false)

let isMobile = ref(false)
onMounted(() => {
  checkIfMobile()
  window.addEventListener('resize', checkIfMobile)
})

onUnmounted(() => {
  window.removeEventListener('resize', checkIfMobile)
})

const checkIfMobile = () => {
  const widget = document.querySelector('.app')
  if (widget.clientWidth < 768) {
    isMobile.value = true
  } else {
    isMobile.value = false
  }
}
</script>

<style lang="scss">
.app-main-content {
  flex: 1;
  height: 100vh;
  padding: 32px 0;
  overflow-y: auto;
  
  &::-webkit-scrollbar {
    display: none;
  }
  
  &__wrapper {
    min-height: calc(100vh - 64px);
    padding: 32px;
    border-radius: var(--border-radius);
    background: white;
  }
  
  &__header {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding-bottom: 24px;
  }
  
  &__back-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    margin-right: 12px;
    font-size: 22px;
    cursor: pointer;
    transition: all .3s ease;
    
    &:hover {
      background: var(--bg-color);
    }
  }
  
  &__title {
    flex: 1;
    min-width: 0;
    display: flex;
    font-size: 22px;
    font-weight: 600;
  }
  
  &__nav-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    font-size: 20px;
    cursor: pointer;
  }
  
  &__empty {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 500px;
    padding: 24px;
    color: var(--text-color-muted);
    opacity: .8;
  }
  
  &__empty-image {
    width: 100px;
  }
  
  &__empty-text {
    margin-top: 10px;
    font-size: 12px;
  }
}

@media screen and (max-width: #{$tablet-width - 1}) {
  .app-main-content {
    padding: 0;
    
    &__wrapper {
      padding: 16px;
      border-radius: 0;
    }
    
    &__header {
      padding-bottom: 16px;
    }
    
    .editor-box {
      padding: 16px 0;
    }
    
    .editor-box__left {
      display: none;
    }
    
    .post-item {
      padding: 16px 0;
    }
  }
}
</style>