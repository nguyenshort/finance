<template>
  <div class='px-4 mt-10'>
    <div
      ref='containerRef'
      class='h-[310px] overflow-hidden scrollbar-hide examples relative'
      :style='{ height: containerHeight + "px" }'
    >


      <div
        ref='parentRef'
        class='absolute transform transition-all duration-500'
        :style='{ top: -scrollHeight + "px" }'
      >
        <div
          v-for='(item, index) in examples'
          :key='index'
          class='pb-5 last:mb-0 transition'
          :class='[`item-${index+1}`]'
          ref='itemsRef'
        >

          <div class='flex'>
            <div class='flex-shrink-0'>
              <div class='w-[45px] h-[45px] rounded-full overflow-hidden'>
                <img :src='item.avatar' alt='' class='w-full h-full object-cover' />
              </div>
            </div>

            <div class='w-full ml-3 p-3 border rounded-lg'>
              <h4>{{ item.name }}</h4>
              <p class='text-[14px] text-gray-500'>{{ item.content }}</p>

              <div class='text-gray-500 text-[12px] text-right mt-3'>
                {{ item.date }}
              </div>

            </div>
          </div>

        </div>
      </div>

    </div>


    <div>
      <textarea v-model='content' placeholder='Nhập bình luận của bạn' class='h-[200px] bg-gray-100 w-full p-4 rounded-lg text-[14px] mb-3'></textarea>
      <van-button type='primary' :disabled='!content' @click='content = ""'>Đăng Bình Luận</van-button>
    </div>

  </div>
</template>

<script lang='ts' setup>
const { $dayjs } = useNuxtApp()

const arrays = [
  {
    content: 'Dịch vụ cho vay tiền của trang web này rất nhanh chóng và tiện lợi.',
    name: 'Trần Văn Nhớ',
  },
  {
    content: 'Tôi đã nhận được khoản vay của tôi trong vòng 24 giờ. Tôi sẽ giới thiệu cho bạn bè của tôi. Cảm ơn bạn.',
    name: 'Nguyễn Thị Hồng',
  },
  {
    content: 'Tôi đã tìm thấy nhiều thông tin hữu ích về các lựa chọn vay vốn trên trang web này.',
    name: 'Đinh Thị Đông Phương'
  },
  {
    content: 'Tôi cảm thấy yên tâm khi vay tiền từ trang web này vì đội ngũ hỗ trợ khách hàng rất chuyên nghiệp.',
    name: 'Trần Thị Thanh Thủy'
  },
  {
    content: 'Tôi rất ấn tượng với quy trình vay tiền đơn giản và dễ dàng của trang web.',
    name: 'Lê Thị Hạnh'
  },
  {
    content: 'Chúng tôi đã được hướng dẫn rõ ràng về tất cả các khoản phí và chi phí liên quan đến vay tiền, giúp chúng tôi đưa ra quyết định đúng đắn.',
    name: 'Lê Thị Kim Ngân'
  },
  {
    content: 'Tôi đã được cung cấp một khoản vay vốn với lãi suất hợp lý và điều kiện vay linh hoạt từ trang web này.',
    name: 'Trần Thị Khánh Linh'
  },
  {
    content: 'Tôi cảm thấy an tâm khi vay tiền từ trang web này vì thông tin cá nhân của tôi được bảo mật và đảm bảo an toàn.',
    name: 'Đặng Hải Dương'
  },
  {
    content: 'Tôi đã có trải nghiệm tuyệt vời với dịch vụ của trang web này và sẽ tiếp tục sử dụng nó trong tương lai.',
    name: 'Võ Ðức Hòa'
  },
  {
    content: 'Tôi rất hài lòng với đội ngũ nhân viên hỗ trợ khách hàng của trang web này, luôn sẵn sàng giải đáp mọi thắc mắc của tôi.',
    name: 'Lê Thanh Tuấn'
  },
  {
    content: 'Dịch vụ vay tiền của trang web này là một lựa chọn tuyệt vời cho những ai đang tìm kiếm một giải pháp cho vấn đề tài chính của mình.',
    name: 'Hồ Công Định'
  },
  {
    content: 'Trang web này cung cấp nhiều lựa chọn cho vay tiền, từ vay tín dụng đến vay thế chấp, giúp tôi tìm được gói vay phù hợp.',
    name: 'Hoàng Ðức Chính'
  }
]

const examples = computed(() => arrays.map((item, index) => {
  return {
    id: index,
    content: item.content,
    name: item.name,
    avatar: `/images/example/_${index + 1}.jpg`,
    date: $dayjs().subtract(Math.floor(Math.random() * 24), 'hour').valueOf(),
  }
})
  .sort((a, b) => b.date - a.date)
  .map((item) => {
    return {
      ...item,
      date: $dayjs(item.date).fromNow()
    }
  })
)

const containerRef = ref<HTMLElement>()
const parentRef = ref<HTMLElement>()
const itemsRef = ref<HTMLElement[]>([])

const heights = computed(() => {
  return itemsRef.value.map((item) => item.offsetHeight)
})


const { counter } = useInterval(3000, { controls: true })

const currentIndex = ref(0)
const scrollHeight = ref(0)
const containerHeight = ref(0)

onMounted(() => nextTick(() => {

  containerHeight.value = heights.value[currentIndex.value] + heights.value[currentIndex.value + 1]

}))

watch(counter, (value) => {
  if (value === 0) {
    currentIndex.value = 0
  } else {
    currentIndex.value = value % examples.value.length
  }

  containerHeight.value = heights.value[currentIndex.value] + heights.value[currentIndex.value + 1]
  scrollHeight.value = heights.value.slice(0, currentIndex.value).reduce((a, b) => a + b, 0)
})


const content = ref('')
</script>

<style scoped></style>
