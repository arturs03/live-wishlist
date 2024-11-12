<script setup lang="ts">
import type { ICrawledData } from '~~/shared/types'
import { groupArray } from '@/utils/arrays'
import { breakpointsTailwind } from '@vueuse/core'

const props = defineProps<{
  products: ICrawledData[]
  isRowView: boolean
}>()

const breakpoints = useBreakpoints(breakpointsTailwind)
const isTablet = breakpoints.isInBetween('md', 'xl')

const productItems = ref()

productItems.value = props.isRowView
  ? props.products
  : groupArray<ICrawledData>(props.products, isTablet ? 2 : 3)

const { list, wrapperProps, containerProps } = useVirtualList(productItems, {
  itemHeight: props.isRowView ? 160 : 664,
  overscan: 6,
})
</script>
<template>
  <div class="overflow-x-auto">
    <div v-bind="containerProps" style="height: 1000px">
      <div v-bind="wrapperProps">
        <div v-if="isRowView" class="flex flex-col gap-4">
          <ProductCard
            v-for="product in list"
            :key="product.index"
            :product="product.data"
            :is-row-view="isRowView"
            class="h-40"
          />
        </div>
        <template v-else>
          <div
            v-for="row in list"
            :key="row.index"
            class="grid gap-4"
            :class="isRowView ? 'grid-cols-1 mb-4' : 'grid-cols-3'"
          >
            <ProductCard
              v-for="product in row.data"
              :key="product.link"
              :product="product"
              :is-row-view="isRowView"
              class="mb-4 height-[648px]"
            />
          </div>
        </template>
      </div>
    </div>
  </div>
</template>
