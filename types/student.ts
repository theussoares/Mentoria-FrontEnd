// types/student.ts
export interface StudentPreferences {
    notifications: boolean;
    emailUpdates: boolean;
    theme: 'light' | 'dark';
    language: 'pt' | 'en';
}

export interface StudentStats {
    totalChallengesCompleted: number;
    totalHelpGiven: number;
    currentStreak: number;
    longestStreak: number;
}

export interface Student {
    id: string;
    name: string;
    email: string;
    avatar: string;
    phoneNumber?: string;

    // Dados de autenticação
    authProvider: 'email' | 'google' | 'github';
    githubUsername?: string;
    googleId?: string;

    // Gamificação
    points: number;
    level: string; // Poderia ser um ID referenciando types/level.ts
    currentLevelPoints: number;
    nextLevelPoints: number;

    // Datas importantes
    joinDate: Date;
    lastLogin: Date;
    lastPointsUpdate: Date;

    // Status
    isActive: boolean;
    mentorId: string; // Poderia ser o ID de outro Student

    // Badges conquistados (array de IDs de badges)
    badges: string[];

    // Estatísticas
    stats: StudentStats;

    // Configurações
    preferences: StudentPreferences;
}