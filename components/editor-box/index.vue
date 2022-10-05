<template>
  <div
    class="editor-box">
    <div
      class="editor-box__left">
      <v-avatar
        class="editor-box__avatar"
        :alt="store.screen_name"
        :hash="store.address"
        :src="store.avatar || ''">
      </v-avatar>
    </div>
    
    <div
      class="editor-box__body">
      <el-input
        class="editor-box__input"
        ref="editorInput"
        v-model="content"
        :autosize="{
          minRows: 3
        }"
        :placeholder="placeholder"
        resize="none"
        type="textarea"
        @keydown.enter="enter">
      </el-input>
      
      <div
        class="editor-box__toolbar">
        <div
          class="editor-box__toolbar-left">
          <div
            class="editor-box__action"
            role="button"
            title="Object">
            <i
              class="ri-book-2-line">
            </i>
          </div>
          
          <div
            class="editor-box__action"
            role="button"
            title="Copyright">
            <i
              class="ri-copyright-line">
            </i>
          </div>
        </div>
        
        <el-button
          class="editor-box__send-button"
          size="large"
          type="primary">
          POST
        </el-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ElButton, ElInput } from 'element-plus'

const props = defineProps({
  placeholder: {
    type: String,
    default: 'Hello world'
  }
})

const store = {
  screen_name: 'Airyland',
  address: '0x122324',
  avatar: ''
}

const content = ref('')

const enter = () => {
  
}
</script>

<style lang="scss">
.editor-box {
  display: flex;
  padding: 24px 24px 32px;
  border-bottom: 1px solid var(--bg-color);
  
  &__left {
    flex-shrink: 0;
    margin-right: 16px;
  }
  
  &__body {
    flex: 1;
  }
  
  &__input {
    .el-textarea__inner {
      padding: 12px 15px;
      font-size: 14px;
      line-height: 24px;
      background: var(--bg-color);
      color: var(--text-color-primary);
      box-shadow: none;
    }
  }
  
  &__toolbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 16px;
  }
  
  &__toolbar-left {
    display: flex;
    align-items: center;
  }
  
  &__action {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    width: 36px;
    height: 36px;
    font-size: 20px;
    color: var(--text-color-muted);
    cursor: pointer;
  }
  
  &__send-button {
    width: 120px;
  }
}
</style>