<script setup lang="ts"></script>
<template>
  <div class="min-h-screen transition-colors duration-300 flex">
    <TheNavigation class="mb-4" />
    <div class="container mx-auto p-8">
      <slot />
    </div>
  </div>
</template>
<style>
body {
  background-color: #fff;
  color: rgba(0, 0, 0, 0.8);
}

.dark-mode body {
  background-color: #091a28;
  color: #ebf4f1;
}
</style>
