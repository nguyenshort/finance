<template>
  <div class="mx-4 bg-white flex rounded-md p-4 justify-between">
    <div>
      <p class="text-sm text-gray-500 mb-2">Số Dư Khả Dụng</p>
      <p>{{ $moneyFormat(authStore.user?.balance) }} VNĐ</p>
    </div>

    <div class="flex flex-col items-end">
      <van-icon size="25" name="eye-o" class="opacity-0" />
      <a class="text-xs text-primary-500 underline mt-2">Chi tiết thu chi</a>
    </div>

  </div>
</template>

<script lang="ts" setup>
const authStore = useAuthStore()
</script>

<style scoped></style>
