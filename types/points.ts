// types/points.ts
export type PointsType = 'challenge' | 'exercise' | 'help' | 'bonus' | 'manual';

export interface PointsHistory {
    id: string;
    studentId: string;
    points: number;
    reason: string; // Descrição do motivo (ex: "Completou desafio X", "Bônus por participação")
    type: PointsType;
    challengeId?: string; // Se os pontos foram ganhos por um desafio específico
    addedBy: string; // ID de quem adicionou (admin, mentor, sistema)
    timestamp: Date;
    details?: any; // Detalhes adicionais, se necessário
}