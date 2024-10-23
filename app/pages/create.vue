<script setup lang="ts">
const gameName = ref('')
function submit() {}
</script>
<template>
  <div>
    <form @submit.prevent="submit">
      <UiInput v-model="gameName"> Game name</UiInput>
    </form>
  </div>
</template>
