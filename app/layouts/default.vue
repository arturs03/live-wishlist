<script setup lang="ts"></script>
<template>
  <div class="container">
    <TheNavigation class="mb-4" />
    <slot />
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
