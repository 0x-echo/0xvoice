<template>
  <v-dialog
    class="dialog-report"
    has-action-footer
    title="Report"
    title-icon="ri-alert-line"
    @cancel="$emit('update:modelValue', false)"
    @close="reason.value = ''"
    @on-close="$emit('update:modelValue', false)"
    @submit="submit">
    <el-select
      class="dialog-report__select"
      :key="new Date()"
      v-model="reason"
      placeholder="Please select reason"
      size="large">
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value" />
    </el-select>
  </v-dialog>
</template>

<script setup>
import { ElOption, ElSelect } from 'element-plus'
const { public: { report }} = useRuntimeConfig()

const emits = defineEmits([
  'update:modelValue'
])

const reason = ref('')
const options = report.reasons.map(one => ({ label: one, value: one }))

const submit = () => {
  
}
</script>

<style lang="scss">
.dialog-report {
  &__select {
    width: 100%;
  }
  
  &__footer {
    margin-top: 30px;
    text-align: right;
    
    .el-button {
      width: 100px;
    }
  }
}
</style>