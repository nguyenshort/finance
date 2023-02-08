<template>
  <div>
    <div class="text-right bg-gradient-to-r from-primary-500 to-primary-700 text-white px-3 py-2 font-semibold">
      Thẻ ngân hàng của bạn
    </div>

    <div class="atm-card relative overflow-hidden">

      <img class="relative" src="/images/backroundCard.jpeg" alt="" />

      <img class="w-[100px] absolute top-5 right-1" src="https://api.vietqr.io/img/ACB.6e7fe025.png"  alt=""/>
      <img class="w-[40px] absolute top-5 left-1" src="/images/sim.png"  alt=""/>

      <div class="absolute bottom-5 left-5 p-4 stk-info">
        <div>**** **** **** 5679</div>
        <div class="mt-1">Hồ Trọng Sơn</div>
      </div>

    </div>

    <div class="text-center text-green-500 text-sm mt-2">
      Sự an toàn của quỹ tài khoản được ngân hàng đảm bảo
    </div>

    <div class="bg-gray-100 py-3 mt-2">

      <div class="mx-4 bg-white flex rounded-md p-4 justify-between">
        <div>
          <p class="text-sm text-gray-500 mb-2">Số Dư Khả Dụng</p>
          <p>0 VNĐ</p>
        </div>

        <div class="flex flex-col items-end">
          <van-icon size="25" name="eye-o" />
          <a class="text-xs text-primary-500 underline mt-2">Chi tiết thu chi</a>
        </div>

      </div>

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

</script>

<style scoped></style>
