<template>
  <div>
    <van-nav-bar
        title="Đăng Ký Khoản Vay"
        left-arrow
        class="bg-gradient-to-r from-primary-500 to-primary-700"
        @click-left="$router.back()"
    />
    <div class="relative _loan-fix-header bg-gradient-to-r from-primary-500 to-primary-700">

      <div id="form-loan" class="shadow-lg py-4 px-8 text-center">
        <div>Hạn Mức Vay</div>
        <div class="mx-auto w-full h-full">

          <van-form @submit="onSubmit" ref="formRef">
            <div class="flex items-center">
              <van-field
                  v-model="amount"
                  class="w-full"
                  placeholder="Nhập số tiền vay"
                  :rules="[{ validator: validatorAmount }]"
              />
              <span>VNĐ</span>
            </div>

            <div class="text-sm text-gray-500 mt-3">Chọn số tháng cần thanh toán</div>

            <div class="flex flex-wrap mt-4">

              <div v-for="(month, index) in monthRange" :key="index" class="w-1/2 flex justify-center items-center my-3">

                <button
                    class="border rounded-full animate w-[100px] h-[36px] flex justify-center items-center"
                    :class="{
                    'text-gray-500 border-gray-500': form.months !== month,
                    'bg-gradient-to-r from-primary-500 to-primary-700 text-white border-primary-600': form.months === month
                  }"
                    @click.prevent="form.months = month"
                >
                  {{ month }} Tháng
                </button>

              </div>

            </div>
          </van-form>

        </div>
      </div>

    </div>

    <div class="bg-gray-100 px-4 w-full pt-[200px] pb-7">
      <div class="bg-white px-5 py-7 w-full rounded-lg">

        <ul>
          <li class="flex text-gray-600 text-sm py-3 border-b border-gray-100">
            <div class="w-1/2">Hạn mức vay</div>
            <div class="w-1/2">{{ moneyFormat(form.amount) }} VND</div>
          </li>

          <li class="flex text-gray-600 text-sm py-3 border-b border-gray-100">
            <div class="w-1/2">Số kì thanh toán</div>
            <div class="w-1/2">{{ form.months }}</div>
          </li>


          <li class="flex text-gray-600 text-sm py-3 border-b border-gray-100">
            <div class="w-1/2">Số kì trả nợ đầu</div>
            <div class="w-1/2">{{ moneyFormat(interestPerMonth) }} VND</div>
          </li>


          <li class="flex text-gray-600 text-sm py-3">
            <div class="w-1/2">Lãi suất hàng tháng</div>
            <div class="w-1/2">1%</div>
          </li>

        </ul>

        <div class="flex items-center justify-center mt-10">
          <button
              class="text-primary-500 font-semibold transition disabled:opacity-50 mr-5"
              :disabled="!canSubmit"
              @click="toggleShow()"
          >
            Chi Tiết Trả Nợ
          </button>

          <van-button type="primary" round :disabled="!canSubmit" :loading="loading" @click="formRef?.submit()">
            Ký Hợp Đồng
          </van-button>

        </div>

      </div>
    </div>

    <van-popup v-model:show="show" closeable  position="bottom" :style="{ borderTopLeftRadius: '20px', borderTopRightRadius: '20px'}">
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

  </div>
</template>

<script lang="ts" setup>
import {CreateLoanInput} from "~/apollo/__generated__/serverTypes";
import {CreateLoan, CreateLoanVariables} from "~/apollo/mutates/__generated__/CreateLoan"
import type { FormInstance } from 'vant'

definePageMeta({
  middleware: ['loan'],
})

const router = useRouter()

const formRef = ref<FormInstance>();
const { $moneyFormat } = useNuxtApp()
const form = reactive<CreateLoanInput>({
  months: 0,
  amount: 0,
  interest: 1
})

// using computed get and set to tranfrom number to money format
const amount = computed({
  get: () => $moneyFormat(form.amount),
  set: (value) => {
    form.amount = Number(value.replaceAll('.', '').replaceAll('VND', '').trim())
  }
})

const monthRange = computed(() => [6, 12, 24, 36])
const periods = computed(() => [
  {
    money: '25,833,334',
    time: '7 - 5'
  },
  {
    money: '25,625,000',
    time: '7 - 6'
  },
  {
    money: '25,000,000',
    time: '7 - 9'
  },
  {
    money: '24,791,667',
    time: '7 - 10'
  },
  {
    money: '24,583,334',
    time: '7 - 11'
  },
  {
    money: '24,375,000',
    time: '7 - 12'
  }
])
const [show, toggleShow] = useToggle(false)

// interest per month
const interestPerMonth = computed(() => {
  if(form.amount <= 0 || !monthRange.value.includes(form.months)) return 0

  const base = form.amount / form.months
  return Math.round(base * form.interest)
})

const { loading, mutate } = useMutation<CreateLoan, CreateLoanVariables>(CREATE_LOAN)
const onSubmit = async () => {
  try {
    const data = await mutate({
      input: form
    })
    if(data?.data?.createLoan) {
      router.replace('/contract')
    }
  } catch (e) {
    //
  }
}


const validatorAmount = () => {
  if(form.amount <= 30000000 || form.amount >= 500000000) {
    return 'Số tiền phải nằm trong khoảng từ 30 tới 500 triệu'
  }
}

const canSubmit = computed(() => {
  return form.amount >= 30000000 && form.amount <= 500000000 && form.months >= 6 && form.months <= 36
})
</script>
<style>
._loan-fix-header {
  aspect-ratio: 680/150;
}

#form-loan {
  position: absolute;
  background: white;
  width: calc(100% - 90px);
  border-radius: 15px;
  top: 30%;
  left: 50%;
  transform: translateX(-50%);
}
</style>
