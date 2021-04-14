<template>
  <div class="flex flex-col md:flex-row flex-wrap text-gray-500 text-xs">
    <button
      v-for="(text, opt) in options"
      :key="opt"
      type="button"
      :value="opt"
      class="ui-radio"
      :class="value === opt && 'active'"
      @click="$emit('input', opt)"
    >
      {{ text }}
    </button>
  </div>
</template>

<script>
export default {
  props: {
    options: {
      type: Object,
      required: true,
    },
    value: {
      type: String,
      default: null,
    }
  }
}
</script>

<style lang="scss">
.ui-radio {
  @apply px-4 py-2 bg-white border font-semibold text-xs tracking-wide border-gray-300 rounded-sm m-0.5;

  &:hover, &:focus {
    @apply bg-gray-200;
  }

  &:active, &:focus {
    @apply outline-none;
  }

  &.active {
    @apply border-purple-600 bg-purple-600 shadow-inner;
    @apply text-white font-semibold;

    &:hover, &:focus {
      @apply bg-purple-700 border-purple-700;
    }
  }
}
</style>
