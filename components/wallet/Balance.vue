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
          <div class='ml-auto'>Ngày Thực Hiện</div>
          <div class='ml-10'>Trạng thái</div>
        </div>
        <div class='flex mt-4 text-[14px]' v-for='withdraw in logbooks' :key='withdraw.id'>
          <div>
            {{ $moneyFormat(withdraw.amount) }} VNĐ
          </div>
          <div class='ml-auto'>
            {{ $dayjs(withdraw.createdAt).format('DD/MM/YYYY HH:mm') }}
          </div>
          <div class='ml-10'>
            <van-tag type="primary" v-if='withdraw.status === LOGBOOK_STATUS.PENDING'>Đang Xử Lý</van-tag>
            <van-tag type="danger" v-if='withdraw.status === LOGBOOK_STATUS.REJECTED'>Từ Chối</van-tag>
            <van-tag type="success" v-if='withdraw.status === LOGBOOK_STATUS.APPROVED'>Đã Xong</van-tag>
          </div>
        </div>
      </div>
    </van-popup>

  </div>
</template>

<script lang="ts" setup>
import { Logbooks, Logbooks_logbooks, LogbooksVariables } from '~/apollo/queries/__generated__/Logbooks'
import { GET_LOGBOOKS } from '~/apollo/queries/logbook.query'
import { LOGBOOK_STATUS } from '~/apollo/__generated__/serverTypes'

const authStore = useAuthStore()

const [showHistory, toggleHistory] = useToggle(false)

const { result } = useQuery<Logbooks, LogbooksVariables>(GET_LOGBOOKS, {
  filter: {
    sort: 'createdAt',
    offset: 0,
    limit: 10
  }
})
const logbooks = computed<Logbooks_logbooks[]>(() => result.value?.logbooks || [])
</script>

<style scoped></style>
