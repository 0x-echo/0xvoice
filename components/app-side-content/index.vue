<template>
  <div
    class="app-side-content">
    <account-card
      :data="accounts">
    </account-card>
  </div>
</template>

<script setup>
const accounts = [{
  id: '1',
  screen_name: 'Airyland',
  address: '0x1203242',
  avatar: ''
}]
</script>

<style lang="scss">
.app-side-content {
  width: 350px;
}
</style>