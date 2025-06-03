// middleware/auth.ts
export default defineNuxtRouteMiddleware((to) => {
    const storeDeUser = useAuthStore() // Supondo que você tenha um store de autenticação
    const user = computed(() => storeDeUser.getUser) // Obtendo o usuário do store

    if (!user.value) { // Se não há usuário logado
        // Evitar loop de redirecionamento se já estiver na página de login
        if (to.path !== '/login') { // Ou qualquer que seja sua rota de login
            return navigateTo('/login')
        }
    } else {
        // Usuário está logado
        // Verificar se usuário completou onboarding
        // Supondo que 'user.value' tenha uma propriedade como 'mentorId' ou 'onboardingCompleto'
        // A interface AuthUser em useAuth.ts precisa refletir isso.
        // Atualmente, AuthUser é: { id, name, email, avatar, provider, isNewUser }
        // Precisamos adicionar `mentorId` ou um campo similar se ele vier do objeto de autenticação,
        // ou buscar essa informação do seu banco de dados (Firestore) após o login.

        // Exemplo: se a informação de onboarding estiver no objeto user do useAuth:
        // const typedUser = user.value as { mentorId?: string | null; /* ...outras props */ };
        // if (!typedUser.mentorId && to.path !== '/onboarding') {
        //     return navigateTo('/onboarding')
        // }

        // Se o usuário está logado e tenta acessar /auth/login ou /auth/register, redirecionar para o dashboard
        if (to.path === '/login' || to.path === '/register') {
            if(user.value.id === 1) return navigateTo('/'); // Ou para a página principal do dashboard
            if(user.value.id === 2) return navigateTo('/mentor/dashboard'); // Exemplo para mentor
        }
    }
})