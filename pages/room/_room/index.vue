<template>
  <div role="wrapper">
    <header class="bg-purple-900 px-6 shadow-lg">
      <section role="heading" class="pt-6 flex flex-row flex-nowrap">
        <div class="text-2xl">
          <nuxt-link to="/" class="text-gray-200">
            <fa icon="arrow-left" />
          </nuxt-link>
        </div>
        <div class="text-center w-full flex flex-col">
          <div class="mx-auto flex flex-row items-center bg-purple-200 bg-opacity-30 rounded-full p-3">
            <img src="~/assets/images/double-bed.png" class="w-6 h-6" />
          </div>
          <h2 class="mt-2 text-lg text-purple-100 font-bold tracking-wider capitalize">
            Ložnice
          </h2>
        </div>
      </section>
      <section class="mb-8 pb-2">
          <div class="text-white md:ml-8 py-6">
            <div class="flex flex-row flex-nowrap">
              <div class="text-4xl mr-4">
                <fa icon="thermometer-half" />
              </div>
              <span class="text-4xl">20 °C</span>
            </div>
            <div
              class="flex flex-col md:flex-row mt-3 font-thin text-xs leading-loose tracking-wide"
            >
              <span class="md:mr-4">Osv. Vypnuto</span>
              <span class="md:mr-4">Vytápění Vypnuto</span>
              <span class="md:mr-4">Požad. teplota 22 °C</span>
            </div>
          </div>
        </section>
    </header>
    <div class="container mx-auto px-6">
      <content>
        <section class="mb-6">
          <div
            class="grid grid-flow-row grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2"
          >
            <button
              @click="showForm"
              class="block shadow rounded-sm bg-white p-3"
            >
              <div class="text-center leading-relaxed">
                <img src="~/assets/images/lightbulb.png" class="mx-auto mb-2" />
                <span class="block font-bold text-gray-700">Osvětlení</span>
                <span class="block text-xs text-gray-500"
                  >Stropní svítidlo</span
                >
              </div>
            </button>
            <nuxt-link
              to="heater"
              append
              class="block shadow rounded-sm bg-white p-3"
            >
              <div class="text-center leading-relaxed">
                <img src="~/assets/images/heater.png" class="mx-auto mb-2" />
                <span class="block font-bold text-gray-700">Vytápění</span>
                <span class="block text-xs text-gray-500">Denní režim</span>
              </div>
            </nuxt-link>
            <button
              @click="showForm"
              class="block shadow rounded-sm bg-white p-3"
            >
              <div class="text-center leading-relaxed">
                <img
                  src="~/assets/images/table-lamp.png"
                  class="mx-auto mb-2"
                />
                <span class="block font-bold text-gray-700"
                  >Lampička vpravo</span
                >
                <span class="block text-xs text-gray-500"
                  >Ashleyna lampička</span
                >
              </div>
            </button>
            <button
              @click="showForm"
              class="block shadow rounded-sm bg-white p-3"
            >
              <div class="text-center leading-relaxed">
                <img
                  src="~/assets/images/table-lamp.png"
                  class="mx-auto mb-2"
                />
                <span class="block font-bold text-gray-700"
                  >Lampička vlevo</span
                >
                <span class="block text-xs text-gray-500"
                  >Ellenina lampička</span
                >
              </div>
            </button>
            <nuxt-link
              to="sensor"
              append
              class="block shadow rounded-sm bg-white p-3"
            >
              <div class="text-center leading-relaxed">
                <img
                  src="~/assets/images/motion-sensor.png"
                  class="mx-auto mb-2"
                />
                <span class="block font-bold text-gray-700">Senzory</span>
                <span class="block text-xs text-gray-500">6 senzorů</span>
              </div>
            </nuxt-link>
          </div>
        </section>
      </content>
      <ModalForm v-if="formVisible" @dismiss="formVisible = false" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  data() {
    return {
      formVisible: false,
    };
  },
  methods: {
    showForm() {
      this.formVisible = true;
    },
  },
});
</script>
