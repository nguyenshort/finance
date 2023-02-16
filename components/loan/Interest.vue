<template>
  <van-popup v-model:show="_show" closeable  position="bottom" :style="{ borderTopLeftRadius: '20px', borderTopRightRadius: '20px'}">
    <div class="px-4 py-5">
      <h5>chi Tiết Trả Nợ</h5>

      <ul class="mt-3">
        <li class="flex bg-gray-100 px-2 py-2">
          <div class="w-2/6 flex-shrink-0 pl-2">Kì</div>
          <div class="w-3/6 flex-shrink-0">Số Tiền</div>
          <div class="w-full text-right pr-2">Ngày Đóng</div>
        </li>

        <li v-for="(item, index) in periods" :key="index" class="flex px-2 py-4 border-b last:border-0">
          <div class="w-2/6 flex-shrink-0 pl-2">Kì {{ index + 1 }}</div>
          <div class="w-3/6 flex-shrink-0">{{ item.money }}</div>
          <div class="w-full text-right pr-2">{{ item.time }}</div>
        </li>

      </ul>

    </div>
  </van-popup>
</template>

<script lang='ts' setup>
const props = defineProps<{
  show: boolean
  amount: number
  interest: number
  months: number
  signedAt: number
}>()

const _show = ref(props.show)
//define emits
const emit = defineEmits<{
  (event: 'update:show', value: boolean): void
}>()

watch(() => props.show, (value) => {
  _show.value = value
})

watch(_show, (value) => {
  emit('update:show', value)
})

const $dayjs = useDayjs()
const { $moneyFormat } = useNuxtApp()

interface Period {
  time: string
  money: string
}

const periods = computed<Period[]>(() => Array(props.months).fill(0).map((_, index) => {
  const time = $dayjs(props.signedAt).add(index + 1, 'month').format('DD/MM/YYYY')
  const money = $moneyFormat(Math.round(props.amount / props.months + props.amount * props.interest / 100)) + ' VND'
  return {time, money}
}))
</script>

<style scoped></style>
