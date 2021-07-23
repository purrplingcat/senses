<template>
  <RadioButtons class="mt-2" :options="options" v-model="mode" />
</template>

<script>
export default {
  props: ["data"],
  data() {
    return {
      options: { morning: "Ráno", day: "Den", night: "Noc" },
      modes: {
        morning: {
          colorTemp: 0.25,
          brightness: 0.25,
        },
        day: {
          colorTemp: 1,
          brightness: 0.5,
        },
        night: {
          colorTemp: 0,
          brightness: 0.03,
        },
      },
    };
  },
  computed: {
    mode: {
      get() {
        for (const key of Object.keys(this.modes)) {
          const mod = this.modes[key];
          let success = true;

          for (const modKey of Object.keys(mod)) {
            if (this.data[modKey] !== mod[modKey]) {
              success = false;
            }
          }

          if (success) return key;
        }

        return null;
      },
      set(mode) {
        this.$emit('update', { ...this.modes[mode], state: "on" });
      },
    },
  }
};
</script>
