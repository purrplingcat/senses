export const state = () => ({
  noServer: false,
})

export const mutations = {
  noServer(state, val) {
    state.noServer = val;
  }
}
