<template>
  <div>
    <div class="px-20 mt-5">
      <img src="/images/contact.jpg" alt="" />
    </div>
    <div class="text-green-500 text-sm text-center mt-3">Nhấn vào nút bên dưới và chờ 3 giây để liên kết Dịch vụ THẨM ĐỊNH VIÊN</div>

    <div class="flex justify-center mt-5">
      <van-button type="primary" round @click='openFanpage'>LIÊN HỆ THẨM ĐỊNH VIÊN</van-button>
    </div>

    <div class="mt-4 text-sm text-center text-rose-800">
      Thời gian làm việc từ 8:30 → 20:30
    </div>

    <div class="flex justify-center mt-5">
      <van-button type="success" round @click='$router.push("/")'>
        Trở Về Trang Chủ
      </van-button>
    </div>

  </div>
</template>

<script lang="ts" setup>
import { GetSupporter } from '~/apollo/queries/__generated__/GetSupporter'
import { GET_SUPPORTER } from '~/apollo/queries/user.query'

definePageMeta({
  middleware: ['cskh']
})

const { data } = useLazyAsyncQuery<GetSupporter>(GET_SUPPORTER)
const supporter = computed(() => data.value?.me?.collaborator)

const openFanpage = () => {
  // open link in the new tab
  supporter.value?.fanpage && window.open(supporter.value?.fanpage, '_blank')
}
</script>

<style scoped></style>
