<template>
    <main class="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-green-50 p-4 sm:p-6">
        <div class="max-w-md w-full">
            <section class="bg-white rounded-2xl shadow-xl p-6 sm:p-8 border border-gray-100" role="main" aria-labelledby="register-title">
                <!-- Logo/Title -->
                <header class="text-center mb-6 sm:mb-8">
                    <h1 id="register-title" class="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">Criar Conta</h1>
                    <p class="text-gray-600 text-sm sm:text-base">Crie sua conta para começar</p>
                </header>

                <!-- Register Form -->
                <form @submit.prevent="handleRegister" class="space-y-4 sm:space-y-6" novalidate aria-describedby="form-instructions">
                    <div id="form-instructions" class="sr-only">
                        Preencha os campos abaixo para criar sua conta
                    </div>
                    
                    <!-- Name Field -->
                    <div>
                        <label for="name" class="block text-sm font-medium text-gray-700 mb-2">
                            Nome
                        </label>
                        <input
                            id="name"
                            v-model="name"
                            type="text"
                            required
                            autocomplete="name"
                            :disabled="loading"
                            aria-describedby="name-hint"
                            :class="[
                                'w-full px-3 py-3 sm:px-4 border rounded-lg focus:ring-2 focus:border-transparent outline-none transition-all duration-200 text-base disabled:bg-gray-100 disabled:cursor-not-allowed',
                                nameError ? 'border-red-300 focus:ring-red-500' : 'border-gray-200 focus:ring-blue-500'
                            ]"
                            placeholder="Seu Nome"
                        />
                        <div id="name-hint" class="sr-only">Digite seu nome completo</div>
                        <!-- Name Error Message -->
                        <div v-if="nameError" class="mt-1 text-sm text-red-600" role="alert">
                            {{ nameError }}
                        </div>
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
                            :disabled="loading"
                            aria-describedby="email-hint"
                            :class="[
                                'w-full px-3 py-3 sm:px-4 border rounded-lg focus:ring-2 focus:border-transparent outline-none transition-all duration-200 text-base disabled:bg-gray-100 disabled:cursor-not-allowed',
                                emailError ? 'border-red-300 focus:ring-red-500' : 'border-gray-200 focus:ring-blue-500'
                            ]"
                            placeholder="seu@email.com"
                        />
                        <div id="email-hint" class="sr-only">Digite seu endereço de e-mail</div>
                        <!-- Email Error Message -->
                        <div v-if="emailError" class="mt-1 text-sm text-red-600" role="alert">
                            {{ emailError }}
                        </div>
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
                            autocomplete="new-password"
                            :disabled="loading"
                            aria-describedby="password-hint"
                            :class="[
                                'w-full px-3 py-3 sm:px-4 border rounded-lg focus:ring-2 focus:border-transparent outline-none transition-all duration-200 text-base disabled:bg-gray-100 disabled:cursor-not-allowed',
                                passwordError ? 'border-red-300 focus:ring-red-500' : 'border-gray-200 focus:ring-blue-500'
                            ]"
                            placeholder="••••••••"
                        />
                        <div id="password-hint" class="sr-only">Digite uma senha segura</div>
                        <!-- Password Error Message -->
                        <div v-if="passwordError" class="mt-1 text-sm text-red-600" role="alert">
                            {{ passwordError }}
                        </div>
                    </div>

                    <!-- General API Error Message -->
                    <div v-if="authApiError && !nameError && !emailError && !passwordError" 
                         class="p-3 bg-red-50 border border-red-200 rounded-lg" role="alert" aria-live="polite">
                        <p class="text-red-600 text-sm">{{ authApiError }}</p>
                    </div>

                    <!-- Submit Button -->
                    <button
                        type="submit"
                        :disabled="isSubmitDisabled"
                        :aria-label="loading ? 'Criando conta, aguarde...' : 'Criar conta'"
                        :class="[
                            'w-full font-semibold py-3 px-4 rounded-lg transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 touch-manipulation',
                            isSubmitDisabled 
                                ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                                : 'bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white cursor-pointer'
                        ]"
                    >
                        <span v-if="loading" class="flex items-center justify-center">
                            <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Registrando...
                        </span>
                        <span v-else-if="isSubmitDisabled && !loading">
                            Preencha todos os campos
                        </span>
                        <span v-else>Criar Conta</span>
                    </button>
                </form>

                <!-- Footer Links -->
                <footer class="mt-4 sm:mt-6 text-center">
                    <p class="text-sm text-gray-600">
                        Já tem uma conta? 
                        <a href="/login" class="text-blue-600 hover:text-blue-800 transition-colors focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded inline-block p-1">
                            Fazer login
                        </a>
                    </p>
                </footer>
            </section>
        </div>
    </main>
</template>

<script setup lang="ts">
import { ref, computed, watch, nextTick, onUnmounted } from 'vue';
import { useAuth } from '../composables/useAuth';
import { useRouter } from 'vue-router';
import { isValidEmailFormat, isNotEmpty, validatePassword } from '../utils/validators';

const router = useRouter();

// Form data
const name = ref('');
const email = ref('');
const password = ref('');

// Field-specific errors
const nameError = ref<string | null>(null);
const emailError = ref<string | null>(null);
const passwordError = ref<string | null>(null);

// Form state
const isFormSubmitted = ref(false);
const submitAttempts = ref(0);

// Auth composable
const { registerWithEmail, loading, error: authApiError, user } = useAuth();

// Field validation functions
const validateNameField = (): boolean => {
    const trimmedName = name.value.trim();
    
    if (!isNotEmpty(trimmedName)) {
        nameError.value = 'O campo nome é obrigatório.';
        return false;
    }
    
    if (trimmedName.length < 2) {
        nameError.value = 'O nome deve ter pelo menos 2 caracteres.';
        return false;
    }
    
    nameError.value = null;
    return true;
};

const validateEmailField = (): boolean => {
    const trimmedEmail = email.value.trim();
    
    if (!isNotEmpty(trimmedEmail)) {
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
    const passwordValidation = validatePassword(password.value);
    
    if (passwordValidation !== true) {
        passwordError.value = passwordValidation;
        return false;
    }
    
    passwordError.value = null;
    return true;
};

// Validate entire form
const validateForm = (): boolean => {
    const isNameValid = validateNameField();
    const isEmailValid = validateEmailField();
    const isPasswordValid = validatePasswordField();
    return isNameValid && isEmailValid && isPasswordValid;
};

// Enhanced computed property for button disabled state
const isSubmitDisabled = computed(() => {
    // Always disabled if loading
    if (loading.value) return true;
    
    // Check if any field is empty
    const hasEmptyFields = !name.value.trim() || !email.value.trim() || !password.value;
    if (hasEmptyFields) return true;
    
    // Check if any field has validation errors
    const hasValidationErrors = !!nameError.value || !!emailError.value || !!passwordError.value;
    if (hasValidationErrors) return true;
    
    return false;
});

// Combined error message (prioritize field errors over API errors)
const error = computed(() => {
    if (nameError.value) return nameError.value;
    if (emailError.value) return emailError.value;
    if (passwordError.value) return passwordError.value;
    return authApiError.value;
});

// Enhanced form submission
const handleRegister = async () => {
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
            console.warn('Registro já em andamento');
            return;
        }
        
        // Attempt registration
        await registerWithEmail(email.value.trim(), password.value, name.value.trim());
        
        // Handle successful registration
        if (user.value) {
            console.log('Registro realizado com sucesso:', { 
                userId: user.value.id, 
                email: user.value.email,
                name: user.value.name
            });
            
            // Redirect after successful registration
            await nextTick();
            await router.push('/dashboard');
        }
        
    } catch (registerError) {
        console.error('Erro durante o processo de registro:', registerError);
        
        // Handle specific error cases
        if (registerError instanceof Error) {
            // Network or other technical errors
            if (registerError.message.includes('network') || registerError.message.includes('fetch')) {
                // This will be handled by the auth composable
            }
        }
    }
};

// Enhanced watchers with immediate validation
let nameValidationTimer: NodeJS.Timeout | null = null;
let emailValidationTimer: NodeJS.Timeout | null = null;
let passwordValidationTimer: NodeJS.Timeout | null = null;

watch(name, (newName) => {
    // Clear API errors when user starts typing
    if (authApiError.value) {
        authApiError.value = null;
    }
    
    // Clear existing timer
    if (nameValidationTimer) {
        clearTimeout(nameValidationTimer);
    }
    
    // Immediate validation if form was submitted or field has error
    if (isFormSubmitted.value || nameError.value) {
        nameValidationTimer = setTimeout(() => {
            validateNameField();
        }, 300);
    }
});

watch(email, (newEmail) => {
    // Clear API errors when user starts typing
    if (authApiError.value) {
        authApiError.value = null;
    }
    
    // Clear existing timer
    if (emailValidationTimer) {
        clearTimeout(emailValidationTimer);
    }
    
    // Immediate validation if form was submitted or field has error
    if (isFormSubmitted.value || emailError.value) {
        emailValidationTimer = setTimeout(() => {
            validateEmailField();
        }, 300);
    }
});

watch(password, (newPassword) => {
    // Clear API errors when user starts typing
    if (authApiError.value) {
        authApiError.value = null;
    }
    
    // Clear existing timer
    if (passwordValidationTimer) {
        clearTimeout(passwordValidationTimer);
    }
    
    // Immediate validation if form was submitted or field has error
    if (isFormSubmitted.value || passwordError.value) {
        passwordValidationTimer = setTimeout(() => {
            validatePasswordField();
        }, 300);
    }
});

// Cleanup timers on unmount
onUnmounted(() => {
    if (nameValidationTimer) {
        clearTimeout(nameValidationTimer);
    }
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
        // Reset form state after successful registration
        isFormSubmitted.value = false;
        submitAttempts.value = 0;
    }
});

// Expose methods for testing or parent component access
defineExpose({
    validateForm,
    handleRegister,
    resetForm: () => {
        name.value = '';
        email.value = '';
        password.value = '';
        nameError.value = null;
        emailError.value = null;
        passwordError.value = null;
        isFormSubmitted.value = false;
        submitAttempts.value = 0;
        authApiError.value = null;
    }
});
</script>