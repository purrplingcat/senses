<template>
  <div class="flex items-center m-3" @click="$emit('click', value)">
    <input :id="`${name}-${value}`" type="radio" :name="name" class="hidden" :checked="checked">
    <label :for="`${name}-${value}`" class="flex items-center cursor-pointer">
      <span
        class="w-5 h-5 inline-block mr-1 shadow-md rounded-full"
        :class="dynamicClass"
      />
    </label>
  </div>
</template>

<script>
export default {
  props: {
    checked: {
      type: Boolean,
      required: false,
      default: false
    },
    name: {
      type: String,
      required: true
    },
    value: {
      type: String,
      required: true
    },
    color: {
      type: String,
      required: true
    },
    borderColor: {
      type: String,
      required: false,
      default: null
    },
    outlineColor: {
      type: String,
      required: false,
      default: null
    }
  },
  computed: {
    dynamicClass () {
      let cls = `bg-${this.color}`

      if (this.checked) {
        cls += ` ring-4 ring-${this.outlineColor || this.color} ring-opacity-50`
      } else {
        cls += ` border border-${this.borderColor || this.color}`
      }

      return cls
    }
  }
}
</script>
