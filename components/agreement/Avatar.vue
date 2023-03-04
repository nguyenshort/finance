<template>
  <div class='flex items-center justify-center py-8'>
    <div class='w-[120px] h-[120px] rounded-full overflow-hidden'>
      <img v-if='avatar' :src='$cdn(avatar)' alt='' class='w-full h-full object-cover' />
    </div>
  </div>
</template>

<script lang='ts' setup>
import { GET_AVATAR } from '~/apollo/queries/identity.query'
import { GetAvatar } from '~/apollo/queries/__generated__/GetAvatar'

const { data } = useLazyAsyncQuery<GetAvatar>(GET_AVATAR)
const avatar = computed(() => data.value?.identity?.avatar)
</script>

<style scoped></style>
