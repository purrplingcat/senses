<template>
  <component :is="getFormComponent()" :device="currentDevice" :data="formData" @update="updateState" />
</template>

<script>
import LoadingComponent from '@/components/LoadingComponent.vue'
import ErrorComponent from '@/components/ErrorComponent.vue'
import devicesQuery from '@/queries/devices'
import { deepEqual } from 'fast-equals'

const loaders = {
  light: () => import('@/components/form/Light.vue'),
  lamp: () => import('@/components/form/Lamp.vue'),
  vacuum: () => import('@/components/form/Vacuum.vue'),
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
      required: true
    }
  },
  data () {
    return {
      formData: { ...this.device.state },
      currentDevice: this.device,
      loadedComponent: null,
      loader: null
    }
  },
  watch: {
    device (newDevice, oldDevice) {
      if (!deepEqual(newDevice, oldDevice)) {
        this.currentDevice = newDevice
      }
    }
  },
  methods: {
    sync () {
      this.formData = { ...this.device.state }
    },
    getFormComponent () {
      const loader = Reflect.has(loaders, this.whichForm) && this.device.available
        ? loaders[this.whichForm]
        : loaders.unknown

      if (!this.loadedComponent || loader !== this.loader) {
        const asyncComponent = () => ({
          component: loader(),
          loading: LoadingComponent,
          error: ErrorComponent,
          timeout: 3000
        })

        this.loader = loader
        this.loadedComponent = asyncComponent
      }

      return this.loadedComponent
    },
    updateState (state) {
      if (!state) { return }

      this.formData = { ...this.formData, ...state }
      this.$apollo.mutate({
        // Query
        mutation: devicesQuery.Update,
        // Parameters
        variables: {
          uid: this.device.uid,
          state
        }
      })
    }
  }
}
</script>
