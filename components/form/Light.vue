<template>
  <form class="px-6 py-3">
    <div class="flex">
      <svg-icon name="lightbulb" class="w-24 h-24 mx-auto" />
    </div>
    <div class="flex flex-col w-full py-3">
      <label class="text-sm text-gray-600 font-semibold mb-1">
        Jas
        <span v-show="isChanged('brightness')" role="status" class="dot ml-px bg-purple-500" />
      </label>
      <slider
        v-model="brightness"
        height="0.75rem"
        dot-size="24"
        class="col-span-2"
        :contained="true"
        :lazy="true"
      />
    </div>
    <div class="flex flex-col w-full py-3">
      <label class="text-sm text-gray-600 font-semibold mb-1">
        Teplota
        <span v-show="isChanged('temperature')" role="status" class="dot bg-purple-500" />
      </label>
      <slider
        v-model="temperature"
        height="0.75rem"
        dot-size="24"
        class="col-span-2"
        :contained="true"
        :lazy="true"
      />
    </div>
    <div class="flex flex-col w-full py-3">
      <label class="text-sm text-gray-600 font-semibold mb-1">Režim</label>
      <Mode :data="data" @update="update" />
    </div>
  </form>
</template>

<script>
export default {
  props: ['device', 'data'],
  data () {
    return {}
  },
  computed: {
    brightness: {
      get () { return Math.trunc(this.data.brightness * 100) },
      set (value) { this.update({ brightness: value / 100 }) }
    },
    temperature: {
      get () { return Math.trunc(this.data.colorTemp * 100) },
      set (value) { this.update({ colorTemp: value / 100 }) }
    }
  },
  watch: {},
  methods: {
    update (value) {
      this.$emit('update', value)
    },
    isChanged (field) {
      return this.data[field] !== this.device.state[field]
    }
  }
}
</script>
