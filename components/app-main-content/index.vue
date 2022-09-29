<template>
  <div
    class="app-main-content">
    <slot
      name="header">
    </slot>
    
    <slot>
      <post-item
        v-for="item in posts"
        :key="item.id"
        :data="item">
      </post-item>
    </slot>
  </div>
</template>

<script setup>
const props = defineProps({
  posts: {
    type: Array
  }
})
</script>

<style lang="scss">
.app-main-content {
  flex: 1;
}
</style>