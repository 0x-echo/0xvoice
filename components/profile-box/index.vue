<template>
  <div
    class="profile-box">
    <v-avatar
      class="profile-box__avatar"
      :alt="store.profile.screen_name"
      :hash="store.profile.address"
      :size="100"
      :src="store.profile.avatar || ''">
    </v-avatar>
    
    <div
      class="profile-box__content">
      <div
        class="profile-box__name">
        {{ store.profile.screen_name }}
      </div>
      
      <div
        class="profile-box__bio">
        {{ store.profile.bio }}
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
import useStore from '~~/store'

const store = useStore()

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