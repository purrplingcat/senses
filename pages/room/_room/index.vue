<template>
  <div role="wrapper">
    <header class="bg-gradient-to-r from-purple-700 to-indigo-800 px-6 shadow-lg">
      <section role="heading" class="pt-6 flex flex-row flex-nowrap">
        <div class="text-2xl">
          <nuxt-link to="/" class="text-gray-200">
            <fa icon="arrow-left" />
          </nuxt-link>
        </div>
        <div class="text-center w-full flex flex-col">
          <div
            class="mx-auto flex flex-row items-center bg-purple-300 bg-opacity-20 rounded-full p-3"
          >
            <img src="~/assets/images/double-bed.png" class="w-8 h-8">
          </div>
          <h2
            class="mt-2 text-lg text-purple-100 font-bold tracking-wider capitalize"
          >
            Ložnice
          </h2>
        </div>
      </section>
      <section class="mb-0 md:pb-2">
        <div class="text-white md:ml-8 py-6">
          <div class="flex flex-row flex-nowrap">
            <div class="text-4xl mr-4">
              <fa icon="thermometer-half" />
            </div>
            <span class="text-4xl">20 °C</span>
          </div>
          <div
            class="flex flex-row flex-wrap mt-3 font-thin text-xs leading-loose tracking-wide"
          >
            <span class="mr-4" title="Osvětlení">
              <fa :icon="['far', 'lightbulb']" class="mr-1" /> Vypnuto
            </span>
            <span class="mr-4" title="Vytápění">
              <fa :icon="['fas', 'temperature-high']" class="mr-1" /> Vypnuto
              (Požad. teplota 22 °C)
            </span>
            <span class="mr-4" title="Počet chytrých zařízení">
              <fa :icon="['fas', 'plug']" class="mr-1" /> 8 zařízení
            </span>
          </div>
        </div>
      </section>
      <section class="-mx-6 mb-8 border-t border-gray-300">
        <div
          class="flex flex-row flex-nowrap w-full overflow-x-auto bg-gray-50 text-sm font-light"
        >
          <button
            class="flex-grow md:flex-grow-0 px-6 md:px-10 py-3 border-b-4 font-bold border-purple-900 text-gray-800 tracking-wider"
          >
            Zařízení
          </button>
          <button
            class="flex-grow md:flex-grow-0 px-6 md:px-10 py-3 border-b-4 border-transparent text-gray-600 tracking-wider"
          >
            Nálady
          </button>
          <button
            class="flex-grow md:flex-grow-0 px-6 md:px-10 py-3 border-b-4 border-transparent text-gray-600 tracking-wider"
          >
            Senzory
          </button>
        </div>
      </section>
    </header>
    <div class="px-6 mb-4">
      <content>
        <section class="mb-6">
          <div
            class="grid grid-flow-row grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2"
          >
            <button
              class="block shadow rounded-sm bg-white p-3"
              @click="showForm('osvetleni-loznice', 'light')"
            >
              <div class="relative text-center leading-relaxed h-full w-full">
                <div class="absolute top-0 right-0" @click.stop="">
                  <Toggle />
                </div>
                <img src="~/assets/images/lightbulb.png" class="mx-auto mb-2">
                <span class="block font-bold text-gray-700">Osvětlení</span>
                <span
                  class="block text-xs text-gray-500"
                >Stropní svítidlo</span>
              </div>
            </button>
            <button
              append
              class="block shadow rounded-sm bg-white p-3"
              @click="showForm('topeni-loznice', 'heater')"
            >
              <div class="relative text-center leading-relaxed h-full w-full">
                <div class="absolute top-0 right-0" @click.stop="">
                  <Toggle />
                </div>
                <img src="~/assets/images/heater.png" class="mx-auto mb-2">
                <span class="block font-bold text-gray-700">Vytápění</span>
                <span class="block text-xs text-gray-500">Denní režim</span>
              </div>
            </button>
            <button
              class="block shadow rounded-sm bg-white p-3"
              @click="showForm('lampa-ashley', 'lamp')"
            >
              <div class="relative text-center leading-relaxed h-full w-full">
                <div class="absolute top-0 right-0" @click.stop="">
                  <Toggle />
                </div>
                <img
                  src="~/assets/images/table-lamp.png"
                  class="mx-auto mb-2"
                >
                <span
                  class="block font-bold text-gray-700"
                >Lampička vpravo</span>
                <span
                  class="block text-xs text-gray-500"
                >Ashleyna lampička</span>
              </div>
            </button>
            <button
              class="block shadow rounded-sm bg-white p-3"
              @click="showForm('lampa-ellen', 'lamp')"
            >
              <div class="relative text-center leading-relaxed h-full w-full">
                <div class="absolute top-0 right-0" @click.stop="">
                  <Toggle />
                </div>
                <img
                  src="~/assets/images/table-lamp.png"
                  class="mx-auto mb-2"
                >
                <span
                  class="block font-bold text-gray-700"
                >Lampička vlevo</span>
                <span
                  class="block text-xs text-gray-500"
                >Ellenina lampička</span>
              </div>
            </button>
          </div>
        </section>
      </content>
      <ModalForm v-if="formVisible" :title="deviceId" @dismiss="formVisible = false">
        <DeviceForm :which-form="whichForm" />
      </ModalForm>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      formVisible: false,
      deviceId: '',
      whichForm: 'Light'
    }
  },
  methods: {
    showForm (deviceId, deviceType) {
      this.deviceId = deviceId
      this.whichForm = deviceType
      this.formVisible = true
    }
  }
}
</script>
