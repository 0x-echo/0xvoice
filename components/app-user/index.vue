<template>
  <div
    class="app-user">
    <el-button
      v-if="!store.auth.hasLogined"
      class="app-user__connect-button"
      size="large"
      type="primary"
      @click="$bus.emit('show-connect-wallet-dialog')">
    </el-button>
    
    <v-menu-popover
      v-if="store.auth.hasLogined"
      :menu="userMenu"
      placement="top"
      :width="popoverWidth"
      @on-click-menu-item="onClickUserMenu"
      @on-toggle-menu="onToggleUserMenu">
      <template
        #top>
        <div
          class="app-user__account-list">
          <user-item
            v-for="item in accounts"
            :key="item.address"
            :data="item">
          </user-item>
        </div>
      </template>
      
      <user-item
        class="app-user__info"
        :active="userMenuActive"
        avatar-size="small"
        :data="store.profile">
        <i
          class="ri-more-fill app-user__info-more">
        </i>
      </user-item>
    </v-menu-popover>
  </div>
</template>

<script setup>
import { ElButton, ElMessage } from 'element-plus'
import UserItem from './user-item'
import useStore from '~~/store'
const { $ellipsisInMiddle, $showLoading } = useNuxtApp()

const store = useStore()

const props = defineProps({
  popoverWidth: {
    type: [Number, String],
    default: 228
  }
})

const emits = defineEmits([
  'on-click-user-menu'
])

const accounts = [{
  address: "0x3c98b726cd9e9f20becafd05a9affecd61617c0b",
  avatar: "https://ipfs.io/ipfs/QmVD87KnmMEgmDtV254xo3171KNpvv6xidQqaZZ9bpbzFX",
  screen_name: "airyland.eth"
}, {
  address: "0x3c3ccd801ebd986fe75440055e99096b33368666",
  avatar: null,
  screen_name: "0x3c3ccd801ebd986fe75440055e99096b33368666"
}]

const userMenu = computed(() => {
  const menus = []
  
  menus.push({
    icon: 'ri-user-line',
    label: 'Add an account',
    value: 'add-account'
  }, {
    icon: 'ri-refresh-line',
    label: 'Refresh profile',
    value: 'refresh-profile'
  })
  
  if (!store.profile.screen_name.includes('.bit')) {
    menus.push({
      icon: 'ri-vip-crown-line',
      label: 'Register .bit account',
      url: 'https://app.did.id?inviter=code.bit&channel=code.bit',
      isLink: true,
      value: 'register-bit'
    })
  }
  
  if (accounts.length === 1) {
    menus.push({
      icon: 'ri-logout-circle-r-line',
      label: 'Logout',
      value: 'logout'
    })
  } else if (accounts.length > 1) {
    menus.push({
      icon: 'ri-logout-circle-r-line',
      label: `Logout ${$ellipsisInMiddle(store.profile.screen_name)}`,
      value: 'logout'
    })
  }
  
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
  } else if (value === 'add-account') {
    
  }
  
  emits('on-click-user-menu')
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
.app-user {
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
  
  &__account-list {
    padding-bottom: 10px;
    margin-bottom: 10px;
    border-bottom: 1px solid var(--bg-color);
  }
  
  &__info {
    padding: 12px 16px;
    
    &:hover,
    &.active {
      background: #edeff7;
    }
    
    .user-item__content {
      margin: 0 12px;
    }
    
    .user-item__name {
      font-size: 14px;
    }
  }
  
  &__info-more {
    color: var(--text-color-secondary);
  }
}
</style>