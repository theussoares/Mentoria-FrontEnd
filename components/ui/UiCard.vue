<template>
    <div class="bg-white rounded-2xl shadow-xl p-6 border border-gray-100 transition-all duration-300 ease-in-out hover:shadow-2xl hover:-translate-y-1">
      <slot name="header"></slot>
      <slot></slot>
      <slot name="footer"></slot>
    </div> 
  </template>
  
  <script setup lang="ts">
  // Nenhuma lógica de script específica necessária para este card base por enquanto
  </script>