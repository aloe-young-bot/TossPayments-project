/// <reference types="cypress" />

import { type } from "wd/lib/commands.js";
import { module, node } from "../Function/Function.js";
import { service, testData } from "../config.js";

// === 테스트 환경 설정 ===
const testDevice = "MOBILE"; // PC, MOBILE

// === 기본 테스트 데이터 ===
const defaultSetup = {
  // device userAgent 설정
  device: testDevice,
  /** testData
  * .customer : 기본 정보
   @infoFilled : 이름, 휴대폰번호, 요청사항 모두 있음
   @infoWithoutName : 이름 없음
   @infoWithoutPhoneNumber : 휴대폰번호 없음
   @infoWithoutRequest : 요청사항 없음
   @infoEmpty : 전부 없음

  * .refundAccount : 환불받을 은행 정보
   @validInfo : 유효한 정보
   @invalidInfo : 유효하지 않은 정보
   @emptyInfo : 정보 없음 (= 환불 미진행)

  * .depositBank : 입금할 은행

  * .cashReceipt : 현금영수증
   @phoneNumber : 소득공제용(휴대폰번호)
   @cashReceiptCard : 소득공제용(현금영수증카드)
   @businessNumber : 지출증빙용(사업자번호)
   @none : 발급안함
  */
  customer: testData.customer.infoFilled,
  refundAccount: testData.refundAccount.validInfo,
  depositBank: testData.depositBank,
  cashReceipt: testData.cashReceipt.none,
  isEscrow: true, // 에스크로 여부
}

// === 테스터 생성 데이터 ===
const customSetup = {
  device: testDevice, // 고정
  customer: {
    name: "김재영", // [필수] 이름
    phoneNumber: "01012345678", // [필수] 휴대폰번호 11자리
    request: null, // [선택] 요청사항
    email: null // [선택] 이메일
  },
  refundAccount: {
    bank: "신한", // [필수] 환불받을 은행 : 토스뱅크, NH농협, 우리, 신한, KB국민, 하나, 씨티, IBK기업, KDB산업, SC제일, 대구, 부산, 전북, 경남, 제주, 광주, 새마을, 수협, 신협, 우체국, 케이뱅크, 카카오뱅크, SB저축, 산립조합중앙, SBI저축
    accountNumber: "110455555244", // [필수] 환불받을 계좌번호 10~16자리
    holderName: "김재영", // [필수] 환불받을 예금주 이름
  },
  depositBank: "신한", // [필수] 입금할 은행 : 농협, 국민, 우리, 신한, 기업, 경남, 광주, iM뱅크(대구), 부산, 새마을, 수협, 우체국, 전북, KEB하나
  cashReceipt: { // [필수] 현금영수증
    type: "PHONENUMBER", // PHONENUMBER, CASHRECEIPTCARD, BUSINESSNUMBER, NONE
    data: "01012345678", // 휴대폰번호 11자리 (or 현금영수증카드 13~19자리, 사업자번호 10자리)
  },
  isEscrow: true, // [필수] 에스크로 여부
};


describe(`${testDevice} 결제 테스트`, () => {
  const setup = defaultSetup;
  beforeEach(() => {
    //초기 화면 세팅
    cy.viewport(1460, 1260);
  });
  /** module
  * TBD
  */

  /** node
  * .pay
   @payWithTosspay : 토스페이
   @payWithVirtualAccount : 가상계좌
   @payWithCard : 카드
  */
  node.pay.payWithVirtualAccount(defaultSetup); // defaultSetup, customSetup
});
