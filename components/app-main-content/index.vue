<template>
  <div
    class="app-main-content">
    <div
      class="app-main-content__wrapper">
      <div
        class="app-main-content__header"
        v-if="title">
        <div
          class="app-main-content__back-icon">
          <i
            class="ri-arrow-left-line">
          </i>
        </div>
        
        <h2
          class="app-main-content__title">
          {{ title }}
        </h2>
      </div>
      
      <slot
        name="top">
      </slot>
      
      <slot>
        <post-item
          v-for="item in posts"
          :key="item.id"
          :data="item">
        </post-item>
      </slot>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  hasBack: {
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
    font-size: 20px;
    cursor: pointer;
    transition: all .3s ease;
    
    &:hover {
      background: var(--bg-color);
    }
  }
  
  &__title {
    font-size: 22px;
    font-weight: 600;
  }
}
</style>