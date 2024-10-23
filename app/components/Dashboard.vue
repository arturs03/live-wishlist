<script setup>
const isCardView = ref(true)

const toggleView = () => {
  isCardView.value = !isCardView.value
}

// Dummy product data
const products = ref([
  {
    id: 1,
    title: 'Smartphone X',
    image: '/img/iphone.png',
    currentPrice: 499.99,
    priceHistory: [520, 510, 505, 500, 499.99, 499.99, 499.99],
    hasPriceDropped: true,
  },
  {
    id: 2,
    title: 'Laptop Pro',
    image: '/img/macbook.png',
    currentPrice: 1299.99,
    priceHistory: [
      1299.99, 1299.99, 1299.99, 1299.99, 1299.99, 1299.99, 1299.99,
    ],
    hasPriceDropped: false,
  },
])
</script>
<template>
  <div class="flex flex-col md:flex-row min-h-screen w-full">
    <!-- Main Content -->
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
        </div>
      </div>
      <div class="overflow-x-auto">
        <div
          :class="[
            isCardView
              ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
              : 'space-y-6',
          ]"
        >
          <ProductCard
            v-for="product in products"
            :key="product.id"
            :product="product"
            :is-row-view="!isCardView"
          />
        </div>
      </div>
    </main>
  </div>
</template>
