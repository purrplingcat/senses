<template>
  <button
    class="device block shadow rounded-sm p-3"
    :class="{'device--activated': activated && !disabled}"
    :disabled="disabled"
    @click="$emit('click')"
  >
    <div class="text-center leading-relaxed h-full w-full">
      <div class="w-full flex flex-row flex-nowrap items-center -mt-1 -mb-2">
        <span class="device__status uppercase tracking-wide text-xs">
          {{ activated ? 'On' : 'Off' }}
        </span>
        <button
          class="device__more ml-auto px-2 -mr-2"
          @click.stop="$emit('clickMore')"
        >
          <fa icon="ellipsis-v" />
        </button>
      </div>
      <svg-icon :name="icon" class="device__icon w-16 h-16 mx-auto mb-2" />
      <span class="device__title block font-bold">
        {{ title }}
      </span>
      <span class="device__description block text-xs">
        {{ description }}
      </span>
    </div>
  </button>
</template>

<script>
export default {
  props: {
    icon: {
      type: String,
      required: true
    },
    title: {
      type: String,
      default: ''
    },
    description: {
      type: String,
      default: ''
    },
    activated: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false,
    }
  }
}
</script>

<style lang="scss">
.device {
  @apply bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600;

  &[disabled] {
    .device__title,
    .device__description,
    .device__icon {
      opacity: 0.5;
    }

    .device__status,
    .device__more {
      opacity: 0.5;

      @apply text-gray-400;
    }

    @apply bg-gray-200 dark:bg-gray-600 cursor-not-allowed;
  }

  .device__title {
    @apply text-gray-700 dark:text-gray-400;
  }

  .device__description {
    @apply text-gray-500;
  }

  .device__status,
  .device__more {
    @apply text-gray-300;
  }
}

.device.device--activated {
  @apply bg-gradient-to-r from-purple-700 via-purple-800 to-indigo-800 border border-purple-900;

  .device__title {
    @apply text-white;
  }

  .device__description {
    @apply text-gray-50;
  }

  .device__status {
    @apply text-white;
  }

  .device__more {
    @apply text-gray-300;
  }
}
</style>
