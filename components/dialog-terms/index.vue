<template>
  <v-dialog
    :confirm-button-disabled="!isAgree"
    has-action-footer
    :has-cancel-button="false"
    header-border-bottom
    title="Before Your First Echo"
    title-icon="ri-feedback-line">
    <div
      class="dialog-terms__tip">
      Please read the following terms.
    </div>
    
    <div
      class="dialog-terms__content"
      :class="{
        'has-mask': hasContentMask
      }"
      @scroll="onScrollContent">
      <ul>
        <li
          v-for="(item, index) in terms"
          :key="index">
          {{ item }}
        </li>
      </ul>
    </div>
    
    <div
      class="dialog-terms__agree">
      <el-checkbox
        v-model="isAgree">
        I have read and agree to the terms.
      </el-checkbox>
    </div>
  </v-dialog>
</template>

<script setup>
import { ElCheckbox } from 'element-plus'

const terms = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ',
  'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
  'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. ',
  'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
]

let isAgree = ref(false)
let hasContentMask = ref(true)
const onScrollContent = (e) => {
  if (e.target.scrollTop + e.target.clientHeight >= e.target.scrollHeight) {
    hasContentMask.value = false
  } else {
    hasContentMask.value = true
  }
}
</script>

<style lang="scss">
.dialog-terms {
  &__tip {
    margin-bottom: 15px;
  }
  
  &__content {
    max-height: 250px;
    padding: 20px;
    border-radius: var(--border-radius);
    background: var(--bg-color);
    line-height: 1.625;
    color: var(--text-color-secondary);
    overflow-y: auto;
    
    &.has-mask {
      mask-image: linear-gradient(var(--theme-bg-color) 50%,transparent);
    }
    
    ul {
      padding-left: 15px;
    }
    
    li {
      padding: 5px 0 5px 2px;
      list-style: disc;
    }
  }
  
  &__agree {
    margin-top: 10px;
  }
}
</style>