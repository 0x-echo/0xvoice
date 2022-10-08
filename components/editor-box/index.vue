<template>
  <div
    class="editor-box">
    <div
      class="editor-box__left">
      <v-avatar
        class="editor-box__avatar"
        :alt="store.profile.screen_name"
        :hash="store.profile.address"
        :src="store.profile.avatar || ''">
      </v-avatar>
    </div>
    
    <div
      class="editor-box__body">
      <el-input
        class="editor-box__input"
        ref="editorInput"
        v-model="content"
        :autosize="{
          minRows: 4
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
            title="Copyright"
            @click="copyrightDialogVisible = true">
            <i
              class="ri-copyright-line">
            </i>
          </div>
        </div>
        
        <el-button
          class="editor-box__send-button"
          size="large"
          type="primary"
          :loading="loading"
          @keydown.enter="enter"
          @click="submit">
          POST
        </el-button>
      </div>
    </div>
    
    <dialog-copyright
      v-model="copyrightDialogVisible">
    </dialog-copyright>
  </div>
</template>

<script setup>
import { ElButton, ElInput, ElMessage } from 'element-plus'
import useStore from '~~/store'
import useSign from '~~/compositions/sign'
import useAuth from '~~/compositions/auth'

import { v4 as uuidv4 } from 'uuid'
import { parseContent } from '~~/libs/content-parser'
import { API } from '~~/libs/api'
const { $bus, $showLoading } = useNuxtApp()

const store = useStore()
const sign = useSign()
const auth = useAuth(store)

const props = defineProps({
  placeholder: {
    type: String,
    default: 'Hello world'
  }
})

const content = ref('')
const loading = ref(false)

watch(content, val => {
  localStorage.setItem('draft', content.value)
})

onMounted(() => {
  try {
    const val = localStorage.getItem('draft')
    if (val) {
      content.value = val
    }
  } catch (e) {}
})

let copyrightDialogVisible = ref(false)

const enter = async (e) => {
  if (e.metaKey) {
    await submit()
  }
}

const submit = async () => {
  if (!store.auth.hasLogined) {
    $bus.emit('show-connect-wallet-dialog')
    return
  }
  const body = {
    id: uuidv4(),
    type: 'post',
    content: parseContent(content.value, false),
    protocol_version: '0.1',
    copyright: store.editor.copyright
  }

  const signed = sign.sign(body)

  body.public_key = signed.publicKey
  body.signature = signed.signature

  const params = {
    method: 'POST',
    body,
    headers: auth.getCommonHeader()
  }

  loading.value = true
  try {
    const rs = await $fetch(API.CREATE_POST, params)
    $bus.emit('post.create', rs.data.post)
    ElMessage.success('Voice voiced!')
    content.value = ''
  } catch (e) {
    ElMessage.error(e.message)
  } finally {
    loading.value = false
  }
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
    font-weight: 600;
  }
}
</style>