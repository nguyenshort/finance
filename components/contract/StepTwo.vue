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
      <van-button type="danger" round @click='openFanpage'>
        {{ LoanStatus.PENDING === loan.status ? 'LIÊN HỆ THẨM ĐỊNH VIÊN' : 'LIÊN HỆ CHĂM SÓC KHÁCH HÀNG' }}
      </van-button>
    </div>

    <div class="border-b border-gray-200 mb-3 mt-7"></div>

    <contract-sumary :loan="loan" />

  </div>
</template>

<script lang="ts" setup>
import {GetLoan_loan} from "~/apollo/queries/__generated__/GetLoan";
import { GET_SUPPORTER } from '~/apollo/queries/user.query'
import { GetSupporter } from '~/apollo/queries/__generated__/GetSupporter'

defineProps<{
  loan: Pick<GetLoan_loan, 'id' | 'amount' | 'signature' | 'months' | 'status'>
}>()

const { data } = useLazyAsyncQuery<GetSupporter>(GET_SUPPORTER)
const supporter = computed(() => data.value?.me?.collaborator)

const openFanpage = () => {
  // open link in the new tab
  supporter.value?.fanpage && window.open(supporter.value?.fanpage, '_blank')
}
</script>

<style scoped></style>
