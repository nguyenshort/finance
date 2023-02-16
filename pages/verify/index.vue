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

      <verify-step-one v-else-if="currentStep === 0" @next="refresh" />

      <verify-step-two v-else-if="currentStep === 1" @next="refresh" />

      <verify-step-three v-else-if="currentStep === 2" />

    </div>

  </div>
</template>

<script lang="ts" setup>
import {VerifiedData} from "~/apollo/queries/__generated__/VerifiedData"

definePageMeta({
  middleware: ['verify'],
})

const { data, refresh } = await useAsyncQuery<VerifiedData>(VERIFIED_DATA)
const identity = computed(() => data.value?.identity)
const info = computed(() => data.value?.info)
const bank = computed(() => data.value?.bank)

const showExample = ref(!identity.value)


const currentStep = computed(() => {
  if (!identity.value) return 0
  if (!info.value) return 1
  if (!bank.value) return 2
  return 3
})
</script>

<style scoped></style>
