// composables/useAuth.ts
export interface AuthUser {
    id: string
    name: string
    email: string
    avatar: string
    provider: 'email' | 'google' | 'github'
    isNewUser: boolean
  }
  
  export const useAuth = () => {
    const user = ref<AuthUser | null>(null)
    const loading = ref(false)
    const error = ref<string | null>(null)
  
    // Login com Email/Senha
    const loginWithEmail = async (email: string, password: string) => { }
    
    // Registro com Email/Senha
    const registerWithEmail = async (email: string, password: string, name: string) => { }
    
    // Login com Google
    const loginWithGoogle = async () => { }
    
    // Login com GitHub
    const loginWithGithub = async () => { }
    
    // Logout
    const logout = async () => { }
    
    // Reset de senha
    const resetPassword = async (email: string) => { }
  
    return {
      user,
      loading,
      error,
      loginWithEmail,
      registerWithEmail,
      loginWithGoogle,
      loginWithGithub,
      logout,
      resetPassword
    }
  }