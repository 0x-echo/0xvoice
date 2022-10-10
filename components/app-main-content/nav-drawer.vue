<template>
  <el-drawer
    v-bind="$attrs"
    append-to-body
    custom-class="nav-drawer"
    direction="ltr"
    :show-close="false"
    size="100%"
    :with-header="false">
    <div
      class="nav-drawer__header">
      <img 
        class="nav-drawer__logo"
        src="@/assets/logo.svg" 
        alt="VOICE">
      
      <div
        class="nav-drawer__close-button"
        role="button"
        @click="$emit('update:modelValue', false)">
        <i
          class="ri-close-line">
        </i>
      </div>
    </div>
    
    <div
      class="nav-drawer__content">
      <div
        class="nav-drawer__nav">
        <nav-item
          class="nav-drawer__nav-item"
          v-for="item in store.getNav()"
          :key="item.url"
          :icon="item.icon"
          :label="item.label"
          :url="item.url"
          @click="$emit('update:modelValue', false)">
        </nav-item>
      </div>
      
      <user-action
        class="nav-drawer__action"
        popover-width="calc(100vw - 32px)"
        @on-click-user-menu="emits('update:modelValue', false)">
      </user-action>
    </div>
  </el-drawer>
</template>

<script setup>
import { ElDrawer } from 'element-plus' 
import useStore from '~~/store'

const store = useStore()

const emits = defineEmits([
  'update:modelValue'
])
</script>

<style lang="scss">
.nav-drawer {
  .el-drawer__body {
    display: flex;
    flex-direction: column;
    padding: 16px;
  }
  
  &__header {
    height: 33px;
    margin-bottom: 32px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  
  &__logo {
    width: 32px;
  }
  
  &__close-button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    font-size: 20px;
    background: var(--bg-color);
    cursor: pointer;
  }
  
  &__content {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  
  &__nav-item {
    &.nav-item.active {
      background: var(--bg-color);
    }
  }
  
  &__action {
    margin-top: 30px;
    
    .user-action__user {
      background: var(--bg-color);
    }
  }
}
</style>