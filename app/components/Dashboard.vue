<script setup lang="ts">
import { groupArray } from '@/utils/arrays'
import { breakpointsTailwind } from '@vueuse/core'
import type { ICrawledData } from '@@/shared/types'

const isCardView = ref(true)

const { data, refresh } = await useFetch('/api/product-data')
const products: Ref<ICrawledData[]> = ref(
  JSON.parse(JSON.stringify(data.value))
)

const breakpoints = useBreakpoints(breakpointsTailwind)
const isTablet = breakpoints.isInBetween('md', 'xl')

const itemsSplitInGrid = ref()
function setProductItems() {
  itemsSplitInGrid.value = isCardView.value
    ? groupArray<ICrawledData>(products.value, isTablet ? 2 : 3)
    : products.value
}

setProductItems()

const toggleView = () => {
  isCardView.value = !isCardView.value
  setProductItems()
}

async function crawlData() {
  $fetch('/api/save-product-data')
  refresh()
}

const { list, containerProps, wrapperProps } = useVirtualList(
  itemsSplitInGrid,
  {
    itemHeight: isCardView.value ? 664 : 266,
    overscan: 6,
  }
)
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
                isCardView ? 'ic:baseline-view-list' : 'ic:baseline-grid-view'
              "
              class="mr-2"
            />
            {{ isCardView ? 'Switch to Row View' : 'Switch to Card View' }}
          </button>

          <button
            class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors duration-300 flex items-center"
            @click="crawlData"
          >
            Crawl
          </button>
        </div>
      </div>
      <div class="overflow-x-auto">
        <div v-bind="containerProps" style="height: 1000px">
          <div v-bind="wrapperProps">
            <div
              v-for="row in list"
              class="grid gap-4"
              :class="isCardView ? 'grid-cols-3' : ''"
            >
              <ProductCard
                v-for="product in row.data"
                :key="product.link"
                :product="product"
                :is-row-view="!isCardView"
                class="mb-4"
                :style="`height: ${isCardView ? '648px' : '250px'}`"
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>
