<template>
  <div>
    <van-nav-bar
        title="Đăng Ký Hợp Đồng"
        left-arrow
        class="bg-gradient-to-r from-primary-500 to-primary-700"
        @click-left="$router.back()"
    />

    <div class="py-3">
      <van-steps :active="currentStep" active-color="#38f" inactive-color="#969799">
        <van-step>Thông tin hợp đồng</van-step>
        <van-step>Đang xét duyệt</van-step>
        <van-step>Xét duyệt thành công</van-step>
      </van-steps>
    </div>

    <div class="px-4">
      <contract-step-one v-if="currentStep === 0" @next="currentStep = 1"  />
      <contract-step-two v-if="currentStep === 1" />
    </div>

  </div>
</template>

<script lang="ts" setup>
import {GET_LOAN} from "~/apollo/queries/loan.query";
import {GetLoan} from "~/apollo/queries/__generated__/GetLoan";

const router = useRouter()

// verify if loan exist => /contract
const { data } = await useAsyncQuery<GetLoan>(GET_LOAN)

const loan = computed(() => data?.value?.loan)

if(!loan) {
  router.replace('/loan')
}

const currentStep = ref<number>(0)
</script>

<style scoped></style>
