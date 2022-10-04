<template>
  <div
    class="app-side-content">
    <account-card
      :data="accounts">
    </account-card>
    
    <div
      class="app-side-content__footer">
      <nav>
        <router-link
          class="app-side-content__footer-link"
          v-for="item in footerLinks"
          :key="item.value"
          :to="item.value"
          target="_blank">
          {{ item.label }}
        </router-link>
      </nav>
      
      <div
        class="app-side-content__copyright">
        © 2022 VOICE
      </div>
      
      <p>
        Our voice matters.
      </p>
    </div>
  </div>
</template>

<script setup>
const accounts = [{
  id: '1',
  screen_name: 'Airyland',
  address: '0x1203242',
  avatar: ''
}, {
  id: '2',
  screen_name: 'Joanne',
  address: '0x1203242',
  avatar: ''
}]

const footerLinks = [{
  label: 'Terms of Service',
  value: '/'
}, {
  label: 'Privacy',
  value: '/'
}]
</script>

<style lang="scss">
.app-side-content {
  width: 350px;
  height: 100vh;
  padding: 32px 0 32px 32px;
  overflow-y: auto;
  
  &::-webkit-scrollbar {
    display: none;
  }
  
  &__footer {
    margin-top: 32px;
    font-size: 12px;
    color: var(--text-color-secondary);
  }
  
  &__footer-link {
    margin-right: 12px;
    color: var(--text-color-secondary);
  }
  
  &__copyright {
    margin-top: 5px;
  }
}
</style>