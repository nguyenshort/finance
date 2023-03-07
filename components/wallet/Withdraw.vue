<template>
  <div>
    <div class="mx-4 bg-white flex rounded-md p-4 items-end mt-5">
      <van-icon size="25" color="#355cdd" name="balance-o" />
      <a href='javascript:void(0)' class="ml-2 text-sm" @click='() => toggleShow()'>Rút tiền về tài khoản</a>
    </div>
    <van-popup v-model:show="show" position="bottom" round closeable>
      <van-form @submit="onSubmit">
        <van-cell-group inset>
          <div class='px-3.5 mt-4 mb-6 text-[18px]'>Rút tiền về tài khoản</div>
            <van-field
              v-model='amount'
              name="amount"
              label="Số tiền rút"
              placeholder="0"
              :rules="[{ required: true, validator: validateAmount, trigger: 'onBlur' }]"
            >
              <template #button>
                VNĐ
              </template>
            </van-field>
        </van-cell-group>
        <div style="margin: 16px;">
          <van-button round block type="primary" native-type="submit" :loading='loading'>
            Đồng Ý
          </van-button>
        </div>
      </van-form>
    </van-popup>

    <van-popup v-model:show="showWarning" closeable round>
      <div class='p-4'>
        <h4 class='font-semibold text-[18px] mb-3'>Thông Báo</h4>
        <div class='text-rose-500 text-[20px] font-semibold uppercase'>
          <div v-if='blockRecord'>
            BẠN CÓ LỆNH RÚT TIỀN ĐANG CHỜ DUYỆT!
          </div>
          <div v-if='!authStore.user?.withdrawable'>
            Giao dịch của bạn đã bị từ chối với lý do: "{{ authStore.user?.withdrawNote }}"
          </div>
        </div>
        <div class='mt-2'>
          <contract-collaborator>
            <template #default='{ open }'>
              <a href='javascript:void(0)' class="text-[18px] text-primary-500 underline ml-auto mt-1 uppercase" @click='open'>
                Liên hệ thẩm đin viên
              </a>
            </template>
          </contract-collaborator>
        </div>

        <div class='mt-4 text-center'>
          <van-button type='primary' @click='() => toggleShowWarning()'>
            Đồng ý
          </van-button>
        </div>
      </div>
    </van-popup>

    <van-popup v-model:show="showWarning2" closeable round>
      <div class='p-4'>
        <h4 class='font-semibold text-[18px] mb-3'>Thông Báo</h4>
        <div class='text-primary-500 font-semibold text-[20px]'>
          RÚT TIỀN THÀNH CÔNG VUI LÒNGH CHỜ DUYỆT LỆNH
        </div>

        <div class='mt-4 text-center'>
          <van-button type='primary' @click='() => toggleShowWarning2()'>
            Đồng ý
          </van-button>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script lang='ts' setup>
import { useMoneyUtils } from '~/utils/useMoney'
import { CREATE_WITHDRAW } from '~/apollo/mutates/logbook.mutate'
import { CreateWithdraw, CreateWithdrawVariables } from '~/apollo/mutates/__generated__/CreateWithdraw'
import { GET_WITHDRAWS } from '~/apollo/queries/logbook.query'
import { Withdraws, Withdraws_withdraws } from '~/apollo/queries/__generated__/Withdraws'
import { WithDrawStatus } from '~/apollo/__generated__/serverTypes'

const authStore = useAuthStore()
/**
 * Query logbooks
 */
const { result, refetch } = useQuery<Withdraws>(GET_WITHDRAWS)
const logbooks = computed<Withdraws_withdraws[]>(() => result.value?.withdraws || [])
const blockRecord = computed(() => logbooks.value.find(w => [WithDrawStatus.PENDING].includes(w.status) ))

const isBlock = computed(() => blockRecord.value || !authStore.user?.withdrawable)


/**
 * Notify Modal
 */
const [showWarning, toggleShowWarning] = useToggle(false)

const [showWarning2, toggleShowWarning2] = useToggle(false)



/**
 * Form setup
 */
const [show, toggleShow] = useToggle(false)
const moneyFormat = useMoneyUtils()

const _amount = ref<number>(authStore.user!.balance)
const amount = computed({
  get: () => moneyFormat.format(_amount.value),
  set: (v) => {
    // remove all non-digit characters
    const amount = v.replace(/\D/g, '')
    _amount.value = parseInt(amount || '0')
  }
})
const validateAmount = () => {
  if (!_amount.value) {
    return 'Số tiền không được để trống'
  }
  if (_amount.value > authStore.user!.balance) {
    return 'Số tiền không được lớn hơn số tiền hiện tại'
  }
  return true
}


/**
 * Create withdraw
 */
const { mutate, onDone, loading } = useMutation<CreateWithdraw, CreateWithdrawVariables>(CREATE_WITHDRAW)
onDone(() => refetch())
const onSubmit = async () => {
  if(isBlock.value) {
    toggleShow()
    toggleShowWarning()
  } else {
    await mutate({
      input: {
        amount: _amount.value
      }
    })
    toggleShow()
    toggleShowWarning2()
  }
}
</script>

<style scoped></style>
