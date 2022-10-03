<template>
  <div
    class="plugin-toolbar"
    v-show="toolbarVisible">
    <div
      class="plugin-toolbar__close"
      @click="toolbarVisible = false">
      <i
        class="ri-close-line">
      </i>
    </div>
    
    <div
      class="plugin-toolbar__item"
      v-for="item in list"
      :key="item.value"
      @click="drawerVisible = true">
      <div
        class="plugin-toolbar__item-icon">
        <i
          :class="item.icon">
        </i>
      </div>
      
      <sup
        class="plugin-toolbar__item-badge"
        v-if="data[item.value] !== 0">
        {{ data[item.value] }}
      </sup>
    </div>
  </div>
  
  <transition
    name="slide-fade">
    <div
      class="plugin-drawer"
      v-show="drawerVisible">
      <div
        class="plugin-drawer__header">
        <a 
          class="plugin-drawer__logo"
          href="https://0xecho.com"
          target="_blank">
          <img 
            class="plugin-drawer__logo-image"
            src="@/assets/logo.svg" 
            alt="ECHO">
          
          <h1
            class="plugin-drawer__title">
            ECHO
          </h1>
        </a>
        
        <div
          class="plugin-drawer__close"
          @click="drawerVisible = false">
          <i
            class="ri-close-line">
          </i>
        </div>
      </div>
      
      <div
        class="plugin-drawer__content">
        <iframe 
          allow="'accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" 
          allowfullscreen="" 
          frameborder="0" 
          loading="lazy" 
          src="https://embed.0xecho.com.ipns.page/?color-theme=light&amp;desc=&amp;has-h-padding=true&amp;has-v-padding=true&amp;modules=comment%2Clike%2Cdislike%2Ctip&amp;receiver=orangexyz.bit&amp;target_uri=https%3A%2F%2Forangexyz.mirror.xyz%2FNv9FZ9G4OweAJzNnaPFooScS5kGk2M46MSAwqiIyZYQ&amp;height=729&amp;display=iframe">
        </iframe>
      </div>
    </div>
  </transition>
</template>

<script setup>
let toolbarVisible = ref(true)
let drawerVisible = ref(false)

const list = [{
  icon: 'ri-thumb-up-line',
  value: 'like'
}, {
  icon: 'ri-thumb-down-line',
  value: 'dislike'
}, {
  icon: 'ri-chat-3-line',
  value: 'comment'
}]

const data = {
  like: 1,
  dislike: 0,
  comment: 532
}
</script>

<style lang="scss">
.plugin-toolbar {
  position: fixed;
  bottom: 30px;
  right: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 99999;
  
  &.is-dark {
    .plugin-toolbar__close {
      border-color: rgba(white, .1);
      background: #0d0f17;
      color: rgba(white, .9);
      box-shadow: 0 0 20px rgba(white, .1);
    }
    
    .plugin-toolbar__item-icon {
      border-color: var(--color-primary);
      background: var(--color-primary);
      color: rgba(white, .9);
      box-shadow: 0 0 20px rgba(white, .1);
    }
    
    .plugin-toolbar__item-badge {
      font-weight: 500;
      background: white;
      color: var(--color-primary);
    }
  }
  
  &:hover {
    .plugin-toolbar__close {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  &__close {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    margin-bottom: 16px;
    border-radius: 50%;
    border: 1px solid var(--border-color);
    font-size: 18px;
    color: var(--text-color-muted);
    background: white;
    box-shadow: 0 0 10px rgba(black, .1);
    transform: translateY(20%);
    opacity: 0;
    cursor: pointer;
    transition: all .3s ease;
    
    &:hover {
      color: var(--text-color-secondary);
    }
  }
  
  &__item {
    position: relative;
    display: flex;
    align-items: center;
    cursor: pointer;
    transition: all .3s ease;
    
    & + & {
      margin-top: 16px;
    }
    
    &:hover {
      transform: scale(1.1);
    }
  }
  
  &__item-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    border-radius: 10px;
    border: 1px solid var(--border-color);
    font-size: 16px;
    color: var(--text-color-secondary);
    background: white;
    box-shadow: 0 0 10px rgba(black, .1);
  }
  
  &__item-badge {
    position: absolute;
    top: 0;
    right: 0;
    transform: translate(40%, -40%);
    height: 16px;
    padding: 0 6px;
    border-radius: 10px;
    font-size: 12px;
    line-height: 16px;
    background: var(--color-primary);
    color: white;
  }
}

.plugin-drawer {
  position: absolute;
  top: 0;
  right: 0;
  width: 415px;
  height: 100vh;
  border-left: 1px solid var(--border-color);
  background: white;
  display: flex;
  flex-direction: column;
  z-index: 99999;
  
  &.is-dark {
    border-color: rgba(white, .1);
    background: #0d0f17;
    
    .plugin-drawer__logo {
      color: rgba(white, .9);
    }
    
    .plugin-drawer__close {
      color: rgba(white, .9);
      
      &:hover {
        background: rgba(white, .1);
      }
    }
  }
  
  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px 20px 0;
  }
  
  &__logo {
    display: flex;
    align-items: center;
    
    &,
    &:hover {
      color: var(--text-color-primary);
    }
  }
  
  &__logo-image {
    width: 40px;
    margin-right: 10px;
  }
  
  &__title {
    font-size: 16px;
  }
  
  &__close {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    font-size: 22px;
    color: var(--text-color-primary);
    cursor: pointer;
    transition: all .3s ease;
    
    &:hover {
      background: var(--bg-color);
    }
  }
  
  &__content {
    flex: 1;
    
    iframe {
      width: 100%;
      height: 100%;
    }
  }
}

.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all .3s;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(100%);
}
</style>