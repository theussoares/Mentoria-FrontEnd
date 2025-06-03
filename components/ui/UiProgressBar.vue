<template>
    <div>
      <div class="flex justify-between mb-1 text-sm text-gray-600">
        <slot name="label"><span>Progresso</span></slot>
        <slot name="value"><span>{{ currentValue }}/{{ maxValue }}</span></slot>
      </div>
      <div class="bg-gray-200 rounded-full h-5 overflow-hidden">
        <div
          class="bg-gradient-to-r from-blue-500 to-green-500 h-5 rounded-full transition-all duration-500 ease-out relative"
          :style="{ width: percentage + '%' }"
        >
          <div v-if="showShimmer" class="shimmer-effect"></div>
        </div>
      </div>
      <div v-if="$slots.nextLevel" class="mt-1 text-xs text-gray-500">
        <slot name="nextLevel"></slot>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { computed } from 'vue';
  
  const props = defineProps({
    currentValue: {
      type: Number,
      required: true,
      default: 0,
    },
    maxValue: {
      type: Number,
      required: true,
      default: 100,
    },
    showShimmer: {
      type: Boolean,
      default: true,
    }
  });
  
  const percentage = computed(() => {
    if (props.maxValue === 0) return 0;
    const calcPercentage = (props.currentValue / props.maxValue) * 100;
    return Math.min(Math.max(calcPercentage, 0), 100); // Garante que fique entre 0 e 100
  });
  </script>
  
  <style scoped>
  .shimmer-effect {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
    animation: shimmer 2s infinite;
  }
  
  @keyframes shimmer {
    0% {
      transform: translateX(-100%);
    }
    100% {
      transform: translateX(100%);
    }
  }
  </style>