<template>
  <div
    class="post-item-content"
    :class="{
      'is-full': isFull
    }">
    <div
      class="post-item-content__title">
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
        {{ data.author.screen_name }}
      </router-link>
      
      <span
        class="post-item-content__date"
        v-if="!isFull">
        {{ data.posted_at }}
        <!-- <timeago 
          :datetime="data.posted_at" 
          :title="$formatDate(data.posted_at)" /> -->
      </span>
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
      v-html="parseContent(data.content) ">
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
    
    <component
      class="post-item-content__link-card"
      :class="{
        'is-link': data.link.url
      }"
      :is="data.link.url ? 'a' : 'div'"
      v-if="data.link"
      :href="data.link.url"
      target="_blank">
      <el-image 
        class="post-item-content__link-card-img"
        :alt="data.link.title"
        :src="data.link.cover"
        fit="cover" />
        
      <div
        class="post-item-content__link-card-content">
        <div
          class="post-item-content__link-card-title">
          {{ data.link.title }}
        </div>
        
        <div
          class="post-item-content__link-card-subtitle">
          {{ data.link.url }}
        </div>
      </div>
    </component>
  </div>
</template>

<script setup>
import { ElButton, ElImage } from 'element-plus'
import { parseContent } from '../../libs/content-parser'

const props = defineProps({
  data: {
    type: Object,
    required: true
  },
  hasAvatar: {
    type: Boolean,
    default: false
  },
  isFull: {
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
</script>

<style lang="scss">
.post-item-content {
  &.is-full {
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
    font-size: 15px;
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
    color: var(--text-color-muted);
  }
  
  &__subtitle {
    font-size: 15px;
    color: var(--text-color-muted);
  }
  
  &__text {
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
  }
  
  &__more {
    margin-top: 5px;
  }
  
  &__link-card {
    display: flex;
    align-items: center;
    padding: 16px;
    margin-top: 16px;
    border-radius: var(--border-radius);
    background: var(--bg-color);
    
    &.is-link {
    }
  }
  
  &__link-card-img {
    flex-shrink: 0;
    margin-right: 16px;
    width: 60px;
    height: 60px;
  }
  
  &__content {
    flex: 1;
  }
  
  &__link-card-title {
    font-size: 15px;
    color: var(--text-color-primary);
  }
  
  &__link-card-subtitle {
    font-size: 12px;
    color: var(--text-color-muted);
  }
}
</style>