import Vue from 'vue'
import Slider from 'vue-slider-component'

Vue.component('Slider', Slider)
Vue.mixin({
  methods: {
    iconByType (type, subtype) {
      switch (type) {
        case 'light':
          switch (subtype) {
            case 'lamp':
              return 'lamp'
            default:
              return 'lightbulb'
          }
        case 'heater':
          return 'heater'
        default:
          return 'chip'
      }
    }
  }
})
