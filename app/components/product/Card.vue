<script setup lang="ts">
import { Line } from 'vue-chartjs'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { getChartConfigData, chartOptions } from '@/utils/chartConfig'
import type { IProductPriceData } from '@/types/chart'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

interface IProps {
  product: {
    history: {
      price: number
      crawlDate: string
    }[]
    img: string
    title: string
    price: number
    link: string
    crawlDate: string
  }
  isRowView: boolean
}

const props = defineProps<IProps>()

const dayjs = useDayjs()
const priceData = computed(() => {
  const data: IProductPriceData = {
    prices: [],
    dates: [],
  }

  props.product.history?.forEach((history) => {
    data.dates.push(dayjs(history.crawlDate).format('DD/MM'))
    data.prices.push(history.price)
  })

  return data
})

const chartData = ref(getChartConfigData(priceData.value))
</script>
<template>
  <div
    class="bg-white dark:bg-gray-800 rounded-lg shadow-lg transition-colors duration-300"
    :class="isRowView ? 'flex items-center p-4 space-x-4' : 'p-6'"
  >
    <!-- Row View -->
    <div
      v-if="isRowView"
      class="grid grid-cols-12 items-center justify-start gap-2"
    >
      <NuxtImg
        src="/img/macbook.png"
        :alt="product.title"
        class="object-cover rounded col-span-1"
      />

      <p class="font-semibold text-gray-800 dark:text-white col-span-6">
        {{ product.title }}
      </p>

      <div class="col-span-3">
        <h4 class="text-sm font-semibold mb-1 text-gray-600 dark:text-gray-300">
          Price History (Last 7 Days)
        </h4>
        <div class="rounded h-24">
          <Line :data="chartData" :options="chartOptions" />
        </div>
      </div>
      <p
        class="font-bold text-gray-800 dark:text-white text-2xl hidden sm:block col-span-2 ml-auto"
      >
        ${{ product.price?.toFixed(2) }}
      </p>
    </div>
    <!-- Column View -->
    <template v-else>
      <NuxtImg
        src="/img/macbook.png"
        :alt="product.title"
        class="object-cover rounded w-full h-48 mb-4"
      />
      <div class="space-y-4">
        <p class="font-semibold text-gray-800 dark:text-white h-24">
          {{ product.title }}
        </p>
        <div class="mb-4">
          <h4
            class="text-sm font-semibold mb-1 text-gray-600 dark:text-gray-300"
          >
            Price History (Last 7 Days)
          </h4>
          <div class="rounded h-48">
            <Line :data="chartData" :options="chartOptions" />
          </div>
        </div>
        <p class="font-bold text-gray-800 dark:text-white text-2xl mb-4">
          ${{ product.price?.toFixed(2) }}
        </p>
      </div>
    </template>
  </div>
</template>
