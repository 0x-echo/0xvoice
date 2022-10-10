<template>
  <div
    class="profile-box">
    <div
      class="profile-box__banner">
    </div>
    
    <div
      class="profile-box__body">
      <v-avatar
        class="profile-box__avatar"
        :alt="data.screen_name"
        :hash="data.address"
        :size="110"
        :src="data.avatar || ''">
      </v-avatar>
      
      <div
        class="profile-box__content">
        <div
          class="profile-box__name">
          {{ $formatScreenName(data.screen_name) }}
        </div>
        
        <!-- <div
          class="profile-box__bio">
          {{ data.bio || '--' }}
        </div> -->
        
        <div
          class="profile-box__stat">
          <span>
            <b>{{ data.followings || 0 }}</b> Following
          </span>
          
          <span>
            <b>{{ data.followers || 0 }}</b> Followers
          </span>
        </div>
      </div>
      
      <follow-button
        class="profile-box__follow-button"
        v-if="!isMe"
        :data="data"
        :plain="false">
      </follow-button>
    </div>
  </div>
</template>

<script setup>
import { ElButton } from 'element-plus'
import useStore from '~~/store'

const { $bus } = useNuxtApp()
const store = useStore()

const props = defineProps({
  data: {
    type: Object,
    required: true,
    default () {
      return {}
    }
  }
})

const isMe = computed(() => {
  return store.auth.hasLogined && (store.profile.chain + '/' + store.profile.address) === (props.data.chain + '/' + props.data.address)
})
</script>

<style lang="scss">
.profile-box {
  padding-bottom: 64px;
  border-bottom: 1px solid var(--bg-color);
  
  &__banner {
    width: 100%;
    height: 160px;
    border-radius: var(--border-radius);
    background: linear-gradient(to right, #c2e59c, #64b3f4);
  }
  
  &__body {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    padding: 0 24px;
    margin-top: -45px;
  }
  
  &__content {
    flex: 1;
    margin: 0 16px;
  }
  
  &__avatar {
    border: 5px solid white;
    margin-bottom: -5px;
  }
  
  &__name {
    font-size: 18px;
    font-weight: 600;
  }
  
  &__bio {
    font-size: 15px;
    color: var(--text-color-muted);
  }
  
  &__stat {
    margin-top: 4px;
    font-size: 13px;
    
    span {
      margin-right: 8px;
    }
  }
}

@media screen and (max-width: #{$tablet-width - 1}) {
  .profile-box {
    padding-bottom: 32px;
    
    &__body {
      flex-direction: column;
      align-items: center;
      margin-top: -40px;
    }
    
    &__avatar {
      --el-avatar-size: 80px !important;
      margin-bottom: 0;
    }
    
    &__content {
      text-align: center;
    }
    
    &__follow-button {
      margin-top: 12px;
    }
  }
}
</style>