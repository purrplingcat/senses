<template>
  <content>
    <section class="mb-6">
      <div
        class="
          grid grid-flow-row grid-cols-2
          md:grid-cols-4
          lg:grid-cols-6
          gap-2
        "
      >
        <Device
          v-for="device in devices"
          :key="device.uid"
          :title="device.title"
          :description="device.description"
          :icon="iconByType(device.type, device.class)"
          :activated="device.turn === 'on'"
          :disabled="!device.available"
          @click="alert"
          @clickMore="showForm(device.uid)"
        />
      </div>
    </section>
    <div
      v-if="!deviceCount && $apollo.queries.devices.loading"
      class="flex flex-row"
    >
      <svg
        class="animate-spin mx-auto h-8 w-8 text-purple-400"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          class="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          stroke-width="4"
        ></circle>
        <path
          class="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
      </svg>
    </div>
    <div
      v-else-if="!deviceCount"
      class="flex flex-col items-center justify-center content-center my-auto"
    >
      <fa icon="slash" class="text-4xl text-gray-400 my-3" />
      <span class="text-gray-400 text-sm font-semibold mt-1">
        Žádná zařízení nejsou dostupná.
      </span>
    </div>
  </content>
</template>

<script>
export default {
  props: {
    devices: Array
  }
}
</script>
