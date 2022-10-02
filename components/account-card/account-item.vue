<template>
  <div
    class="account-item">
    <router-link
      class="account-item__avatar"
      :to="data.address">
      <v-avatar
        :alt="data.screen_name"
        :hash="data.address"
        :size="36"
        :src="data.avatar || ''">
      </v-avatar>
    </router-link>
    
    <div
      class="account-item__content">
      <router-link
        class="acccount-item__name"
        :to="data.address">
        {{ data.screen_name }}
      </router-link>
    </div>
    
    <el-button
      class="account-item__follow-button">
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
  
  &__avatar {
    display: flex;
  }
  
  &__content {
    flex: 1;
    margin: 0 16px;
  }
}
</style>