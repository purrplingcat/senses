<template>
  <div class="fixed z-40 left-0 top-0 w-full h-screen flex flex-col bg-gray-900 bg-opacity-80">
    <div class="absolute z-0 top-0 left-0 w-full h-screen" @click="$emit('dismiss')"></div>
    <content class="flex z-10 flex-col mt-auto shadow h-3/4 overflow-y-hidden rounded-t-2xl bg-white mx-0 lg:mx-auto lg:w-3/4 xl:w-1/2">
      <div
        class="flex flex-row justify-between mt-3 px-3 items-baseline border-b border-gray-300"
      >
        <h3 class="font-bold text-gray-700 leading-relaxed mt-2 mb-4">
          Hlavní osvětlení
        </h3>
        <Toggle />
      </div>
      <form class="px-6 py-3 overflow-y-auto mb-auto">
        <div class="grid grid-cols-3 gap-1 items-center py-3">
          <label class="text-sm text-gray-600 font-semibold">Jas</label>
          <Range class="col-span-2" />
        </div>
        <div class="grid grid-cols-3 gap-1 items-center py-3">
          <label class="text-sm text-gray-600 font-semibold">Teplota</label>
          <Range class="col-span-2" />
        </div>
        <div class="grid grid-cols-3 gap-1 items-center py-3">
          <label class="text-sm text-gray-600 font-semibold">Režim</label>
          <RadioButtons
            class="col-span-2"
            :options="{ c: 'Ráno', a: 'Den', b: 'Noc' }"
            value="a"
          />
        </div>
      </form>
      <div class="mt-auto">
        <button
          class="bg-purple-700 w-full px-6 py-4 text-white text-lg shadow-lg hover:bg-purple-900"
          @click="$emit('dismiss')"
        >
          OK
        </button>
      </div>
    </content>
  </div>
</template>
