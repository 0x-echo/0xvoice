<template>
  <div
    class="post-item"
    @click="$router.push(`/post/${data.id}`)">
    <div
      class="post-item__header"
      v-if="data.is_reposted && !data.content">
      <router-link
        class="post-item__header-link"
        :to="`/${data.author.screen_name}`"
        @click.stop>
        <i
          class="ri-repeat-2-line post-item__header-link-icon">
        </i>
        
        <span>
          {{ data.author.screen_name }} Reposted
        </span>
      </router-link>
    </div>
    
    <div
      class="post-item__body">
      <div
        class="post-item__left">
        <router-link
          class="post-item__avatar"
          :to="`/${post.author.screen_name}`"
          @click.stop>
          <v-avatar
            :alt="post.author.screen_name"
            :hash="post.author.address"
            :src="post.author.avatar || ''">
          </v-avatar>
        </router-link>
      </div>
      
      <div
        class="post-item__right">
        <post-item-content
          :data="post"
          :is-full="isFull">
        </post-item-content>
        
        <div
          class="post-item__repost-card"
          v-if="post.ori_post"
          @click.stop="$router.push(`/${post.ori_post.author.screen_name}`)">
          <post-item-content
            :data="post.ori_post"
            has-avatar>
          </post-item-content>
        </div>
        
        <post-item-toolbar
          :data="post"
          :is-full="isFull">
        </post-item-toolbar>
      </div>
    </div>
  </div>
</template>

<script setup>
import PostItemContent from './post-item-content'
import PostItemToolbar from './post-item-toolbar'
import { ElButton } from 'element-plus'
import { Timeago } from 'vue2-timeago'

const props = defineProps({
  data: {
    type: Object,
    required: true
  },
  isFull: {
    type: Boolean,
    default: false
  }
})

const post = computed(() => {
  if (props.data.is_reposted && !props.data.content) {
    return props.data.ori_post
  } else {
    return props.data
  }
})
</script>

<style lang="scss">
.post-item {
  padding: 32px;
  border-bottom: 1px solid var(--bg-color);
  line-height: 1.625;
  cursor: pointer;
  
  &__header {
    margin-bottom: 16px;
  }
  
  &__header-link {
    display: flex;
    align-items: center;
    font-size: 12px;
    color: var(--text-color-muted);
  }
  
  &__header-link-icon {
    margin-right: 5px;
  }
  
  &__body {
    display: flex;
  }
  
  &__left {
    flex-shrink: 0;
    margin-right: 16px;
  }
  
  &__avatar {
    display: flex;
  }
  
  &__right {
    flex: 1;
  }
  
  &__repost-card {
    padding: 16px;
    margin-top: 16px;
    border: 1px solid var(--border-color);
    border-radius: var(--border-radius);
    background: white;
    cursor: pointer;
  }
}
</style>