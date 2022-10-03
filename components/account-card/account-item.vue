<template>
  <div
    class="account-item"
    @click="$router.push(`/${data.screen_name}`)">
    <v-avatar
      class="account-item__avatar"
      :alt="data.screen_name"
      :hash="data.address"
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
      Follow
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
    background: var(--bg-color);
  }

  &__content {
    flex: 1;
    margin: 0 16px;
  }
  
  &__name {
    font-size: 14px;
    font-weight: 500;
    color: var(--text-color-primary);
  }
}
</style>