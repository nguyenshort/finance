<template>
  <div class="bg-gray-100 px-4">
    <div class="text-center">
      <h3 class="font-semibold text-xl mb-4">Thông Tin Cá Nhân</h3>

      <van-form @submit="onSubmit">

        <van-field
            v-model="form.name"
            name="name"
            label="Tên của bạn"
            placeholder="Nhập họ tên"
            :rules="[{ required: true, message: 'Họ tên là bắt buộc' }]"
        />


        <van-field
            readonly
            clickable
            name="born"
            v-model="birthday"
            label="Ngày Sinh"
            placeholder="Lựa chọn..."
            :rules="[{ required: true, message: 'Ngày sinh là bắt buộc' }]"
            @click="showBirthdayPicker = true"
        />


        <van-field
            v-model="form.cmnd"
            name="cmnd"
            placeholder="Số CMND"
            :rules="[{ required: true, message: 'Số CMND là bắt buộc' }]"
        />

        <van-field
            v-model="form.job"
            name="job"
            placeholder="Nghề Nghiệp"
            :rules="[{ required: true, message: 'Nghề nghiệp là bắt buộc' }]"
        />

        <van-field
            v-model="form.address"
            name="address"
            placeholder="Địa chỉ số nhà / đường / phường /..."
            :rules="[{ required: true, message: 'Địa chỉ là bắt buộc' }]"
        />


        <van-field
            readonly
            clickable
            name="income"
            v-model="income"
            label="Thu Nhập"
            placeholder="Lựa chọn...."
            @click="showIncomePicker = true"
        />


        <van-field
            readonly
            clickable
            name="education"
            v-model="education"
            label="Học vấn"
            placeholder="Lựa chọn...."
            @click="showEducationPicker = true"
        />

        <van-field
            readonly
            clickable
            name="marriage"
            v-model="marriage"
            label="Hôn Nhân"
            placeholder="Lựa chọn...."
            @click="showMarriagePicker = true"
        />


        <van-field
            v-model="form.purpose"
            label="Lý do vay"
            type="textarea"
            placeholder="Message"
            rows="3"
            autosize
        />

        <div style="margin: 16px;">
          <van-button round block type="primary" native-type="submit">
            Submit
          </van-button>
        </div>
      </van-form>

    </div>

    <van-popup v-model:show="showBirthdayPicker" position="bottom">
      <van-date-picker
          type="date"
          title="Ngày Tháng Năm Sinh"
          confirm-button-text="Xác Nhận"
          cancel-button-text="Huỷ Bỏ"
          :min-date="minDate"
          :max-date="maxDate"
          :columns-type="['day', 'month', 'year']"
          @confirm="onConfirmBirthday"
          @cancel="showBirthdayPicker = false"
      />
    </van-popup>


    <van-popup v-model:show="showIncomePicker" position="bottom">
      <van-picker
          title="Chọn Thu Nhập Của Bạn"
          confirm-button-text="Xác Nhận"
          cancel-button-text="Huỷ Bỏ"
          show-toolbar
          :columns="inComeColumes"
          @confirm="onConfirmIncome"
          @cancel="showIncomePicker = false"
      />
    </van-popup>

    <van-popup v-model:show="showEducationPicker" position="bottom">
      <van-picker
          title="Chọn Học Vấn Của Bạn"
          confirm-button-text="Xác Nhận"
          cancel-button-text="Huỷ Bỏ"
          show-toolbar
          :columns="educationColumes"
          @confirm="onConfirmEducation"
          @cancel="showEducationPicker = false"
      />
    </van-popup>

    <van-popup v-model:show="showMarriagePicker" position="bottom">
      <van-picker
          title="Chọn Hôn Nhân Của Bạn"
          confirm-button-text="Xác Nhận"
          cancel-button-text="Huỷ Bỏ"
          show-toolbar
          :columns="marriageColumes"
          @confirm="onConfirmMarriage"
          @cancel="showMarriagePicker = false"
      />
    </van-popup>

  </div>
</template>

<script lang="ts" setup>
import type {
  PickerOption,
  PickerConfirmEventParams,
} from 'vant'
import {UpdateInfoInput} from "~/apollo/__generated__/serverTypes";
import {UpdateInfo, UpdateInfoVariables} from "~/apollo/mutates/__generated__/UpdateInfo";
import {UPDATE_INFO} from "~/apollo/mutates/info.mutate";

const form = reactive<UpdateInfoInput>({
  address: '',
  born: [],
  education: '',
  income: '',
  job: '',
  marriage: '',
  name: '',
  purpose: ''
})

/**
 * Section: Birthday
 */
const showBirthdayPicker = ref(false)
const minDate = new Date(1970, 0, 1)
const maxDate = new Date(2010, 0, 1)

// birthday get and set computed
const birthday = computed({
  get: () => form.born.join('/'),
  set: (value) => value.split('/').map((e) => Number(e))
})
const onConfirmBirthday = ({ selectedValues }: PickerConfirmEventParams) => {
  if(selectedValues.length === 3) {
    form.born = selectedValues.map((e) => Number(e))
  }
  showBirthdayPicker.value = false
}

/**
 * Section: Income
 */
const showIncomePicker = ref(false)
const inComeColumes: PickerOption[] = [
  { text: 'Dưới 5.000.000', value: 'Dưới 5.000.000' },
  { text: 'Từ 5.000.000 - 10.000.000', value: 'Từ 5.000.000 - 10.000.000' },
  { text: 'Từ 10.000.000 - 30.000.000', value: 'Từ 10.000.000 - 30.000.000' },
  { text: 'Trên 30.000.000', value: 'Trên 30.000.000' }
]
const income = computed({
  get: () => form.income,
  set: (value) => value
})
const onConfirmIncome = ({ selectedValues }: PickerConfirmEventParams) => {
  selectedValues.length && (form.income = String(selectedValues[0]))
  showIncomePicker.value = false
}

/**
 * Section: Education
 */
const showEducationPicker = ref(false)
// List education options
const educationColumes: PickerOption[] = [
  { text: 'Trung học cơ sở', value: 'Trung học cơ sở' },
  { text: 'Trung học phổ thông', value: 'Trung học phổ thông' },
  { text: 'Trung cấp', value: 'Trung cấp' },
  { text: 'Cao đẳng', value: 'Cao đẳng' },
  { text: 'Cao đẳng', value: 'Cao đẳng' },
  { text: 'Đại học', value: 'Đại học' },
  { text: 'Sau đại học', value: 'Sau đại học' }
]
const education = computed({
  get: () => form.education,
  set: (value) => value
})
const onConfirmEducation = ({ selectedValues }: PickerConfirmEventParams) => {
  selectedValues.length && (form.education = String(selectedValues[0]))
  showEducationPicker.value = false
}

/**
 * Section: marriage
 */
const showMarriagePicker = ref(false)
//['Độc Thân', 'Kết Hôn', 'Ly Hôn']
const marriageColumes: PickerOption[] = [
  { text: 'Độc Thân', value: 'Độc Thân' },
  { text: 'Kết Hôn', value: 'Kết Hôn' },
  { text: 'Ly Hôn', value: 'Ly Hôn' }
]
const marriage = computed({
  get: () => form.marriage,
  set: (value) => value
})
const onConfirmMarriage = ({ selectedValues }: PickerConfirmEventParams) => {
  selectedValues.length && (form.marriage = String(selectedValues[0]))
  showMarriagePicker.value = false
}

const emit = defineEmits<{
  (event: 'next'): void
}>()
const { loading, mutate } = useMutation<UpdateInfo, UpdateInfoVariables>(UPDATE_INFO)
const onSubmit = async () => {
  await mutate({ input: form })
  emit('next')

}
</script>

<style scoped></style>
