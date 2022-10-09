<template>
  <v-dialog
    class="dialog-target"
    has-action-footer
    title="Choose a Target"
    title-icon="ri-book-2-line"
    @cancel="$emit('update:modelValue', false)"
    @on-close="$emit('update:modelValue', false)"
    @submit="submit">
    <el-form
      class="dialog-target__form"
      ref="formRef"
      label-position="top"
      :model="form"
      :rules="rules"
      :show-message="false"
      size="large">
      <el-form-item
        label="Target Type"
        prop="type">
        <el-select 
          v-model="form.type" 
          placeholder="Select">
          <el-option
            v-for="item in typeOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value" />
        </el-select>
      </el-form-item>
      
      <el-form-item
        :label="typeOptions.filter(item => { return item.value === form.type })[0].label"
        prop="target">
        <div
          class="dialog-target__form-target">
          <el-input
            class="dialog-target__form-target-input"  
            v-model="form.target">
          </el-input>
          
          <el-button
            class="dialog-target__preview-button"
            plain
            type="primary">
            Preview
          </el-button>
        </div>
      </el-form-item>
    </el-form>
    
    <div
      class="dialog-target__result">
      
    </div>
  </v-dialog>
</template>

<script setup>
import { ElButton, ElForm, ElFormItem, ElInput, ElOption, ElSelect } from 'element-plus'

const emits = defineEmits([
  'update:modelValue'
])

let form = reactive({
  type: 'isbn',
  target: ''
})

const rules = {
  type: [{
    required: true,
    trigger: 'change'
  }],
  target: [{
    required: true, 
    trigger: 'blur'
  }]
}

const typeOptions = [{
  value: 'isbn',
  label: 'ISBN'
}]

const submit = () => {
  
}
</script>

<style lang="scss">
.dialog-target {
  &__form-target {
    display: flex;
    align-items: center;
    width: 100%;
  }
  
  &__form-target-input {
    flex: 1;
    margin-right: 12px;
  }
  
  &__preview-button.is-plain {
    &:hover,
    &:focus {
      background: var(--color-primary-lighter);
      color: var(--color-primary);
    }
  }
}
</style>