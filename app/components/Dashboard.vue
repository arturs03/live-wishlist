<script setup lang="ts">
import type { ICrawledData } from '@@/shared/types'

const isRowView = ref(true)

const { data, refresh } = await useFetch('/api/product-data')
const products: Ref<ICrawledData[]> = ref(
  JSON.parse(JSON.stringify(data.value))
)

const toggleView = () => {
  isRowView.value = !isRowView.value
}
</script>
<template>
  <div class="flex flex-col md:flex-row min-h-screen w-full">
    <main class="flex-1">
      <div class="flex flex-col md:flex-row justify-between items-center mb-8">
        <h1
          class="text-2xl font-bold text-gray-800 dark:text-white mb-4 md:mb-0"
        >
          Product Dashboard
        </h1>
        <div class="flex items-center space-x-4">
          <button
            class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors duration-300 flex items-center"
            @click="toggleView"
          >
            <Icon
              :name="
                isRowView ? 'ic:baseline-view-list' : 'ic:baseline-grid-view'
              "
              class="mr-2"
            />
            {{ isRowView ? 'Switch to Card View' : 'Switch to Row View' }}
          </button>

          <button
            class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors duration-300 flex items-center"
            @click="refresh()"
          >
            Refresh
          </button>
        </div>
      </div>
      <ProductList
        v-if="products?.length"
        :key="`view-${isRowView}`"
        :products="products"
        :is-row-view="isRowView"
      />

      <NuxtLink
        v-else
        to="/add-product"
        class="text-2xl flex items-center gap-2"
      >
        <span>Add product </span> <Icon name="line-md:plus" size="32"
      /></NuxtLink>
    </main>
  </div>
</template>
