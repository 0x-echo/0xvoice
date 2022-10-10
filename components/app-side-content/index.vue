<template>
  <div
    class="app-side-content">
    <div
      class="app-side-content__content">
      <account-card
        :data="accounts">
      </account-card>
    </div>
    
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
        © 2022 VOICE x ECHO
      </div>
      
      <div
        class="app-side-content__slogan">
        Our Voice Matters.
      </div>
    </div>
  </div>
</template>

<script setup>
import { API } from '~~/libs/api'
import useAuth from '~~/compositions/auth'
import useStore from '~~/store'

const store = useStore()
const auth = useAuth(store)

let accounts = reactive([])

onMounted(async () => {
  const data = await $fetch(API.GET_USERS, {
    headers: auth.getCommonHeader()
  })
  console.log(data)
  for (const one of data.data.list) {
    accounts.push(one)
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
.app-side-content {
  display: flex;
  flex-direction: column;
  width: 350px;
  height: 100vh;
  padding: 32px 0 32px 32px;
  overflow-y: auto;
  
  &::-webkit-scrollbar {
    display: none;
  }
  
  &__content {
    flex: 1;
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
  
  &__slogan {
    margin-top: 5px;
  }
}

@media screen and (max-width: 1200px) {
  .app-side-content {
    width: 300px;
    padding-left: 24px;
  }
}

@media screen and (max-width: 1040px) {
  .app-side-content {
    display: none;
  }
}
</style>