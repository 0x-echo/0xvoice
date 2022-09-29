<template>
  <div
    class="account-item">
    <v-avatar>
    </v-avatar>
    
    <div>
      {{ data.screen_name }}
    </div>
    
    <el-button>
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

</style>