<template>
  <div>
    <div class="flex flex-col w-full py-3">
      <label class="text-sm text-gray-600 font-semibold mb-1">Jas</label>
      <slider height="0.75rem" dot-size="24" :contained="true" />
    </div>
    <div class="flex flex-col w-full py-3">
      <label class="text-sm text-gray-600 font-semibold mb-1">Profil</label>
      <select
        v-model="mode"
        class="mt-2 custom-select px-4 py-2 tracking-wider text-sm text-gray-900 rounded-md border border-gray-300"
      >
        <option value="color">
          Barva
        </option>
        <option value="preset">
          Předvolba
        </option>
        <option value="rgb">
          RGB
        </option>
      </select>
    </div>
    <div
      v-show="mode === 'color'"
      class="flex flex-col w-full py-3 -mt-3"
    >
      <div class="flex flex-row flex-wrap -mx-3">
        <ColorSwatch
          name="color"
          value="#991b1e"
          color="bg-red-800"
          outline-color="ring-red-400"
          :checked="color === '#991b1e'"
          @click="color = '#991b1e'"
        />
        <ColorSwatch
          name="color"
          value="#ef4444"
          color="bg-red-500"
          outline-color="ring-red-300"
          :checked="color === '#ef4444'"
          @click="color = '#ef4444'"
        />
        <ColorSwatch
          name="color"
          value="#f59e0b"
          color="bg-yellow-500"
          outline-color="ring-yellow-300"
          :checked="color === '#f59e0b'"
          @click="color = '#f59e0b'"
        />
        <ColorSwatch
          name="color"
          value="#fcd34d"
          color="bg-yellow-300"
          outline-color="ring-yellow-200"
          :checked="color === '#fcd34d'"
          @click="color = '#fcd34d'"
        />
        <ColorSwatch
          name="color"
          value="#047857"
          color="bg-green-700"
          outline-color="ring-green-400"
          :checked="color === '#047857'"
          @click="color = '#047857'"
        />
        <ColorSwatch
          name="color"
          value="#10b981"
          color="bg-green-500"
          outline-color="ring-green-300"
          :checked="color === '#10b981'"
          @click="color = '#10b981'"
        />
        <ColorSwatch
          name="color"
          value="#6ee7b7"
          color="bg-green-300"
          outline-color="ring-green-200"
          :checked="color === '#6ee7b7'"
          @click="color = '#6ee7b7'"
        />
        <ColorSwatch
          name="color"
          value="#67e8f9"
          color="bg-cyan-300"
          outline-color="ring-cyan-200"
          :checked="color === '#67e8f9'"
          @click="color = '#67e8f9'"
        />
        <ColorSwatch
          name="color"
          value="#22d3ee"
          color="bg-cyan-400"
          outline-color="ring-cyan-200"
          :checked="color === '#22d3ee'"
          @click="color = '#22d3ee'"
        />
        <ColorSwatch
          name="color"
          value="#3b82f6"
          color="bg-blue-500"
          outline-color="ring-blue-300"
          :checked="color === '#3b82f6'"
          @click="color = '#3b82f6'"
        />
        <ColorSwatch
          name="color"
          value="#a855f7"
          color="bg-purple-500"
          outline-color="ring-purple-300"
          :checked="color === '#a855f7'"
          @click="color = '#a855f7'"
        />
        <ColorSwatch
          name="color"
          value="#8b5cf6"
          color="bg-indigo-500"
          outline-color="ring-indigo-300"
          :checked="color === '#8b5cf6'"
          @click="color = '#8b5cf6'"
        />
        <ColorSwatch
          name="color"
          value="#db2777"
          color="bg-pink-600"
          outline-color="ring-pink-400"
          :checked="color === '#db2777'"
          @click="color = '#db2777'"
        />
        <ColorSwatch
          name="color"
          value="#ec4899"
          color="bg-pink-500"
          outline-color="ring-pink-300"
          :checked="color === '#ec4899'"
          @click="color = '#ec4899'"
        />
        <ColorSwatch
          name="color"
          value="#f9a8d4"
          color="bg-pink-300"
          outline-color="ring-pink-200"
          :checked="color === '#f9a8d4'"
          @click="color = '#f9a8d4'"
        />
        <ColorSwatch
          name="color"
          value="#ffffff"
          color="bg-white"
          outline-color="ring-gray-300"
          border-color="border-gray-300"
          :checked="color === '#ffffff'"
          @click="color = '#ffffff'"
        />
      </div>
    </div>
    <div
      v-show="mode === 'rgb'"
      class="flex flex-col w-full py-3 -mt-1"
    >
      <div class="flex flex-row flex-nowrap justify-between items-center">
        <div class="flex-grow">
          <input
            id="rgb"
            v-model="color"
            type="color"
            class="hidden"
            name="rgb"
          >
          <input
            v-model="color"
            type="text"
            class="px-4 py-2 w-full tracking-wider text-sm text-gray-900 rounded-md border border-gray-300"
          >
        </div>
        <label for="rgb" class="flex cursor-pointer w-8 ml-2">
          <span
            class="w-8 h-8 rounded-full shadow-md border border-gray-300"
            :style="`background-color: ${color || 'black'}`"
          />
        </label>
      </div>
    </div>
    <div class="flex flex-col w-full py-3">
      <label class="text-sm text-gray-600 font-semibold mb-1">Režim</label>
      <RadioButtons
        class="mt-2"
        :options="{ c: 'Ráno', a: 'Den', b: 'Noc' }"
        value="a"
      />
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      mode: 'color',
      color: ''
    }
  }
}
</script>
