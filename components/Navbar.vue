<template>
  <nav
    id="navigation"
    class="flex flex-row flex-nowrap bg-white dark:bg-gray-800 w-full overflow-x-auto shadow border-gray-200 dark:border-gray-700 border-solid border-t"
  >
    <div class="flex flex-row mx-auto">
      <div>
        <nuxt-link to="/" class="block px-6 py-3 text-center text-gray-400 hover:text-gray-500">
          <div class="text-2xl">
            <fa icon="home" />
          </div>
          <div
            class="hidden xs:block text-xs leading-relaxed tracking-widest capitalize"
          >
            Můj dům
          </div>
        </nuxt-link>
      </div>
      <div>
        <nuxt-link to="/scenes" class="block px-6 py-3 text-center text-gray-400 dark:text-gray-500 hover:text-gray-500 dark:hover:text-gray-400">
          <div class="text-2xl">
            <fa icon="couch" />
          </div>
          <div
            class="hidden xs:block text-xs leading-relaxed tracking-wide capitalize"
          >
            Nálady
          </div>
        </nuxt-link>
      </div>
      <div>
        <nuxt-link to="/favorites" class="block px-6 py-3 text-center text-gray-400 dark:text-gray-500 hover:text-gray-500 dark:hover:text-gray-400">
          <div class="text-2xl">
            <fa icon="heart" />
          </div>
          <div
            class="hidden xs:block text-xs leading-relaxed tracking-wide capitalize"
          >
            Oblíbené
          </div>
        </nuxt-link>
      </div>
      <div>
        <nuxt-link to="/notifications" class="block px-6 py-3 text-center text-gray-400 dark:text-gray-500 hover:text-gray-500 dark:hover:text-gray-400">
          <div class="text-2xl">
            <fa icon="bell" />
          </div>
          <div
            class="hidden xs:block text-xs leading-relaxed tracking-wide capitalize"
          >
            Oznámení
          </div>
        </nuxt-link>
      </div>
    </div>
  </nav>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  data () {
    return { menuOpen: false }
  }
})
</script>

<style lang="scss">
#navigation .nuxt-link-active {
  @apply text-purple-800;
}

#navigation .nuxt-link-active:hover {
  @apply text-purple-900;
}

html.dark {
  #navigation .nuxt-link-active {
    @apply text-purple-500;
  }

  #navigation .nuxt-link-active:hover {
    @apply text-purple-400;
  }
}
</style>
