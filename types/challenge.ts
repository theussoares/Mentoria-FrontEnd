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
    startDate: Date;
    endDate: Date;
    isActive: boolean;
    requirements?: string[]; // Lista de pré-requisitos ou passos
    createdBy: string; // ID do Student (mentor/admin) que criou
}