<template>
    <div class="flex items-center p-3 bg-gray-50 rounded-lg mb-2.5 transition-all duration-300 ease-in-out hover:bg-gray-100">
      <div :class="['text-xl font-bold mr-3 w-8 text-center', rankColorClass]">{{ rankDisplay }}</div>
      <img v-if="student.avatarUrl" :src="student.avatarUrl" alt="avatar" class="w-10 h-10 rounded-full mr-3"/>
      <div v-else class="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-gray-600 font-semibold mr-3 text-sm">
        {{ student.name?.substring(0, 2).toUpperCase() || '??' }}
      </div>
      <div class="flex-grow">
        <div class="font-semibold text-gray-800">{{ student.name }}</div>
        <div class="text-xs text-gray-500">{{ student.levelName || 'N/A' }}</div>
      </div>
      <div class="font-bold text-blue-600">{{ student.points }}pts</div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { computed } from 'vue';
  
  interface LeaderboardStudent {
    id: string;
    name: string | null;
    points: number;
    levelName?: string;
    avatarUrl?: string;
  }
  
  const props = defineProps<{
    student: LeaderboardStudent;
    rank: number;
  }>();
  
  const rankDisplay = computed(() => `#${props.rank}`);
  
  const rankColorClass = computed(() => {
    if (props.rank === 1) return 'text-yellow-500';
    if (props.rank === 2) return 'text-gray-500'; // Original era #95a5a6
    if (props.rank === 3) return 'text-orange-500'; // Original era #e67e22
    return 'text-gray-700';
  });
  </script>