<template>
  <div
    class="user-item"
    :class="{
      'active': active
    }">
    <v-avatar
      class="user-item__avatar"
      :alt="data.screen_name"
      :hash="data.address"
      :size="avatarSize"
      :src="data.avatar || ''">
    </v-avatar>
    
    <div
      class="user-item__content">
      <div
        class="user-item__name ellipsis">
        {{ $ellipsisInMiddle(data.screen_name) }}
      </div>
      
      <div
        class="user-item__address">
        {{ $ellipsisInMiddle(data.address) }}
      </div>
    </div>

    <slot>
      <i
        class="ri-check-line user-item__check"
        v-if="selected">
      </i>
    </slot>
  </div>
</template>

<script setup>
const props = defineProps({
  active: {
    type: Boolean,
    default: false
  },
  avatarSize: {
    type: [Number, String],
    default: 28
  },
  data: {
    type: Object,
    required: true
  },
  selected: {
    type: Boolean,
    default: false
  }
})
</script>

<style lang="scss">
.user-item {
  display: flex;
  align-items: center;
  padding: 10px;
  border-radius: var(--border-radius);
  cursor: pointer;
  transition: all .3s ease;
  
  &:hover,
  &.active {
    background: var(--color-primary-lighter);
  }
  
  &__avatar {
    flex-shrink: 0;
  }
  
  &__content {
    flex: 1;
    min-width: 0;
    margin: 0 10px;
  }
  
  &__name {
    font-size: 12px;
    font-weight: 600;
  }
  
  &__address {
    margin-top: 1px;
    font-size: 12px;
    color: var(--text-color-muted);
  }
  
  &__check {
    color: var(--color-primary);
  }
}
</style>