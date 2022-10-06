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
        type="primary"
        @click="connectDialogVisible = true">
        Connect Wallet
      </el-button>
      
      <v-menu-popover
        :menu="userMenu"
        placement="top"
        :width="228"
        @on-toggle-menu="onToggleUserMenu">
        <div
          class="app-sidebar__user"
          :class="{
            'active': userMenuActive
          }">
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
            
            <div
              class="app-sidebar__user-address">
              {{ profile.address }}
            </div>
          </div>
          
          <i
            class="ri-more-fill app-sidebar__user-more">
          </i>
        </div>
      </v-menu-popover>
    </div>
    
    <dialog-connect
      v-model="connectDialogVisible">
    </dialog-connect>
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
  icon: 'ri-user-line',
  label: 'Profile',
  url: '/profile'
}]

let connectDialogVisible = ref(false)

// user 
const profile = {
  id: 'hello',
  screen_name: '0xJoanne',
  bio: 'hello world',
  address: '0x1234343',
  avatar: 'https://s3.coinmarketcap.com/static/img/portraits/6273a4ca7d1c136ae3842025.png'
}

const userMenu = [{
  icon: 'ri-refresh-line',
  label: 'Refresh profile',
  value: 'refresh-profile'
}, {
  icon: 'ri-logout-circle-r-line',
  label: 'Logout',
  value: 'logout'
}]

let userMenuActive = ref(false)
const onToggleUserMenu = (value) => {
  userMenuActive.value = value
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
    padding-top: 24px;
    margin-bottom: 41px;
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
    position: relative;
    width: 100%;
    font-weight: 600;
    overflow: hidden;
    
    span {
      transition: all .3s ease;
    }
    
    &::before {
      content: '\f2ac';
      position: absolute;
      left: 0;
      top: -100%;
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 20px;
      font-family: 'remixicon';
      font-weight: normal;
      transition: all .3s ease;
    }
    
    &:hover {
      span {
        transform: translateY(300%);
      }
      
      &::before {
        top: 0;
      }
    }
  }
  
  &__user {
    display: flex;
    align-items: center;
    padding: 12px 16px;
    border-radius: var(--border-radius);
    cursor: pointer;
    transition: all .3s ease;
    
    &:hover,
    &.active {
      background: #edeff7;
    }
  }
  
  &__user-content {
    flex: 1;
    margin: 0 12px;
  }
  
  &__user-name {
    font-size: 14px;
    font-weight: 600;
  }
  
  &__user-address {
    margin-top: 1px;
    font-size: 12px;
    color: var(--text-color-muted);
  }
  
  &__user-more {
    color: var(--text-color-secondary);
  }
}
</style>