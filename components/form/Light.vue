<template>
  <div>
    <div class="flex">
      <svg-icon name="lightbulb" class="w-24 h-24 mx-auto" />
    </div>
    <div class="flex flex-col w-full py-3">
      <label class="text-sm text-gray-600 font-semibold mb-1">Jas</label>
      <slider height="0.75rem" dot-size="24" class="col-span-2" :contained="true" />
    </div>
    <div class="flex flex-col w-full py-3">
      <label class="text-sm text-gray-600 font-semibold mb-1">Teplota</label>
      <slider height="0.75rem" dot-size="24" class="col-span-2" :contained="true" />
    </div>
    <div class="flex flex-col w-full py-3">
      <label class="text-sm text-gray-600 font-semibold mb-1">Režim</label>
      <RadioButtons
        class="mt-2"
        :options="{ c: 'Ráno', a: 'Den', b: 'Noc' }"
        value="a"
      />
    </div>
  </div>
</template>
