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

          <van-form @submit="mutate({ input: form })" ref="formRef">
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
            <div class="w-1/2">{{ $moneyFormat(form.amount) }} VND</div>
          </li>

          <li class="flex text-gray-600 text-sm py-3 border-b border-gray-100">
            <div class="w-1/2">Số kì thanh toán</div>
            <div class="w-1/2">{{ form.months }}</div>
          </li>


          <li class="flex text-gray-600 text-sm py-3 border-b border-gray-100">
            <div class="w-1/2">Số kì trả nợ đầu</div>
            <div class="w-1/2">{{ $moneyFormat(interestPerMonth) }} VND</div>
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

    <loan-interest v-model:show='show' :interest='form.interest' :months='form.months' :amount='form.amount' :signed-at='Date.now()' />

  </div>
</template>

<script lang="ts" setup>
import {CreateLoanInput} from "~/apollo/__generated__/serverTypes";
import {CreateLoan, CreateLoanVariables} from "~/apollo/mutates/__generated__/CreateLoan"
import type { FormInstance } from 'vant'
import {GetLoan, GetLoan_loan} from "~/apollo/queries/__generated__/GetLoan";

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
const [show, toggleShow] = useToggle(false)

// interest per month
const interestPerMonth = computed(() => {
  if(form.amount <= 0 || !monthRange.value.includes(form.months)) return 0

  return Math.round(form.amount / form.months + form.amount * form.interest / 100)
})

const { loading, mutate, onDone } = useMutation<CreateLoan, CreateLoanVariables>(CREATE_LOAN)
const { $apollo } = useNuxtApp()
onDone((data) => {
  if(data.data?.createLoan) {
    $apollo.defaultClient.writeQuery({
      query: GET_LOAN,
      data: {
        loan: {
          ...data.data.createLoan,
          status: LoanStatus.PENDING,
          signature: ''
        } as GetLoan_loan
      }
    })
    showNotify({ type: 'success', message: 'Ký tên để hoàn tất hợp đồng' })
    router.replace('/contract')
  }
})
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
