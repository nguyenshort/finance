<template>
  <van-collapse id="list-constract" v-model='active' accordion class="w-full">
    <van-collapse-item title="Xem Hợp Đồng" name="1">

      <template #title>
        <p class="text-sm relative top-1">Xem Hợp Đồng</p>
      </template>

      <ul>
        <li class="flex text-gray-600 text-sm py-3 border-b border-gray-100">
          <div class="w-1/2">Hạn mức vay</div>
          <div class="w-1/2">{{ $moneyFormat(loan?.amount || 0) }} VND</div>
        </li>

        <li class="flex text-gray-600 text-sm py-3 border-b border-gray-100">
          <div class="w-1/2">Số kì thanh toán</div>
          <div class="w-1/2">
            {{ loan?.months || 0 }}
          </div>
        </li>


        <li class="flex text-gray-600 text-sm py-3 border-b border-gray-100">
          <div class="w-1/2">Chữ ký</div>
          <div class="w-1/2">
            <div>{{ loan?.signature ? 'Đã Kí' : 'Chưa Ký' }}</div>

            <div v-if='loan?.signature'>
              <img :src='$cdn(loan?.signature)' alt='' class='w-full h-auto object-cover' />
            </div>

          </div>
        </li>

      </ul>

    </van-collapse-item>
  </van-collapse>
</template>

<script lang='ts' setup>
import { GetLoan } from '~/apollo/queries/__generated__/GetLoan'

const active = ref<string>('0')

const { result } = useQuery<GetLoan>(GET_LOAN, {}, { fetchPolicy: 'network-only' })
const loan = computed(() => result.value?.loan)
</script>

<style scoped></style>
