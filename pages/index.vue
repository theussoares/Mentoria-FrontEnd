<template>
  <div
    class="min-h-screen bg-gradient-to-br from-purple-600 via-indigo-600 to-blue-600 text-gray-800 font-sans p-5"
    role="main"
  >
    <div class="container mx-auto">
      <header class="text-center text-white mb-8 py-6">
        <h1 class="text-4xl font-bold mb-2 text-shadow">
          🚀 Mentoria Frontend
        </h1>
        <p class="text-lg opacity-90 text-shadow-sm">
          HTML, CSS & JavaScript
        </p>
      </header>

      <main>
        <section
          class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8"
          aria-label="Perfil e estatísticas do estudante"
        >
          <StudentProfileCard
            :student="currentUserProfileData"
            @add-points="addPointsToCurrentUserForExercise"
            class="lg:col-span-1"
          />

          <section aria-labelledby="achievements-title">
            <UiCard class="lg:col-span-1">
              <template #header>
                <h2
                  id="achievements-title"
                  class="text-xl font-semibold text-gray-700 text-center mb-4"
                >
                  🏆 Conquistas
                </h2>
              </template>
              <div
                class="grid grid-cols-3 sm:grid-cols-4 gap-3"
                role="list"
                aria-label="Lista de conquistas disponíveis"
              >
                <BadgeItem
                  v-for="badge in studentBadgesDisplay"
                  :key="badge.id"
                  :badge="badge"
                  @show-info="showBadgeInfo"
                  role="listitem"
                />
              </div>
            </UiCard>
          </section>

          <section aria-labelledby="ranking-title">
            <UiCard class="lg:col-span-1">
              <template #header>
                <h2
                  id="ranking-title"
                  class="text-xl font-semibold text-gray-700 text-center mb-4"
                >
                  🎯 Ranking
                </h2>
              </template>
              <div
                class="space-y-2 max-h-96 overflow-y-auto leaderboard"
                role="list"
                aria-label="Ranking de estudantes por pontuação"
                tabindex="0"
              >
                <LeaderboardItem
                  v-for="(student, index) in rankedStudents"
                  :key="student.id"
                  :student="student"
                  :rank="index + 1"
                  role="listitem"
                />
                <p
                  v-if="!rankedStudents.length"
                  class="text-center text-gray-500"
                  role="status"
                  aria-live="polite"
                >
                  Ninguém no ranking ainda.
                </p>
              </div>
            </UiCard>
          </section>
        </section>

        <section class="mt-10" aria-labelledby="challenges-title">
          <h2
            id="challenges-title"
            class="text-3xl font-semibold text-white mb-6 text-center text-shadow"
          >
            Desafios Ativos
          </h2>
          <div
            class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            role="list"
            aria-label="Lista de desafios disponíveis"
          >
            <ChallengeCardDisplay
              v-for="challenge in activeChallenges"
              :key="challenge.id"
              :challenge="challenge"
              :student-status="getStudentChallengeStatus(challenge.id)"
              @submit-challenge="handleSubmitChallenge"
              role="listitem"
            />
          </div>
          <p
            v-if="!activeChallenges.length"
            class="text-center text-white mt-4"
            role="status"
            aria-live="polite"
          >
            Nenhum desafio disponível no momento.
          </p>
        </section>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from "vue";
import {
  LEVELS as levelConstants,
  BADGES as badgeConstants,
} from "~/utils/constants";
import type {
  Challenge,
  StudentChallengeStatus,
  StudentChallengeAttempt,
} from "~/types/challenge"; // Importando os novos tipos

// Import dos componentes
import UiCard from "~/components/ui/UiCard.vue";
import StudentProfileCard from "~/components/student/StudentProfileCard.vue";
import BadgeItem from "~/components/gamification/BadgeItem.vue";
import LeaderboardItem from "~/components/gamification/LeaderboardItem.vue";
import ChallengeCardDisplay from "~/components/challenges/ChallengeCardDisplay.vue";

// ... (Interfaces Student, Badge, LevelInfo como antes) ...
interface Student {
  id: string;
  name: string;
  points: number;
  levelId: string;
  avatarInitial: string;
  avatarUrl?: string;
  avatarColor?: string;
  badges: string[];
  levelName?: string;
  challengeAttempts?: StudentChallengeAttempt[]; // Novo: para mockar o progresso do aluno
}
interface BadgeDisplay {
  // Renomeado para evitar conflito com `Badge` de `types/badge.ts` se importado diretamente
  id: string;
  icon: string;
  name: string;
  earned: boolean;
  description?: string;
}

interface LevelInfo {
  id: string;
  name: string;
  points: number;
  color: string;
}

// Dados mockados
const studentsData = ref<Student[]>([
  {
    id: "s1",
    name: "João Silva",
    points: 250,
    levelId: "html-construtor",
    avatarInitial: "JS",
    avatarColor: "#ff6b6b",
    badges: ["first-site", "stylist", "debugger"],
    challengeAttempts: [
      { challengeId: "c1", studentId: "s1", status: "disponivel" },
    ],
  },
  {
    id: "s2",
    name: "Maria Santos",
    points: 320,
    levelId: "css-estilista",
    avatarInitial: "MS",
    avatarColor: "#feca57",
    badges: ["first-site", "communicative", "punctual"],
    challengeAttempts: [
      {
        challengeId: "c1",
        studentId: "s2",
        status: "submetido_para_aprovacao",
      },
      { challengeId: "c2", studentId: "s2", status: "aprovado" },
    ],
  },
  {
    id: "s3",
    name: "Pedro Costa",
    points: 180,
    levelId: "html-iniciante",
    avatarInitial: "PC",
    avatarColor: "#48dbfb",
    badges: ["first-site"],
    challengeAttempts: [],
  },
]);

const currentUser = ref<Student | null>(null);
const allSystemBadges = computed<BadgeDisplay[]>(() => {
  /* ... (como antes) ... */
  const badgesArray: BadgeDisplay[] = [];
  for (const key in badgeConstants) {
    const badgeData = badgeConstants[key as keyof typeof badgeConstants];
    badgesArray.push({
      id: key.toLowerCase().replace(/_/g, "-"),
      icon: badgeData.icon,
      name: badgeData.name,
      earned: false,
      description: `Condição: ${badgeData.condition || "Ganhe pontos!"}`,
    });
  }
  return badgesArray;
});
const studentBadgesDisplay = computed<BadgeDisplay[]>(() => {
  /* ... (como antes) ... */
  if (!currentUser.value) return [];
  return allSystemBadges.value.map((sysBadge) => ({
    ...sysBadge,
    earned: currentUser.value?.badges.includes(sysBadge.id) || false,
  }));
});
const structuredLevels = computed<LevelInfo[]>(() => {
  /* ... (como antes) ... */
  const allLevels: LevelInfo[] = [];
  let idCounter = 0;
  Object.keys(levelConstants).forEach((categoryKey) => {
    const categoryLevels =
      levelConstants[categoryKey as keyof typeof levelConstants];
    categoryLevels.forEach((level) => {
      allLevels.push({
        id: `${categoryKey.toLowerCase()}-${level.name
          .toLowerCase()
          .replace(/\s+/g, "-")}-${idCounter++}`,
        name: level.name,
        points: level.points,
        color: level.color,
      });
    });
  });
  return allLevels.sort((a, b) => a.points - b.points);
});
const currentUserProfileData = computed(() => {
  /* ... (como antes, verifique se usa currentUser.value.levelId) ... */
  if (!currentUser.value) return null;
  const userPoints = currentUser.value.points;
  let currentLvl: LevelInfo | null = null;
  let nextLvl: LevelInfo | null = null;

  for (let i = 0; i < structuredLevels.value.length; i++) {
    const level = structuredLevels.value[i];
    if (userPoints >= level.points) {
      currentLvl = level;
    } else {
      nextLvl = level;
      break;
    }
  }
  if (
    !currentLvl &&
    structuredLevels.value.length > 0 &&
    userPoints < structuredLevels.value[0].points
  ) {
    currentLvl = {
      id: "initial",
      name: "Iniciante",
      points: 0,
      color: "#cccccc",
    };
    nextLvl = structuredLevels.value[0];
  } else if (!currentLvl && structuredLevels.value.length > 0) {
    currentLvl = structuredLevels.value[0];
  }

  return {
    ...currentUser.value,
    level: currentLvl
      ? { name: currentLvl.name, color: currentLvl.color }
      : undefined,
    nextLevelTargetPoints: nextLvl
      ? nextLvl.points
      : currentLvl
      ? currentLvl.points
      : 0,
    nextLevelName: nextLvl
      ? nextLvl.name
      : currentLvl
      ? "Nível Máximo"
      : "Próximo Nível",
  };
});
const rankedStudents = computed(() => {
  /* ... (como antes, verifique se usa student.levelId para buscar o nome) ... */
  return [...studentsData.value]
    .sort((a, b) => b.points - a.points)
    .map((student) => {
      let levelName = "Iniciante"; // Default
      // Encontra o nível mais alto alcançado pelo aluno
      const achievedLevels = structuredLevels.value.filter(
        (l) => student.points >= l.points
      );
      if (achievedLevels.length > 0) {
        levelName = achievedLevels[achievedLevels.length - 1].name;
      }
      return { ...student, levelName };
    });
});

const activeChallenges = ref<Challenge[]>([
  {
    id: "c1",
    title: "🐛 Sexta-feira do Bug",
    description: "Encontre e corrija os 3 erros neste código HTML...",
    pointsReward: 30,
    type: "daily",
    category: "html",
    difficulty: "easy",
    isActive: true,
    createdBy: "system",
  },
  {
    id: "c2",
    title: "🎨 Segunda Criativa",
    description:
      "Recrie o layout do site da Netflix usando apenas HTML e CSS...",
    pointsReward: 50,
    type: "weekly",
    category: "css",
    difficulty: "medium",
    isActive: true,
    createdBy: "system",
  },
  {
    id: "c3",
    title: "⚡ Quarta dos Recursos",
    description:
      "Aprenda e use uma nova propriedade CSS que nunca usou antes...",
    pointsReward: 25,
    type: "daily",
    category: "css",
    difficulty: "easy",
    isActive: true,
    createdBy: "system",
  },
]);

onMounted(() => {
  if (studentsData.value.length > 0) {
    currentUser.value = studentsData.value[0];
  }
});

// Renomeado para clareza
function addPointsToCurrentUserForExercise(points: number) {
  if (!currentUser.value) return;
  currentUser.value.points += points;
  // ... (lógica de badges e níveis como antes)
}

const getStudentChallengeStatus = (
  challengeId: string
): StudentChallengeStatus | undefined => {
  return (
    currentUser.value?.challengeAttempts?.find(
      (attempt) => attempt.challengeId === challengeId
    )?.status || "disponivel"
  );
};

const handleSubmitChallenge = (challengeId: string) => {
  if (!currentUser.value) return;
  console.log(
    `Aluno ${currentUser.value.name} enviou o desafio ${challengeId} para aprovação.`
  );

  let attempt = currentUser.value.challengeAttempts?.find(
    (a) => a.challengeId === challengeId
  );
  if (attempt) {
    attempt.status = "submetido_para_aprovacao";
    attempt.submittedAt = new Date();
  } else {
    if (!currentUser.value.challengeAttempts) {
      currentUser.value.challengeAttempts = [];
    }
    currentUser.value.challengeAttempts.push({
      challengeId,
      studentId: currentUser.value.id,
      status: "submetido_para_aprovacao",
      submittedAt: new Date(),
    });
  }
  // Em uma app real, isso seria uma chamada para o backend/composable
  // para salvar essa tentativa e seu status.
  // Forçando re-renderização se necessário (Vue 3 geralmente lida bem com refs aninhados)
  currentUser.value = { ...currentUser.value };
};

function showBadgeInfo(badge: BadgeDisplay) {
  /* ... (como antes) ... */
  const status = badge.earned ? "Conquistado!" : "Bloqueado";
  alert(
    `${badge.icon} ${badge.name}\nStatus: ${status}\n${badge.description || ""}`
  );
}
// ... (outras funções como showBadgeUnlocked, etc., podem precisar de ajustes se a lógica de badges mudar)
</script>

<style>
/* ... (estilos como antes) ... */
.text-shadow {
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}
.text-shadow-sm {
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
}
.leaderboard::-webkit-scrollbar {
  width: 8px;
}
.leaderboard::-webkit-scrollbar-thumb {
  background-color: #a0aec0; /* gray-500 */
  border-radius: 4px;
}
.leaderboard::-webkit-scrollbar-track {
  background-color: #edf2f7; /* gray-200 */
}
</style>
