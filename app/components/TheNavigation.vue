<script setup lang="ts">
const colorMode = useColorMode()

const COLOR_MODE_LIGHT = 'light'
const COLOR_MODE_DARK = 'dark'

function toggleColorMode() {
  colorMode.preference =
    colorMode.value === COLOR_MODE_DARK ? COLOR_MODE_LIGHT : COLOR_MODE_DARK
}

const MENU_ITEMS = [
  {
    label: 'Dashboard',
    icon: 'ic:baseline-dashboard',
    path: '/',
  },
  {
    label: 'Add product',
    icon: 'ic:baseline-add-circle',
    path: '/add-product',
  },
  {
    label: 'Authorize',
    icon: 'material-symbols:account-circle-outline',
    path: '/auth',
  },
]

const isMobileNavOpen = ref(false)
const toggleMobileNav = () => {
  isMobileNavOpen.value = !isMobileNavOpen.value
}
</script>
<template>
  <div class="w-full md:w-48">
    <aside
      class="hidden md:block h-screen fixed bg-gray-100 dark:bg-gray-800 transition-colors duration-300"
    >
      <nav class="p-6 top-0">
        <h2 class="text-xl font-bold mb-6 text-gray-800 dark:text-white">
          Menu
        </h2>
        <div class="flex flex-col gap-4">
          <div v-for="menuItem in MENU_ITEMS" :key="menuItem.icon">
            <NuxtLink
              :to="menuItem.path"
              class="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white"
            >
              <Icon :name="menuItem.icon" class="text-xl" />
              <p class="mb-0 text-xl text-nowrap">{{ menuItem.label }}</p>
            </NuxtLink>
          </div>
          <div
            class="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white cursor-pointer"
            @click="toggleColorMode"
          >
            <Icon
              :name="
                $colorMode.value === COLOR_MODE_DARK
                  ? 'material-symbols:nightlight-outline'
                  : 'material-symbols:sunny-outline-rounded'
              "
              class="text-xl"
            />
            <p class="mb-0 text-xl">
              {{
                $colorMode.value === COLOR_MODE_DARK
                  ? 'Dark Mode'
                  : 'Light Mode'
              }}
            </p>
          </div>
        </div>
      </nav>
    </aside>
    <div class="md:hidden bg-gray-100 dark:bg-gray-800 p-4">
      <button class="text-gray-800 dark:text-white" @click="toggleMobileNav">
        <Icon v-if="!isMobileNavOpen" name="ic:baseline-menu" class="h-6 w-6" />
        <Icon v-else name="ic:baseline-close" class="h-6 w-6" />
      </button>
      <nav v-if="isMobileNavOpen" class="mt-4">
        <div class="flex flex-col gap-6">
          <div v-for="menuItem in MENU_ITEMS" :key="menuItem.icon">
            <NuxtLink
              :to="menuItem.path"
              class="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white"
            >
              <Icon :name="menuItem.icon" class="text-2xl" />
              <p class="mb-0 text-2xl">{{ menuItem.label }}</p>
            </NuxtLink>
          </div>
          <div
            class="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white cursor-pointer"
            @click="toggleColorMode"
          >
            <Icon
              :name="
                $colorMode.value === COLOR_MODE_DARK
                  ? 'material-symbols:nightlight-outline'
                  : 'material-symbols:sunny-outline-rounded'
              "
              class="text-2xl"
            />
            <p class="mb-0 text-2xl">
              {{
                $colorMode.value === COLOR_MODE_DARK
                  ? 'Dark Mode'
                  : 'Light Mode'
              }}
            </p>
          </div>
        </div>
      </nav>
    </div>
  </div>
</template>
