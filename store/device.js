import Vue from 'vue'

export const state = () => ({
  all: {},
  states: {},
  active: null,
  loaded: false
})

export const mutations = {
  add (state, device) {
    Vue.set(state.all, device.uid, device)
  },
  updateState (state, deviceState) {
    state.states[deviceState._deviceUid] = deviceState
  },
  markLoaded (state) {
    state.loaded = true
  }
}

export const actions = {
  async fetchDevices ({ commit }) {
    const devices = await this.$axios.$get('/api/device')

    for (const device of devices) {
      commit('add', device)
    }
  },
  async fetchDeviceState ({ commit }, deviceUid) {
    commit('updateState', await this.$axios.$get(`/api/device/${deviceUid}/state`))
  }
}

export const getters = {
  devices: state => Object.values(state.all)
}
