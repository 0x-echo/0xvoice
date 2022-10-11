<template>
  <div
    class="app-main-content">
    <app-header
      class="app-main-content__header">
    </app-header>
    
    <div
      class="app-main-content__wrapper">
      <div
        class="app-main-content__page-header"
        v-if="title || $slots.title">
        <div
          class="app-main-content__back-icon"
          v-if="hasBack"
          @click="$router.back()">
          <i
            class="ri-arrow-left-line">
          </i>
        </div>

        <h2
          class="app-main-content__title">
          <slot
            name="title">
            {{ title }}
          </slot>
        </h2>
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
    
    <app-footer
      class="app-main-content__footer"
      center>
    </app-footer>
  </div>
</template>

<script setup>
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
  
  &__page-header {
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
  
  &__header,
  &__footer {
    display: none;
  }
}

@media screen and (max-width: 1040px) {
  .app-main-content {
    &__footer {
      display: block;
    }
  }
}

@media screen and (max-width: #{$tablet-width - 1}) {
  .app-main-content {
    padding-top: 0;
    
    &__header {
      display: flex;
    }
    
    &__wrapper {
      padding: 16px;
      border-radius: 0;
    }
    
    &__page-header {
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
    
    .post-item-toolbar__copyright-list {
      opacity: 1;
    }
  }
}
</style>