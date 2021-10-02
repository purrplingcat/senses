<template>
  <div class="fixed z-40 left-0 top-0 w-full h-full flex flex-col bg-gray-900 bg-opacity-80">
    <div class="absolute z-0 top-0 left-0 w-full h-screen" @click="$emit('dismiss')" />
    <section class="flex z-10 flex-col mt-auto shadow h-5/6 md:h-3/4 overflow-y-hidden rounded-t-2xl bg-white mx-0 lg:mx-auto lg:w-3/4 xl:w-1/2 landscape-full">
      <div
        class="flex flex-row justify-between mt-3 px-3 items-baseline border-b border-gray-300"
      >
        <h3 class="font-bold text-gray-700 leading-relaxed mt-2 mb-4">
          <slot name="title" />
        </h3>
        <slot name="header" />
      </div>
      <div class="flex flex-col h-5/6 overflow-y-auto mb-auto">
        <slot />
      </div>
      <div>
        <button
          class="bg-gradient-to-r from-purple-700 via-purple-800 to-indigo-800 w-full px-6 py-4 text-white text-lg shadow-lg hover:from-purple-800 hover:to-indigo-900"
          @click="$emit('dismiss')"
        >
          OK
        </button>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
    toggle: Boolean
  }
}
</script>

<style>
.landscape-full {
  @media screen and (max-height: 480px) {
    height: 100% !important;
  }
}
</style>
