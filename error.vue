<template>
  <empty-layout>
    <div
      class="container error-page">
      <div
        class="error-page__content">
        <img 
          class="error-page__image"
          src="@/assets/error.svg" 
          alt="Something is wrong">
        
        <h1
          class="error-page__title">
          Something is wrong
        </h1>
        
        <el-button
          class="error-page__action-button" 
          size="large"
          type="primary"
          @click="$router.push('/')">
          Back to Home
        </el-button>
      </div>
    </div>
  </empty-layout>
</template>

<script setup>
import EmptyLayout from './layouts/empty'
import { ElButton } from 'element-plus'

useHead({
  title: 'Something is wrong | VOICE | Our Voice Matters'
})

const props = defineProps({
  error: Object
})
</script>

<style lang="scss">
.error-page {
  height: 100vh;
  padding: 0 20px;
  overflow-y: auto;
  
  &::-webkit-scrollbar {
    display: none;
  }
  
  &__content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 100px 0;
  }
  
  &__image {
    width: 80%;
    max-width: 400px;
  }
  
  &__title {
    margin-top: 20px;
    text-align: center;
    text-transform: uppercase;
  }
  
  &__action-button {
    margin-top: 30px;
  }
}
</style>