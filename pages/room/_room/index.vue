<template>
  <div class="container mx-auto px-6">
    <div role="heading" class="py-6 flex flex-row flex-nowrap">
      <div class="text-2xl">
        <nuxt-link to="/" class="text-gray-400">
          <fa icon="arrow-left" />
        </nuxt-link>
      </div>
      <div class="text-center w-full">
        <div class="inline-block bg-gray-300 rounded-full p-3">
          <img src="~/assets/images/double-bed.png" class="w-8 h-8">
        </div>
        <h2 class="mt-2 text-lg font-extrabold tracking-wide capitalize">
          Ložnice
        </h2>
      </div>
    </div>
    <content>
      <section class="mt-2 mb-8">
        <div class="bg-purple-900 text-white p-6 rounded-sm shadow-xl">
          <div class="flex flex-row flex-nowrap">
            <div class="text-4xl mr-4">
              <fa icon="thermometer-half" />
            </div>
            <span class="text-4xl">20 °C</span>
          </div>
          <div class="flex flex-row mt-3 font-thin text-xs leading-relaxed tracking-wide">
            <span class="mr-4">Osv. Vypnuto</span>
            <span class="mr-4">Vytápění Vypnuto</span>
            <span class="mr-4">Požadovaná teplota 22 °C</span>
          </div>
        </div>
      </section>
      <section class="mb-6">
        <div
          class="grid grid-flow-row grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2"
        >
          <nuxt-link to="light" append class="block shadow rounded-sm bg-white p-3">
            <div class="text-center leading-relaxed">
              <img src="~/assets/images/lightbulb.png" class="mx-auto mb-2">
              <span class="block font-bold text-gray-700">Osvětlení</span>
              <span class="block text-xs text-gray-500">1 svítidlo</span>
            </div>
          </nuxt-link>
          <nuxt-link to="heater" append class="block shadow rounded-sm bg-white p-3">
            <div class="text-center leading-relaxed">
              <img src="~/assets/images/heater.png" class="mx-auto mb-2">
              <span class="block font-bold text-gray-700">Vytápění</span>
              <span class="block text-xs text-gray-500">Denní režim</span>
            </div>
          </nuxt-link>
          <nuxt-link to="sensor" append class="block shadow rounded-sm bg-white p-3">
            <div class="text-center leading-relaxed">
              <img
                src="~/assets/images/motion-sensor.png"
                class="mx-auto mb-2"
              >
              <span class="block font-bold text-gray-700">Senzory</span>
              <span class="block text-xs text-gray-500">6 senzorů</span>
            </div>
          </nuxt-link>
        </div>
      </section>
    </content>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({})
</script>
