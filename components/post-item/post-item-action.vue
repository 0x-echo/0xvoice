<template>
  <div
    class="post-item-action"
    role="button"
    @click.stop>
    <span
      class="post-item-action__icon"
      :class="[`post-item-action__icon--${value}`, {
        'active': active,
        'activated': activated
      }]">
      <i
        :class="icon"
        :title="value">
      </i>
    </span>

    <span
      class="post-item-action__count"
      ref="commentCountRef"
      v-show="count <= 9999">
    </span>
    
    <span
      class="post-item-action__count"
      v-if="count > 9999">
      {{ $formatNumber(count) }}
    </span>
  </div>
</template>

<script setup>
import { Flip } from 'number-flip'

const props = defineProps({
  active: {
    type: Boolean,
    default: false
  },
  count: {
    type: [Number, String]
  },
  icon: {
    type: String,
    required: true
  },
  value: {
    type: String
  }
})

let flip
const commentCountRef = ref(null)
onMounted(() => {
  flip = new Flip({
    node: commentCountRef.value,
    from: props.count,
    systemArr: [(props.count < 10 && props.count < 10) ? '&nbsp;' : 0, 1, 2, 3, 4, 5, 6, 7, 8, 9 ]
  })
})

watch(() => props.count, (val, oldVal) => {
  if (oldVal <= 9999) {
    try {
      flip.flipTo({
        to: val || ' '
      }) 
    } catch (e) {
      console.log(e)
    }
  }
})

let activated = ref(false)
watch(() => props.active, (val, oldVal) => {
  if (val) {
    activated.value = val 
    
    setTimeout(() => {
      activated.value = false
    }, 500)
  }
})
</script>

<style lang="scss">
.post-item-action {
  display: flex;
  align-items: center;
  width: 65px;
  color: var(--text-color-muted);
  
  &__icon {
    position: relative;
    display: flex;
    align-items: center;
    padding: 8px;
    border-radius: 50%;
    font-size: 18px;
    line-height: 18px;
    cursor: pointer;
    transition: all .3s ease;
    
    &:hover {
      background: var(--bg-color);  
      color: var(--text-color-primary);
    }
    
    &.active {
      color: var(--color-primary);
    }
    
    &.activated {
      &::after {
        animation: scaleFade 0.5s forwards;
      }
    }
    
    &:after {
      font-family: "remixicon"!important;
      position: absolute;
      left: 8px;
      top: 8px;
      z-index: 1;
      font-size: 14px;
      color: var(--color-primary);
      transform: scale(0);
      transform-origin: center;
      opacity: 0;
    }
  }
  
  &__icon--like {
    &::after {
      content: '\f206';
    }
  }
  
  &__count {
    margin-left: 5px;
    font-size: 12px;
  }
}

@keyframes scaleFade {
  50% { 
		opacity: 1;
		transform: scale(1);
	}
	100% {
		opacity: 0;
		transform: scale(2.5);
	}
}
</style>
