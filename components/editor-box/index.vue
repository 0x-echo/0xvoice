<template>
  <div
    class="editor-box">
    <div
      class="editor-box__left">
      <v-avatar
        class="editor-box__avatar"
        :alt="store.profile.screen_name"
        :hash="store.profile.address"
        :src="store.profile.avatar || ''"
        @click="$router.push(`/${store.profile.screen_name}`)">
      </v-avatar>
    </div>
    
    <div
      class="editor-box__body">
      <div
        class="editor-box__content">
        <el-input
          class="editor-box__input"
          ref="editorInput"
          v-model="content"
          :autosize="{
            minRows: 2
          }"
          :placeholder="placeholder"
          resize="none"
          type="textarea"
          @keydown.enter="enter">
        </el-input>
        
        <!-- <link-card
          class="editor-box__link-card"
          v-if="target.uri"
          :data="target"
          closable>
        </link-card> -->
      
        <div
          class="editor-box__addon">
          <div
            class="editor-box__copyright"
            @click="copyrightDialogVisible = true">
            <i
              class="editor-box__copyright-icon"
              :class="icon"
              v-for="icon in copyright.icons"
              :key="icon">
            </i>
          </div>
        </div>
      </div>
      
      <div
        class="editor-box__toolbar">
        <div
          class="editor-box__toolbar-left">
          <div
            class="editor-box__action"
            role="button"
            title="Object"
            @click="targetDialogVisible = true">
            <i
              class="ri-book-2-line">
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
          <template
            #loading>
            <v-loader
              size="18">
            </v-loader>
          </template> 
          {{ buttonText }}
        </el-button>
      </div>
    </div>
    
    <dialog-copyright
      v-model="copyrightDialogVisible">
    </dialog-copyright>
    
    <dialog-target
      v-model="targetDialogVisible">
    </dialog-target>
    
    <dialog-terms
      v-model="termsDialogVisible">
    </dialog-terms>
  </div>
</template>

<script setup>
import { ElButton, ElInput, ElMessage } from 'element-plus'
import useStore from '~~/store'
import useSign from '~~/compositions/sign'
import useAuth from '~~/compositions/auth'
import { copyrights } from '~~/config'
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
const buttonText = computed(() => {
  return loading.value ? 'voicing' : 'voice'
})

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
const copyright = computed(() => {
  let value = store.editor.copyright
  return copyrights.filter(item => { return item.value === value })[0]
})

let targetDialogVisible = ref(false)
const target = {
  uri: 'hello',
  cover: 'https://cdn.dribbble.com/users/140655/screenshots/10741846/media/8b4fc28c3ce0cf47f16d6937d9fce319.png?compress=1&resize=1600x1200&vertical=top',
  title: 'Credit must be given to the creator',
  desc: 'Only noncommercial uses of the work are permitted'
}

let termsDialogVisible = ref(false)

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
  if (content.value.length < 3) {
    ElMessage.error('Please type something')
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
    ElMessage.success('voiced!')
    content.value = ''
  } catch (e) {
    if (e.response._data && e.response._data.msg) {
      ElMessage.error(e.response._data.msg)
    } else {
      ElMessage.error(e.message)
    }
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
    min-width: 0;
  }
  
  &__content {
    padding: 12px 16px;
    border-radius: var(--border-radius);
    background: var(--bg-color);
  }
  
  &__input {
    .el-textarea__inner {
      padding: 0;
      font-size: 14px;
      line-height: 24px;
      background: transparent;
      color: var(--text-color-primary);
      border-radius: 0;
      box-shadow: none;
    }
  }
  
  &__link-card {
    border: 0;
  }
  
  &__addon {
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
  
  &__copyright {
    margin-top: 8px;
    opacity: .8;
    cursor: pointer;
    transition: all .3s ease;
    
    &:hover {
      opacity: 1;
    }
  }
  
  &__copyright-icon {
    font-size: 20px;
    color: var(--text-color-muted);
    
    & + & {
      margin-left: 6px;
    }
  }
  
  &__toolbar {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    margin-top: 16px;
  }
  
  &__toolbar-left {
    display: flex;
  }
  
  &__action {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    padding: 8px;
    font-size: 18px;
    line-height: 18px;
    border-radius: 50%;
    color: var(--text-color-muted);
    cursor: pointer;
    
    &:hover {
      color: var(--text-color-primary);
      background: var(--bg-color);
    }
  }
  
  &__send-button {
    width: 120px;
    font-weight: 600;
  }
}
</style>