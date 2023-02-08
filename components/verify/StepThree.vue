<template>
  <div class="bg-gray-100 px-4">
    <div class="text-center">
      <h3 class="font-semibold text-xl mb-4">Thông Tin Ngân Hàng Hưởng Thụ</h3>

      <van-form :label-width="100" @submit="onSubmit">
        <van-field
            v-model="form.name"
            name="name"
            label="Chủ tài khoản"
            placeholder="Trần Văn A"
            :rules="[{ required: true, message: 'Tân chủ tài khoản là bắt buộc' }]"
        />
        <van-field
            v-model="form.account"
            name="stk"
            label="Số tài khoản"
            placeholder="**** **** **** ****"
            :rules="[{ required: true, message: 'Số tài khoản là bắt buộc' }]"
        />

        <van-field
            readonly
            clickable
            name="born"
            :value="form.bank"
            label="Ngân Hàng"
            placeholder="Lựa chọn..."
            :rules="[{ required: true, message: 'Ngân hàng là bắt buộc' }]"
            @click="showPicker = true"
        />

        <div style="margin: 16px;">
          <van-button round block type="primary" native-type="submit">
            Xác Minh
          </van-button>
        </div>
      </van-form>

    </div>

    <van-popup v-model:show="showPicker" position="bottom">
      <van-picker
          title="Chọn Ngân Hàng Của Bạn"
          confirm-button-text="Xác Nhận"
          cancel-button-text="Huỷ Bỏ"
          show-toolbar
          :columns="columns"
          @confirm="onConfirm"
          @cancel="showPicker = false"
      />
    </van-popup>

  </div>
</template>

<script lang="ts" setup>
import {IBank, VerifyBank} from "~/entities/verify.entity";

const form = reactive<VerifyBank>({
  name: '',
  account: '',
  bank: ''
})

const showPicker = ref(false)
const onConfirm = () => {

}
const onSubmit = () => {

}

// bank API
const res = await useFetch<{
  data: IBank[]
}>('https://api.vietqr.io/v2/banks')
const banks = computed(() => res.data.value?.data || [])
// covert to comlumns
const columns = computed(() => banks.value.map((e) => ({ text: e.name, value: e.name })))
</script>

<style scoped></style>
