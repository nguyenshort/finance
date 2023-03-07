<template>
  <div class="mx-4 bg-white flex rounded-md p-4 justify-between">
    <div>
      <p class="text-sm text-gray-500 mb-2">Số Dư Khả Dụng</p>
      <p>{{ $moneyFormat(authStore.user?.balance) }} VNĐ</p>
    </div>

    <div class="flex flex-col items-end">
      <van-icon size="25" name="eye-o" class="opacity-0" />
      <a href='javascript:void(0)' @click='toggleHistory()' class="text-xs text-primary-500 underline mt-2">Chi tiết thu chi</a>
    </div>


    <van-popup v-model:show="showHistory" position="bottom" round closeable>
      <div class='px-5 pb-4 pt-4'>

        <h2>Biến Động Số Dư</h2>

        <div class='flex mt-4'>
          <div>Số tiền</div>
          <div class='ml-auto'>Nội dung</div>
          <div class='w-[150px] text-right'>Ngày Thực Hiện</div>
        </div>
        <div class='flex mt-4 text-[14px]' v-for='withdraw in logbooks' :key='withdraw.id'>
          <div>
            {{ $moneyFormat(withdraw.amount) }} VNĐ
          </div>
          <div class='ml-auto'>
            {{ withdraw.note }}
          </div>
          <div class='w-[150px] text-right'>
            {{ $dayjs(withdraw.createdAt).format('DD/MM/YYYY HH:mm') }}
          </div>
        </div>
      </div>
    </van-popup>

  </div>
</template>

<script lang="ts" setup>
import { Logbooks, Logbooks_logbooks } from '~/apollo/queries/__generated__/Logbooks'
import { GET_LOGBOOKS } from '~/apollo/queries/logbook.query'

const authStore = useAuthStore()

const [showHistory, toggleHistory] = useToggle(false)

const { result } = useQuery<Logbooks>(GET_LOGBOOKS)
const logbooks = computed<Logbooks_logbooks[]>(() => result.value?.logbooks || [])
</script>

<style scoped></style>
