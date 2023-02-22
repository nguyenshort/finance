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

          <div v-if='blockRecord' class='px-3.5 -mt-4 mb-1'>
            <div v-if='!blockRecord.note' class='text-[13px] text-rose-500'>Bạn không thể rút tiền khi có giao dịch đang chờ xử lý</div>
            <div v-else class='text-[13px] text-rose-500'>
              Giao dịch của bạn đã bị từ chối với lý do: "{{ blockRecord.note }}"
            </div>

            <contract-collaborator>
              <template #default='{ open }'>
                <a href='javascript:void(0)' class="text-xs text-primary-500 underline ml-auto mt-1" @click='open'>
                  Liên hệ cộng tác viên
                </a>
              </template>
            </contract-collaborator>
          </div>

            <van-field
              v-model='amount'
              name="amount"
              label="Số tiền rút"
              placeholder="0"
              :rules="[{ required: true, validator: validateAmount, trigger: 'onBlur' }]"
              :disabled='disableBtn'
            >
              <template #button>
                VNĐ
              </template>
            </van-field>
        </van-cell-group>
        <div style="margin: 16px;">
          <van-button round block type="primary" native-type="submit" :disabled='disableBtn' :loading='loading'>
            Đồng Ý
          </van-button>
        </div>
      </van-form>
    </van-popup>
  </div>
</template>

<script lang='ts' setup>
import { useMoneyUtils } from '~/utils/useMoney'
import { CREATE_WITHDRAW } from '~/apollo/mutates/logbook.mutate'
import { CreateWithdraw, CreateWithdrawVariables } from '~/apollo/mutates/__generated__/CreateWithdraw'
import { GET_LOGBOOKS } from '~/apollo/queries/logbook.query'
import { LOGBOOK_GROUP, LOGBOOK_STATUS, LOGBOOK_TYPE } from '~/apollo/__generated__/serverTypes'
import { Logbooks, Logbooks_logbooks, LogbooksVariables } from '~/apollo/queries/__generated__/Logbooks'


/**
 * Query logbooks
 */
const { result, refetch } = useQuery<Logbooks, LogbooksVariables>(GET_LOGBOOKS, {
  filter: {
    sort: 'createdAt',
    offset: 0,
    limit: 10,
    status: [LOGBOOK_STATUS.PENDING, LOGBOOK_STATUS.REJECTED],
    group: [LOGBOOK_GROUP.WITHDRAW],
    type: [LOGBOOK_TYPE.SUBTRACT]
  }
}, { fetchPolicy: 'network-only' })
const logbooks = computed<Logbooks_logbooks[]>(() => result.value?.logbooks || [])
const blockRecord = computed(() => logbooks.value.find(w => [LOGBOOK_STATUS.PENDING, LOGBOOK_STATUS.REJECTED].includes(w.status) ))


/**
 * Form setup
 */
const authStore = useAuthStore()
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
onDone(() => {
  authStore.user!.balance -= _amount.value
  refetch()
})
const onSubmit = async () => {
  await mutate({
    input: {
      amount: _amount.value
    }
  })
  toggleShow()
}

const disableBtn = computed(() => !!blockRecord.value || loading.value)
</script>

<style scoped></style>
