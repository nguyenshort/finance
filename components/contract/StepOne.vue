<template>
  <div>

    <ul>
      <li class="flex text-gray-600 text-sm py-3 border-b border-gray-100">
        <div class="w-1/2">Hạn mức vay</div>
        <div class="w-1/2">2000000 VND</div>
      </li>

      <li class="flex text-gray-600 text-sm py-3 border-b border-gray-100">
        <div class="w-1/2">Số kì thanh toán</div>
        <div class="w-1/2">20</div>
      </li>


      <li class="flex text-gray-600 text-sm py-3 border-b border-gray-100">
        <div class="w-1/2">Chữ ký</div>
        <div class="w-1/2">{{ signature ? 'Chưa Ký' : 'Đã Ký' }}</div>
      </li>

    </ul>


    <template v-if="!signature">
      <div v-if="showSignaturePad" class="mt-4">
        <div class="text-center mb-3">
          <p class="text-gray-600 text-sm">Ký vào khung bên dưới</p>
        </div>
        <div id="signaturePad" class="border rounded rounded-lg border-gray-200">
          <VueSignaturePad ref="signaturePadRef" height="200px" />
        </div>
        <a class="text-gray-500 mt-3 text-sm" href="javascript:void(0)" @click="resetSignaturePad">Làm mới</a>

        <div class="flex justify-center mt-5">

          <button
              class="btn-effect btn-text-size px-5 py-2 uppercase animate"
              @click="onConfirmSignaturePad"
          >
            Xác Nhận
          </button>

        </div>

      </div>
      <div v-else class="flex justify-center mt-5">

        <button
            class="btn-effect btn-text-size px-5 py-2 uppercase animate"
            @click="showSignaturePad = true"
        >
          Ký Hợp Đồng
        </button>

      </div>
    </template>

    <template v-else>
      <div class="signature-image">
        <img class="w-full h-full object-cover" :src="signature" alt=""/>
      </div>
      <a class="text-primary-500 mt-3 text-sm" href="javascript:void(0)" @click="viewConstract">Xem hợp đồng</a>

      <div class="flex justify-center mt-5">

        <button
            class="btn-effect btn-text-size px-5 py-2 uppercase animate"
            @click="$emit('next')"
        >
          Bước Tiếp Theo
        </button>

      </div>

    </template>


    <van-popup v-model:show="showConstract" closeable  position="bottom" :style="{ borderTopLeftRadius: '20px', borderTopRightRadius: '20px', height: '80%'}">
      <div class="px-4 py-5">
        <h5 class="mb-4">Chi Tiết Hợp Đồng</h5>

        <div>
          <h5>
            <center>CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</center>
          </h5>
          <h5>
            <center>ĐỘC LẬP - TỰ DO - HANH PHÚC</center>
          </h5><br>
          <h5>
            <center>HỢP ĐỒNG VAY TIỀN</center>
          </h5>
          <br>
          <h5>Thông tin cơ bản về khoản vay</h5>
          <p>Bên A (Bên cho vay) Công ty TNHH Tài chính Hoàng Kim</p>
          <p>Bên B (Bên vay) Ông / Bà : <span class="fullname-cont">fsdggdfgfdgdg</span> </p>
          <p> Số CMT / CCCD : <span class="cmnd-cont">423545345345</span></p>
          <p>Ngày ký : <span class="date-cont-2">7/41/2022</span> </p>
          <p>Số tiền khoản vay : <span class="value-cont-home">50,000,000</span></p>
          <p>Mã hợp đồng : <span class="contractid-cont-home">2022/5/7-121221</span></p>
          <p>Thời gian vay : <span class="month-cont-home">12 tháng</span></p>
          <p>lãi suất cho vay là 01% mỗi tháng</p>
          <p>Hợp đồng nêu rõ các bên đã đặt được thỏa thuận vay sau khi thương lượng và trên cơ sở bình đẳng ,
            tự nguyện và nhất trí . Tất cả các bên cần đọc kỹ tất cả các điều khoản trong thỏa thuận này,
            sau khi ký vào thỏa thuận này coi như các bên đã hiểu đầy đủ và đồng ý hoàn toàn với tất cả các
            điều khoản và nội dung trong thỏa thuân này.</p>
          <p>1.Phù hợp với các nguyên tắc bình đẳng , tự nguyện , trung thực và uy tín , hai bên thống nhất ký
            kết hợp đồng vay sau khi thương lượng và cùng cam kết thực hiện.</p>
          <p>2.Bên B cung cấp tài liệu đính kèm của hợp đồng vay và có hiệu lực pháp lý như hợp đồng vay này.
          </p>
          <p>3.Bên B sẽ tạo lệnh tính tiền gốc và lãi dựa trên số tiền vay từ ví ứng dụng do bên A cung cấp.
          </p>
          <p>4.Điều khoản đảm bảo.</p>
          <p>- Bên vay không được sử dụng tiền vay để thực hiện các hoạt động bất hợp pháp .Nếu không , bên A
            có quyền yêu cầu bên B hoàn trả ngay tiền gốc và lãi , bên B phải chịu các trách nhiêm pháp lý
            phát sinh từ đó.</p>
          <p>- Bên vay phải trả nợ gốc và lãi trong thời gian quy định hợp đồng. Đối với phần quá hạn , người
            cho vay có quyền thu hồi nơ trong thời hạn và thu ( lãi quá hạn ) % trên tổng số tiền vay trong
            ngày.</p>
          <p>- Gốc và lãi của mỗi lần trả nợ sẽ được hệ thống tự động chuyển từ tài khoản ngân hàng do bên B
            bảo lưu sang tài khoản ngân hàng của bên A . Bên B phải đảm bảo có đủ tiền trong tài khoản ngân
            hàng trước ngày trả nợ hàng tháng.</p>
          <p>5.Chịu trách nhiệm do vi pham hợp đồng</p>
          <p>- Nếu bên B không trả được khoản vay theo quy định trong hợp đồng. Bên B phải chịu các khoản bồi
            thường thiệt hại đã thanh lý và phí luật sư, phí kiện tựng, chi phí đi lại và các chi phí khác
            phát sinh do kiện tựng.</p>
          <p>- Khi bên A cho rẳng bên B đã hoặc có thể xảy ra tình huống ảnh hưởng đến khoản vay thì bên A có
            quyền yêu cầu bên B phải trả lại kịp thời trược thời hạn.</p>
          <p>- Người vay và người bảo lãnh không được vi phạm điều lệ hợp đồng vì bất kỳ lý do gì</p>
          <p>6.Phương thức giải quyết tranh chấp hợp đồng. <br>Tranh chấp phát sinh trong quá trình thực hiện
            hợp đồng này sẽ được giải quyết thông qua thương lượng thân thiện giữa các bên hoặc có thể nhờ
            bên thứ ba làm trung gian hòa giải .Nếu thương lượng hoặc hòa giải không thành , có thể khởi
            kiện ra tòa án nhân dân nơi bên A có trụ sở.</p>
          <p>7.Khi người vay trong quá trình xét duyệt khoản vay không thành công do nhiều yếu tố khác nhau
            như chứng minh thư sai, thẻ ngân hàng sai , danh bạ sai. Việc thông tin sai lệch này sẽ khiến hệ
            thống phát hiện nghi ngờ gian lận hoặc giả mạo khoản vay và bên vay phải chủ động hợp tác với
            bên A để xử lý.</p>
          <p>8.Nếu không hợp tác. Bên A có quyền khởi kiện ra Tòa án nhân dân và trình báo lên Trung tâm Báo
            cáo tín dụng của Ngân hàng nhà nước Việt Nam , hồ sơ nợ xấu sẽ được phản ánh trong báo cáo tín
            dụng , ảnh hưởng đến tín dụng sau này của người vay , vay vốn ngân hàng và hạn chế tiều dùng của
            người thân , con cái người vay ...</p><br>
          <p>Người vay ký</p>
          <div style="width: 100%; text-align: center;">
            <img v-if="signature" id="theimage-2" style="width: 100%;" :src="signature" alt="">
          </div>

          <h5 class="fullname-contact">fsdggdfgfdgdg</h5>
        </div>

      </div>
    </van-popup>
  </div>
</template>

<script lang="ts" setup>
import {SignaturePadEntity} from "~/entities/signature-pad.entity"

const showSignaturePad = ref<boolean>(false)
const signature = ref('')
const showConstract = ref<boolean>(false)

const signaturePadRef = ref<SignaturePadEntity|undefined>()
const resetSignaturePad = () => {
  signaturePadRef.value?.clearSignature()
}
const onConfirmSignaturePad = () => {
  if(signaturePadRef.value) {
    const { isEmpty, data } = signaturePadRef.value.saveSignature()
    if(isEmpty) {
      // this.$toast('Bạn cần ký để tiếp tục')
      return
    }
    signature.value = data
  }
}
const viewConstract = () => {
  showConstract.value = true
}
</script>

<style scoped></style>
