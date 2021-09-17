<template>
  <div class="flex flex-col h-full">
    <div class="flex flex-col w-full py-3">
      <label class="text-sm text-gray-600 font-semibold mb-1">Status</label>
      <span>{{ status }}</span>
    </div>
    <div class="flex flex-col w-full py-3">
      <label class="text-sm text-gray-600 font-semibold mb-1">Stav baterie</label>
      <span>{{ device.state.battery }} %</span>
    </div>
    <div class="flex flex-col w-full py-3">
      <label class="text-sm text-gray-600 font-semibold mb-1">Zásobník prachu</label>
      <span>{{ bin }}</span>
    </div>
    <div class="flex flex-col w-full py-3">
      <label class="text-sm text-gray-600 font-semibold mb-1">Doba vysávání</label>
      <span>{{ device.state.cleaningTime | duration }}</span>
    </div>
    <div class="flex flex-row w-full py-3 mt-auto mb-2 justify-center items-center">
      <button
        type="button"
        class="ml-auto command-button border border-gray-300 border-r-0 rounded-l-lg"
        @click="sendCommand('stop')"
      >
        <fa icon="stop" class="text-xl align-middle" />
      </button>
      <button type="button" class="command-button border border-gray-300" :class="{active: device.turn === 'on'}" @click="update({state: device.turn !== 'on' ? 'on' : 'off'})">
        <fa :icon="device.turn === 'on' ? 'pause' : 'play'" class="text-xl align-middle" />
      </button>
      <button type="button" class="command-button border border-gray-300 border-l-0" :disabled="homeDisabled" @click="sendCommand('dock')">
        <fa icon="home" class="text-xl align-middle" />
      </button>
      <button type="button" class="mr-auto command-button border border-gray-300 border-l-0 rounded-r-lg" :disabled="device.turn === 'on'" @click="sendCommand('find')">
        <fa icon="search-location" class="text-xl align-middle" />
      </button>
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
    status () {
      switch (this.device.state.status) {
        case 'cleaning':
          return 'Vysávání'
        case 'returning':
          return 'Vracím se domů'
        case 'pause':
          return 'Pauza'
        case 'idle':
          return 'Nečinný'
        case 'docked':
          return 'Doma (Nabíjení)'
        case 'error':
          return 'Chyba'
        default:
          return 'Neznámý stav'
      }
    },
    bin () {
      switch (this.device.state.bin) {
        case 'present':
          return 'Přítomen'
        case 'removed':
          return 'Vyjmut'
        case 'full':
          return 'Plný (Vyžaduje vyprázdnit)'
        default:
          return 'Neznámý'
      }
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
  @apply px-5 py-3 bg-white box-border text-gray-600;

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
