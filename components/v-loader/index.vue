<template>
  <div
    class="v-loader"
    :style="{
      width: `${size}px`,
      height: `${size}px`
    }">
  </div>
</template>

<script setup>
const props = defineProps({
  size: {
    type: [Number, String],
    default: 14
  }
})
</script>

<style lang="scss">
</style>