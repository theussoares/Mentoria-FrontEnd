<template>
    <UiCard v-if="student">
      <template #header>
        <div class="flex flex-col items-center">
          <div
            class="w-20 h-20 rounded-full flex items-center justify-center text-white text-3xl font-bold mb-3"
            :style="{ backgroundColor: student.avatarColor || '#764ba2' }"
          >
            {{ student.avatarInitial || student.name?.charAt(0) || '?' }}
          </div>
          <h2 class="text-xl font-semibold text-gray-800">{{ student.name }}</h2>
          <span
            v-if="student.level"
            class="text-sm text-white px-4 py-1 rounded-full mt-1 mb-3"
            :style="{ backgroundColor: student.level.color || '#667eea' }"
          >
            {{ student.level.name }}
          </span>
          <div class="text-3xl font-bold text-yellow-500">{{ student.points }}</div>
          <div class="text-sm text-gray-500 mb-4">pontos</div>
        </div>
      </template>
  
      <UiProgressBar
        :current-value="student.points"
        :max-value="student.nextLevelTargetPoints"
        :show-shimmer="true"
      >
        <template #label>
          <span class="font-medium">Progresso</span>
        </template>
        <template #value>
          <span class="font-medium">{{ student.points }}/{{ student.nextLevelTargetPoints }}</span>
        </template>
        <template #nextLevel v-if="student.nextLevelName">
          Próximo: {{ student.nextLevelName }}
        </template>
      </UiProgressBar>
  
      <!-- <template #footer>
        <button
          @click="$emit('addPoints', 50)"
          class="mt-5 w-full bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
        >
          + Completar Exercício
        </button>
      </template> -->
    </UiCard>
    <UiCard v-else>
        <p class="text-center text-gray-500">Carregando perfil do estudante...</p>
    </UiCard>
  </template>
  
  <script setup lang="ts">
  import UiCard from '~/components/ui/UiCard.vue';
  import UiProgressBar from '~/components/ui/UiProgressBar.vue';
  
  // Definindo uma interface mais robusta para o estudante no contexto do perfil
  interface StudentProfileData {
    id: string;
    name: string | null;
    points: number;
    avatarInitial?: string; // Ex: "JS"
    avatarColor?: string; // Cor de fundo para o avatar com iniciais
    level?: {
      name: string;
      color: string;
    };
    nextLevelTargetPoints: number;
    nextLevelName?: string;
  }
  
  defineProps<{
    student: StudentProfileData | null;
  }>();
  
  defineEmits(['addPoints']);
  </script>