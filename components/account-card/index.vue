<template>
  <div
    class="account-card">
    <div
      class="account-card__header">
      <h2
        class="account-card__title">
        You might like
      </h2>
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
  &__header {
    margin-bottom: 16px;
  }
}
</style>