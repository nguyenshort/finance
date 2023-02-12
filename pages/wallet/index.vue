<template>
  <div>

    <wallet-bank-card />

    <div class="text-center text-green-500 text-sm mt-2">
      Sự an toàn của quỹ tài khoản được ngân hàng đảm bảo
    </div>

    <div class="bg-gray-100 py-3 mt-2">

      <wallet-balance />

      <div class="mx-4 bg-white flex rounded-md p-4 items-center mt-5">
        <van-icon size="25" color="#355cdd" name="balance-o" />
        <p class="ml-3 text-sm">Rút tiền về tài khoản</p>
      </div>


      <div class="px-4 mt-5">
<!--        <van-collapse id="list-constract" v-model:show="activeNames" accordion class="w-full">-->
<!--          <van-collapse-item title="Xem Hợp Đồng" name="1">-->

<!--            <template #title>-->
<!--              <p class="text-sm relative top-1">Xem Hợp Đồng</p>-->
<!--            </template>-->

<!--            <ul>-->
<!--              <li class="flex text-gray-600 text-sm py-3 border-b border-gray-100">-->
<!--                <div class="w-1/2">Hạn mức vay</div>-->
<!--                <div class="w-1/2">2000000 VND</div>-->
<!--              </li>-->

<!--              <li class="flex text-gray-600 text-sm py-3 border-b border-gray-100">-->
<!--                <div class="w-1/2">Số kì thanh toán</div>-->
<!--                <div class="w-1/2">20</div>-->
<!--              </li>-->


<!--              <li class="flex text-gray-600 text-sm py-3 border-b border-gray-100">-->
<!--                <div class="w-1/2">Chữ ký</div>-->
<!--                <div class="w-1/2">Đã Ký</div>-->
<!--              </li>-->

<!--            </ul>-->

<!--          </van-collapse-item>-->
<!--        </van-collapse>-->
      </div>

    </div>

  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  middleware: ['wallet'],
})
</script>

<style>

.atm-card {
  aspect-ratio: 670/180;
}

.stk-info {
  background: #00000029;
  color: white;
  width: 70%;
  border-radius: 10px;
  font-weight: 500;
}

#list-constract .van-collapse-item__title {
  background: white;
  border-radius: 0.375rem;
}

</style>
