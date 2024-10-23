<script setup>
import { reactive } from 'vue'
import { Form, Field, ErrorMessage } from 'vee-validate'
import * as zod from 'zod'
import { toFormValidator } from '@vee-validate/zod'

const schema = toFormValidator(
  zod.object({
    url: zod.string().url('Please enter a valid URL'),
    imageSelector: zod.string().min(1, 'Image selector is required'),
    priceSelector: zod.string().min(1, 'Price selector is required'),
    titleSelector: zod.string().min(1, 'Title selector is required'),
  })
)

const formData = reactive({
  url: '',
  imageSelector: '',
  priceSelector: '',
  titleSelector: '',
})

const onSubmit = (values) => {
  console.log('Form submitted:', values)
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
      <div class="mb-4">
        <label
          for="url"
          class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          >Product URL</label
        >
        <Field
          id="url"
          v-model="formData.url"
          name="url"
          type="url"
          class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          :class="{ 'border-red-500': errors.url }"
        />
        <ErrorMessage name="url" class="text-red-500 text-sm mt-1" />
      </div>

      <div class="mb-4">
        <label
          for="imageSelector"
          class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          >Image Selector</label
        >
        <Field
          id="imageSelector"
          v-model="formData.imageSelector"
          name="imageSelector"
          type="text"
          class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          :class="{ 'border-red-500': errors.imageSelector }"
        />
        <ErrorMessage name="imageSelector" class="text-red-500 text-sm mt-1" />
      </div>

      <div class="mb-4">
        <label
          for="priceSelector"
          class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          >Price Selector</label
        >
        <Field
          id="priceSelector"
          v-model="formData.priceSelector"
          name="priceSelector"
          type="text"
          class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          :class="{ 'border-red-500': errors.priceSelector }"
        />
        <ErrorMessage name="priceSelector" class="text-red-500 text-sm mt-1" />
      </div>

      <div class="mb-6">
        <label
          for="titleSelector"
          class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          >Title Selector</label
        >
        <Field
          id="titleSelector"
          v-model="formData.titleSelector"
          name="titleSelector"
          type="text"
          class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          :class="{ 'border-red-500': errors.titleSelector }"
        />
        <ErrorMessage name="titleSelector" class="text-red-500 text-sm mt-1" />
      </div>

      <button
        type="submit"
        class="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-300"
      >
        Add Product
      </button>
    </Form>
  </div>
</template>
