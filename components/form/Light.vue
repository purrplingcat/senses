<template>
  <div>
    <div class="flex">
      <svg-icon name="lightbulb" class="w-24 h-24 mx-auto" />
    </div>
    <div class="flex flex-col w-full py-3">
      <label class="text-sm text-gray-600 font-semibold mb-1">Jas</label>
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
      <label class="text-sm text-gray-600 font-semibold mb-1">Teplota</label>
      <slider
        height="0.75rem"
        dot-size="24"
        class="col-span-2"
        v-model="temperature"
        :contained="true"
        :lazy="true"
      />
    </div>
    <div class="flex flex-col w-full py-3">
      <label class="text-sm text-gray-600 font-semibold mb-1">Režim</label>
      <Mode :data="data" @update="update" />
    </div>
  </div>
</template>

<script>
export default {
  props: ['device', 'data'],
  data() {
    return {};
  },
  computed: {
    brightness: {
      get() { return Math.trunc(this.data.brightness * 100) },
      set(value) { this.update({ brightness: value / 100}) }
    },
    temperature: {
      get() { return Math.trunc(this.data.colorTemp * 100) },
      set(value) { this.update({colorTemp: value / 100 })}
    },
  },
  methods: {
    update(value) {
      this.$emit('update', value);
    },
  },
  watch: {},
};
</script>
