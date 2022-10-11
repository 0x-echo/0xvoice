<template>
  <header
    class="app-header">
    <v-logo
      size="small">
    </v-logo>
    
    <div
      class="app-header__nav-icon"
      @click="navDrawerVisible = true">
      <i
        class="ri-menu-line">
      </i>
    </div>
    
    <nav-drawer
      v-model="navDrawerVisible">
    </nav-drawer>
  </header>
</template>

<script setup>
import NavDrawer from './nav-drawer'

let navDrawerVisible = ref(false)
</script>

<style lang="scss">
.app-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 60px;
  padding: 0 16px;
  border-bottom: 1px solid var(--bg-color);
  background: white;
  
  &__logo {
    display: flex;
  }
  
  &__logo-image {
    width: 36px;
    height: 36px;
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
}
</style>