<template>
  <div role="wrapper">
    <header class="bg-gradient-to-r from-purple-700 via-purple-800 to-indigo-800 px-6 shadow-lg">
      <section role="heading" class="pt-6 flex flex-row flex-nowrap">
        <div class="text-2xl">
          <nuxt-link to="/" class="text-gray-200">
            <fa icon="arrow-left" />
          </nuxt-link>
        </div>
        <div :class="{'animate-pulse': !room }" class="text-center w-full flex flex-col">
          <div
            class="mx-auto flex flex-row items-center bg-purple-300 bg-opacity-20 rounded-full p-3"
          >
            <svg-icon :name="room.icon || 'rooms/cube'" class="w-8 h-8" />
          </div>
          <div v-if="!room" class="h-4 bg-blue-400 rounded w-3/4" />
          <h2
            v-else
            class="mt-2 text-lg text-purple-100 font-bold tracking-wider capitalize"
          >
          {{ room.title }}
          </h2>
        </div>
      </section>
      <section class="mb-0 md:pb-2">
        <div class="text-white md:ml-8 py-6">
          <div v-if="temperature != null" class="flex flex-row flex-nowrap">
            <div class="text-4xl mr-4">
              <fa icon="thermometer-half" />
            </div>
            <span class="text-4xl">{{ temperature|fixed(1) }} °C</span>
          </div>
          <div
            class="flex flex-row flex-wrap mt-3 font-thin text-xs leading-loose tracking-wide"
          >
            <span class="mr-4" title="Osvětlení">
              <fa :icon="['far', 'lightbulb']" class="mr-1" /> {{ anyLightOn ? 'Zapnuto' : 'Vypnuto' }}
            </span>
            <span class="mr-4" title="Vytápění">
              <fa :icon="['fas', 'temperature-high']" class="mr-1" /> Vytápení
              (Požad. teplota 22 °C)
            </span>
            <span class="mr-4" title="Počet chytrých zařízení">
              <fa :icon="['fas', 'plug']" class="mr-1" /> {{ devices.length }} zařízení
            </span>
            <span class="mr-4" title="Počet chytrých zařízení">
              <fa :icon="['far', 'eye']" class="mr-1" /> {{ sensors.length }} sensory
            </span>
          </div>
        </div>
      </section>
      <section class="-mx-6 mb-8 border-t border-gray-300 dark:border-gray-700">
        <div
          id="view-switch"
          class="flex flex-row flex-nowrap w-full overflow-x-auto bg-gray-50 dark:bg-gray-800 text-sm font-light"
        >
          <button
            @click="view = 'devices'"
            :class="{active: view === 'devices'}"
            class="flex-grow md:flex-grow-0 px-6 md:px-10 py-3 border-b-4 border-transparent tracking-wider"
          >
            Zařízení
          </button>
          <button
            @click="view = 'scenes'"
            :class="{active: view === 'scenes'}"
            class="flex-grow md:flex-grow-0 px-6 md:px-10 py-3 border-b-4 border-transparent text-gray-600 dark:text-gray-500 tracking-wider"
          >
            Nálady
          </button>
          <button
            @click="view = 'sensors'"
            :class="{active: view === 'sensors'}"
            class="flex-grow md:flex-grow-0 px-6 md:px-10 py-3 border-b-4 border-transparent text-gray-600 dark:text-gray-500 tracking-wider"
          >
            Senzory
          </button>
        </div>
      </section>
    </header>
    <div class="px-6 mb-4">
      <content v-if="view === 'devices'">
        <section class="mb-6">
          <div
            v-if="deviceCount"
            class="grid grid-flow-row grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2"
          >
            <Device
              v-for="device in devices.filter((d) => d.type != 'sensor')"
              :key="device.uid"
              :title="device.title"
              :description="device.description"
              :icon="iconByType(device.type, device.class)"
              :activated="device.turn === 'on'"
              :disabled="!device.available"
              @click="toggle(device)"
              @clickMore="showForm(device.uid)"
            />
          </div>
        </section>
        <div v-if="!deviceCount && $apollo.queries.allDevices.loading" class="flex flex-row">
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
      <content v-if="view === 'sensors'">
        <dl v-for="sensor in sensors" :key="sensor.uid">
          <dt>{{ sensor.title }}</dt>
          <dd><date-distance :value="sensor.lastUpdate" /></dd>
          <dd>{{ sensor.state.value | fixed }}</dd>
        </dl>
      </content>
      <ModalForm
        v-if="formVisible"
        :title="this.currentDevice.title"
        @dismiss="formVisible = false"
      >
        <Toggle slot="header" :checked="currentDevice.turn === 'on'" @change="toggle(currentDevice)" />
        <DeviceForm :which-form="whichForm" :device="currentDevice" />
      </ModalForm>
    </div>
  </div>
</template>

<style lang="scss">
#view-switch {
  button:hover {
    @apply text-gray-800 font-bold;
  }

  .active {
    @apply border-purple-900 dark:border-purple-700 text-gray-800 dark:text-gray-50 font-bold;
  }
}
</style>

<script>
import devicesQuery from '@/queries/devices'
import roomQuery from '@/queries/room'
import objectReducer from '@/utils/reduceObject'
import DateDistance from '~/components/DateDistance.vue'

export default {
  components: { DateDistance },
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
    allDevices: {
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
      return this.allDevices[this.deviceId];
    },
    devices() {
      return Object.values(this.allDevices || {})
        .filter((d) => d.type !== 'sensor' && d.turnable);
    },
    sensors() {
      return Object.values(this.allDevices || {})
        .filter((d) => d.type === 'sensor');
    },
    deviceCount() {
      return this.devices.length;
    },
    temperature() {
      const sensor = this.sensors.find((s) => s.class === 'temperature' && s.tags.includes('main'));

      return sensor ? sensor.state.value : null;
    },
    anyLightOn() {
      return this.devices.filter((d) => d.available && d.type === 'light' && d.turn === 'on').length > 0;
    }
  },
  data () {
    return {
      formVisible: false,
      deviceId: '',
      whichForm: 'unknown',
      room: {},
      view: 'devices',
    }
  },
  methods: {
    showForm (deviceId) {
      this.deviceId = deviceId
      this.whichForm = this.allDevices[deviceId].type
      this.formVisible = true
    },
    alert () {
      window.alert('baf')
    },
    toggle(device) {
      this.$apollo.mutate({
        // Query
        mutation: devicesQuery.Update,
        // Parameters
        variables: {
          uid: device.uid,
          state: {state: device.turn === "on" ? "off" : "on"}
        }
      });
    }
  },
  filters: {
    nullable(value) {
      return value == null ? '-' : value;
    },
    fixed(value, digits = 2) {
      return Number(value).toFixed(digits);
    },
  }
}
</script>
