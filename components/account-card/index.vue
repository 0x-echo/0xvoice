<template>
  <div
    class="account-card">
    <div
      class="account-card__header">
      <h3
        class="account-card__title">
        You might like
      </h3>
    </div>
    
    <div>
      <account-item
        v-for="item in data"
        :key="item.id"
        :data="item">
      </account-item>
    </div>
  </div>
</template>

<script setup>
import AccountItem from './account-item'

const props = defineProps({
  data: {
    type: Array,
    required: true
  }
})
</script>

<style lang="scss">
.account-card {
  // padding: 12px;
  border-radius: var(--border-radius);
  // border: 1px solid var(--border-color);
  
  &__header {
    padding: 12px;
    margin-bottom: 12px;
    border-bottom: 1px solid var(--border-color);
  }
  
  &__title {
    font-size: 16px;
  }
}
</style>