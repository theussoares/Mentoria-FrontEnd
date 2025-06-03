<template>
    <div
      @click="$emit('showInfo', badge)"
      role="button"
      tabindex="0"
      :class="[
        'flex flex-col items-center justify-center text-center p-3 rounded-lg min-h-[120px] transition-all duration-300 ease-in-out cursor-pointer',
        badge.earned
          ? 'bg-gradient-to-br from-purple-500 to-indigo-600 text-white shadow-lg hover:shadow-xl hover:scale-105'
          : 'bg-gray-100 text-gray-400 opacity-70 hover:opacity-100 hover:bg-gray-200'
      ]"
    >
      <span class="text-3xl mb-1.5">{{ badge.icon }}</span>
      <span class="text-xs font-bold break-words">{{ badge.name }}</span>
    </div>
  </template>
  
  <script setup lang="ts">
  interface Badge {
    id: string;
    icon: string;
    name: string;
    earned: boolean;
    description?: string;
  }
  
  defineProps<{
    badge: Badge;
  }>();
  
  defineEmits(['showInfo']);
  </script>