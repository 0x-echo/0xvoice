<template>
  <el-popover
    ref="menuPopoverRef"
    trigger="click"
    @before-leave="onToggleMenu(false)"
    @show="onToggleMenu(true)">
    <slot
      name="top">
    </slot>
    
    <div>
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
    </div>
    
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
  'on-toggle-menu'
])

let active = ref(false)

const menuPopoverRef = ref(null)
const onClickMenu = (item) => {
  if (!item.isLink) {
    emits('on-click-menu-item', item.value)
  }
  menuPopoverRef.value.hide()
}

const onToggleMenu = (value) => {
  emits('on-toggle-menu', value)
}
</script>

<style lang="scss">

</style>