<template>
  <div>
    <div class="bg-gradient-to-r from-primary-500 to-primary-700 text-white px-3 py-2 font-semibold flex items-center justify-between">
      <span>Thẻ ngân hàng của bạn</span>
      <button @click='$router.push("/")'>
        <van-icon name="wap-home-o" :size='20' />
      </button>
    </div>

    <div class="atm-card relative overflow-hidden">

      <img class="relative" src="/images/backroundCard.jpeg" alt="" />

      <img v-if="currentBank" class="h-[40px] absolute top-5 right-1" :src="currentBank.logo"  alt=""/>
      <img class="w-[40px] absolute top-5 left-1" src="/images/sim.png"  alt=""/>

      <div class="absolute bottom-5 left-5 p-4 stk-info">
        <div>{{ cardNumber }}</div>
        <div class="mt-1">
          {{ bank?.name }}
        </div>
      </div>

    </div>
  </div>
</template>

<script lang="ts" setup>
import {GetBank} from "~/apollo/queries/__generated__/GetBank"
import {GET_BANK} from "~/apollo/queries/bank.query"
import {IBank} from "~/entities/verify.entity"

const { data } = await useAsyncQuery<GetBank>(GET_BANK)
const bank = computed(() => data.value?.bank)

const res = await useFetch<{
  data: IBank[]
}>('https://api.vietqr.io/v2/banks')
const banks = computed(() => res.data.value?.data || [])

// show only last four card number **** **** **** 5679
const cardNumber = computed(() => {
  const card = bank.value?.account
  if (!card) return ''
  return card.split('').map((c, i) => {
    if (i < card.length - 4) return '*'
    return c
  }).join('')
})

const currentBank = computed(() => {
  const bankName = bank.value?.bank
  if (!bankName) return null
  return banks.value.find(b => b.shortName === bankName)
})
</script>

<style scoped></style>
