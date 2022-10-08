<template>
  <div
    class="post-item-toolbar">
    <div
      class="post-item-toolbar__date"
      v-if="isFull">
      {{ data.posted_at }}
    </div>
    
    <div
      class="post-item-toolbar__action-list"
      v-if="!isFull">
      <post-item-action
        icon="ri-heart-line"
        value="like">
      </post-item-action>
      
      <post-item-action
        icon="ri-chat-3-line"
        value="reply">
      </post-item-action>
      
      <post-item-action
        icon="ri-repeat-line"
        value="repost">
      </post-item-action>
    </div>
    
    <div
      class="post-item-toolbar__copyright-list"
      v-if="data.copyright === 'forbid'">
      <el-tooltip
        popper-class="post-item-toolbar__copyright-tooltip"
        :key="copyright.value"
        :content="copyright.desc"
        placement="top">
        <i
          class="post-item-toolbar__copyright-icon"
          :class="copyright.icons[0]">
        </i>
      </el-tooltip>
    </div>
    
    <a
      class="post-item-toolbar__copyright-list"
      v-else
      :href="copyright.link"
      target="_blank"
      :title="copyright.label">
      <i
        class="post-item-toolbar__copyright-icon"
        :class="item"
        v-for="item in copyright.icons"
        :key="item">
      </i>
    </a>
  </div>
</template>

<script setup>
import PostItemAction from './post-item-action'
import { ElTooltip } from 'element-plus'
import { copyrights } from '~~/config'

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

const actions = [{
  icon: 'ri-heart-line',
  value: 'like'
}, {
  icon: 'ri-chat-3-line',
  value: 'reply'
}, {
  icon: 'ri-repeat-line',
  value: 'repost'
}]

const copyright = computed(() => {
  return copyrights.filter(item => { return item.value === props.data.copyright })[0]
}) 
</script>

<style lang="scss">
.post-item-toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 16px;
  
  &__date {
    font-size: 14px;
    color: var(--text-color-muted);
  }
  
  &__action-list {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 10px;
  }
  
  &__copyright-list {
    display: flex;
    align-items: center;
  }
  
  &__copyright-tooltip {
    width: 160px;
  }
  
  &__copyright-icon {
    font-size: 20px;
    color: var(--text-color-muted);
    
    & + & {
      margin-left: 6px;
    }
  }
}
</style>