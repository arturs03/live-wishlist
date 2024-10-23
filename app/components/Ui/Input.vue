<script setup lang="ts">
const modelValue = defineModel()
</script>
<template>
  <label class="flex flex-col gap-2">
    <slot />
    <input
      v-model="modelValue"
      class="px-4 py-2 border border-gray-500 rounded-md dark:border-gray-200"
    >
  </label>
</template>
