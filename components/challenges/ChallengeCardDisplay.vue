<template>
    <UiCard class="mb-5 border-l-4" :class="statusBorderColor">
      <h3 class="text-lg font-semibold text-gray-800 mb-2">{{ challenge.title }}</h3>
      <p class="text-sm text-gray-600 mb-3">{{ challenge.description }}</p>
      <div class="flex justify-between items-center mb-3">
        <span class="inline-block bg-yellow-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
          +{{ challenge.pointsReward }} pontos
        </span>
        <span v-if="studentStatus" class="text-xs font-medium px-2 py-1 rounded-full" :class="statusTextColor">
          {{ formattedStudentStatus }}
        </span>
      </div>
  
      <button
        v-if="canStudentSubmit"
        @click="$emit('submitChallenge', challenge.id)"
        class="w-full mt-2 bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2"
      >
        Concluí! Enviar para Avaliação
      </button>
      <button
        v-else-if="isAwaitingApproval"
        disabled
        class="w-full mt-2 bg-gray-300 text-gray-500 font-semibold py-2 px-4 rounded-lg cursor-not-allowed"
      >
        Aguardando Avaliação...
      </button>
       <button
        v-else-if="isApproved"
        disabled
        class="w-full mt-2 bg-blue-300 text-blue-700 font-semibold py-2 px-4 rounded-lg cursor-not-allowed"
      >
        Aprovado! 🎉
      </button>
      </UiCard>
  </template>
  
  <script setup lang="ts">
  import { computed } from 'vue';
  import UiCard from '~/components/ui/UiCard.vue';
  import type { Challenge, StudentChallengeStatus } from '~/types/challenge'; // Ajuste o caminho se necessário
  
  const props = defineProps<{
    challenge: Challenge;
    studentStatus?: StudentChallengeStatus; // Status atual do aluno para este desafio
  }>();
  
  defineEmits(['submitChallenge']);
  
  const statusDisplayMap: Record<StudentChallengeStatus, string> = {
    disponivel: 'Disponível',
    aceito: 'Aceito',
    submetido_para_aprovacao: 'Enviado',
    aprovado: 'Aprovado',
    rejeitado: 'Requer Ajustes',
  };
  
  const formattedStudentStatus = computed(() => {
    return props.studentStatus ? statusDisplayMap[props.studentStatus] : 'Disponível';
  });
  
  const canStudentSubmit = computed(() => {
    return !props.studentStatus || props.studentStatus === 'disponivel' || props.studentStatus === 'aceito' || props.studentStatus === 'rejeitado';
  });
  
  const isAwaitingApproval = computed(() => {
    return props.studentStatus === 'submetido_para_aprovacao';
  });
  
  const isApproved = computed(() => {
    return props.studentStatus === 'aprovado';
  });
  
  
  const statusBorderColor = computed(() => {
    if (props.studentStatus === 'aprovado') return 'border-green-500';
    if (props.studentStatus === 'submetido_para_aprovacao') return 'border-orange-500';
    if (props.studentStatus === 'rejeitado') return 'border-red-500';
    return 'border-blue-600'; // Cor padrão ou para 'disponivel' / 'aceito'
  });
  
  const statusTextColor = computed(() => {
    if (props.studentStatus === 'aprovado') return 'bg-green-100 text-green-700';
    if (props.studentStatus === 'submetido_para_aprovacao') return 'bg-orange-100 text-orange-700';
    if (props.studentStatus === 'rejeitado') return 'bg-red-100 text-red-700';
    return 'bg-blue-100 text-blue-700';
  });
  </script>