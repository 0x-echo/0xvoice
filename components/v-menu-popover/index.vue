<template>
  <el-popover
    ref="menuPopoverRef"
    trigger="click"
    @before-leave="onToggleMenu(false)"
    @show="onToggleMenu(true)">
    <menu-item
      v-for="item in menu"
      :key="item.value"
      :danger="item.danger"
      :icon="item.icon"
      :is-link="item.isLink"
      :label="item.label"
      :url="item.url"
      @on-click="onClickMenu(item)">
    </menu-item>
    
    <template
      #reference>
      <slot>
      </slot>
    </template>
  </el-popover>
</template>

<script setup>
import { ElPopover } from 'element-plus'

const props = defineProps({
  menu: {
    type: Array,
    required: true
  }
})

const emits = defineEmits([
  'on-click-menu-item',
  'on-toggle-menu',
  'logout',
  'refresh-profile'
])

let active = ref(false)

const menuPopoverRef = ref(null)
const onClickMenu = (item) => {
  emits(item.value)
  if (!item.isLink) {
    emits('on-click-menu-item', item)
  }
  menuPopoverRef.value.hide()
}

const onToggleMenu = (value) => {
  emits('on-toggle-menu', value)
}
</script>

<style lang="scss">

</style>