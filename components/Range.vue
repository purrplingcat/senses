<template>
  <input
    class="rounded-lg overflow-hidden appearance-none bg-gray-400 h-3 w-128"
    :class="color"
    type="range"
    min="1"
    max="100"
    step="1"
    value="15"
  />
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    color: {
      type: String,
      default: '',
    },
    value: {
      type: String,
      default: null,
    }
  }
})
</script>

<style>
@media screen and (-webkit-min-device-pixel-ratio: 0) {
  input[type="range"]::-webkit-slider-thumb {
    width: 15px;
    -webkit-appearance: none;
    appearance: none;
    height: 15px;
    cursor: ew-resize;
    background: #fff;
    border-radius: 50%;
    box-shadow: -405px 0 0 400px #4c1d95;
  }

  input[type="range"].red::-webkit-slider-thumb {
    box-shadow: -405px 0 0 400px #dc2626;
  }

  input[type="range"].green::-webkit-slider-thumb {
    box-shadow: -405px 0 0 400px #059669;
  }

  input[type="range"].blue::-webkit-slider-thumb {
    box-shadow: -405px 0 0 400px #2563eb;
  }
}
</style>
