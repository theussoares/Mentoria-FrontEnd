// types/student.ts - ATUALIZADO
export interface Student {
    id: string
    name: string
    email: string
    avatar: string
    phoneNumber?: string

    // Dados de autenticação
    authProvider: 'email' | 'google' | 'github'
    githubUsername?: string
    googleId?: string

    // Gamificação
    points: number
    level: string
    currentLevelPoints: number
    nextLevelPoints: number

    // Datas importantes
    joinDate: Date
    lastLogin: Date
    lastPointsUpdate: Date

    // Status
    isActive: boolean
    mentorId: string

    // Badges conquistados
    badges: string[]

    // Estatísticas
    stats: StudentStats

    // Configurações
    preferences: StudentPreferences
}

export interface StudentPreferences {
    notifications: boolean
    emailUpdates: boolean
    theme: 'light' | 'dark'
    language: 'pt' | 'en'
  }

export interface StudentStats {
    totalChallengesCompleted: number
    totalHelpGiven: number
    currentStreak: number
    longestStreak: number
}

// types/badge.ts
export interface Badge {
    id: string
    name: string
    description: string
    icon: string
    category: BadgeCategory
    pointsRequired?: number
    condition: string
    isActive: boolean
    createdAt: Date
}

export type BadgeCategory = 'technical' | 'social' | 'achievement'

// types/challenge.ts
export interface Challenge {
    id: string
    title: string
    description: string
    type: ChallengeType
    category: TechnologyCategory
    pointsReward: number
    difficulty: Difficulty
    startDate: Date
    endDate: Date
    isActive: boolean
    requirements?: string[]
    createdBy: string
}

export type ChallengeType = 'weekly' | 'daily' | 'special'
export type TechnologyCategory = 'html' | 'css' | 'javascript' | 'general'
export type Difficulty = 'easy' | 'medium' | 'hard'

// types/level.ts
export interface Level {
    id: string
    name: string
    technology: TechnologyCategory
    pointsRequired: number
    order: number
    color: string
    description: string
}

// types/pointsHistory.ts
export interface PointsHistory {
    id: string
    studentId: string
    points: number
    reason: string
    type: PointsType
    challengeId?: string
    addedBy: string
    timestamp: Date
    details?: any
}

export type PointsType = 'challenge' | 'exercise' | 'help' | 'bonus' | 'manual'