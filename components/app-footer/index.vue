<template>
  <footer
    class="app-footer"
    :class="{
      'is-center': center
    }">
    <!-- <nav>
      <router-link
        class="app-footer__footer-link"
        v-for="item in footerLinks"
        :key="item.value"
        :to="item.value"
        target="_blank">
        {{ item.label }}
      </router-link>
    </nav> -->
      
    <div
      class="app-footer__copyright">
      © 2022 VOICE x ECHO
    </div>
    
    <div
      class="app-footer__slogan">
      Our Voice Matters.
    </div>
  </footer>
</template>

<script setup>
const props = defineProps({
  center: {
    type: Boolean,
    default: false
  }
})

const footerLinks = [{
  label: 'Terms of Service',
  value: '/'
}, {
  label: 'Privacy Policy',
  value: '/'
}]
</script>

<style lang="scss">
.app-footer {
  margin-top: 32px;
  font-size: 12px;
  color: var(--text-color-secondary);
  
  &.is-center {
    text-align: center;
  }
  
  &__footer-link {
    margin-right: 12px;
    color: var(--text-color-secondary);
  }
  
  &__copyright {
    margin-top: 5px;
  }
  
  &__slogan {
    margin-top: 5px;
  }
}
</style>