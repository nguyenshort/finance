<template>
  <van-config-provider :theme-vars="themeVars">
    <div :id="$route.name">
      <div class="max-w-screen-limit mx-auto min-h-screen shadow-lg mx-auto">

        <NuxtPage />

        <div class="py-3 mt-7 text-center">
          <img class="w-[250px] h-auto block mx-auto" src="/images/fake.jpeg" alt="" />

          <p class="mt-3 text-sm text-gray-500">© Bản quyền thuộc về tài chính hoàng kim</p>

        </div>

      </div>
    </div>
  </van-config-provider>
</template>

<script lang="ts" setup>
const themeVars = reactive({
  green: '#3b66f5'
});
</script>

<style scoped></style>
