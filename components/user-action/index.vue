<template>
  <div
    class="user-action">
    <el-button
      v-if="!store.auth.hasLogined"
      class="user-action__connect-button"
      size="large"
      type="primary"
      @click="$bus.emit('show-connect-wallet-dialog')">
    </el-button>
    
    <v-menu-popover
      v-if="store.auth.hasLogined"
      :menu="userMenu"
      placement="top"
      :width="228"
      @on-click-menu-item="onClickUserMenu"
      @on-toggle-menu="onToggleUserMenu">
      <div
        class="user-action__user"
        :class="{
          'active': userMenuActive
        }">
        <v-avatar
          class="user-action__user-avatar"
          :alt="store.profile.screen_name"
          :hash="store.profile.address"
          size="small"
          :src="store.profile.avatar || ''">
        </v-avatar>
        
        <div
          class="user-action__user-content">
          <div
            class="user-action__user-name ellipsis">
            {{ $ellipsisInMiddle(store.profile.screen_name) }}
          </div>
          
          <div
            class="user-action__user-address">
            {{ $ellipsisInMiddle(store.profile.address) }}
          </div>
        </div>
        
        <i
          class="ri-more-fill user-action__user-more">
        </i>
      </div>
    </v-menu-popover>
  </div>
</template>

<script setup>
import { ElButton, ElMessage } from 'element-plus'
import useStore from '~~/store'
const { $showLoading } = useNuxtApp()

const store = useStore()

const userMenu = computed(() => {
  const menus = []
  
  if (!store.profile.screen_name.includes('.bit')) {
    menus.push({
      icon: 'ri-vip-crown-line',
      label: 'Register .bit account',
      url: 'https://app.did.id?inviter=code.bit&channel=code.bit',
      isLink: true,
      value: 'register-bit'
    })
  }
  
  menus.push({
    icon: 'ri-refresh-line',
    label: 'Refresh profile',
    value: 'refresh-profile'
  }, {
    icon: 'ri-logout-circle-r-line',
    label: 'Logout',
    value: 'logout'
  })
  
  return menus
})

let userMenuActive = ref(false)
const onToggleUserMenu = (value) => {
  userMenuActive.value = value
}

const onClickUserMenu = (value) => {
  if (value === 'logout') {
    logout()
  } else if (value === 'refresh-profile') {
    refreshProfile()
  }
}

const refreshProfile = async () => {
  const loadingMessage = $showLoading()
  
  try {
    await store.getScreenName(true)
    ElMessage.success({
      message: 'Refreshing done!'
    })
  } finally {
    loadingMessage.close()
  }
}

const logout = (silent = false) => {
  store.setData('auth', {
    hasLogined: false,
    token: ''
  })
  store.setLoginInfo({
    chain: '',
    address: '',
    screen_name: '',
    avatar: '',
    balance: ''
  })
  localStorage.removeItem('login_info')
  if (!silent) {
    ElMessage.success({
      message: 'Logout successfully!'
    })
  } 
}
</script>

<style lang="scss">
.user-action {
  &__connect-button {
    position: relative;
    width: 100%;
    font-weight: 600;
    overflow: hidden;
    
    &::before,
    &::after {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all .3s ease;
    }
    &::before {
      content: '\f2ac';
      top: -100%;
      font-size: 20px;
      font-family: 'remixicon';
      font-weight: normal;
    }
    
    &::after {
      content: 'Connect Wallet';
      top: 0;
    }
    
    &:hover {
      &::before {
        top: 0;
      }
      
      &::after {
        transform: translateY(300%);
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
  
  &__user-avatar {
    flex-shrink: 0;
  }
  
  &__user-content {
    flex: 1;
    min-width: 0;
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