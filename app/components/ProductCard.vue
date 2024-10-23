<script setup>
import { defineProps } from 'vue'

defineProps({
  product: {
    type: Object,
    required: true,
  },
  isRowView: {
    type: Boolean,
    default: false,
  },
})

const generateChartPoints = (priceHistory) => {
  const max = Math.max(...priceHistory)
  const min = Math.min(...priceHistory)
  const range = max - min

  return priceHistory
    .map((price, index) => {
      const x = (index / (priceHistory.length - 1)) * 100
      const y = 100 - ((price - min) / range) * 100
      return `${x},${y}`
    })
    .join(' ')
}
</script>
<template>
  <div
    :class="[
      'bg-white dark:bg-gray-800 rounded-lg shadow-md transition-colors duration-300',
      { 'border-2 border-green-500': product.hasPriceDropped },
      isRowView ? 'flex items-center p-4 space-x-4' : 'p-6',
    ]"
  >
    <img
      :src="product.image"
      :alt="product.title"
      :class="[
        'object-cover rounded',
        isRowView ? 'w-16 h-16 flex-shrink-0' : 'w-full h-48 mb-4',
      ]"
    >
    <div
      :class="[
        isRowView
          ? 'flex flex-grow items-center space-x-4 flex-wrap'
          : 'space-y-4',
      ]"
    >
      <div :class="[isRowView ? 'w-full sm:w-1/4 mb-2 sm:mb-0' : '']">
        <h3
          :class="[
            'font-semibold text-gray-800 dark:text-white',
            isRowView ? 'text-lg' : 'text-xl mb-2',
          ]"
        >
          {{ product.title }}
        </h3>
        <p
          :class="[
            'font-bold text-gray-800 dark:text-white',
            isRowView ? 'text-lg sm:hidden' : 'text-lg mb-4',
          ]"
        >
          ${{ product.currentPrice.toFixed(2) }}
        </p>
      </div>
      <p
        :class="[
          'font-bold text-gray-800 dark:text-white',
          isRowView ? 'text-lg hidden sm:block w-1/6' : 'text-lg mb-4',
        ]"
      >
        ${{ product.currentPrice.toFixed(2) }}
      </p>
      <div :class="[isRowView ? 'flex-grow max-w-xs' : 'mb-4']">
        <h4 class="text-sm font-semibold mb-1 text-gray-600 dark:text-gray-300">
          Price History (Last 7 Days)
        </h4>
        <div
          :class="[
            'bg-gray-100 dark:bg-gray-700 rounded',
            isRowView ? 'h-12' : 'h-24',
          ]"
        >
          <svg
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            class="w-full h-full"
          >
            <polyline
              :points="generateChartPoints(product.priceHistory)"
              fill="none"
              stroke="#4CAF50"
              stroke-width="2"
            />
          </svg>
        </div>
      </div>
      <p
        :class="[
          'text-sm font-semibold',
          product.hasPriceDropped
            ? 'text-green-500'
            : 'text-gray-600 dark:text-gray-300',
          isRowView ? 'w-full sm:w-1/6 text-right' : '',
        ]"
      >
        {{ product.hasPriceDropped ? 'Price dropped!' : 'Price unchanged' }}
      </p>
    </div>
  </div>
</template>
