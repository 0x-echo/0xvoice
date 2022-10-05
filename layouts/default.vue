<template>
  <div
    class="app">
    <app-sidebar>
    </app-sidebar>
    
    <main
      class="app-main">
      <slot />
      
      <app-side-content>
      </app-side-content>
    </main>
  </div>
</template>

<script setup>

</script>

<style lang="scss">
.app {
  display: flex;
  padding: 0 20px;
  max-width: 1400px;
  margin: 0 auto;
}

.app-main {
  flex: 1;
  display: flex;
}
</style>