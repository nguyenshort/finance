<template>
  <ul>
    <li class="flex text-gray-600 text-sm py-3 border-b border-gray-100">
      <div class="w-1/2">Hạn mức vay</div>
      <div class="w-1/2">{{ $moneyFormat(loan.amount) }} VND</div>
    </li>

    <li class="flex text-gray-600 text-sm py-3 border-b border-gray-100">
      <div class="w-1/2">Số kì thanh toán</div>
      <div class="w-1/2">
        {{ loan.months }}
      </div>
    </li>


    <li class="flex text-gray-600 text-sm py-3 border-b border-gray-100">
      <div class="w-1/2">Chữ ký</div>
      <div class="w-1/2">{{ !loan.signature ? 'Chưa Ký' : 'Đã Ký' }}</div>
    </li>

  </ul>
</template>

<script lang="ts" setup>
import {GetLoan_loan} from "~/apollo/queries/__generated__/GetLoan";

defineProps<{
  loan: Pick<GetLoan_loan, 'id' | 'amount' | 'signature' | 'months'>
}>()
</script>

<style scoped></style>
