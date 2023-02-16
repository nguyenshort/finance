<template>
  <van-popup v-model:show="_show" closeable  position="bottom" :style="{ borderTopLeftRadius: '20px', borderTopRightRadius: '20px', height: '80%'}">


    <div class='px-6 py-4'>
      <h5 class="mb-4 text-2xl">Chi Tiết Hợp Đồng</h5>
      <div>
        <h5>
          <div class='text-center text-2xl'>CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</div>
        </h5>
        <h5>
          <div class='text-center text-2xl'>ĐỘC LẬP - TỰ DO - HANH PHÚC</div>
        </h5>
        <br />
        <h5>
          <div class='text-center text-2xl'>HỢP ĐỒNG VAY TIỀN</div>
        </h5>
        <br />
        <h5>Thông tin cơ bản về khoản vay</h5>
        <p>Bên A (Bên cho vay) Công ty TNHH Tài chính Hoàng Kim</p>
        <p>
          Bên B (Bên vay) Ông / Bà :
          <span class="fullname-cont">
            {{ contract.info?.name }}
          </span>
        </p>
        <p>Số CMT / CCCD : <span class="cmnd-cont">{{ contract.info?.cccd }}</span></p>
        <p>Ngày ký : <span class="date-cont-2">7/41/2022</span></p>
        <p>
          Số tiền khoản vay : <span class="value-cont-home">
          {{ $moneyFormat(contract.loan?.amount) + " VND" }}
        </span>
        </p>
        <p>
          Mã hợp đồng : <span class="contractid-cont-home">2022/5/7-121221</span>
        </p>
        <p>Thời gian vay : <span class="month-cont-home">{{ contract.loan?.months }} tháng</span></p>
        <p>lãi suất cho vay là {{ contract.loan?.interest }}% mỗi tháng</p>
        <p>
          Hợp đồng nêu rõ các bên đã đặt được thỏa thuận vay sau khi thương lượng
          và trên cơ sở bình đẳng , tự nguyện và nhất trí . Tất cả các bên cần đọc
          kỹ tất cả các điều khoản trong thỏa thuận này, sau khi ký vào thỏa thuận
          này coi như các bên đã hiểu đầy đủ và đồng ý hoàn toàn với tất cả các
          điều khoản và nội dung trong thỏa thuân này.
        </p>
        <p>
          1.Phù hợp với các nguyên tắc bình đẳng , tự nguyện , trung thực và uy
          tín , hai bên thống nhất ký kết hợp đồng vay sau khi thương lượng và
          cùng cam kết thực hiện.
        </p>
        <p>
          2.Bên B cung cấp tài liệu đính kèm của hợp đồng vay và có hiệu lực pháp
          lý như hợp đồng vay này.
        </p>
        <p>
          3.Bên B sẽ tạo lệnh tính tiền gốc và lãi dựa trên số tiền vay từ ví ứng
          dụng do bên A cung cấp.
        </p>
        <p>4.Điều khoản đảm bảo.</p>
        <p>
          - Bên vay không được sử dụng tiền vay để thực hiện các hoạt động bất hợp
          pháp .Nếu không , bên A có quyền yêu cầu bên B hoàn trả ngay tiền gốc và
          lãi , bên B phải chịu các trách nhiêm pháp lý phát sinh từ đó.
        </p>
        <p>
          - Bên vay phải trả nợ gốc và lãi trong thời gian quy định hợp đồng. Đối
          với phần quá hạn , người cho vay có quyền thu hồi nơ trong thời hạn và
          thu ( lãi quá hạn ) % trên tổng số tiền vay trong ngày.
        </p>
        <p>
          - Gốc và lãi của mỗi lần trả nợ sẽ được hệ thống tự động chuyển từ tài
          khoản ngân hàng do bên B bảo lưu sang tài khoản ngân hàng của bên A .
          Bên B phải đảm bảo có đủ tiền trong tài khoản ngân hàng trước ngày trả
          nợ hàng tháng.
        </p>
        <p>5.Chịu trách nhiệm do vi pham hợp đồng</p>
        <p>
          - Nếu bên B không trả được khoản vay theo quy định trong hợp đồng. Bên B
          phải chịu các khoản bồi thường thiệt hại đã thanh lý và phí luật sư, phí
          kiện tựng, chi phí đi lại và các chi phí khác phát sinh do kiện tựng.
        </p>
        <p>
          - Khi bên A cho rẳng bên B đã hoặc có thể xảy ra tình huống ảnh hưởng
          đến khoản vay thì bên A có quyền yêu cầu bên B phải trả lại kịp thời
          trược thời hạn.
        </p>
        <p>
          - Người vay và người bảo lãnh không được vi phạm điều lệ hợp đồng vì bất
          kỳ lý do gì
        </p>
        <p>
          6.Phương thức giải quyết tranh chấp hợp đồng. <br />Tranh chấp phát sinh
          trong quá trình thực hiện hợp đồng này sẽ được giải quyết thông qua
          thương lượng thân thiện giữa các bên hoặc có thể nhờ bên thứ ba làm
          trung gian hòa giải .Nếu thương lượng hoặc hòa giải không thành , có thể
          khởi kiện ra tòa án nhân dân nơi bên A có trụ sở.
        </p>
        <p>
          7.Khi người vay trong quá trình xét duyệt khoản vay không thành công do
          nhiều yếu tố khác nhau như chứng minh thư sai, thẻ ngân hàng sai , danh
          bạ sai. Việc thông tin sai lệch này sẽ khiến hệ thống phát hiện nghi ngờ
          gian lận hoặc giả mạo khoản vay và bên vay phải chủ động hợp tác với bên
          A để xử lý.
        </p>
        <p>
          8.Nếu không hợp tác. Bên A có quyền khởi kiện ra Tòa án nhân dân và
          trình báo lên Trung tâm Báo cáo tín dụng của Ngân hàng nhà nước Việt Nam
          , hồ sơ nợ xấu sẽ được phản ánh trong báo cáo tín dụng , ảnh hưởng đến
          tín dụng sau này của người vay , vay vốn ngân hàng và hạn chế tiều dùng
          của người thân , con cái người vay ...
        </p>
        <br />
        <p>Người vay ký</p>
        <div style="width: 100%; text-align: center">
          <img
            v-if="contract.loan?.signature"
            id="theimage-2"
            style="width: 100%"
            :src="$cdn(contract.loan?.signature)"
            alt=""
          />
        </div>

        <h5 class="fullname-contact">{{ contract.info?.name }}</h5>
      </div>
    </div>

  </van-popup>
</template>

<script lang="ts" setup>
import deepmerge from "deepmerge"
// import { GetLoan_loan } from "~/apollo/queries/__generated__/GetLoan"


import { GET_CONTRACT_INFO } from '~/apollo/queries/contract.query'
import { GetContractInfo, GetContractInfo_me } from '~/apollo/queries/__generated__/GetContractInfo'

const props = defineProps<{
  show: boolean
  overide: Partial<GetContractInfo_me>
}>()

const { data } = useLazyAsyncQuery<GetContractInfo>(GET_CONTRACT_INFO)
const contract = computed<Partial<GetContractInfo_me>>(() => deepmerge(data.value?.me || {}, props.overide))

// defineProps<{
//   contract: Pick<GetLoan_loan, "id" | "signature">;
// }>()

const _show = ref(props.show)
//define emits
const emit = defineEmits<{
  (event: 'update:show', value: boolean): void
}>()

watch(() => props.show, (value) => {
  _show.value = value
})

watch(_show, (value) => {
  emit('update:show', value)
})
</script>

<style scoped></style>
