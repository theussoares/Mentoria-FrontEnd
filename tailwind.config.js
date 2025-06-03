export default {
    darkMode: ["class"],
    content: [
      "./components/**/*.{vue,js,ts}", // Componentes Vue
      "./layouts/**/*.vue", // Layouts
      "./pages/**/*.vue", // Páginas do Nuxt
      "./composables/**/*.{js,ts}", // Composables
      "./features/**/*.{vue,js,ts}",
      "./app.vue", // Arquivo principal do Nuxt
    ],
    theme: {
      extend: {
        // Suas extensões de tema vão aqui
        // colors, spacing, etc.
      }
    },
    corePlugins: {
      preflight: true, // Ativa o reset de CSS do Tailwind
    },
  };