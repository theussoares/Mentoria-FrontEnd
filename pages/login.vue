<template>
    <main class="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-green-50 p-4 sm:p-6">
        <div class="max-w-md w-full">
            <section class="bg-white rounded-2xl shadow-xl p-6 sm:p-8 border border-gray-100" role="main" aria-labelledby="login-title">
                <!-- Logo/Title -->
                <header class="text-center mb-6 sm:mb-8">
                    <h1 id="login-title" class="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">Bem-vindo</h1>
                    <p class="text-gray-600 text-sm sm:text-base">Entre na sua conta</p>
                </header>

                <!-- Google Login Button -->
                <div class="mb-6">
                    <button
                        type="button"
                        @click="handleGoogleLogin"
                        :disabled="loading"
                        class="transition-colors cursor-pointer duration-300 hover:shadow-lg shadow-green-600/30 hover:border-green-600 w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg bg-white hover:bg-gray-50 disabled:bg-gray-100 disabled:cursor-not-allowed focus:ring-2 focus:ring-green-600 focus:ring-offset-2"
                        aria-label="Entrar com Google"
                    >
                        <svg class="w-5 h-5 mr-3" viewBox="0 0 24 24" aria-hidden="true">
                            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                        </svg>
                        <span class="text-gray-700 font-medium">Continuar com Google</span>
                    </button>
                </div>

                <!-- Divider -->
                <div class="relative mb-6">
                    <div class="absolute inset-0 flex items-center">
                        <div class="w-full border-t border-gray-300"></div>
                    </div>
                    <div class="relative flex justify-center text-sm">
                        <span class="px-2 bg-white text-gray-500">ou</span>
                    </div>
                </div>

                <!-- Login Form -->
                <form @submit.prevent="handleLogin" class="space-y-4 sm:space-y-6" novalidate aria-describedby="form-instructions">
                    <div id="form-instructions" class="sr-only">
                        Preencha os campos abaixo para fazer login na sua conta
                    </div>
                    
                    <!-- Email Field -->
                    <div>
                        <label for="email" class="block text-sm font-medium text-gray-700 mb-2">
                            E-mail
                        </label>
                        <input
                            id="email"
                            v-model="email"
                            type="email"
                            required
                            autocomplete="email"
                            aria-describedby="email-hint"
                            class="w-full px-3 py-3 sm:px-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 text-base"
                            placeholder="seu@email.com"
                        />
                        <div id="email-hint" class="sr-only">Digite seu endereço de e-mail</div>
                    </div>

                    <!-- Password Field -->
                    <div>
                        <label for="password" class="block text-sm font-medium text-gray-700 mb-2">
                            Senha
                        </label>
                        <input
                            id="password"
                            v-model="password"
                            type="password"
                            required
                            autocomplete="current-password"
                            aria-describedby="password-hint"
                            class="w-full px-3 py-3 sm:px-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 text-base"
                            placeholder="••••••••"
                        />
                        <div id="password-hint" class="sr-only">Digite sua senha</div>
                    </div>

                    <!-- Error Message -->
                    <div v-if="error" class="p-3 bg-red-50 border border-red-200 rounded-lg" role="alert" aria-live="polite">
                        <p class="text-red-600 text-sm">{{ error }}</p>
                    </div>

                    <!-- Submit Button -->
                    <button
                        type="submit"
                        :disabled="loading || isSubmitDisabled"
                        :aria-label="loading ? 'Fazendo login, aguarde...' : 'Fazer login'"
                        class="cursor-pointer w-full bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 disabled:from-gray-400 disabled:to-gray-400 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 disabled:cursor-not-allowed focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 touch-manipulation"
                    >
                        <span v-if="loading" class="flex items-center justify-center">
                            <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Entrando...
                        </span>
                        <span v-else>Entrar</span>
                    </button>
                </form>

                <!-- Footer Links -->
                <footer class="mt-4 sm:mt-6 text-center">
                    <a href="#" class="text-sm text-blue-600 hover:text-blue-800 transition-colors focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded inline-block p-2">
                        Esqueceu sua senha?
                    </a>
                </footer>
            </section>
        </div>
    </main>
</template>

<script setup lang="ts">
import { ref, computed, watch, nextTick } from 'vue';
import { useAuth } from '../composables/useAuth';
import { useRouter } from 'vue-router';

const router = useRouter();

// Form data
const email = ref('');
const password = ref('');

// Field-specific errors
const emailError = ref<string | null>(null);
const passwordError = ref<string | null>(null);

// Form state
const isFormSubmitted = ref(false);
const submitAttempts = ref(0);

// Auth composable
const { loginWithEmail, loginWithGoogle, loading, error: authApiError, user } = useAuth();

// Enhanced email validation
const isValidEmailFormat = (emailValue: string): boolean => {
    if (!emailValue) return true;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(emailValue.trim());
};

// Enhanced password validation
const isValidPassword = (passwordValue: string): boolean => {
    return !!passwordValue && passwordValue.length >= 6;
};

// Field validation functions
const validateEmailField = (): boolean => {
    const trimmedEmail = email.value.trim();
    
    if (!trimmedEmail) {
        emailError.value = 'O campo de e-mail é obrigatório.';
        return false;
    }
    
    if (!isValidEmailFormat(trimmedEmail)) {
        emailError.value = 'Por favor, insira um endereço de e-mail válido.';
        return false;
    }
    
    emailError.value = null;
    return true;
};

const validatePasswordField = (): boolean => {
    if (!password.value) {
        passwordError.value = 'O campo de senha é obrigatório.';
        return false;
    }
    
    if (!isValidPassword(password.value)) {
        passwordError.value = 'A senha deve ter pelo menos 6 caracteres.';
        return false;
    }
    
    passwordError.value = null;
    return true;
};

// Validate entire form
const validateForm = (): boolean => {
    const isEmailValid = validateEmailField();
    const isPasswordValid = validatePasswordField();
    return isEmailValid && isPasswordValid;
};

// Computed properties
const isSubmitDisabled = computed(() => {
    return loading.value || 
                 !email.value.trim() || 
                 !password.value || 
                 !!emailError.value || 
                 !!passwordError.value;
});

// Combined error message (prioritize field errors over API errors)
const error = computed(() => {
    if (emailError.value) return emailError.value;
    if (passwordError.value) return passwordError.value;
    return authApiError.value;
});

// Enhanced form submission
const handleLogin = async () => {
    try {
        isFormSubmitted.value = true;
        submitAttempts.value++;
        
        // Clear previous API errors
        if (authApiError.value) {
            authApiError.value = null;
        }
        
        // Validate form before submission
        if (!validateForm()) {
            console.warn('Formulário inválido - correção necessária');
            return;
        }
        
        // Prevent multiple submissions
        if (loading.value) {
            console.warn('Login já em andamento');
            return;
        }
        
        // Attempt login
        await loginWithEmail(email.value.trim(), password.value);
        
        // Handle successful login
        if (user.value) {
            console.log('Login realizado com sucesso:', { 
                userId: user.value.id, 
                email: user.value.email 
            });
            
            // Redirect after successful login
            await nextTick();
            await router.push('/dashboard');
        }
        
    } catch (loginError) {
        console.error('Erro durante o processo de login:', loginError);
        
        // Handle specific error cases
        if (loginError instanceof Error) {
            // Network or other technical errors
            if (loginError.message.includes('network') || loginError.message.includes('fetch')) {
                // This will be handled by the auth composable
            }
        }
    }
};

// Google Login Handler
const handleGoogleLogin = async () => {
    try {
        // Clear any existing errors
        if (authApiError.value) {
            authApiError.value = null;
        }
        
        // Prevent multiple submissions
        if (loading.value) {
            console.warn('Login com Google já em andamento');
            return;
        }
        
        console.log('Iniciando login com Google...');
        
        // Call Google login method from auth composable
        await loginWithGoogle();
        
        // Handle successful login
        if (user.value) {
            console.log('Login com Google realizado com sucesso:', { 
                userId: user.value.id, 
                email: user.value.email 
            });
            
            // Redirect after successful login
            await nextTick();
            await router.push('/dashboard');
        }
        
    } catch (googleLoginError) {
        console.error('Erro durante o login com Google:', googleLoginError);
        
        // The auth composable should handle setting the error state
        // but we can add additional error handling here if needed
        if (googleLoginError instanceof Error) {
            console.error('Detalhes do erro:', googleLoginError.message);
        }
    }
};

// Enhanced watchers with debouncing
let emailValidationTimer: NodeJS.Timeout | null = null;
let passwordValidationTimer: NodeJS.Timeout | null = null;

watch(email, (newEmail) => {
    // Clear API errors when user starts typing
    if (authApiError.value) {
        authApiError.value = null;
    }
    
    // Debounced validation for better UX
    if (emailValidationTimer) {
        clearTimeout(emailValidationTimer);
    }
    
    emailValidationTimer = setTimeout(() => {
        if (isFormSubmitted.value || emailError.value) {
            validateEmailField();
        }
    }, 300);
});

watch(password, (newPassword) => {
    // Clear API errors when user starts typing
    if (authApiError.value) {
        authApiError.value = null;
    }
    
    // Debounced validation for better UX
    if (passwordValidationTimer) {
        clearTimeout(passwordValidationTimer);
    }
    
    passwordValidationTimer = setTimeout(() => {
        if (isFormSubmitted.value || passwordError.value) {
            validatePasswordField();
        }
    }, 300);
});

// Cleanup timers on unmount
onUnmounted(() => {
    if (emailValidationTimer) {
        clearTimeout(emailValidationTimer);
    }
    if (passwordValidationTimer) {
        clearTimeout(passwordValidationTimer);
    }
});

// Handle authentication state changes
watch(user, (newUser) => {
    if (newUser && isFormSubmitted.value) {
        // Reset form state after successful login
        isFormSubmitted.value = false;
        submitAttempts.value = 0;
    }
});

// Expose methods for testing or parent component access
defineExpose({
    validateForm,
    handleLogin,
    resetForm: () => {
        email.value = '';
        password.value = '';
        emailError.value = null;
        passwordError.value = null;
        isFormSubmitted.value = false;
        submitAttempts.value = 0;
        authApiError.value = null;
    }
});

</script>

<style scoped>
/* Estilos adicionais podem ser adicionados aqui, se necessário */
</style>