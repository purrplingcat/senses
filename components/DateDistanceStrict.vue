<template>
  <span>{{ date | duration(now, unit) }}</span>
</template>

<script>
import { formatDistanceStrict, isValid, parseISO } from 'date-fns'
import csLocale from 'date-fns/locale/cs'

export default {
  filters: {
    duration (date, baseDate, unit) {
      if (!isValid(date)) { return 'nikdy' }

      return formatDistanceStrict(date, baseDate, {
        unit,
        locale: csLocale
      })
    }
  },
  props: ['value', 'refreshRate', 'unit'],
  data () {
    return {
      now: new Date(),
      timer: null
    }
  },
  computed: {
    date () {
      if (typeof this.value === 'string') {
        return parseISO(this.value)
      }

      return new Date(this.value)
    }
  },
  created () {
    this.restart()
  },
  beforeUpdate () {
    this.restart()
  },
  destroyed () {
    clearTimeout(this.timer)
  },
  methods: {
    restart () {
      const refresh = () => {
        this.now = new Date()
        this.timer = setTimeout(refresh, this.refreshRate || 10000)
      }

      clearTimeout(this.timer)
      refresh()
    }
  }
}
</script>
