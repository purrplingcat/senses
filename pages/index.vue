<template>
  <div class="container mx-auto px-6">
    <div role="heading" class="py-6">
      <h2 class="text-2xl font-extrabold tracking-wide capitalize">
        Můj dům
      </h2>
    </div>
    <content>
      <section class="mb-6">
        <h3 class="font-bold text-gray-800 text-lg pb-2 mb-4">
          Místnosti
        </h3>
        <div class="grid grid-flow-row grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2">
          <nuxt-link v-for="room in rooms" :key="room.name" :to="`/room/${room.name}`" class="block shadow rounded-sm bg-white p-3">
            <div class="text-center leading-relaxed">
              <svg-icon :name="room.icon || 'rooms/cube'" class="w-16 h-16 mx-auto mb-2" />
              <span class="block font-bold text-gray-700">{{ room.title || 'Neznámá místnost' }}</span>
              <span class="block text-xs text-gray-500">{{ room.deviceCount }} zařízení</span>
            </div>
          </nuxt-link>
        </div>
      </section>
      <section class="mb-6">
        <h3 class="font-bold text-gray-800 text-lg pb-2 mb-4">
          Vysavače
        </h3>
        <div
          v-if="vacuums"
          class="grid grid-flow-row grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2"
        >
          <Device
            v-for="vacuum in vacuums"
            :key="vacuum.uid"
            :title="vacuum.title"
            :description="vacuum.description"
            :icon="vacuumStatusIcon(vacuum.state.status)"
            :activated="vacuum.turn === 'on'"
            :disabled="!vacuum.available"
            @click="toggle(vacuum)"
            @clickMore="showForm(vacuum)"
          />
        </div>
      </section>
      <section class="py-6">
        <button class="mx-auto block px-6 py-3 font-light rounded-sm bg-purple-700 tracking-wide text-white shadow-lg hover:bg-purple-900">
          Všechna zařízení
        </button>
      </section>
      <ModalForm
        v-if="formVisible"
        :title="currentDevice.title"
        @dismiss="formVisible = false"
      >
        <div slot="header" class="flex flex-row px-2 space-x-3">
          <button
            type="button"
            title="Obnovit data ze zařízení"
            class="px-2 py-1 text-sm text-gray-300 rounded-md border border-transparent hover:shadow-md hover:border-gray-100"
            @click.prevent="$refs.form.sync()"
          >
            <fa icon="sync" />
          </button>
          <Toggle
            :disabled="!currentDevice.available"
            :checked="currentDevice.turn === 'on'"
            @change="toggle(currentDevice)"
          />
        </div>
        <DeviceForm ref="form" :which-form="whichForm" :device="currentDevice" />
      </ModalForm>
    </content>
  </div>
</template>

<script>
import devicesQuery from '@/queries/devices'
import roomQuery from '@/queries/room'
import objectReducer from '@/utils/reduceObject'

export default {
  apollo: {
    rooms: {
      query: roomQuery.AllRooms
    },
    vacuums: {
      query: devicesQuery.DevicesByType,
      update: data => data.devices.reduce(objectReducer('uid'), {}),
      fetchPolicy: 'cache-and-network',
      variables () {
        return {
          type: 'vacuum'
        }
      },
      subscribeToMore: {
        document: devicesQuery.WatchUpdates,
        // Mutate the previous result
        updateQuery: (previousResult, { subscriptionData }) => {
          if (subscriptionData.data && subscriptionData.data.deviceUpdated) {
            const updated = subscriptionData.data.deviceUpdated
            const idx = previousResult.devices.findIndex(d => d.uid === updated.uid)

            if (idx > -1) {
              previousResult.devices[idx] = Object.assign({}, previousResult.devices[idx], updated)

              return { devices: [...previousResult.devices] }
            }
          }
        }
      }
    }
  },
  data () {
    return {
      formVisible: false,
      deviceId: '',
      whichForm: 'unknown'
    }
  },
  computed: {
    currentDevice () {
      return this.vacuums[this.deviceId]
    }
  },
  methods: {
    toggle (device) {
      this.$apollo.mutate({
        // Query
        mutation: devicesQuery.Update,
        // Parameters
        variables: {
          uid: device.uid,
          state: { state: device.turn === 'on' ? 'off' : 'on' }
        }
      })
    },
    showForm (device) {
      this.deviceId = device.uid
      this.whichForm = device.type
      this.formVisible = true
    },
    vacuumStatusIcon (status) {
      if (status === 'returning') { return 'roomba-busy' }
      if (status === 'error') { return 'roomba-stuck' }

      return ['docked', 'idle'].includes(status) ? 'roomba-standby' : 'roomba'
    }
  }
}
</script>
