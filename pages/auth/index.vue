<template>
  <div>
    <van-nav-bar
        :title="isLogin ? 'Đăng Nhập' : 'Đăng Ký Mới'"
        left-arrow
        class="bg-gradient-to-r from-primary-500 to-primary-700"
    />

    <div class="flex justify-center pt-5">

      <van-image
          width="170"
          height="auto"
          fit="cover"
          src="/images/logofinace.png"
      />

    </div>

    <div class="text-center text-sm text-gray-400 mt-3">Nhập số điện thoại để tiến hành đăng kí</div>


    <div class="flex justify-center mt-4">
      <van-form class="max-w-[420px] w-full" @submit="onSubmit">
        <van-field
            v-model="from.email"
            name="email"
            label="Số Điện Thoại"
            placeholder="*** *** ***"
            :rules="[{ validator: validatorPhoneNumber, message: 'Số điện thoại bắt buộc' }]"
        />


        <van-field
            v-model="from.password"
            type="password"
            name="password"
            label="Mật Khẩu"
            placeholder="*** *** ***"
            :rules="[{ validator: validatorPassword }]"
        />

        <van-field
            v-if="!isLogin"
            v-model="from.rePassword"
            name="password"
            type="password"
            label="Xác Nhận Mật Khẩu"
            placeholder="*** *** ***"
            :rules="[{ validator: validatorRePassword }]"
        />

        <p v-if='!isLogin' class='text-[12px] text-gray-400 ml-4 mt-3'>
          Mật khẩu phải gồm 6 tới 20 ký tự bao gồm chữ và số
        </p>

        <div v-if='error' class='text-[12px] text-rose-600 ml-4 mt-3 text-center'>
          {{ error }}
        </div>

        <div class="text-center text-[13px] mt-[16px] text-gray-600">
          <p v-if="isLogin">Chưa có tài khoản <a class="text-primary-600" @click.prevent="toggleLogin()" href="#">Đăng ký ngay</a></p>
          <p v-else>Đã có tài khoản <a class="text-primary-600" @click.prevent="toggleLogin()" href="#">Đăng nhập ngay</a></p>
        </div>

        <div style="margin: 16px;">
          <van-button round block type="primary" native-type="submit" :loading='loading'>
            {{ isLogin ? 'Đăng Nhập Ngay' : 'Đăng Ký Ngay'}}
          </van-button>
        </div>
      </van-form>
    </div>

  </div>
</template>

<script lang="ts" setup>
import {RegisterData} from "~/entities/auth.entity"
import { SIGN_IN, SIGN_UP } from '~/apollo/mutates/auth.mutate'
import { SignUp, SignUpVariables } from '~/apollo/mutates/__generated__/SignUp'
import { SignIn, SignInVariables } from '~/apollo/mutates/__generated__/SignIn'
import { ApolloError } from '@apollo/client/core'

const from = reactive<RegisterData>({
  email: '0396094050',
  password: 'Khoi025',
  rePassword: 'Khoi025'
})
const error = ref('')

const [isLogin, toggleLogin] = useToggle(true)
/**
 * Section: Form Handle
 */
const { mutate: signUp, loading: loadingSignUp } = useMutation<SignUp, SignUpVariables>(SIGN_UP)
const { mutate: signIn, loading: loadingSignIn } = useMutation<SignIn, SignInVariables>(SIGN_IN)
const loading = computed(() => loadingSignUp.value || loadingSignIn.value)

const writeToken = async (token: string, notify: string) => {
  try {
    await $fetch('/api/auth', {
      method: 'POST',
      body: JSON.stringify({
        token
      })
    })
    showNotify({
      type: 'success',
      message: notify
    })

    setTimeout(() => {
      window.location.href = '/'
    }, 1000)
  } catch (e) {
    //
  }
}
const authAction = async () => {
  error.value = ''
  try {
    if(isLogin.value) {
      const res = await signIn({
        input: {
          email: from.email,
          password: from.password
        }
      })
      if (res?.data?.signIn) {
        await writeToken(res?.data?.signIn, 'Đăng Nhập Thành Công')
      }
    } else {
      const res = await signUp({
          input: {
            email: from.email,
            password: from.password
          }
      })
      if (res?.data?.signUp) {
        await writeToken(res?.data?.signUp, 'Đăng Ký Thành Công')
      }
    }

  } catch (e) {
    if(e instanceof ApolloError) {
      error.value = e.graphQLErrors[0].message
    }
  }
}
const onSubmit = async () => {
  showLoadingToast('')
  await authAction()
  closeToast()
}

/**
 * Section: Form Validator
 */

const validatorPhoneNumber = (val: string) => {
  if(!/(84|0[3|5|7|8|9])+([0-9]{8})/g.test(val) || val.length > 10) {
    return 'Số điện thoại không hợp lệ'
  }
}

const validatorPassword = (val: string) => {
  if(val.length < 6) {
    return 'Mật khẩu phải lớn hơn 6 ký tự'
  }

  if(!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/g.test(val)) {
    return 'Mật khẩu phải gồm chữ và số'
  }
}
// Repassword
const validatorRePassword = (val: string) => {
  if(val !== from.password) {
    return 'Mật khẩu không khớp'
  }
}
</script>

<style scoped></style>
