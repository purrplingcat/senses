<template>
  <div class="flex flex-col h-full">
    <div v-if="alertMessage" class="px-6 py-3 bg-yellow-300 border border-yellow-600 text-yellow-900 rounded-sm my-3">
      {{ alertMessage }}
    </div>
    <div class="flex flex-col items-center m-auto">
      <div class="grid grid-cols-2 gap-1 w-full py-3">
        <div class="text-sm text-gray-900 font-semibold mb-1" :class="{'text-red-600': device.state.battery < 16, 'text-red-600 animate-pulse': device.state.error === 104}">
          <fa :icon="batteryIcon" size="lg" class="pr-1" />
          {{ device.state.battery }} %
        </div>
        <div class="text-sm text-gray-900 font-semibold mb-1 text-right" :class="{'text-red-600': device.state.bin !== 'present'}">
          <fa icon="trash" size="lg" class="pr-1" />
          {{ binMessage }}
        </div>
      </div>
      <svg-icon :name="statusBigIcon" class="w-32 h-32 mx-auto mb-2" />
      <div class="flex flex-col items-center h-24">
        <span class="text-2xl mt-2">{{ statusMessage }}</span>
        <span v-show="device.state.ready && device.turn === 'off'" class="text-xs text-gray-500">
          Připraveno k vysávání
        </span>
        <div v-show="device.state.cleaningTime" class="text-sm text-gray-900 font-semibold mt-3">
          <fa icon="stopwatch" size="lg" class="pr-1" />
          {{ device.state.cleaningTime | duration }}
        </div>
      </div>
      <div class="flex flex-row w-full py-3 mt-5 mb-3 justify-center items-center">
        <button
          type="button"
          class="ml-auto command-button border border-gray-300 border-r-0 rounded-l-lg"
          @click="sendCommand('stop')"
        >
          <fa icon="stop" class="text-xl align-middle" />
        </button>
        <button type="button" class="command-button border border-gray-300" :disabled="device.turn === 'off' && !device.state.ready" :class="{active: device.turn === 'on'}" @click="update({state: device.turn !== 'on' ? 'on' : 'off'})">
          <fa :icon="device.turn === 'on' ? 'pause' : 'play'" class="text-xl align-middle" />
        </button>
        <button v-show="!trainEnabled" type="button" class="command-button border border-gray-300 border-l-0" :disabled="homeDisabled" @click="sendCommand('dock')">
          <fa icon="home" class="text-xl align-middle" />
        </button>
        <button v-show="trainEnabled" :disabled="!device.state.ready" type="button" class="command-button border border-gray-300 border-l-0" @click="sendCommand('train')">
          <fa icon="route" class="text-xl align-middle" />
        </button>
        <button type="button" class="mr-auto command-button border border-gray-300 border-l-0 rounded-r-lg" :disabled="device.turn === 'on'" @click="sendCommand('find')">
          <fa icon="search-location" class="text-xl align-middle" />
        </button>
      </div>
    </div>
  </div>
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
    trainEnabled () {
      return ['docked', 'idle'].includes(this.device.state.status)
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
      if (this.device.state.bin === 'full') {
        return 'Zásobník prachu může být plný a je třeba jej vypráznit.'
      }

      if (this.errored) {
        return this.device.state.errorMessage || 'Vysavač se zasekl nebo má nějaký jiný problém.'
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
  @apply px-8 py-3 bg-white box-border text-gray-600;

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
