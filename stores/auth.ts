import { defineStore } from 'pinia'
import { ref } from 'vue'

interface User {
    id: number
    name: string
    email: string
}

export const useAuthStore = defineStore('auth', () => {
    const user = ref<User | null>(null)

    const setUser = (userData: User) => {
        user.value = userData
    }

    const getUser = computed(() => user.value)

    return {
        user,
        setUser,
        getUser
    }
})