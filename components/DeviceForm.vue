<template>
  <component :is="formComponent" :device="device" />
</template>

<script>
import LoadingComponent from '@/components/LoadingComponent.vue'
import ErrorComponent from '@/components/ErrorComponent.vue'

const loaders = {
  light: () => import('@/components/form/Light.vue'),
  lamp: () => import('@/components/form/Lamp.vue'),
  unknown: () => import('@/components/form/Unknown.vue')
}

export default {
  props: {
    whichForm: {
      type: String,
      required: true
    },
    device: {
      type: Object,
      required: true,
    }
  },
  computed: {
    formComponent () {
      const loader = Reflect.has(loaders, this.whichForm) && this.device.available
        ? loaders[this.whichForm]
        : loaders.unknown
      const asyncComponent = () => ({
        component: loader(),
        loading: LoadingComponent,
        error: ErrorComponent,
        timeout: 3000
      })

      return asyncComponent
    }
  }
}
</script>
