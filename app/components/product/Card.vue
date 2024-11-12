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
    <NuxtImg
      src="/img/macbook.png"
      :alt="product.title"
      class="object-cover rounded"
      :class="isRowView ? 'w-16 h-16 flex-shrink-0' : 'w-full h-48 mb-4'"
    />
    <div
      :class="
        isRowView
          ? 'flex flex-grow items-center space-x-4 flex-wrap'
          : 'space-y-4'
      "
    >
      <p
        class="font-semibold text-gray-800 dark:text-white mb-2"
        :class="isRowView ? 'w-[60%]' : 'h-24 '"
      >
        {{ product.title }}
      </p>

      <div :class="isRowView ? 'flex-grow max-w-xs' : 'mb-4'">
        <h4 class="text-sm font-semibold mb-1 text-gray-600 dark:text-gray-300">
          Price History (Last 7 Days)
        </h4>
        <div
          class="bg-gray-100 dark:bg-gray-700 rounded"
          :class="isRowView ? 'h-24' : 'h-48'"
        >
          <Line :data="chartData" :options="chartOptions" />
        </div>
      </div>
      <p
        class="font-bold text-gray-800 dark:text-white text-2xl"
        :class="isRowView ? 'hidden sm:block' : 'mb-4'"
      >
        ${{ product.price?.toFixed(2) }}
      </p>
    </div>
  </div>
</template>
