<template>
  <router-link
    class="v-logo"
    :class="size ? `v-logo--${size}` : ''"
    to="/">
    <img 
      class="v-logo__image"
      src="@/assets/logo.svg" 
      alt="VOICE">
      
    <span
      class="v-logo__label">
      VOICE
    </span>
  </router-link>
</template>

<script setup>
const props = defineProps({
  size: {
    type: String
  }
})
</script>

<style lang="scss">
.v-logo {
  display: flex;
  align-items: center;
  
  &--small {
    .v-logo__image {
      width: 36px;
      height: 36px;
    }
    
    .v-logo__label {
      margin-left: 6px;
      font-size: 14px;
    }
  }
  
  &__image {
    width: 48px;
    height: 48px;
    object-fit: contain;
  }
  
  &__label {
    margin-left: 10px;
    font-size: 18px;
    font-weight: bold;
    color: var(--text-color-primary);
  }
}
</style>