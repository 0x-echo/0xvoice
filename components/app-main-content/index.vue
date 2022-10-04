<template>
  <div
    class="app-main-content">
    <div
      class="app-main-content__wrapper">
      <div
        class="app-main-content__header"
        v-if="title">
        <i
          class="ri-arrow-left-line app-main-content__back-icon"
          v-if="hasBack">
        </i>
        
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
    padding: 32px;
    background: white;
  }
  
  &__header {
    display: flex;
    align-items: center;
    padding-bottom: 32px;
  }
}
</style>