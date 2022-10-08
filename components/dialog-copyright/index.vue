<template>
  <v-dialog
    class="dialog-copyright"
    top="5vh"
    has-action-footer
    title="Choose a License"
    title-icon="ri-copyright-line"
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

const store = useStore()

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

const copyrights = [{
  label: 'Attribution 4.0 International (CC BY 4.0)',
  icons: [
    'ri-creative-commons-line',
    'ri-creative-commons-by-line'
  ],
  value: 'cc-by',
  link: 'https://creativecommons.org/licenses/by/4.0/'
}, {
  label: 'Attribution-ShareAlike 4.0 International (CC BY-SA 4.0)',
  icons: [
    'ri-creative-commons-line',
    'ri-creative-commons-by-line',
    'ri-creative-commons-sa-line'
  ],
  value: 'cc-by-sa',
  link: 'https://creativecommons.org/licenses/by-sa/4.0/'
}, {
  label: 'Attribution-NonCommercial 4.0 International (CC BY-NC 4.0)',
  icons: [
    'ri-creative-commons-line',
    'ri-creative-commons-by-line',
    'ri-creative-commons-nc-line'
  ],
  value: 'cc-by-nc',
  link: 'https://creativecommons.org/licenses/by-nc/4.0/'
}, {
  label: 'Attribution-NonCommercial-ShareAlike 4.0 International (CC BY-NC-SA 4.0)',
  icons: [
    'ri-creative-commons-line',
    'ri-creative-commons-by-line',
    'ri-creative-commons-nc-line',
    'ri-creative-commons-sa-line'
  ],
  value: 'cc-by-nc-sa',
  link: 'https://creativecommons.org/licenses/by-nc-sa/4.0/'
}, {
  label: 'Attribution-NoDerivatives 4.0 International (CC BY-ND 4.0)',
  icons: [
    'ri-creative-commons-line',
    'ri-creative-commons-by-line',
    'ri-creative-commons-nd-line'
  ],
  value: 'cc-by-nd',
  link: 'https://creativecommons.org/licenses/by-nd/4.0/'
}, {
  label: 'Attribution-NonCommercial-NoDerivatives 4.0 International (CC BY-NC-ND 4.0)',
  icons: [
    'ri-creative-commons-line',
    'ri-creative-commons-by-line',
    'ri-creative-commons-nc-line',
    'ri-creative-commons-nd-line'
  ],
  value: 'cc-by-nc-nd',
  link: 'https://creativecommons.org/licenses/by-nc-nd/4.0/'
}, {
  label: 'CC0 1.0 Universal (CC0 1.0) Public Domain Dedication',
  icons: [
    'ri-creative-commons-line',
    'ri-creative-commons-zero-line'
  ],
  value: 'cc0',
  link: 'https://creativecommons.org/publicdomain/zero/1.0/'
}, {
  label: 'All Rights Reserved',
  icons: [
    'ri-forbid-line'
  ],
  value: 'forbid'
}]

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
}
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