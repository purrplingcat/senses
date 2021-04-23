<template>
  <div class="flex flex-col min-h-screen">
    <main class="mb-auto">
      <Nuxt />
    </main>
    <footer class="mt-auto sticky bottom-0">
      <Navbar />
    </footer>
  </div>
</template>

<style>
html {
  @apply w-full overflow-x-hidden;
}

body {
  @apply bg-gray-100;
}

html.dark body {
  @apply bg-gray-800;
}

.custom-select {
  cursor: pointer;
  -moz-appearance: none;
  -webkit-appearance: none;
  appearance: none;
  background: url("data:image/svg+xml;utf8,<svg viewBox='0 0 140 140' width='24' height='24' xmlns='http://www.w3.org/2000/svg'><g><path d='m121.3,34.6c-1.6-1.6-4.2-1.6-5.8,0l-51,51.1-51.1-51.1c-1.6-1.6-4.2-1.6-5.8,0-1.6,1.6-1.6,4.2 0,5.8l53.9,53.9c0.8,0.8 1.8,1.2 2.9,1.2 1,0 2.1-0.4 2.9-1.2l53.9-53.9c1.7-1.6 1.7-4.2 0.1-5.8z' fill='%23A8A29E'/></g></svg>") no-repeat;
  background-position: right 0.5rem top 50%;
}
</style>
