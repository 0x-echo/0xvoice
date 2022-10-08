<template>
  <v-dialog
    class="dialog-copyright"
    title="Choose a License"
    title-icon="ri-copyright-line">
    <el-form
      class="dialog-copyright__form"
      :model="form"
      label-position="top">
      <el-form-item
        v-for="item in list"
        :key="item.value"
        :label="item.label"
        :prop="item.value">
        class="dialog-copyright__form-item"
        <el-radio-group
          v-model="form[item.value]">
          class="dialog-copyright__form-radio-group"
          <el-radio
            v-for="option in item.options"
            class="dialog-copyright__form-radio"
            :key="option.value"
            :label="option.value">
            {{ option.label }}
          </el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
  </v-dialog>
</template>

<script setup>
import { ElForm, ElFormItem, ElRadio, ElRadioGroup } from 'element-plus'

let form = reactive({
  cc: 1,
  adapt: 1,
  commercial: 1
})

const list = [{
  label: 'Allow reusers to distribute, remix, adapt, and build upon the material in any medium or format?',
  value: 'cc',
  options: [{
    label: 'Yes',
    value: 1
  }, {
    label: 'No',
    value: 2
  }, {
    label: 'Yes, with conditions',
    value: 3
  }]
}, {
  label: 'Allow adaptations of your work to be shared?',
  value: 'adapt',
  options: [{
    label: 'Yes',
    value: 1
  }, {
    label: 'No',
    value: 2
  }, {
    label: 'Yes, as long as others share alike',
    value: 3
  }]
}, {
  label: 'Allow commercial uses of your work?',
  value: 'commercial',
  options: [{
    label: 'Yes',
    value: 1
  }, {
    label: 'No',
    value: 2
  }]
}]
</script>

<style lang="scss">
.dialog-copyright {
  &.el-dialog {
    max-width: 600px;
  }
  
  &__form-item {
    margin-bottom: 24px; 
    border-radius: var(--border-radius);
    
    .el-form-item__label {
      font-weight: 500;
    }
    
    & + & {
      padding-top: 24px;
      border-top: 1px solid var(--bg-color);
    }
  }
  
  &__form-radio-group {
    width: 100%;
    padding: 0 12px;
  }
  
  &__form-radio {
    width: 100%;
  }
}
</style>