<template>
  <div>

    <wallet-bank-card />

    <div class="text-center text-green-500 text-sm mt-2">
      Sự an toàn của quỹ tài khoản được ngân hàng đảm bảo
    </div>

    <div class="bg-gray-100 py-3 mt-2">

      <wallet-balance />

      <wallet-withdraw />


      <div class="px-4 mt-5">
        <wallet-contract />
      </div>

      <div class="mx-4 bg-white flex rounded-md p-4 items-center mt-5" @click='logout'>
        <van-icon size="25" color="#355cdd" name="down" class='transform rotate-[-90deg]' />
        <p class="ml-3 text-sm">
          Đăng Xuất
        </p>
      </div>

    </div>

  </div>
</template>

<script lang="ts" setup>
import { signOut } from '@firebase/auth'

definePageMeta({
  middleware: ['wallet'],
})

const logout = async () => {
  await $fetch('/api/logout', { method: 'POST' })
  await signOut(faAuth())
  window.location.href = '/auth'
}
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
