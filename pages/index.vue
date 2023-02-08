<template>
  <div>
    <div class="bg-gradient-to-r from-primary-500 to-primary-700 h-[32px]">
      <client-only>
        <div class="text-white flex items-center px-4 pt-2">
          <van-icon class="mr-1" name="volume-o" />
<!--          <marquee-text :repeat="1" :duration="120">-->
<!--            <ul class="flex items-center">-->
<!--              <li v-for="(text, index) in texts" :key="index" class="mr-36">-->
<!--                {{ text }}-->
<!--              </li>-->
<!--            </ul>-->
<!--          </marquee-text>-->
        </div>
      </client-only>
    </div>

    <div class="bg-gradient-to-r from-primary-500 to-primary-700 py-4">

      <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
        <van-swipe-item>
          <div class="_img" style="background-image: url(/images/vay-tin-chap1.jpeg)" />
        </van-swipe-item>
        <van-swipe-item>
          <div class="_img" style="background-image: url(/images/vay-tin-chap2.png)" />
        </van-swipe-item>
        <van-swipe-item>
          <div class="_img" style="background-image: url(/images/vay-tin-chap3.jpeg)" />
        </van-swipe-item>
      </van-swipe>

    </div>

    <div class="text-center mt-4 text-gray-600">
      <h4 class="font-semibold text-[15px]">Khoản vay đầu tiên có sẵn</h4>
      <h5 class="font-semibold mt-0.5">30 triệu → 500 triệu đồng</h5>
    </div>

    <ul class="px-4 mt-7">
      <li>• Chỉ mất 3 phút đăng ký</li>
      <li>• Thông tin chi tiết - Lãi suất minh bạch</li>
      <li>• Nhận kết quả hồ sơ nhanh chóng </li>
    </ul>

    <div class="flex justify-center mt-6">
      <van-button round type="primary" @click="$router.push('/verify')">Bắt Đầu Vay</van-button>
    </div>

  </div>
</template>

<script lang="ts" setup></script>

<style>
#slider {
  max-height: 280px;
  max-width: 420px;
  width: 100%;
  height: 100%;
  border-radius: 5px;
  margin: 0 auto;
  overflow: hidden;
}

.my-swipe .van-swipe-item ._img {
  aspect-ratio: 420 / 220;
  background-size: cover;
  background-repeat: no-repeat;
  max-width: 420px;
  margin: 0 auto;
  border-radius: 8px;
}
</style>
