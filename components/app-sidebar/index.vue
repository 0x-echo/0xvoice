<template>
  <aside
    class="app-sidebar">
    <div
      class="app-sidebar__header">
      <router-link
        class="app-sidebar__logo"
        to="/">
        <img 
          class="app-sidebar__logo-image"
          src="@/assets/logo.svg" 
          alt="VOICE">
      </router-link>
    </div>
    
    <nav
      class="app-sidebar__nav">
      <nav-item
        v-for="item in store.getNav()"
        :key="item.url"
        :icon="item.icon"
        :label="item.label"
        :url="item.url">
      </nav-item>
    </nav>
    
    <div
      class="app-sidebar__footer">
      <user-action>
      </user-action>
    </div>
  </aside>
</template>

<script setup>
import NavItem from './nav-item'
import useStore from '~~/store'

const store = useStore()
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
}

@media screen and (max-width: 1200px) {
  .app-sidebar {
    align-items: center;
    width: 68px;
    padding-right: 0;
    
    .nav-item {
      justify-content: center;
      width: 40px;
      height: 40px;
      padding: 0;
      
      + .nav-item {
        margin-top: 8px;
      }
    }
    
    .nav-item__label {
      display: none;
    }
    
    &__header {
      padding-top: 32px;
      margin-bottom: 45px;
    }
    
    &__logo-image {
      width: 36px;
      height: 36px;
    }
    
    .user-action__connect-button {
      &::before {
        top: 0;
      }
      
      &::after {
        display: none;
      }
    }
    
    .user-action__user {
      padding: 0;
    }
    
    .user-action__user-content,
    .user-action__user-more {
      display: none;
    }
  }
}

@media screen and (max-width: #{$tablet-width - 1}) {
  .app-sidebar {
    display: none;
  }
}
</style>