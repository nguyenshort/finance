<template>
  <div class="flex flex-col justify-center items-center">
    <div class="mb-1">{{ title }}</div>
    <img class="w-[235px] h-auto" :src="image"  alt="" />
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  title: string,
  image: string
}>()
</script>

<style scoped></style>
