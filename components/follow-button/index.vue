<template>
  <el-button
    class="follow-button"
    :class="{
      'is-following': data.is_following
    }"
    :type="data.is_following ? '' : 'primary'"
    :plain="plain"
    @click.stop="_submit"
    @mouseenter="isHovering = true"
    @mouseleave="isHovering = false">
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
  if (props.data.is_following) {
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
  &.is-following {
    width: 92px;
  }
}
</style>