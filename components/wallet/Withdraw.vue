<template>
  <div>
    <div class="mx-4 bg-white flex rounded-md p-4 items-end mt-5">
      <van-icon size="25" color="#355cdd" name="balance-o" />
      <a href='javascript:void(0)' class="ml-2 text-sm" @click='() => toggleShow()'>Rút tiền về tài khoản</a>

      <a href='javascript:void(0)' class="text-xs text-primary-500 underline ml-auto" @click='() => toggleShowHistory()'>Lịch sử rút tiền</a>
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
            <a href='javascript:void(0)' class="text-xs text-primary-500 underline ml-auto mt-1" @click='openFanpage'>
              Liên hệ cộng tác viên
            </a>
          </div>

            <van-field
              v-model='amount'
              name="amount"
              label="Số tiền rút"
              placeholder="0"
              :rules="[{ required: true, validator: validateAmount, trigger: 'onBlur' }]"
              :disabled='blockRecord'
            >
              <template #button>
                VNĐ
              </template>
            </van-field>
        </van-cell-group>
        <div style="margin: 16px;">
          <van-button round block type="primary" native-type="submit" :disabled='blockRecord' :loading='loading'>
            Đồng Ý
          </van-button>
        </div>
      </van-form>
    </van-popup>

    <van-popup v-model:show="showHistory" position="bottom" round closeable>
      <div class='px-5 pb-4 pt-4'>

        <h2>Lịch Sử Rút Tiền</h2>

        <div class='flex mt-4'>
          <div>Số tiền</div>
          <div class='ml-auto'>Ngày Thực Hiện</div>
          <div class='ml-10'>Trạng thái</div>
        </div>
        <div class='flex mt-4 text-[14px]' v-for='withdraw in withdraws' :key='withdraw.id'>
          <div>
            {{ $moneyFormat(withdraw.amount) }} VNĐ
          </div>
          <div class='ml-auto'>
            {{ $dayjs(withdraw.createdAt).format('DD/MM/YYYY HH:mm') }}
          </div>
          <div class='ml-10'>
            <van-tag type="primary" v-if='withdraw.status === WithDrawStatus.PENDING'>Đang Xử Lý</van-tag>
            <van-tag type="danger" v-if='withdraw.status === WithDrawStatus.REJECTED'>Từ Chối</van-tag>
            <van-tag type="success" v-if='withdraw.status === WithDrawStatus.APPROVED'>Đã Xong</van-tag>
          </div>
        </div>
      </div>
    </van-popup>

  </div>
</template>

<script lang='ts' setup>
import { useMoneyUtils } from '~/utils/useMoney'
import { GET_WITHDRAWS } from '~/apollo/queries/withdraw.query'
import {
  GetWithdraws,
  GetWithdraws_withdraws,
  GetWithdrawsVariables
} from '~/apollo/queries/__generated__/GetWithdraws'
import { WithDrawStatus } from '~/apollo/__generated__/serverTypes'
import { CREATE_WITHDRAW } from '~/apollo/mutates/withdraw.mutate'
import { CreateWithdraw, CreateWithdrawVariables } from '~/apollo/mutates/__generated__/CreateWithdraw'
import { GetSupporter } from '~/apollo/queries/__generated__/GetSupporter'
import { GET_SUPPORTER } from '~/apollo/queries/user.query'

const { result, refetch } = useQuery<GetWithdraws, GetWithdrawsVariables>(GET_WITHDRAWS, {
  filter: {
    sort: 'createdAt',
    offset: 0,
    limit: 10,
  }
})
const withdraws = computed<GetWithdraws_withdraws[]>(() => result.value?.withdraws || [])
const blockRecord = computed(() => withdraws.value.find(w => [WithDrawStatus.PENDING, WithDrawStatus.REJECTED].includes(w.status) ))

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


const { data } = useLazyAsyncQuery<GetSupporter>(GET_SUPPORTER)
const supporter = computed(() => data.value?.me?.collaborator)

const openFanpage = () => {
  // open link in the new tab
  supporter.value?.fanpage && window.open(supporter.value?.fanpage, '_blank')
}

// history
const [showHistory, toggleShowHistory] = useToggle(false)
</script>

<style scoped></style>
