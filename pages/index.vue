<template>
  <div>
    <div class="bg-gradient-to-r from-primary-500 to-primary-700 h-[32px]">
      <client-only>
        <div class="text-white flex items-center px-4 pt-2">
          <van-icon class="mr-1" name="volume-o" />
          <client-only>
            <home-marquee />
          </client-only>
        </div>
      </client-only>
    </div>

    <div class="bg-gradient-to-r from-primary-500 to-primary-700 py-4 px-2">
      <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
        <van-swipe-item>
          <div
            class="_img"
            style="background-image: url(/images/banner/banner_111.jpeg)"
          />
        </van-swipe-item>
        <van-swipe-item>
          <div
            class="_img"
            style="background-image: url(/images/banner/banner_222.jpeg)"
          />
        </van-swipe-item>
        <van-swipe-item>
          <div
            class="_img"
            style="background-image: url(/images/banner/banner_333.jpeg)"
          />
        </van-swipe-item>
      </van-swipe>
    </div>

    <div class="text-center mt-4 text-gray-600">
      <h4 class="font-semibold text-[15px]">Khoản vay đầu tiên có sẵn</h4>
      <h5 class="font-semibold mt-0.5">30 triệu → 500 triệu đồng</h5>
    </div>

    <div class="_menu flex justify-center mt-6 flex-wrap w-[250px] mx-auto">
      <a
        v-for="item in menu"
        :key="item.text"
        :href="item.to"
        class="w-1/2 flex flex-col items-center mb-10"
        @click.prevent='navigatorHandle(item.to)'
      >
        <img :src="item.icon" alt="" class="w-[56px]" />
        <span class="font-semibold mt-2 text-[14px]">{{ item.text }}</span>
      </a>
    </div>

    <van-popup v-model:show="showModal" :style="{ padding: '25px', borderRadius: '15px' }" closeable>
      <div class="text-center">
        <h4 class="font-semibold text-[15px] mt-4">Bạn chưa đăng ký vay</h4>
        <h5 class="font-semibold mt-0.5">Đăng ký ngay để nhận khoản vay đầu tiên</h5>
        <div class='h-4'></div>
        <van-button type="primary" @click="$router.push('/verify')">Đăng ký</van-button>
      </div>
    </van-popup>

    <div class='mt-4 px-4'>
      <div class='flex flex-wrap -m-3'>

        <div
          v-for='item in items'
          :key='item.text'
          class='w-1/2 p-3'
        >
          <div class='shadow p-3 rounded-lg'>
            <div class='w-[65px] h-[65px]'>
              <img :src='item.icon' alt='' class='w-full h-full object-cover' />
            </div>
            <div>
              <h4 class='text-[16px] mt-5'>{{ item.text }}</h4>

              <div class='w-full bg-primary-600 h-[4px] rounded-full my-4'></div>

              <h5 class='text-[14px] text-gray-500'>{{ item.des }}</h5>
            </div>
          </div>
        </div>

      </div>
    </div>

<!--    <ul class="px-4 mt-7">-->
<!--      <li>• Chỉ mất 3 phút đăng ký</li>-->
<!--      <li>• Thông tin chi tiết - Lãi suất minh bạch</li>-->
<!--      <li>• Nhận kết quả hồ sơ nhanh chóng</li>-->
<!--    </ul>-->
  </div>
</template>

<script lang="ts" setup>
import { CHECK_SIGNED } from '~/apollo/queries/user.query'
import { CheckSigned } from '~/apollo/queries/__generated__/CheckSigned'

const { data } = useLazyAsyncQuery<CheckSigned>(CHECK_SIGNED)
const isUnverified = computed(() => !data.value?.me?.loan?.signature)

const menu = computed(() => [
  {
    text: 'Vay Tiền',
    icon: '/images/home/loan.png',
    to: '/verify',
  },
  {
    text: 'CSKH',
    icon: '/images/home/support.png',
    to: '/contact',
  },
  {
    text: 'Ví Tiền',
    icon: '/images/home/wallet.png',
    to: '/wallet',
  },
  {
    text: 'Hợp Đồng',
    icon: '/images/home/contract.png',
    to: '/agreement',
  },
])

const items = [
  {
    text: 'Uy tín hàng đầu',
    icon: '/images/banner2/0.png',
    des: 'Được đánh giá cao về uy tín, chất lượng',
  },
  {
    text: 'Lãi xuất tốt',
    icon: '/images/banner2/1.png',
    des: 'Cam kết lãi xuất rẻ nhất thị trường',
  },
  {
    text: 'Bảo mật không tin',
    icon: '/images/banner2/2.png',
    des: 'Thông tin cá nhân được bảo mật tuyệt đối',
  },
  {
    text: 'Nhanh chóng',
    icon: '/images/banner2/3.png',
    des: 'Thủ tục đơn giản, nhanh chóng, dễ dàng',
  }
]

const router = useRouter()
const [showModal, toggleShowModal] = useToggle(false)
const navigatorHandle = (to: string) => {
  if (isUnverified.value && to !== '/agreement') {
    toggleShowModal()
  } else {
    router.push(to)
  }
}

</script>

<style>
#slider {
  max-height: 280px;
  max-width: 420px;
  width: 100%;
  height: 100%;
  border-radius: 5px;
  margin: 0 auto;
  overflow: hidden;
}

.my-swipe .van-swipe-item ._img {
  aspect-ratio: 420 / 220;
  background-size: cover;
  background-repeat: no-repeat;
  max-width: 420px;
  margin: 0 auto;
  border-radius: 8px;
}
</style>
