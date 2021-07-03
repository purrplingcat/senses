<template>
  <div role="wrapper">
    <header class="bg-gradient-to-r from-purple-700 via-purple-800 to-indigo-800 px-6 shadow-lg">
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
          {{ room.title }}
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
              <fa :icon="['fas', 'temperature-high']" class="mr-1" /> Vytápení
              (Požad. teplota 22 °C)
            </span>
            <span class="mr-4" title="Počet chytrých zařízení">
              <fa :icon="['fas', 'plug']" class="mr-1" /> 4 zařízení
            </span>
            <span class="mr-4" title="Počet chytrých zařízení">
              <fa :icon="['far', 'eye']" class="mr-1" /> 2 sensory
            </span>
          </div>
        </div>
      </section>
      <section class="-mx-6 mb-8 border-t border-gray-300 dark:border-gray-700">
        <div
          class="flex flex-row flex-nowrap w-full overflow-x-auto bg-gray-50 dark:bg-gray-800 text-sm font-light"
        >
          <button
            class="flex-grow md:flex-grow-0 px-6 md:px-10 py-3 border-b-4 font-bold border-purple-900 dark:border-purple-700 text-gray-800 dark:text-gray-50 tracking-wider"
          >
            Zařízení
          </button>
          <button
            class="flex-grow md:flex-grow-0 px-6 md:px-10 py-3 border-b-4 border-transparent text-gray-600 dark:text-gray-500 tracking-wider"
          >
            Nálady
          </button>
          <button
            class="flex-grow md:flex-grow-0 px-6 md:px-10 py-3 border-b-4 border-transparent text-gray-600 dark:text-gray-500 tracking-wider"
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
            <!-- <Device
              title="Vytápění"
              description="Režim den"
              icon="lightbulb"
              :activated="true"
              @click="alert"
              @clickMore="showForm('topeni-loznice', 'heater')"
            />
            <button
              class="block shadow rounded-sm bg-gradient-to-r from-purple-700 via-purple-800 to-indigo-800 border border-purple-900 p-3"
              @click="alert"
            >
              <div class="text-center leading-relaxed h-full w-full">
                <div class="w-full flex flex-row flex-nowrap items-center -mt-1 -mb-2">
                  <span class="uppercase tracking-wide text-xs text-white">On</span>
                  <button class="ml-auto text-gray-300" @click.stop="showForm('topeni-loznice', 'heater')">
                    <fa icon="ellipsis-v" />
                  </button>
                </div>
                <img src="~/assets/images/heater.png" class="mx-auto mb-2">
                <span class="block font-bold text-white">Vytápění</span>
                <span class="block text-xs text-gray-50">Denní režim</span>
              </div>
            </button>
            <button
              class="block shadow rounded-sm bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 p-3"
              @click="alert"
            >
              <div class="relative text-center leading-relaxed h-full w-full">
                <div class="w-full flex flex-row flex-nowrap items-center -mt-1 -mb-2">
                  <span class="uppercase tracking-wide text-xs text-gray-300">Off</span>
                  <button class="ml-auto text-gray-300" @click.stop="showForm('lampa-ashley', 'lamp')">
                    <fa icon="ellipsis-v" />
                  </button>
                </div>
                <img
                  src="~/assets/images/table-lamp.png"
                  class="mx-auto mb-2"
                >
                <span
                  class="block font-bold text-gray-700 dark:text-gray-400"
                >Lampička vpravo</span>
                <span
                  class="block text-xs text-gray-500"
                >Ashleyna lampička</span>
              </div>
            </button>
            <button
              class="block shadow rounded-sm bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 p-3"
              @click="alert"
            >
              <div class="text-center leading-relaxed h-full w-full">
                <div class="w-full flex flex-row flex-nowrap items-center -mt-1 -mb-2">
                  <span class="uppercase tracking-wide text-xs text-gray-300">Off</span>
                  <button class="ml-auto text-gray-300" @click.stop="showForm('lampa-ellen', 'lamp')">
                    <fa icon="ellipsis-v" />
                  </button>
                </div>
                <img
                  src="~/assets/images/table-lamp.png"
                  class="mx-auto mb-2"
                >
                <span
                  class="block font-bold text-gray-700 dark:text-gray-400"
                >Lampička vlevo</span>
                <span
                  class="block text-xs text-gray-500"
                >Ellenina lampička</span>
              </div>
            </button>-->
          </div>
        </section>
        <div v-if="!deviceCount && $apollo.queries.devices.loading" class="flex flex-row">
          <svg class="animate-spin mx-auto h-8 w-8 text-purple-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </div>
        <div v-else-if="!deviceCount" class="flex flex-col items-center justify-center content-center my-auto">
          <fa icon="slash" class="text-4xl text-gray-400 my-3" />
          <span class="text-gray-400 text-sm font-semibold mt-1">
            Žádná zařízení nejsou dostupná.
          </span>
        </div>
      </content>
      <ModalForm v-if="formVisible" :title="this.currentDevice.title" @dismiss="formVisible = false">
        <DeviceForm :which-form="whichForm" :device="currentDevice" />
      </ModalForm>
    </div>
  </div>
</template>

<script>
import devicesQuery from '@/queries/devices'
import roomQuery from '@/queries/room'
import objectReducer from '@/utils/reduceObject'

export default {
  apollo: {
    room: {
      query: roomQuery.Room,
      variables() {
        return {
          name: this.$route.params.room,
        }
      },
      error(err) {
        if (err.gqlError && err.gqlError.extensions.exception.code === 404) {
          this.$nuxt.error(404)
        }
      }
    },
    devices: {
      query: devicesQuery.DevicesByRoom,
      update: (data) => data.devices.reduce(objectReducer('uid'), {}),
      fetchPolicy: 'cache-and-network',
      variables() {
        return {
          room: this.$route.params.room,
        }
      },
      subscribeToMore: {
        document: devicesQuery.WatchUpdates,
        // Mutate the previous result
        updateQuery: (previousResult, { subscriptionData }) => {
          if (subscriptionData.data && subscriptionData.data.deviceUpdated) {
            const updated = subscriptionData.data.deviceUpdated;
            const idx = previousResult.devices.findIndex((d) => d.uid === updated.uid)

            if (idx > -1) {
              previousResult.devices[idx] = Object.assign({}, previousResult.devices[idx], updated);

              return { devices: [...previousResult.devices] };
            }
          }
        },
      }
    }
  },
  computed: {
    currentDevice() {
      return this.devices[this.deviceId];
    },
    deviceCount() {
      return Object.values(this.devices || {}).length;
    }
  },
  data () {
    return {
      formVisible: false,
      deviceId: '',
      whichForm: 'unknown',
      room: {},
    }
  },
  methods: {
    showForm (deviceId) {
      this.deviceId = deviceId
      this.whichForm = this.devices[deviceId].type
      this.formVisible = true
    },
    alert () {
      window.alert('baf')
    }
  }
}
</script>
