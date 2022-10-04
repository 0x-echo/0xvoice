<template>
  <aside
    class="app-sidebar">
    <div
      class="app-sidebar__header">
      <router-link
        class="app-sidebar__logo"
        to="/home">
        <img 
          class="app-sidebar__logo-image"
          src="@/assets/logo.svg" 
          alt="Voice">
      </router-link>
    </div>
    
    <nav
      class="app-sidebar__nav">
      <nav-item
        v-for="item in nav"
        :key="item.url"
        :icon="item.icon"
        :label="item.label"
        :url="item.url">
      </nav-item>
    </nav>
    
    <div
      class="app-sidebar__footer">
      <el-button
        class="app-sidebar__connect-button"
        size="large"
        type="primary">
        Connect Wallet
      </el-button>
      
      <div
        class="app-sidebar__user">
        <v-avatar
          class="app-sidebar__user-avatar"
          :alt="profile.screen_name"
          :hash="profile.address"
          size="small"
          :src="profile.avatar || ''">
        </v-avatar>
        
        <div
          class="app-sidebar__user-content">
          <div
            class="app-sidebar__user-name">
            {{ profile.screen_name }}
          </div>
        </div>
        
        <i
          class="ri-more-fill">
        </i>
      </div>
    </div>
  </aside>
</template>

<script setup>
import NavItem from './nav-item'
import { ElButton } from 'element-plus'

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

const profile = {
  id: 'hello',
  screen_name: '0xJoanne',
  bio: 'hello world',
  address: '0x1234343',
  avatar: 'https://s3.coinmarketcap.com/static/img/portraits/6273a4ca7d1c136ae3842025.png'
}
</script>

<style lang="scss">
.app-sidebar {
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  width: 260px;
  height: 100vh;
  padding: 32px 32px 32px 0;
  overflow-y: auto;
  
  &::-webkit-scrollbar {
    display: none;
  }
  
  &__header {
    margin-bottom: 32px;
  }
  
  &__logo {
    display: flex;
  }
  
  &__logo-image {
    width: 48px;
    height: 48px;
  }
  
  &__nav {
    flex: 1;
  }
  
  &__footer {
    margin-top: 32px;
  }
  
  &__connect-button {
    width: 100%;
    font-weight: 600;
  }
  
  &__user {
    display: flex;
    align-items: center;
  }
  
  &__user-content {
    flex: 1;
    margin: 0 12px;
  }
  
  &__user-name {
    font-size: 14px;
  }
}
</style>