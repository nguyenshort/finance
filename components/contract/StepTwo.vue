<template>
  <div class="mt-5 text-center">
    <div class="flex justify-center">
      <van-button :loading="loan.status === LoanStatus.PENDING" :type="loan.status === LoanStatus.PENDING ? 'primary' : 'success'" loading-text="Đang xét duyệt" round>
        {{ loan.status === LoanStatus.PENDING ? 'ĐANG XÉT DUYỆT' : 'XÉT DUYỆT THÀNH CÔNG' }}
      </van-button>
    </div>

    <p class="text-gray-600 text-sm mt-4">Nhấn vào nút bên dưới để liên hệ chăm sóc khách hàng</p>

    <p v-if="loan.status === LoanStatus.PENDING" class="text-sm mt-2 font-semibold">Xét duyệt hồ sơ</p>

    <div class="py-1">
      <strong class="arrow-infinite">↓</strong>
    </div>

    <div class="flex justify-center">
      <van-button type="danger" round>
        {{ LoanStatus.PENDING === loan.status ? 'LIÊN HỆ THẨM ĐỊNH VIÊN' : 'LIÊN HỆ CHĂM SÓC KHÁCH HÀN' }}
      </van-button>
    </div>

    <div class="border-b border-gray-200 mb-3 mt-7"></div>

    <contract-sumary :loan="loan" />

  </div>
</template>

<script lang="ts" setup>
import {GetLoan_loan} from "~/apollo/queries/__generated__/GetLoan";

defineProps<{
  loan: Pick<GetLoan_loan, 'id' | 'amount' | 'signature' | 'months' | 'status'>
}>()
</script>

<style scoped></style>
