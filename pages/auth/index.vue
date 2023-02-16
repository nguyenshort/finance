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
          height="170"
          fit="cover"
          src="/images/logo.png"
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

        <div class="text-center text-[13px] mt-[16px] text-gray-600">
          <p v-if="isLogin">Chưa có tài khoản <a class="text-primary-600" @click.prevent="toggleLogin()" href="#">Đăng ký ngay</a></p>
          <p v-else>Đã có tài khoản <a class="text-primary-600" @click.prevent="toggleLogin()" href="#">Đăng nhập ngay</a></p>
        </div>

        <div style="margin: 16px;">
          <van-button round block type="primary" native-type="submit">
            {{ isLogin ? 'Đăng Nhập Ngay' : 'Đăng Ký Ngay'}}
          </van-button>
        </div>
      </van-form>
    </div>

  </div>
</template>

<script lang="ts" setup>
import {RegisterData} from "~/entities/auth.entity"
import {FirebaseError} from "@firebase/util";
import {AuthErrorCodes, createUserWithEmailAndPassword, signInWithEmailAndPassword} from "@firebase/auth"
import { showNotify } from 'vant'


const from = reactive<RegisterData>({
  email: '',
  password: '',
  rePassword: ''
})

const [isLogin, toggleLogin] = useToggle(true)
/**
 * Section: Form Handle
 */
const errorExtracted =  (_e: FirebaseError) => {
  let errorMessage
  switch (_e.code) {
    case AuthErrorCodes.USER_DELETED:
      errorMessage = 'Tài khoản không tồn tại'
      break
    case AuthErrorCodes.USER_DISABLED:
      errorMessage = 'Tài khoản đã bị khóa'
      break
    case AuthErrorCodes.INVALID_PASSWORD:
      errorMessage = 'Mật khẩu không đúng'
      break
    case AuthErrorCodes.INVALID_EMAIL:
      errorMessage = 'Email không hợp lệ'
      break
    default:
      errorMessage = 'Đăng nhập thất bại'
      break
  }

  showNotify({
    type: 'danger',
    message: errorMessage
  })
}
const authAction = async () =>
{
  try {
    if(isLogin.value) {
      await signInWithEmailAndPassword(faAuth(), from.email + '@gmail.com', from.password)
      showNotify({
        type: 'success',
        message: 'Đăng Nhập Thành Công'
      })
    } else {
      await createUserWithEmailAndPassword(faAuth(), from.email + '@gmail.com', from.password)
      showNotify({
        type: 'success',
        message: 'Đăng Ký Thành Công'
      })
    }

  } catch (e) {
    errorExtracted(e as FirebaseError)
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
  if(!/(84|0[3|5|7|8|9])+([0-9]{8})/g.test(val)) {
    return 'Số điện thoại không hợp lệ'
  }
}

const validatorPassword = (val: string) => {
  if(val.length < 6) {
    return 'Mật khẩu phải lớn hơn 6 ký tự'
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
