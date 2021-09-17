const noopLoading = {
  finish: () => { },
  start: () => { },
  fail: () => { },
  set: () => { },
  increase: () => { }
}

const $loading = () => {
  const $nuxt = typeof window !== 'undefined' && window.$nuxt
  return ($nuxt && $nuxt.$loading && $nuxt.$loading.set) ? $nuxt.$loading : noopLoading
}

export default (isLoading, countModifier) => {
  if (!process.browser) {
    return
  }

  if (isLoading && !$nuxt.$loading.show) {
    $loading().start()
  }

  if (!isLoading) {
    $loading().finish()
    return
  }

  $loading().increase(countModifier)
}
