<template>
  <div>
    <div class="px-20 mt-5">
      <img src="/images/contact.jpg" alt="" />
    </div>
    <div class="text-green-500 text-sm text-center mt-3">Nhấn vào nút bên dưới và chờ 3 giây để liên kết Dịch vụ THẨM ĐỊNH VIÊN</div>

    <div class="flex justify-center mt-5">
      <van-button type="primary" round>LIÊN HỆ THẨM ĐỊNH VIÊN</van-button>
    </div>

    <div class="mt-4 text-sm text-center text-rose-800">
      Thời gian làm việc từ 8:30 → 20:30
    </div>

  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  middleware: ['cskh']
})
</script>

<style scoped></style>
