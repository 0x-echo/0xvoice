<template>
  <div
    class="post-item"
    :class="{
      'is-border': border,
      'is-detail': isDetail
    }"
    @click="onClick">
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
          :is-detail="isDetail">
        </post-item-content>
        
        <div
          class="post-item__repost-card"
          v-if="post.ori_post"
          @click.stop="router.push(`/post/${post.ori_post.id}`)">
          <post-item-content
            :data="post.ori_post"
            has-avatar
            :has-menu="false">
          </post-item-content>
        </div>
        
        <post-item-toolbar
          :data="post"
          :is-detail="isDetail">
        </post-item-toolbar>
      </div>
    </div>
  </div>
</template>

<script setup>
import PostItemContent from './post-item-content'
import PostItemToolbar from './post-item-toolbar'
import { ElButton } from 'element-plus'

const router = useRouter()

const props = defineProps({
  border: {
    type: Boolean,
    default: true
  },
  data: {
    type: Object,
    required: true
  },
  isDetail: {
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

const onClick = () => {
  if (!props.isDetail) {
    router.push(`/post/${props.data.id}`)
  }
}

const onClickRepost = () => {
  console.log(post.value.ori_post.author.screen_name)
  router.push(`/${post.value.ori_post.author.screen_name}`)
}
</script>

<style lang="scss">
.post-item {
  line-height: 1.625;
  padding: 24px 0 32px;
  
  &:not(.is-detail) {
    cursor: pointer;
    
    &:hover {
      .post-item-toolbar__copyright-list {
        opacity: 1;
      } 
    }
  }
  
  &.is-border {
    padding-left: 24px;
    padding-right: 24px;
    border-bottom: 1px solid var(--bg-color);
    transition: all .3s ease;
    
    &:last-of-type {
      border-bottom: 0;
    }
  }
  
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
    border: 1px solid var(--bg-color);
    border-radius: var(--border-radius);
    background: white;
    cursor: pointer;
    transition: all .3s ease;
    
    &:hover {
      border-color: var(--border-color);
    }
  }
}
</style>