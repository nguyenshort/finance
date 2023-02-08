<template>
  <div>

    <div class="bg-gray-100 px-4 py-4">
      <verify-upload-image v-model:value="form.front"  title="Mặt Trước CMT/CCCD" :radio="8/5"/>

      <verify-upload-image v-model:value="form.back" class="mt-5"  title="Mặt Sau CMT/CCCD" :radio="8/5"/>

      <verify-upload-image v-model:value="form.avatar" class="mt-5"  title="Ảnh Chân Dung" :radio="3/4"/>
    </div>
    <div class="flex justify-center mt-5">
      <van-button
          type="primary"
          round
          :disabled="disabled"
          :loading="loading"
          @click="submitIdentity"
      >
        Bước Tiếp Theo
      </van-button>
    </div>

  </div>
</template>

<script lang="ts" setup>
import {UpdateIdentityInput} from "~/apollo/__generated__/serverTypes";
import {UPDATE_IDENTITY} from "~/apollo/mutates/identity.mutate";
import {UpdateIdentity, UpdateIdentityVariables} from "~/apollo/mutates/__generated__/UpdateIdentity"

const form = reactive<UpdateIdentityInput>({
  front: '',
  back: '',
  avatar: ''
})

const disabled = computed(()=> Object.values(form).some((e) => !e))

const { mutate, loading } = useMutation<UpdateIdentity, UpdateIdentityVariables>(UPDATE_IDENTITY)

// define emit to emit "next" event
const emit = defineEmits<{
  (event: 'next'): void
}>()
const submitIdentity = async () => {
  await mutate({ input: form })
  if(!disabled.value) {
    emit('next')
  }
}
</script>

<style scoped></style>
