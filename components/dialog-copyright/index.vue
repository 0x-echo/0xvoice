<template>
  <v-dialog
    class="dialog-copyright"
    has-action-footer
    title="Choose a License"
    title-icon="ri-copyright-line"
    top="5vh"
    @cancel="$emit('update:modelValue', false)"
    @on-close="$emit('update:modelValue', false)"
    @open="onOpenDialog"
    @submit="submit">
    <el-form
      class="dialog-copyright__form"
      :model="form"
      label-position="top">
      <el-form-item
        class="dialog-copyright__form-item"
        v-for="item in displayList"
        :key="item.value"
        :label="item.label"
        :prop="item.value">
        <el-radio-group
          class="dialog-copyright__form-radio-group"
          v-model="form[item.value]">
          <el-radio
            class="dialog-copyright__form-radio"
            v-for="option in item.options"
            :key="option.value"
            :label="option.value">
            {{ option.label }}
          </el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
    
    <div
      class="dialog-copyright__result">
      <h4
        class="dialog-copyright__result-title">
        Licensed Under
      </h4>
      
      <div
        class="dialog-copyright__result-list">
        <i
          class="dialog-copyright__result-icon"
          :class="icon"
          v-for="icon in result.icons"
          :key="icon">
        </i>
      </div>
      
      <component
        :is="result.link ? 'a' : 'div'"
        class="dialog-copyright__result-text"
        :href="result.link"
        target="_blank"
        :title="result.label">
         {{ result.label }}
      </component>
    </div>
  </v-dialog>
</template>

<script setup>
import { ElForm, ElFormItem, ElRadio, ElRadioGroup } from 'element-plus'
import useStore from '~~/store'
import { copyrights } from '~~/config'

const store = useStore()

const emits = defineEmits([
  'update:modelValue'
])

let form = reactive({
  cc: 3,
  adapt: 2,
  commercial: 2
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

const displayList = computed(() => {
  if (form.cc === 3) {
    return list
  } else {
    return list.filter(item => { return item.value === 'cc' })
  }
})

const result = computed(() => {
  if (form.cc === 1) {
    return getCopyright('cc0')
  } else if (form.cc === 2) {
    return getCopyright('forbid')
  } else {
    if (form.adapt === 1) {
      if (form.commercial === 1) {
        return getCopyright('cc-by')
      } else {
        return getCopyright('cc-by-nc')
      }
    } else if (form.adapt === 2) {
      if (form.commercial === 1) {
        return getCopyright('cc-by-nd')
      } else {
        return getCopyright('cc-by-nc-nd')
      }
    } else {
      if (form.commercial === 1) {
        return getCopyright('cc-by-sa')
      } else {
        return getCopyright('cc-by-nc-sa')
      }
    }
  }
})

const getCopyright = (value) => {
  return copyrights.filter(item => {
    return item.value === value
  })[0]
}

const submit = () => {
  store.setData('editor', {
    copyright: result.value.value
  })
  
  emits('update:modelValue', false)

  try {
    localStorage.setItem('copyright', result.value.value)
  } catch (e) {}
} 
const map = {
  cc0: [1, 1, 1],
  forbid: [2, 1, 1],
  'cc-by': [3, 1, 1],
  'cc-by-nc': [3, 1, 2],
  'cc-by-nd': [3, 2, 1],
  'cc-by-nc-nd': [3, 2, 2],
  'cc-by-sa': [3, 3, 1],
  'cc-by-nc-sa': [3, 3, 2]
}

const onOpenDialog = () => {
  const val = map[store.editor.copyright]
    Object.assign(form, {
    cc: val[0],
    adapt: val[1],
    commercial: val[2]
  })
}

onMounted(() => {
  try {
    const copyright = localStorage.getItem('copyright')
    if (copyright) {
      store.setData('editor', {
        copyright
      })
    }
  } catch (e) {}
})
</script>

<style lang="scss">
.dialog-copyright {
  &.el-dialog {
    max-width: 600px;
  }
  
  &__form-item {
    padding: 24px;
    margin: 0;
    
    .el-form-item__label {
      position: relative;
      font-weight: 500;
      z-index: 0;
      
      &::before {
        content: '';
        position: absolute;
        top: 11px;
        left: -11px;
        width: 48px;
        height: 6px;
        border-radius: 3px;
        background: #ffeb3b;
        z-index: -1;
      }
    }
  }
  
  &__form-radio-group {
    margin-top: 4px;
  }
  
  &__result {
    padding: 24px;
    border-radius: var(--border-radius);
    background: var(--bg-color);
    text-align: center;
  }
  
  &__result-title {
    font-weight: 500;
    color: var(--text-color-secondary);
  }
  
  &__result-list {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  &__result-icon {
    font-size: 30px;
    color: var(--text-color-secondary);
    
    & + & {
      margin-left: 6px;
    }
  }
  
  &__result-text {
    margin-top: 6px;
    font-size: 12px;
    color: var(--text-color-muted);
  }
}
</style>