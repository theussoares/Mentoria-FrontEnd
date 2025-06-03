// middleware/auth.ts
export default defineNuxtRouteMiddleware((to) => {
    const { user } = useAuth()

    if (!user.value) {
        return navigateTo('/auth/login')
    }

    // Verificar se usuário completou onboarding
    if (!user.value.mentorId && to.path !== '/onboarding') {
        return navigateTo('/onboarding')
    }
  })