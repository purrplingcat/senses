<template>
  <form class="flex flex-col flex-1">
    <div class="flex flex-col items-center w-full h-full">
      <div class="grid grid-cols-2 gap-1 w-full bg-gray-100 border-b border-gray-200 px-4 py-1 mb-4">
        <div class="text-sm">
          <span class="text-xs uppercase font-light text-gray-500">
            {{ device.state.label }}
          </span>
        </div>
        <div class="text-sm text-gray-900 font-semibold text-right">
          <span v-show="device.state.bin !== 'present'" class="text-red-700 mr-2">
            <fa icon="trash" size="lg" class="pr-1" />
            {{ binMessage }}
          </span>
          <span :class="{'text-red-700': device.state.battery < 16, 'text-red-700 animate-pulse': device.state.error === 104}">
            <fa :icon="batteryIcon" size="lg" class="pr-1" />
            {{ device.state.battery }} %
          </span>
        </div>
      </div>
      <div class="mt-auto mb-2">
        <svg-icon :name="statusBigIcon" class="w-32 h-32" />
      </div>
      <div class="flex flex-col items-center text-center mb-4">
        <span class="text-2xl mt-2">{{ statusMessage }}</span>
        <span v-show="!device.state.ready && device.turn === 'off'" class="text-xs text-gray-500">
          Úklid bude možný za chvíli.
        </span>
        <span v-if="device.state.expireTime" class="text-xs text-gray-500">
          Úloha bude zrušena za
          <date-distance-strict :value="device.state.expireTime" :refresh-rate="1000" unit="minute" />
        </span>
        <span v-show="showCleaningTime" class="text-sm text-gray-900 font-semibold mt-3">
          <fa icon="stopwatch" size="lg" class="pr-1" />
          {{ device.state.cleaningTime | duration }}
        </span>
        <span v-show="alertMessage" class="text-sm text-red-700 font-semibold mt-3">
          <fa icon="exclamation-triangle" size="lg" class="pr-1" />
          {{ alertMessage }}
        </span>
      </div>
      <div class="flex flex-row w-full md:w-3/4 lg:w-7/12 xl:w-8/12 px-4 mt-auto mb-6 justify-center">
        <button
          type="button"
          class="command-button flex-1 border border-gray-300 border-r-0 rounded-l-lg"
          @click="sendCommand('stop')"
        >
          <fa icon="stop" class="text-xl align-middle" />
        </button>
        <button type="button" class="command-button flex-1 border border-gray-300" :disabled="device.turn === 'off' && !device.state.ready" :class="{active: device.turn === 'on'}" @click="update({state: device.turn !== 'on' ? 'on' : 'off'})">
          <fa :icon="device.turn === 'on' ? 'pause' : 'play'" class="text-xl align-middle" />
        </button>
        <button type="button" class="command-button flex-1 border border-gray-300 border-l-0" :disabled="homeDisabled" @click="sendCommand('dock')">
          <fa icon="home" class="text-xl align-middle" />
        </button>
        <button :disabled="!device.state.ready" type="button" class="command-button flex-1 border border-gray-300 border-l-0" @click="sendCommand('train')">
          <fa icon="route" class="text-xl align-middle" />
        </button>
        <button type="button" class="command-button flex-1 border border-gray-300 border-l-0 rounded-r-lg" :disabled="device.turn === 'on'" @click="sendCommand('find')">
          <fa icon="search-location" class="text-xl align-middle" />
        </button>
      </div>
    </div>
  </form>
</template>

<script>
import { formatDuration, intervalToDuration } from 'date-fns'
import csLocale from 'date-fns/locale/cs'

export default {
  filters: {
    duration (seconds) {
      return formatDuration(intervalToDuration({ start: 0, end: seconds * 1000 }), {
        locale: csLocale
      })
    }
  },
  props: ['device', 'data'],
  data () {
    return {}
  },
  computed: {
    isRunning () {
      return !['docked', 'idle', 'error'].includes(this.device.state.status)
    },
    homeDisabled () {
      return ['returning', 'docked'].includes(this.device.state.status)
    },
    showCleaningTime () {
      return this.device.state.cleaningTime &&
        ['cleaning', 'training'].includes(this.device.state.status)
    },
    statusMessage () {
      switch (this.device.state.status) {
        case 'cleaning':
          return 'Vysávání'
        case 'returning':
          return 'Vracím se domů'
        case 'training':
          return 'Mapování'
        case 'paused':
          return 'Pauza'
        case 'idle':
          return 'Nečinný'
        case 'docked':
          return 'Doma'
        case 'error':
          return 'Chyba'
        default:
          return 'Neznámý stav'
      }
    },
    statusIcon () {
      switch (this.device.state.status) {
        case 'cleaning':
          return 'play'
        case 'returning':
          return 'hourglass'
        case 'training':
          return 'play'
        case 'paused':
          return 'pause'
        case 'idle':
          return 'stop'
        case 'docked':
          return 'home'
        case 'error':
          return 'exclamation-circle'
        default:
          return 'question'
      }
    },
    binMessage () {
      switch (this.device.state.bin) {
        case 'present':
          return 'OK'
        case 'removed':
          return 'Vyjmut'
        case 'full':
          return 'Plný'
        default:
          return 'Neznámý'
      }
    },
    batteryIcon () {
      const battery = this.device.state.battery

      if (this.device.state.status === 'docked') { return 'bolt' }
      if (battery > 90) { return 'battery-full' }
      if (battery > 60) { return 'battery-three-quarters' }
      if (battery > 40) { return 'battery-half' }
      if (battery > 20) { return 'battery-quarter' }

      return 'battery-empty'
    },
    alertMessage () {
      if (this.errored) {
        return this.device.state.errorMessage || 'Vysavač se zasekl nebo má nějaký jiný problém.'
      }

      if (this.device.state.bin === 'full') {
        return 'Zásobník prachu může být plný a je třeba jej vypráznit.'
      }

      if (this.device.state.bin === 'removed') {
        return 'Chybí zásobník prachu.'
      }

      if (this.device.state.battery < 16) {
        return 'Baterie je téměř vybitá! Nabijte prosím váš vysavač.'
      }

      return null
    },
    statusBigIcon () {
      const status = this.device.state.status

      if (status === 'returning') { return 'roomba-busy' }
      if (status === 'error') { return 'roomba-stuck' }
      if (!this.device.state.ready) { return 'roomba-busy' }

      return ['docked', 'idle'].includes(status) ? 'roomba-standby' : 'roomba'
    },
    errored () {
      return this.device.state.status === 'error' || this.device.state.error > 0
    }
  },
  watch: {},
  methods: {
    update (value) {
      this.$emit('update', value)
    },
    isChanged (field) {
      return this.data[field] !== this.device.state[field]
    },
    sendCommand (command) {
      this.update({ command })
    }
  }
}
</script>

<style lang="scss">
.command-button {
  @apply p-3 bg-white box-border text-gray-600;

  &:hover {
    @apply bg-gray-200;
  }

  &:disabled {
    @apply cursor-not-allowed text-gray-500 bg-gray-300;
  }

  &.active {
    @apply bg-purple-700 text-white;
  }
}
</style>
