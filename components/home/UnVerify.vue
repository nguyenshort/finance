<template>
  <div class="text-center mt-4 text-gray-600">
    <h4 class="font-semibold text-[15px]">Khoản vay đầu tiên có sẵn</h4>
    <h5 class="font-semibold mt-0.5">30 triệu → 500 triệu đồng</h5>
  </div>

  <ul class="px-4 mt-7">
    <li>• Chỉ mất 3 phút đăng ký</li>
    <li>• Thông tin chi tiết - Lãi suất minh bạch</li>
    <li>• Nhận kết quả hồ sơ nhanh chóng</li>
  </ul>

  <div class="flex justify-center mt-6">
    <van-button round type="primary" @click="$router.push('/verify')"
      >Bắt Đầu Vay</van-button
    >
  </div>
</template>

<script>
export default {
  name: 'UnVerify',
}
</script>

<style scoped></style>
