// types/challenge.ts
export type ChallengeType = 'weekly' | 'daily' | 'special';
export type TechnologyCategory = 'html' | 'css' | 'javascript' | 'general';
export type Difficulty = 'easy' | 'medium' | 'hard';

export interface Challenge {
    id: string;
    title: string;
    description: string;
    type: ChallengeType;
    category: TechnologyCategory;
    pointsReward: number;
    difficulty: Difficulty;
    startDate?: Date; // Pode ser opcional
    endDate?: Date;   // Pode ser opcional
    isActive: boolean;
    requirements?: string[];
    createdBy: string;
}

// NOVO: Status do progresso do aluno em um desafio
export type StudentChallengeStatus =
    | 'disponivel'
    | 'aceito' // Aluno visualizou e marcou que vai fazer (opcional)
    | 'submetido_para_aprovacao'
    | 'aprovado' // Mentor confirmou
    | 'rejeitado'; // Mentor pediu ajustes

// NOVO: Interface para rastrear o progresso/tentativa do aluno
export interface StudentChallengeAttempt {
    studentId: string;
    challengeId: string;
    status: StudentChallengeStatus;
    submissionDetails?: { // Detalhes que o aluno pode enviar
        link?: string;
        notes?: string;
        filePath?: string; // Se houver upload de arquivo
    };
    feedbackMentor?: string; // Feedback do mentor em caso de rejeição/aprovação
    submittedAt?: Date;
    confirmedAt?: Date; // Data da aprovação pelo mentor
    attemptCount?: number;
}