<!-- AuthSocialButtons.vue -->
<template>
    <div class="social-auth-buttons">
      <!-- Google -->
      <button 
        @click="loginWithGoogle"
        class="social-btn google-btn"
      >
        <svg><!-- Google Icon --></svg>
        Entrar com Google
      </button>
      
      <!-- GitHub -->
      <button 
        @click="loginWithGithub" 
        class="social-btn github-btn"
      >
        <svg><!-- GitHub Icon --></svg>
        Entrar com GitHub
      </button>
      
      <!-- Divisor -->
      <div class="divider">
        <span>ou</span>
      </div>
      
      <!-- Email Form -->
      <AuthLoginForm />
    </div>
  </template>