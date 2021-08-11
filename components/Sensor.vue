<template>
  <div role="group" class="sensor shadow rounded-sm p-6">
    <header class="flex flex-row items-center justify-between mb-3">
      <span role="heading" class="font-semibold text-black text-xs tracking-wider uppercase">{{ sensor.title }}</span>
      <date-distance class="text-xs text-gray-400" :value="sensor.lastUpdate" />
    </header>
    <dl v-for="(field, key) in sensor.extraAttrs.fields" :key="key" class="flex flex-row justify-between px-3 py-5 border-b">
      <dt class="text-sm">
        <fa :icon="icon(field.type)" size="lg" class="mr-2" /> {{ field.title }}
      </dt>
      <dd class="text-sm text-purple-600 font-bold">
        {{ sensor.state[key] | fixed }} {{ unit(field) }}
      </dd>
    </dl>
  </div>
</template>

<script>
export default {
  filters: {
    nullable (value) {
      return value == null ? '-' : value
    },
    fixed (value, digits = 2) {
      return Number(value).toFixed(digits)
    }
  },
  props: {
    sensor: {
      required: true,
      validator (value) {
        return value.type === 'sensor'
      }
    }
  },
  methods: {
    icon (type) {
      switch (type) {
        case 'temperature':
          return 'thermometer-half'
        default:
          return 'question'
      }
    },
    unit (field) {
      if (field.unit) { return field.unit }

      switch (field.type) {
        case 'temperature':
          return '°C'
      }
    }
  }
}
</script>

<style>
.sensor {
  @apply bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600;
}
</style>
