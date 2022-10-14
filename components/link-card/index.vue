<template>
  <component
    class="link-card"
    :class="{
      'is-link': data.is_link
    }"
    :is="data.is_link ? 'a' : 'div'"
    :href="data.uri"
    target="_blank">
    <el-image 
      class="link-card__image"
      :alt="data.title"
      :src="data.cover"
      fit="cover" />
      
    <div
      class="link-card__content">
      <div
        class="link-card__title ellipsis">
        {{ data.title }}
      </div>
      
      <div
        class="link-card__subtitle ellipsis">
        {{ data.is_link ? data.uri : data.desc }}
      </div>
    </div>
    
    <div
      class="link-card__close"
      v-if="closable"
      @click="$emit('close')">
      <i
        class="ri-close-line">
      </i>
    </div>
  </component>
</template>

<script setup>
import { ElImage } from 'element-plus'

const props = defineProps({
  data: {
    type: Object,
    required: true
  },
  closable: {
    type: Boolean,
    default: false
  }
})

const emits = defineEmits([
  'close'
])
</script>

<style lang="scss">
.link-card {
  display: flex;
  align-items: center;
  padding: 16px;
  margin-top: 16px;
  border: 1px solid var(--bg-color);
  border-radius: var(--border-radius);
  background: white;
  
  &__image {
    flex-shrink: 0;
    margin-right: 16px;
    width: 60px;
    height: 60px;
  }
  
  &__content {
    flex: 1;
    min-width: 0;
  }
  
  &__title {
    font-size: 15px;
    color: var(--text-color-primary);
  }
  
  &__subtitle {
    margin-top: 2px;
    font-size: 12px;
    color: var(--text-color-muted);
  }
  
  &__close {
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: 16px;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background: var(--bg-color);
    color: var(--text-color-secondary);
    cursor: pointer;
    transition: all .3s ease;
    
    &:hover {
      background: var(--color-primary-light);
      color: var(--color-primary);
    }
  }
}
</style>