<template>
  <div
    class="post-item-content"
    :class="{
      'is-detail': isDetail
    }">
    <div
      class="post-item-content__title">
      <div
        class="post-item-content__info">
        <router-link
          class="post-item-content__avatar"
          v-if="hasAvatar"
          :to="`/${data.author.screen_name}`"
          @click.stop>
          <v-avatar
            class="post-item-content__avatar-image"
            :alt="data.author.screen_name"
            :hash="data.author.address"
            :size="24"
            :src="data.author.avatar || ''">
          </v-avatar>
        </router-link>
        
        <router-link
          class="post-item-content__byline"
          :to="`/${data.author.screen_name}`"
          @click.stop>
          {{ $ellipsisInMiddle(data.author.screen_name) }}
        </router-link>
        
        <span
          class="post-item-content__date"
          v-if="!isDetail">
          <timeago 
            :datetime="data.posted_at" 
            :title="$formatDate(data.created_at)" />
        </span>
      </div>
      
      <div
        v-if="hasMenu">
        <v-menu-popover
          :menu="moreMenu"
          placement="bottom-end"
          :width="200"
          @on-click-menu-item="onClickMoreMenu"
          @on-toggle-menu="onToggleMoreMenu">
          <div
            class="post-item-content__menu"
            :class="{
              'active': moreMenuActive
            }"
            @click.stop>
            <i
              class="ri-more-fill">
            </i>
          </div>
        </v-menu-popover>
      </div>
    </div>
    
    <div
      class="post-item-content__subtitle"
      v-if="data.replied_to">
      Replying to 
      <router-link
        :to="`/${data.replied_to.screen_name}`">
        @{{ data.replied_to.screen_name }}
      </router-link>
    </div>
    
    <div
      class="post-item-content__text"
      :class="{
        'collapsed': hasMoreButton && collapsed
      }"
      ref="postContentRef"
      v-html="parseContent(data.content)"
      @click.stop="onClickText">
    </div>
    
    <div
      class="post-item-content__more"
      v-if="hasMoreButton">
      <el-button
        text
        type="primary"
        @click="toggleContent">
        {{ collapsed ? 'Show more' : 'Show less' }}
      </el-button>
    </div>
    
    <link-card
      v-if="data.link && data.link.uri"
      :data="data.link">
    </link-card>
    
    <dialog-confirm
      confirm-button-text="Delete"
      confirm-button-type="danger"
      title="Delete Post?"
      title-icon="ri-close-circle-line"
      v-model="deleteDialogVisible"
      @submit="deletePost">
      <p>
        The action cannot be undone.
      </p>
      
      <p>
        The post cannot be deleted after it goes on-chain in about 5 minutes.
      </p>
    </dialog-confirm>
  </div>
</template>

<script setup>
import { ElButton, ElMessage, ElPopover } from 'element-plus'
import { parseContent } from '../../libs/content-parser'
import { Timeago } from 'vue2-timeago'
import useAuth from '~~/compositions/auth'
import useStore from '~~/store'
import { API } from '~~/libs/api'

const store = useStore()
const auth = useAuth(store)
const router = useRouter()

const props = defineProps({
  data: {
    type: Object,
    required: true
  },
  hasAvatar: {
    type: Boolean,
    default: false
  },
  hasMenu: {
    type: Boolean,
    default: true
  },
  isDetail: {
    type: Boolean,
    default: false
  }
})

const postContentRef = ref(null)
let hasMoreButton = ref(false)
let collapsed = ref(true)

onMounted(() => {
  if (postContentRef.value.clientHeight > 105) {
    hasMoreButton.value = true
  }
})

const toggleContent = () => {
  collapsed.value = !collapsed.value
  // if (collapsed.value) {
  //   jump(`#_${props.data.id}`, {
  //     offset: 0
  //   })
  // }
}

const onClickText = (e) => {
  if (e.target.className === 'tag') {
    router.push(`/explore?tag=${e.target.attributes['data-tag'].value}`)
  }
}

// menu event
const moreMenu = computed(() => {
  const menus = []
  if (props.data.ar_url) {
    menus.push({
      icon: 'ri-information-line',
      label: 'Arweave TX',
      url: props.data.ar_url,
      isLink: true,
      value: 'view-arweave-info'
    })
  } else {
    menus.push({
      icon: 'ri-send-plane-line',
      label: 'Arweave',
      value: 'view-arweave-info'
    })
  }
  
  if (props.data.can_delete) {
    menus.push({
      danger: true,
      icon: 'ri-close-circle-line',
      label: 'Delete',
      value: 'delete',
      permission: 'can_delete'
    })
  }
  
  return menus
})

let moreMenuActive = ref(false)
const onToggleMoreMenu = (value) => {
  moreMenuActive.value = value
}

const onClickMoreMenu = (value) => {
  if (value === 'view-arweave-info') {
    viewArweaveInfo()
  } else if (value === 'delete') {
    deleteDialogVisible.value = true
  }
}

const viewArweaveInfo = () => {
  if (!props.data.ar_id) {
    ElMessage.info({
      message: 'The data is not yet sent to Arweave.'
    })
  }
}

let deleteDialogVisible = ref(false)
const deletePost = async () => {
  try {
    const rs = await $fetch(API.DELETE_POST + props.data.id, {
      method: 'DELETE',
      headers: auth.getCommonHeader()
    })
    currentComment = null
    deleteDialogVisible.value = false
    ElMessage.success({
      message: 'Done.'
    })
  } catch (e) {
    if (e.response && e.response._data) {
      ElMessage.error({
        message: e.response._data.msg
      })
    } else {
      ElMessage.error({
        message: 'Indexer error.'
      })
    }
  }
}
</script>

<style lang="scss">
.post-item-content {
  &.is-detail {
    .post-item-content__title {
      font-size: 16px;
    }
    
    .post-item-content__text {
      margin-top: 4px;
      font-size: 18px;
    }
  }
  
  &__title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 15px;
  }
  
  &__info {
    display: flex;
    align-items: center;
  }
  
  &__avatar {
    display: flex;
    margin-right: 8px;
  }
  
  &__byline {
    font-weight: 600;
    color: var(--text-color-primary);
  }
  
  &__date {
    margin-left: 8px;
    font-size: 13px;
    color: var(--text-color-muted);
  }
  
  &__menu {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    color: var(--text-color-muted);
    transition: all .3s ease;
    
    &.active,
    &:hover {
      background: var(--bg-color);
      color: var(--text-color-primary);
    }
  }
  
  &__subtitle {
    font-size: 15px;
    color: var(--text-color-muted);
  }
  
  &__text {
    margin-top: 8px;
    font-size: 15px;
    color: var(--text-color-primary);
    
    &.collapsed {
      max-height: 105px;
      overflow: hidden;
      mask-image: linear-gradient(var(--theme-bg-color) 50%, transparent);
    }
    
    > :first-child {
      margin-top: 0;
    }
    
    > :last-child {
      margin-bottom: 0;
    }
    
    h1,
    h2,
    h3,
    h4,
    h5,
    h6,
    hr,
    p,
    blockquote,
    pre,
    ul,
    ol {
      margin-bottom: 16px;
    }
    
    h1 {
      font-size: 28px;
    }
    
    h2 {
      font-size: 21px;
    }
    
    h3 {
      font-size: 18px;
    }
    
    h4,
    h5,
    h6 {
      font-size: 14px;
    }
    
    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
      margin-top: 24px;
    }
    
    hr {
      border: 0; 
      border-top: 1px solid var(--bg-color);
    }
    
    a {
      text-decoration: underline;
    }
    ul li {
      list-style: disc;
      margin-left: 15px;
    }
    ol li {
      list-style: number;
      margin-left: 15px;
    }
    img {
      max-width: 200px;
    }
    
    p { 
      code {
        padding: 3px 5px;
        border-radius: var(--border-radius-small);
        background: var(--bg-color);
      }
      
      + p {
        margin-top: 0;
      }
    }

    blockquote {
      padding: 0 14px;
      border-left: 3px solid var(--bg-color);
      
      > :first-child {
        margin-top: 0;
      }
      
      > :last-child {
        margin-bottom: 0;
      }
    }

    code {
      font-size: 12px;
      font-family: ui-monospace,SFMono-Regular,SF Mono,Menlo,Consolas,Liberation Mono,monospace;
    }
    
    pre {
      padding: 12px 15px;
      border-radius: var(--border-radius);
      background: var(--bg-color);
    }
    table {
      width: 100%;
      font-size: 14px;
      text-align: left;
    }
    
    th,
    td {
      padding: 10px 15px;
      border-bottom: 1px solid var(--bg-color);
      min-width: 120px;
    }
    
    th:first-of-type,
    td:first-of-type {
      padding-left: 0;
    }
    
    th:last-of-type,
    td:last-of-type {
      padding-right: 0;
    }
    
    td:nth-child(3) {
      max-width: 250px;
      min-width: 200px;
    }
    
    th {
      font-weight: 600;
    }
    
    .tag {
      margin-right: 5px;
      padding: 2px 5px;
      border-radius: 4px;
      font-size: 13px;
      background: var(--color-primary-light);
      color: var(--color-primary);
      text-decoration: none;
      transition: all .3s ease;
      
      &:hover {
        color: white;
        background: var(--color-primary);
      }
    }
  }
  
  &__more {
    margin-top: 5px;
  }
}
</style>