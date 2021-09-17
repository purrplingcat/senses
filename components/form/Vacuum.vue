<template>
  <div>
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
    <div class="flex flex-col w-full py-3">
      <label class="text-sm text-gray-600 font-semibold mb-1">Příkazy</label>
      <RadioButtons class="mt-2" :options="commands" @input="sendCommand" />
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
    return {
      commands: {
        clean: 'Vysávat',
        pause: 'Pauza',
        stop: 'Zastavit',
        dock: 'Návrat domů',
        find: 'Kde jsem?'
      }
    }
  },
  computed: {
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
