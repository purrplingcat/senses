<template>
  <div class="container mx-auto px-6">
    <div role="heading" class="py-6">
      <h2 class="text-2xl font-extrabold tracking-wide capitalize">
        Můj dům
      </h2>
    </div>
    <content>
      <section class="mb-6">
        <h3 class="font-bold text-gray-800 text-lg pb-2 mb-4">
          Místnosti
        </h3>
        <div class="grid grid-flow-row grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2">
          <nuxt-link v-for="room in rooms" :key="room.name" :to="`/room/${room.name}`" class="block shadow rounded-sm bg-white p-3">
            <div class="text-center leading-relaxed">
              <svg-icon :name="room.icon || 'rooms/cube'" class="w-16 h-16 mx-auto mb-2" />
              <span class="block font-bold text-gray-700">{{ room.title || 'Neznámá místnost' }}</span>
              <span class="block text-xs text-gray-500">{{ room.deviceCount }} zařízení</span>
            </div>
          </nuxt-link>
        </div>
      </section>
      <section class="mb-6">
        <h3 class="font-bold text-gray-800 text-lg pb-2 mb-4">
          Kamery
        </h3>
        <div class="grid grid-flow-row grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2">
          <div class="shadow rounded-sm bg-white p-3">
            <div class="text-center leading-relaxed">
              <img src="~/assets/images/cctv.png" class="mx-auto mb-2">
              <span class="block font-bold text-gray-700">Hlavní vchod</span>
            </div>
          </div>
          <div class="shadow rounded-sm bg-white p-3">
            <div class="text-center leading-relaxed">
              <img src="~/assets/images/cctv.png" class="mx-auto mb-2">
              <span class="block font-bold text-gray-700">Krámek</span>
            </div>
          </div>
          <div class="shadow rounded-sm bg-white p-3">
            <div class="text-center leading-relaxed">
              <img src="~/assets/images/cctv.png" class="mx-auto mb-2">
              <span class="block font-bold text-gray-700">Dolní garáž</span>
            </div>
          </div>
        </div>
      </section>
      <section class="py-6">
        <button class="mx-auto block px-6 py-3 font-light rounded-sm bg-purple-700 tracking-wide text-white shadow-lg hover:bg-purple-900">
          Všechna zařízení
        </button>
      </section>
    </content>
  </div>
</template>

<script>
import roomQuery from '@/queries/room'

export default {
  apollo: {
    rooms: {
      query: roomQuery.AllRooms
    },
  }
}
</script>
