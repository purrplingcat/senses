<template>
  <div>
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
  </div>
</template>
