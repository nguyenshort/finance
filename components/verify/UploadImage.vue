<template>
  <van-uploader
      ref="el"
      v-model="fileList"
      class="w-full upload-id"
      accept="image/*"
      :after-read="afterRead"
      :max-count="1"
      :preview-size="[width, width / radio]"
      @delete="emit('update:value', '')"
  >

    <div class="upload-overlay bg-white rounded flex justify-center items-center">
      <van-button icon="photograph" type="primary">
        {{ title }}
      </van-button>
    </div>

  </van-uploader>
</template>

<script lang="ts" setup>
import {UploaderFileListItem} from "vant/lib/uploader/types";

const props = defineProps<{
  value: string
  title: string
  radio: number
}>()

const fileList = ref([])

const _value = ref(props.value)

// defineEmits to binding two-way data binding
const emit = defineEmits<{
  (event: 'update:value', value: string): void
}>()
watch(_value, (value) => {
  emit('update:value', value)
})

const upload = useUpload()
const afterRead = async (file: UploaderFileListItem) => {
  if(file.file instanceof File) {
    file.url = URL.createObjectURL(file.file)
    file.status = 'uploading'
    file.message = 'Đang tải lên ...'

    try {
      const data = await upload.image(file.file, 'id')
      URL.revokeObjectURL(file.url)
      file.url = data
      file.status = 'done'
      emit('update:value', data)
    } catch (e) {
      file.status = 'failed'
      file.message = 'Tải lên thất bại'
      URL.revokeObjectURL(file.url)
      file.url = ''
    }
  }
}

// size
const el = ref<HTMLElement>()
const { width } = useElementSize(el)
</script>

<style scoped></style>
