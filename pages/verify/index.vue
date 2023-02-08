<template>
  <div>
    <van-nav-bar
        title="Xác Minh Điều Kiện Vay"
        left-arrow
        class="bg-gradient-to-r from-primary-500 to-primary-700"
        @click-left="$router.back()"
    />

    <div class="py-3">
      <van-steps :active="currentStep" active-color="#38f" inactive-color="#969799">
        <van-step>XM Tên Thật</van-step>
        <van-step>Thông Tin</van-step>
        <van-step>NH Hưởng Thụ</van-step>
      </van-steps>

      <div v-if="showExample" class="text-center">

        <h3 class="font-semibold text-xl mb-4">Hướng Dẫn</h3>

        <verify-step-item title="Mặt Trước CMND" image="/images/CMND_MT.jpeg" />
        <verify-step-item class="mt-5" title="Mặt Sau CMND" image="/images/CMND_MS.jpeg" />
        <verify-step-item class="mt-5" title="Ảnh Chân Dung" image="/images/AVATAR.jpeg" />

        <div class="flex justify-center mt-5">
          <button class="btn-effect btn-text-size px-5 py-2 uppercase" @click="showExample = false">Đã Hiểu</button>
        </div>

      </div>

      <verify-step-one v-else-if="currentStep === 0" @next="currentStep = 1" />

      <verify-step-two v-else-if="currentStep === 1" @next="currentStep = 2" />

      <verify-step-three v-else-if="currentStep === 2" />

    </div>

  </div>
</template>

<script lang="ts" setup>
const currentStep = ref(0)
const showExample = ref(false)
</script>

<style scoped></style>
