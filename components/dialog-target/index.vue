<template>
  <v-dialog
    class="dialog-target"
    confirm-button-text="Confirm"
    :confirm-button-disabled="!form.target.id"
    has-action-footer
    title="Choose a Target"
    title-icon="ri-book-2-line"
    top="10vh"
    @cancel="$emit('update:modelValue', false)"
    @close="reset"
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
        label="Search by name">
        <div
          class="dialog-target__form-target">
          <el-input
            class="dialog-target__form-target-input"  
            v-model="name">
          </el-input>
          
          <el-button
            class="dialog-target__search-button"
            plain
            type="primary"
            @click="getResults">
            Search
          </el-button>
        </div>
      </el-form-item>
      
      <el-form-item
        v-if="results.length"
        label="Choose"
        prop="target">
        <div
          class="dialog-target__result-list">
          <link-card
            :class="{
              'is-selected': item.id === form.target.id
            }"
            v-for="item in results"
            :key="item.id"
            :data="item"
            selectable
            @click="onClickResult(item)">
          </link-card>
        </div>
      </el-form-item>
    </el-form>
  </v-dialog>
</template>

<script setup>
import { ElButton, ElForm, ElFormItem, ElInput, ElOption, ElSelect } from 'element-plus'

const emits = defineEmits([
  'update:modelValue'
])

let name = ref('')

let form = reactive({
  type: 'imbd',
  target: {}
})

const rules = {
  type: [{
    required: true,
    trigger: 'change'
  }],
  target: [{
    required: true, 
    trigger: 'change'
  }]
}

const typeOptions = [{
  value: 'imbd',
  label: 'Movie'
}]

let results = ref([])
const getResults = () => {
  results.value = [{
    id: '1',
    uri: 'hello',
    cover: 'https://cdn.dribbble.com/users/140655/screenshots/10741846/media/8b4fc28c3ce0cf47f16d6937d9fce319.png?compress=1&resize=1600x1200&vertical=top',
    title: 'Credit must be given to the creator',
    desc: 'Only noncommercial uses of the work are permitted'
  }, {
    id: '2',
    uri: 'hello',
    cover: 'https://cdn.dribbble.com/users/140655/screenshots/10741846/media/8b4fc28c3ce0cf47f16d6937d9fce319.png?compress=1&resize=1600x1200&vertical=top',
    title: 'Credit must be given to the creator',
    desc: 'Only noncommercial uses of the work are permitted'
  }, {
    id: '3',
    uri: 'hello',
    cover: 'https://cdn.dribbble.com/users/140655/screenshots/10741846/media/8b4fc28c3ce0cf47f16d6937d9fce319.png?compress=1&resize=1600x1200&vertical=top',
    title: 'Credit must be given to the creator',
    desc: 'Only noncommercial uses of the work are permitted'
  }]
}

const onClickResult = (item) => {
  Object.assign(form.target, item)
}

const formRef = ref(null)
const submit = async () => {
  emits('update:modelValue')
}

const reset = () => {
  results.value = []
  Object.assign(form, {
    type: 'imbd',
    target: {}
  })
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
  
  &__search-button.is-plain {
    &:hover,
    &:focus {
      background: var(--color-primary-lighter);
      color: var(--color-primary);
    }
  }
  
  &__result-list {
    width: 100%;
    height: 240px;
    padding: 4px;
    overflow: auto;
    
    &::-webkit-scrollbar {
      display: none;
    }

    .link-card {
      margin-top: 12px;
      cursor: pointer;
      
      &:first-of-type {
        margin-top: 0;
      }
      
      &.is-selected {
        border-color: var(--color-primary);
        box-shadow: 0 0 4px rgba(var(--color-primary-rgb), .5);
      }
    }
  }
}
</style>