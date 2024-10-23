<script setup lang="ts">
const MENU_ITEMS = [
  {
    label: 'Home',
    icon: 'material-symbols:home',
    path: '/',
  },
  {
    label: 'Authorize',
    icon: 'material-symbols:account-circle-outline',
    path: '/auth',
  },
]

const COLOR_MODE_LIGHT = 'light'
const COLOR_MODE_DARK = 'dark'

const colorMode = useColorMode()

function toggleColorMode() {
  colorMode.value =
    colorMode.value === COLOR_MODE_DARK ? COLOR_MODE_LIGHT : COLOR_MODE_DARK
}
</script>
<template>
  <div class="flex gap-4 items-center">
    <div v-for="menuItem in MENU_ITEMS" :key="menuItem.icon">
      <NuxtLink :to="menuItem.path" class="flex items-center gap-2">
        <Icon :name="menuItem.icon" class="text-xl" />
        <p class="mb-0 text-xl">{{ menuItem.label }}</p>
      </NuxtLink>
    </div>
    <div class="border-l border-l-gray-400" />
    <Icon
      :name="
        $colorMode.value === COLOR_MODE_DARK
          ? 'material-symbols:nightlight-outline'
          : 'material-symbols:sunny-outline-rounded'
      "
      class="text-xl"
      @click="toggleColorMode"
    />
  </div>
</template>
