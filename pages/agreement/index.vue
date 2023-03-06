<template>
  <div>
    <van-nav-bar
      title="Thông Tin Hợp Đồng"
      left-arrow
      class="bg-gradient-to-r from-primary-500 to-primary-700"
      @click-left="$router.push('/')"
    >
      <template #right>
        <van-icon name="wap-home" @click='$router.push("/")' size='20' />
      </template>
    </van-nav-bar>

    <agreement-avatar />

    <div class='px-7'>
      <button v-if='isSign' class='block mt-5 bg-[#0283cb] w-full text-white py-2 rounded-full text-left px-5' @click='showConstract = true'>
        <van-icon name="balance-list" class='mr-3'  />
        <span class='text-[15px]'>Hợp Đồng Vay</span>
      </button>

      <button v-if='isSign' class='block mt-5 bg-[#0283cb] w-full text-white py-2 rounded-full text-left px-5' @click='showConstract2 = true'>
        <van-icon name="manager" class='mr-3' />
        <span class='text-[15px]'>Thông tin cá nhân</span>
      </button>

      <button
        v-if='isSign'
        class='block mt-5 bg-[#0283cb] w-full text-white py-2 rounded-full text-left px-5' @click='show = true'
      >
        <van-icon name="balance-list" class='mr-3' />
        <span class='text-[15px]'>Lãi xuất hằng tháng</span>
      </button>

      <contract-collaborator v-if='isSign'>
        <template #default='{ open }'>
          <button class='block mt-5 bg-[#0283cb] w-full text-white py-2 rounded-full text-left px-5' @click='open'>
            <van-icon name="service" class='mr-3' />
            <span class='text-[15px]'>
              Liên hệ tư vấn - hỗ trợ
            </span>
          </button>
        </template>
      </contract-collaborator>

      <div class='flex items-center justify-center mt-6'>
        <button class='text-white bg-rose-600 px-4 py-2 rounded-full flex items-center justify-center' @click='logout'>
          <van-icon name="down" class='transform rotate-[-90deg]' />
          <span class='text-[14px] ml-2'>Đăng Xuất</span>
        </button>
      </div>
    </div>


    <contract-view v-model:show='showConstract' />
    <agreement-view v-model:show='showConstract2' />

    <loan-interest
      v-if='isSign'
      v-model:show='show'
      :interest='isSign.interest'
      :months='isSign.months'
      :amount='isSign.amount'
      :signed-at='isSign.createdAt'
    />

  </div>
</template>

<script lang="ts" setup>
import { GET_LOAN } from '~/apollo/queries/loan.query'
import { GetLoan } from '~/apollo/queries/__generated__/GetLoan'

const showConstract = ref(false)
const showConstract2 = ref(false)

const logout = async () => {
  await $fetch('/api/logout', { method: 'POST' })
  window.location.href = '/auth'
}

const { data } = useLazyAsyncQuery<GetLoan>(GET_LOAN)
const isSign = computed(() => data.value?.loan?.signature)

const [show, toggle] = useToggle(false)
</script>

<style scoped></style>
