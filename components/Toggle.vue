<template>
  <label class="ui-toggle flex items-center cursor-pointer">
    <div class="relative">
      <input
        type="checkbox"
        :name="name"
        :value="value"
        :checked="reflectState(checked)"
        class="hidden"
        @change="change($event.target)"
      >
      <div class="ui-toggle__track w-10 h-4 bg-gray-300 shadow-inner rounded-full" />
      <div class="ui-toggle__dot absolute w-6 h-6 shadow bg-white border border-gray-200 rounded-full inset-y-0 left-0" />
    </div>
    <div v-if="!!label" class="ui-toggle__label select-none ml-3 text-gray-700 tracking-wide text-sm leading-5">
      {{ label }}
    </div>
  </label>
</template>

<script>
export default {
  model: {
    prop: 'checked',
    event: 'change'
  },
  props: ['name', 'label', 'checked', 'value', 'color'],
  methods: {
    change(el) {
      if (Array.isArray(this.checked)) {
        const checked = [].concat(this.checked)
        const value = this.value

        if (checked.includes(value)) {
          checked.splice(checked.indexOf(value), 1)
        } else {
          checked.push(value)
        }

        return this.$emit('change', checked)
      }

      this.$emit('change', !!el.checked)
    },
    reflectState(state) {
      if (Array.isArray(state)) {
        return state.includes(this.$props.value)
      }

      return !!state
    },
  },
}
</script>

<style scoped lang="scss">
  .ui-toggle {
    .ui-toggle__dot {
      top: -0.25rem;
      left: -0.25rem;
      transition: all 0.25s ease-in-out;
    }

    input:checked ~ .ui-toggle__track {
      @apply bg-purple-300;
    }

    input:checked ~ .ui-toggle__dot {
      transform: translateX(100%);

      @apply bg-purple-900;
    }
  }
</style>
