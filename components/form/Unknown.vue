<template>
  <div class="flex flex-col items-center justify-center content-center my-auto">
    <fa :icon="!device.available ? 'slash' : 'question'" class="text-4xl text-gray-400 my-3" />
    <span class="text-gray-400 text-sm font-semibold mt-1">
      <template v-if="!device.available">Zařízení není dostupné</template>
      <template v-else>Neznámé zařízení</template>
    </span>
  </div>
</template>

<script>
export default {
  props: {
    device: Object
  }
}
</script>
