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

    <div v-if="loan" class="px-4">
      <contract-step-one v-if="!loan?.signature" @next="currentStep = 1" :loan="loan" @update="refresh()" />
      <contract-step-two v-else :loan="loan" />
    </div>

  </div>
</template>

<script lang="ts" setup>
import {GetLoan} from "~/apollo/queries/__generated__/GetLoan";

definePageMeta({
  middleware: ['contract'],
})
const { data, refresh } = await useAsyncQuery<GetLoan>(GET_LOAN)
const loan = computed(() => data.value?.loan)

const currentStep = computed(() => {

  if(!loan.value) {
    return -1
  }

  if(!loan.value.signature) {
    return 0
  } else if (loan.value.status === LoanStatus.PENDING) {
    return 1
  } else {
    return 2
  }

})
</script>

<style scoped></style>
