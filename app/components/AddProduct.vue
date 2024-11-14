<script setup>
import { reactive } from 'vue'
import { Form, Field, ErrorMessage } from 'vee-validate'
import * as zod from 'zod'

const schema = toTypedSchema(
  zod.object({
    productTitle: zod.string().min(1, 'Title is required'),
  })
)

const formData = reactive({
  productTitle: '',
})

const onSubmit = async (values) => {
  const response = await $fetch('/api/save-product-data', {
    query: {
      item: formData.productTitle,
    },
  })

  console.log(response)
}
</script>

<template>
  <div
    class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 transition-colors duration-300"
  >
    <h2 class="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
      Add New Product
    </h2>
    <Form v-slot="{ errors }" :validation-schema="schema" @submit="onSubmit">
      <div class="mb-6">
        <label
          for="productTitle"
          class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
        >
          Title Selector
        </label>
        <Field
          id="productTitle"
          v-model="formData.productTitle"
          name="productTitle"
          type="text"
          class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          :class="{ 'border-red-500': errors.productTitle }"
        />
        <ErrorMessage name="productTitle" class="text-red-500 text-sm mt-1" />
      </div>

      <button
        type="submit"
        class="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-300"
      >
        Get product data
      </button>
    </Form>
  </div>
</template>
