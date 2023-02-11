<template>
  <div>
    <van-nav-bar
        :title="isLogin ? 'Đăng Nhập' : 'Đăng Ký Mới'"
        left-arrow
        class="bg-gradient-to-r from-primary-500 to-primary-700"
        @click-left="$router.back()"
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
            :rules="[{ required: true, message: 'Số điện thoại bắt buộc' }]"
        />


        <van-field
            v-model="from.password"
            type="password"
            name="password"
            label="Mật Khẩu"
            placeholder="*** *** ***"
            :rules="[{ validator: validatorPassword, validateEmpty: false }]"
        />

        <van-field
            v-if="!isLogin"
            v-model="from.rePassword"
            name="password"
            type="password"
            label="Xác Nhận Mật Khẩu"
            placeholder="*** *** ***"
            :rules="[{ validator: validatorRePassword, validateEmpty: false }]"
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


const from = reactive<RegisterData>({
  email: '123456789',
  password: '123456789',
  rePassword: '123456789'
})

const [isLogin, toggleLogin] = useToggle(true)
/**
 * Section: Form Handle
 */
const errorExtracted =  (_e: FirebaseError) => {
  if (_e.code === AuthErrorCodes.USER_DELETED) {
    //errorMessages.total = 'Tài khoản không tồn tại'
  } else if (_e.code === AuthErrorCodes.USER_DISABLED) {
    //errorMessages.total = 'Tài khoản đã bị khóa'
  } else if (_e.code === AuthErrorCodes.INVALID_PASSWORD) {
    //errorMessages.total = 'Mật khẩu không đúng'
  } else if (_e.code === AuthErrorCodes.INVALID_EMAIL) {
    //errorMessages.total = 'Email không hợp lệ'
  } else {
    // errorMessages.total = 'Đăng nhập thất bại'
  }
}
const register = async () =>
{
  try {
    if(isLogin) {
      await signInWithEmailAndPassword(faAuth(), from.email + '@gmail.com', from.password)
    } else {
      await createUserWithEmailAndPassword(faAuth(), from.email + '@gmail.com', from.password)
    }

  } catch (e) {
    console.log(e)
    errorExtracted(e as FirebaseError)
    //
  }
}
const onSubmit = async () => {
  showLoadingToast('')
  await register()
  closeToast()
}


/**
 * Section: Form Validator
 */
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
