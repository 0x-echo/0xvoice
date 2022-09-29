<template>
  <div
    class="app">
    <app-sidebar>
    </app-sidebar>
    
    <slot />
  </div>
</template>

<script setup>

</script>

<style lang="scss">
.app {
  display: flex;
  max-width: 1400px;
  margin: 0 auto;
}

.app-main {
  flex: 1;
  display: flex;
}
</style>