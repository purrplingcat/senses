<template>
  <div class="container mx-auto px-6">
    <div role="heading" class="py-6 flex flex-row flex-nowrap">
      <div class="text-2xl">
        <nuxt-link to="." class="text-gray-400">
          <fa icon="arrow-left" />
        </nuxt-link>
      </div>
      <div class="text-center w-full">
        <h2 class="text-lg font-extrabold tracking-wide capitalize">
          Ložnice <span class="text-gray-300">/</span> Osvětlení
        </h2>
      </div>
    </div>
    <content class="mt-2 mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
      <section class="block shadow rounded-sm bg-white p-3">
        <div class="flex flex-row justify-between items-baseline mb-2 border-b border-gray-300">
          <h3 class="font-bold text-gray-700 leading-relaxed mt-2 mb-4">
            Hlavní osvětlení
          </h3>
          <Toggle />
        </div>
        <form>
          <div class="grid grid-cols-2 gap-1 items-center py-2">
            <label class="text-sm text-gray-600 font-semibold">Jas</label>
            <Range />
          </div>
          <div class="grid grid-cols-2 gap-1 items-center py-2">
            <label class="text-sm text-gray-600 font-semibold">Teplota</label>
            <Range />
          </div>
          <div class="grid grid-cols-2 gap-1 items-center py-2">
            <label class="text-sm text-gray-600 font-semibold">Režim</label>
            <RadioButtons :options="{c: 'Ráno', a: 'Den', b: 'Noc'}" value="a" />
          </div>
        </form>
      </section>
      <section class="block shadow rounded-sm bg-white p-3">
        <div class="flex flex-row justify-between items-baseline mb-2 border-b border-gray-300">
          <h3 class="font-bold text-gray-700 leading-relaxed mt-2 mb-4">
            Postel - Ellenka
          </h3>
          <Toggle />
        </div>
        <form>
          <div class="grid grid-cols-2 gap-1 items-center py-2">
            <label class="text-sm text-gray-600 font-semibold">Jas</label>
            <Range />
          </div>
          <div class="grid grid-cols-2 gap-1 items-center py-2">
            <label class="text-sm text-gray-600 font-semibold">Červená</label>
            <Range color="red" />
          </div>
          <div class="grid grid-cols-2 gap-1 items-center py-2">
            <label class="text-sm text-gray-600 font-semibold">Zelená</label>
            <Range color="green" />
          </div>
          <div class="grid grid-cols-2 gap-1 items-center py-2">
            <label class="text-sm text-gray-600 font-semibold">Modrá</label>
            <Range color="blue" />
          </div>
          <div class="grid grid-cols-2 gap-1 items-center py-2">
            <label class="text-sm text-gray-600 font-semibold">Režim</label>
            <RadioButtons :options="{c: 'RGB', a: 'Čtení', d: 'Den', b: 'Noc', i: 'Intimní', lgbt: 'Duha'}" value="a" />
          </div>
        </form>
      </section>
      <section class="block shadow rounded-sm bg-white p-3">
        <div class="flex flex-row justify-between items-baseline mb-2 border-b border-gray-300">
          <h3 class="font-bold text-gray-700 leading-relaxed mt-2 mb-4">
            Postel - Ashleynka
          </h3>
          <Toggle />
        </div>
        <form>
          <div class="grid grid-cols-2 gap-1 items-center py-2">
            <label class="text-sm text-gray-600 font-semibold">Jas</label>
            <Range />
          </div>
          <div class="grid grid-cols-2 gap-1 items-center py-2">
            <label class="text-sm text-gray-600 font-semibold">Červená</label>
            <Range color="red" />
          </div>
          <div class="grid grid-cols-2 gap-1 items-center py-2">
            <label class="text-sm text-gray-600 font-semibold">Zelená</label>
            <Range color="green" />
          </div>
          <div class="grid grid-cols-2 gap-1 items-center py-2">
            <label class="text-sm text-gray-600 font-semibold">Modrá</label>
            <Range color="blue" />
          </div>
          <div class="grid grid-cols-2 gap-1 items-center py-2">
            <label class="text-sm text-gray-600 font-semibold">Režim</label>
            <RadioButtons :options="{c: 'RGB', a: 'Čtení', d: 'Den', b: 'Noc', i: 'Intimní', lgbt: 'Duha'}" value="a" />
          </div>
        </form>
      </section>
    </content>
  </div>
</template>
