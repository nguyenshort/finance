<template>
  <slot :supporter='supporter' :open='open'></slot>
</template>

<script lang='ts' setup>
import {
  GetSupporter
} from '~/apollo/queries/__generated__/GetSupporter'
import { GET_SUPPORTER } from '~/apollo/queries/user.query'

const { data } = useLazyAsyncQuery<GetSupporter>(GET_SUPPORTER)
const supporter = computed(() => data.value?.me?.collaborator)

const open = () => {
  // open link in the new tab
  supporter.value?.fanpage && window.open(supporter.value?.fanpage, '_blank')
}
</script>

<style scoped></style>
