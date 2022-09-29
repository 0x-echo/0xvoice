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
      class="post-item-toolbar__copyright-list">
      <el-tooltip
        popper-class="post-item-toolbar__copyright-tooltip"
        v-for="item in copyrights"
        :key="item.value"
        :content="item.desc"
        placement="top">
        <i
          class="post-item-toolbar__copyright-icon"
          :class="item.icon">
        </i>
      </el-tooltip>
    </div>
  </div>
</template>

<script setup>
import PostItemAction from './post-item-action'
import { ElTooltip } from 'element-plus'

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

const copyrights = [{
  desc: 'Creative Commons License',
  icon: 'ri-creative-commons-line',
  value: 'cc'
}, {
  desc: 'Credit must be given to the creator.',
  icon: 'ri-creative-commons-by-line',
  value: 'by'
}, {
  desc: 'Only noncommercial uses of the work are permitted.',
  icon: 'ri-creative-commons-nc-line',
  value: 'nc'
}, {
  desc: 'No derivatives or adaptations of the work are permitted.',
  icon: 'ri-creative-commons-nd-line',
  value: 'nd'
}, {
  desc: 'Adaptations must be shared under the same terms.',
  icon: 'ri-creative-commons-sa-line',
  value: 'sa'
}, {
  desc: 'CC0 allows reusers to distribute, remix, adapt, and build upon the material in any medium or format, with no conditions.',
  icon: 'ri-creative-commons-zero-line',
  value: 'zero'
}, {
  desc: 'Distribute, remix, adapt, and build upon the material are not allowed.',
  icon: 'ri-forbid-line',
  value: 'forbid'
}]
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