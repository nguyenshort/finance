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

          <van-form @submit="onSubmit">
            <div class="flex items-center">
              <van-field v-model="form.loan" type="number" class="w-full" placeholder="Nhập số tiền vay" />
              <span>VNĐ</span>
            </div>

            <div class="text-sm text-gray-500 mt-3">Chọn số tháng cần thanh toán</div>


            <div class="flex flex-wrap mt-4">

              <div v-for="(month, index) in list" :key="index" class="w-1/2 flex justify-center items-center my-3">

                <div
                    class="border rounded-full animate w-[100px] h-[36px] flex justify-center items-center"
                    :class="{
                    'text-gray-500 border-gray-500': form.month !== month,
                    'bg-gradient-to-r from-primary-500 to-primary-700 text-white border-primary-600': form.month === month
                  }"
                    @click="form.month = month"
                >
                  {{ month }}
                </div>

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
            <div class="w-1/2">{{ moneyFormat() }} VND</div>
          </li>

          <li class="flex text-gray-600 text-sm py-3 border-b border-gray-100">
            <div class="w-1/2">Số kì thanh toán</div>
            <div class="w-1/2">{{ form.month }}</div>
          </li>


          <li class="flex text-gray-600 text-sm py-3 border-b border-gray-100">
            <div class="w-1/2">Số kì trả nợ đầu</div>
            <div class="w-1/2">	25,833,334</div>
          </li>


          <li class="flex text-gray-600 text-sm py-3">
            <div class="w-1/2">Lãi suất hàng tháng</div>
            <div class="w-1/2">1%</div>
          </li>

        </ul>

        <div v-if="form.loan && form.month" class="text-center mt-3">
          <a href="javascript:void(0)" class="text-primary-500 font-semibold mt-4" @click="show = true">Chi Tiết Trả Nợ</a>
        </div>

      </div>
    </div>

    <van-popup v-model="show" closeable  position="bottom" :style="{ borderTopLeftRadius: '20px', borderTopRightRadius: '20px'}">
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

<script>
export default {
  name: "LoanPage",
  data() {
    return {
      form: {
        loan: '',
        month: ''
      },
      list: ['6 Tháng', '12 Tháng', '24 Tháng', '36 Tháng'],
      show: false,
      periods: [
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
      ]
    }
  },
  methods: {
    onSubmit(values) {
      console.log('submit', values);
    },
    moneyFormat() {
      const formatter = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' })
      return formatter.format(this.form.loan || 0).replace('₫', '').trim()
    }
  },
}
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
