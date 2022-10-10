<template>
  <div
    class="account-item"
    @click="$router.push(`/${data.screen_name}`)">
    <v-avatar
      class="account-item__avatar"
      :alt="data.screen_name"
      :hash="data.address"
      size="small"
      :src="data.avatar || ''">
    </v-avatar>
    
    <div
      class="account-item__content">
      <div
        class="account-item__name ellipsis"
        :to="data.address">
        {{ $formatScreenName(data.screen_name) }}
      </div>
    </div>
    
    <follow-button
      :data="data">
    </follow-button>
  </div>
</template>

<script setup>
import { ElButton, ElMessage } from 'element-plus'
import useStore from '~~/store'
import useFollow from '~~/compositions/follow'

const { $bus } = useNuxtApp()

const store = useStore()

let loading = ref(false)
const { submit } = useFollow({ store, loading })

const props = defineProps({
  data: {
    type: Object,
    required: true
  }
})

let isHoveringFollowButton = ref(false)
const getFollowButtonText = () => {
  if (props.data.is_following && store.auth.hasLogined) {
    if (isHoveringFollowButton.value) {
      return 'Unfollow'
    } else {
      return 'Following'
    }
  } else {
    return 'Follow'
  }
}

const _submit = async () => {
  await submit(props.data)
}
</script>

<style lang="scss">
.account-item {
  display: flex;
  align-items: center;
  padding: 12px;
  border-radius: var(--border-radius);
  cursor: pointer;
  transition: all .3s ease;
  
  &:hover {
    background: white;
  }
  
  &__avatar {
    flex-shrink: 0;
  }

  &__content {
    flex: 1;
    min-width: 0;
    margin: 0 12px;
  }
  
  &__name {
    font-size: 14px;
    font-weight: 500;
    color: var(--text-color-primary);
  }
}
</style>