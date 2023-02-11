<template>
  <div>

    <contract-sumary :loan="loan" />

    <template v-if="!signature">
      <div v-if="showSignaturePad" class="mt-4">
        <div class="text-center mb-3">
          <p class="text-gray-600 text-sm">Ký vào khung bên dưới</p>
        </div>
        <div id="signaturePad" class="border rounded rounded-lg border-gray-200">
          <VueSignaturePad ref="signaturePadRef" height="200px" />
        </div>
        <a class="text-gray-500 mt-3 text-sm" href="javascript:void(0)" @click="signaturePadRef?.clearSignature()">Làm mới</a>

        <div class="flex justify-center mt-5">

          <button
              class="btn-effect btn-text-size px-5 py-2 uppercase animate"
              @click="onConfirmSignaturePad"
          >
            Xác Nhận
          </button>

        </div>

      </div>
      <div v-else class="flex justify-center mt-5">

        <button
            class="btn-effect btn-text-size px-5 py-2 uppercase animate"
            @click="toggleSignaturePad()"
        >
          Ký Hợp Đồng
        </button>

      </div>
    </template>

    <template v-else>
      <div class="signature-image">
        <img class="w-full h-full object-cover" :src="signature" alt=""/>
      </div>
      <a class="text-primary-500 mt-3 text-sm" href="javascript:void(0)" @click="toggleShowConstract()">Xem hợp đồng</a>

      <div class="flex justify-center mt-5">

        <van-button
            :disabled="!signature || uploading"
            type="primary"
            round
            :loading="loading"
            @click="sign"
        >
          Bước Tiếp Theo
        </van-button>

      </div>

    </template>


    <van-popup v-model:show="showConstract" closeable  position="bottom" :style="{ borderTopLeftRadius: '20px', borderTopRightRadius: '20px', height: '80%'}">
      <contract-view class="px-4 py-5" v-if="loan" :contract="loan" />
    </van-popup>
  </div>
</template>

<script lang="ts" setup>
import {SignaturePadEntity} from "~/entities/signature-pad.entity"
import {SignLoan, SignLoanVariables} from "~/apollo/mutates/__generated__/SignLoan"
import {GetLoan_loan} from "~/apollo/queries/__generated__/GetLoan"

defineProps<{
  loan: Pick<GetLoan_loan, | 'id' | 'amount' | 'signature' | 'months'>
}>()

/**
 * Section: Create signature
 */
const signature = ref('')
const signaturePadRef = ref<SignaturePadEntity|undefined>()
const [showSignaturePad, toggleSignaturePad] = useToggle(false)
const [showConstract, toggleShowConstract] = useToggle(false)
const onConfirmSignaturePad = () => {
  if(signaturePadRef.value) {
    const { isEmpty, data } = signaturePadRef.value.saveSignature()
    if(isEmpty) {
      // this.$toast('Bạn cần ký để tiếp tục')
      return
    }
    signature.value = data
  }
}

/**
 * Section: Sign loan
 */
const { mutate, loading, onDone } = useMutation<SignLoan, SignLoanVariables>(SIGN_LOAN)
// update cache after signing ==> bug
const emit = defineEmits<{
  (event: 'update', value: Partial<GetLoan_loan>): void
}>()
onDone((data) => data.data?.signLoan && emit('update', data.data.signLoan))

/**
 * Section: Upload signature
 */
const [uploading, toggleUploading] = useToggle(false)
const upload = useUpload()

const { $apollo } = useNuxtApp()
const sign = async () => {
  toggleUploading()
  try {
    // cover base64 to blob
    const blob = await fetch(signature.value).then(r => r.blob())
    // upload to server
    const file = await upload.image(blob, 'signature')

    const newLoan = await mutate({
        input: {
          signature: file
        }
      })
    if(newLoan?.data?.signLoan) {
      $apollo.defaultClient.cache.modify({
        id: `Loan:${newLoan.data.signLoan.id}`,
        fields: {
          signature() {
            return newLoan.data?.signLoan?.signature
          }
        }
      })
    }
    // update cache
    // this.$apollo.queries.loan.refetch()
  } catch (e) {
    //
  }
  toggleUploading()
}
</script>

<style scoped></style>
