<template>
  <router-link
    class="nav-item"
    :to="url">
    <i
      class="nav-item__icon"
      :class="icon">
    </i>
    
    <span
      class="nav-item__label">
      {{ label }}
    </span>
  </router-link>
</template>

<script setup>
const props = defineProps({
  icon: {
    type: String
  },
  label: {
    type: String
  },
  url: {
    type: String
  }
})
</script>

<style lang="scss">
.nav-item {
  display: flex;
  align-items: center;
  height: 48px;
  padding: 0 16px;
  border-radius: var(--border-radius);
  color: var(--text-color-secondary);
  
  &:hover {
    
  }
  
  &.active {
    background: var(--bg-color);
  }
  
  &__icon {
    margin-right: 16px;
    font-size: 18px;
  }
  
  &__label {
    font-size: 14px;
  }
}
</style>