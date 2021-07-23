<template>
  <component :is="formComponent" :device="device" :data="formData" @update="updateState" />
</template>

<script>
import LoadingComponent from '@/components/LoadingComponent.vue'
import ErrorComponent from '@/components/ErrorComponent.vue'
import devicesQuery from '@/queries/devices'

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
  data() {
    return {
      formData: { ...this.device.state }
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
  },
  methods: {
		updateState(state) {
      if (!state) return;
    	console.log('the form object updated', state)

      this.formData = { ...this.formData, ...state }
      this.$apollo.mutate({
        // Query
        mutation: devicesQuery.Update,
        // Parameters
        variables: {
          uid: this.device.uid,
          state
        }
      });
    }
  },
}
</script>
