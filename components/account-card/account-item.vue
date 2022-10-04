<template>
  <div
    class="account-item"
    @click="$router.push(`/${data.screen_name}`)">
    <v-avatar
      class="account-item__avatar"
      :alt="data.screen_name"
      :hash="data.address"
      size="small"
      :src="data.avatar || ''">
    </v-avatar>
    
    <div
      class="account-item__content">
      <div
        class="account-item__name"
        :to="data.address">
        {{ data.screen_name }}
      </div>
    </div>
    
    <el-button
      class="account-item__follow-button"
      @click.stop>
      {{ data.is_following ? 'Following' : 'Follow' }}
    </el-button>
  </div>
</template>

<script setup>
import { ElButton } from 'element-plus'

const props = defineProps({
  data: {
    type: Object,
    required: true
  }
})
</script>

<style lang="scss">
.account-item {
  display: flex;
  align-items: center;
  padding: 12px;
  border-radius: var(--border-radius);
  cursor: pointer;
  transition: all .3s ease;
  
  &:hover {
    background: white;
  }

  &__content {
    flex: 1;
    margin: 0 12px;
  }
  
  &__name {
    font-size: 14px;
    font-weight: 500;
    color: var(--text-color-primary);
  }
  
  &__follow-button {
    &,
    &:focus:not(.el-button:hover) {
      border-color: var(--color-primary);
      background: transparent;
      color: var(--color-primary);
    }
    
    &:hover,
    &:focus {
      background: var(--color-primary);
      color: white;
    }
  }
}
</style>