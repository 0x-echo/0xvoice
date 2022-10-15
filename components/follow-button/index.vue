<template>
  <el-button
    class="follow-button"
    :class="{
      'is-following': data.is_following && store.auth.hasLogined
    }"
    :loading="loading"
    :plain="plain"
    :type="data.is_following && store.auth.hasLogined ? '' : 'primary'"
    @click.stop="_submit"
    @mouseenter="isHovering = true"
    @mouseleave="isHovering = false">   
    <template
      #loading>
      <v-loader>
      </v-loader>
    </template> 
    
    {{ getButtonText() }}
  </el-button>
</template>

<script setup>
import { ElButton } from 'element-plus'
import useStore from '~~/store'
import useFollow from '~~/compositions/follow'


const store = useStore()

let loading = ref(false)
const { submit } = useFollow({ store, loading })

const props = defineProps({
  data: {
    type: Object,
    required: true
  },
  plain: {
    type: Boolean,
    default: true
  }
})

let isHovering = ref(false)
const getButtonText = () => {
  if (props.data.is_following && store.auth.hasLogined) {
    if (isHovering.value) {
      return 'Unfollow'
    } else {
      return 'Following'
    }
  } else {
    return 'Follow'
  }
}

const _submit = async () => {
  await submit(props.data)
}
</script>

<style lang="scss">
.follow-button {
  position: relative;
  
  &.is-following {
    width: 92px;
  }
}
</style>