<template>
  <div
    class="profile-box">
    <v-avatar
      class="profile-box__avatar"
      :alt="data.screen_name"
      :hash="data.address"
      :size="100"
      :src="data.avatar || ''">
    </v-avatar>
    
    <div
      class="profile-box__content">
      <div
        class="profile-box__name">
        {{ data.screen_name }}
      </div>
      
      <div
        class="profile-box__bio">
        {{ data.bio }}
      </div>
    </div>
    
    <el-button
      size="large"
      type="primary">
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
.profile-box {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  padding: 32px;
  border-bottom: 1px solid var(--bg-color);
  
  &__content {
    flex: 1;
    margin: 0 16px;
  }
  
  &__name {
    font-size: 18px;
    font-weight: 500;
  }
  
  &__bio {
    font-size: 15px;
    color: var(--text-color-muted);
  }
}
</style>