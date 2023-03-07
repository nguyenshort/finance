<template>
  <van-popup v-model:show="_show" closeable  position="bottom" :style="{ borderTopLeftRadius: '20px', borderTopRightRadius: '20px', height: '90%'}">


    <div class='py-4'>
      <div class='px-6'>
        <h5 class="mb-4 text-xl">Thông Tin Cá Nhân</h5>
      </div>

      <van-collapse v-model="activeNames">

        <van-collapse-item
          v-if='identity'
          title="CCCD/CMND"
          name="1"
        >
          <div class='flex -mx-1.5'>
            <div class='flex flex-col items-center px-1.5 w-1/3'>
              <img :src='$cdn(identity?.front)' alt='' />
              <span class='mt-2'>Mặt trước</span>
            </div>

            <div class='flex flex-col items-center px-1.5 w-1/3'>
              <img :src='$cdn(identity?.back)' alt='' />
              <span class='mt-2'>Mặt sau</span>
            </div>

            <div class='flex flex-col items-center px-1.5 w-1/3'>
              <img :src='$cdn(identity?.avatar)' alt='' />
              <span class='mt-2'>Ảnh cá nhân</span>
            </div>
          </div>
        </van-collapse-item>

        <van-collapse-item v-if='info' title="Thông Tin Cá Nhân" name="2">
          <ul class='_info'>
            <li>
              <span>Tên :</span>
              <span>{{ info?.name }}</span>
            </li>
            <li>
              <span>Ngày sinh :</span>
              <span>{{ info?.born.join('/') }}</span>
            </li>
            <li>
              <span>Địa chỉ :</span>
              <span>{{ info?.address}}</span>
            </li>
            <li>
              <span>CCCD :</span>
              <span>{{ info?.cccd}}</span>
            </li>
            <li>
              <span>Trình độ :</span>
              <span>{{ info?.education}}</span>
            </li>
            <li>
              <span>Công việc :</span>
              <span>{{ info?.job}}</span>
            </li>
            <li>
              <span>Thu nhập :</span>
              <span>{{ info?.income }}</span>
            </li>
            <li>
              <span>Tình trạng hôn nhân :</span>
              <span>{{ info?.marriage }}</span>
            </li>
            <li>
              <span>Mục đích vay vốn :</span>
              <span>{{ info?.purpose}}</span>
            </li>
          </ul>
        </van-collapse-item>

        <van-collapse-item v-if='bank' title="Thông Tin Ngân Hàng" name="3">
          <ul class='_info'>
            <li>
              <span>Chủ tài khoản :</span>
              <span>{{ bank?.name }}</span>
            </li>
            <li>
              <span>Tên ngân hàng :</span>
              <span>{{ bank?.bank }}</span>
            </li>
            <li>
              <span>Số tài khoản :</span>
              <span>{{ bank?.account }}</span>
            </li>
          </ul>
        </van-collapse-item>

        <van-collapse-item v-if='loan' title="Thông Tin Vay Vốn" name="4">
          <ul class='_info'>
            <li>
              <span>Số tiềm vay :</span>
              <span>{{ $moneyFormat(loan?.amount || 0) }} VNĐ</span>
            </li>
            <li>
              <span>Lãi suất :</span>
              <span>{{ loan?.interest }} %</span>
            </li>
            <li>
              <span>Thời gian vay :</span>
              <span>{{ loan?.months }} Tháng</span>
            </li>
            <li>
              <span class='flex-shrink-0'>Chữ ký :</span>
              <div>
                <img alt='' :src='$cdn(loan.signature)' />
              </div>
            </li>
          </ul>
        </van-collapse-item>
      </van-collapse>

    </div>

  </van-popup>
</template>

<script lang="ts" setup>
import { GET_AGREEMENT } from '~/apollo/queries/user.query'
import { GetAgreement } from '~/apollo/queries/__generated__/GetAgreement'

const props = defineProps<{
  show: boolean
}>()

const { data } = useLazyAsyncQuery<GetAgreement>(GET_AGREEMENT)

const agreement = computed(() => data.value?.me)
const identity = computed(() => agreement.value?.identity)
const info = computed(() => agreement.value?.info)
const loan = computed(() => agreement.value?.loan)
const bank = computed(() => agreement?.value?.bank)

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


const activeNames = ref(['1', '2', '3', '4'])
</script>

<style>
._info > li {
  display: flex;
  color: #323233;
  margin-bottom: 10px;
}

._info > li > span + span {
  margin-left: 10px;
}

._info > li > span:nth-child(1) {
  color: black;
  font-weight: 500;
}

._info > li:last-child {
  margin-bottom: 0px;
}
</style>
