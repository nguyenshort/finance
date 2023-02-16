<template>
  <marquee-text :repeat="1" :duration="120">
    <ul class="flex items-center">
      <li v-for="(text, index) in texts" :key="index" class="mr-36">
        {{ text }}
      </li>
    </ul>  </marquee-text>
</template>

<script lang="ts" setup>
import MarqueeText from 'vue-marquee-text-component'
import { faker } from '@faker-js/faker';

const { $moneyFormat } = useNuxtApp()
const prefixs = computed(() => ['086', '089', '088', '092', '099', '096', '090', '091', '056', '059', '097', '093', '094', '058', '098', '070', '081', '032', '076', '082', '033', '077', '083', '034', '078', '084', '035', '079', '085','036', '037', '038', '039'])

const texts = computed(() => (Array(20).fill(0).map(() => {
  const _sdt = prefixs.value[faker.datatype.number({ min: 0, max: prefixs.value.length - 1})]
  const prefix = faker.datatype.number({ min: 30, max: 500})
  const load = $moneyFormat(prefix * 1000000).replace('₫', '').trim()
  return _sdt + '*****' + faker.datatype.number({ min: 0, max: 9}) + ' đã rút ' + load + ' VNĐ'
})))
</script>

<style scoped>

</style>