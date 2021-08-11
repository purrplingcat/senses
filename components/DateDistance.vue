<template>
  <span>{{ date | distance(now) }}</span>
</template>

<script>
import { formatDistance, isValid, parseISO } from 'date-fns'
import csLocale from 'date-fns/locale/cs'

export default {
  filters: {
    distance (date, baseDate) {
      if (!isValid(date)) { return 'never' }

      return formatDistance(date, baseDate, {
        addSuffix: true,
        includeSeconds: true,
        locale: csLocale
      })
    }
  },
  props: ['value', 'refreshRate'],
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
