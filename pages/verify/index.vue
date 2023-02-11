<template>
  <div>
    <van-nav-bar
        title="Xác Minh Điều Kiện Vay"
        left-arrow
        class="bg-gradient-to-r from-primary-500 to-primary-700"
        @click-left="$router.back()"
    />

    <div class="py-3">

      <template v-if="verified">
        <div class="pb-16 flex justify-center flex-col items-center">
          <div class="w-[400px] -my-12">
            <vue-lottie-player path="https://assets10.lottiefiles.com/packages/lf20_9s417nlp.json" autoplay loop height="90%" width="100%"></vue-lottie-player>
          </div>

          <p class="mb-6 text-[13px] text-gray-500">Bạn đã xác thực thông tin cá nhân vay.</p>

          <div class="w-[100px]">
            <van-button round type="primary" @click="$router.push('/loan')">Vay Ngay</van-button>
          </div>
        </div>
      </template>

      <template v-else>
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
      </template>

    </div>

  </div>
</template>

<script lang="ts" setup>
import {VERIFIED_DATA} from "~/apollo/queries/loan.query"
import {VerifiedData} from "~/apollo/queries/__generated__/VerifiedData"

definePageMeta({
  middleware: ['verify'],
})

const currentStep = ref(0)
const showExample = ref(false)

const { data } = await useAsyncQuery<VerifiedData>(VERIFIED_DATA)
const info = computed(() => data.value?.info)
const bank = computed(() => data.value?.bank)
const identity = computed(() => data.value?.identity)

const verified = computed(() => Object.values(data.value || {}).length && Object.values(data.value || {}).every(item => item))

</script>

<style scoped></style>
