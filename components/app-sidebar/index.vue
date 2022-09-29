<template>
  <aside
    class="app-sidebar">
    <router-link
      class="app-sidebar__logo"
      to="/home">
      <img 
        class="app-sidebar__logo-image"
        src="@/assets/logo.svg" 
        alt="Voice">
    </router-link>
    
    <nav>
      <nav-item
        v-for="item in nav"
        :key="item.url"
        :icon="item.icon"
        :label="item.label"
        :url="item.url">
      </nav-item>
    </nav>
  </aside>
</template>

<script setup>
import NavItem from './nav-item'

const nav = [{
  icon: 'ri-home-2-line',
  label: 'Home',
  url: '/home'
}, {
  icon: 'ri-signal-tower-line',
  label: 'Explore',
  url: '/explore'
}, {
  icon: 'ri-home-2-line',
  label: 'Profile',
  url: '/profile'
}, {
  icon: 'ri-settings-2-line',
  label: 'Settings',
  url: '/settings'
}]
</script>

<style lang="scss">
.app-sidebar {
  width: 275px;
  padding: 32px 0;
  
  &__logo {
    display: flex;
    width: 48px;
    height: 48px;
    margin: 0 16px 32px;
  }
}
</style>