<template>
  <nav id="navigation" class="bg-white w-full overflow-x-auto shadow border-gray-200 border-solid border-t">
    <div class="text-gray-500 flex flex-row justify-items-center justify-center">
      <div>
        <nuxt-link to="/" class="block px-6 py-3 text-center">
          <div class="text-2xl">
            <fa icon="home" />
          </div>
          <div class="hidden xs:block text-xs leading-relaxed tracking-widest capitalize">
            Můj dům
          </div>
        </nuxt-link>
      </div>
      <div>
        <nuxt-link to="/scenes" class="block px-6 py-3 text-center">
          <div class="text-2xl">
            <fa icon="couch" />
          </div>
          <div class="hidden xs:block text-xs leading-relaxed tracking-wide capitalize">
            Nálady
          </div>
        </nuxt-link>
      </div>
      <div>
        <nuxt-link to="/favorites" class="block px-6 py-3 text-center">
          <div class="text-2xl">
            <fa icon="heart" />
          </div>
          <div class="hidden xs:block text-xs leading-relaxed tracking-wide capitalize">
            Oblíbené
          </div>
        </nuxt-link>
      </div>
      <div>
        <nuxt-link to="/notifications" class="block px-6 py-3 text-center">
          <div class="text-2xl">
            <fa icon="bell" />
          </div>
          <div class="hidden xs:block text-xs leading-relaxed tracking-wide capitalize">
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

<style>
#navigation .nuxt-link-active {
  @apply text-purple-900;
}
</style>
