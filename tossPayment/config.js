/// <reference types="cypress" />

import { type } from "wd/lib/commands";

export const service = {
  url: "https://s.tosspayments.com/BhHWX8rUTwD",
  ua: {
    // PC Browser 테스트
    desktop: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36",
    // Mobile Browser 테스트
    mobile: "Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.0 Mobile/15E148 Safari/604.1"
  }
};

export const testData = {
  customer: {
    // [필수] 이름, 휴대폰번호, [선택] 요청사항, 이메일 모두 있음
    infoFilled: {
      name: "김재영",
      phoneNumber: "01012345678",
      request: "테스트",
      email: "test@test.test"
    },

    // [필수] 이름 없음
    infoWithoutName: {
      name: null,
      phoneNumber: "01012345678",
      request: "테스트",
      email: "test@test.test"
    },

    // [필수] 휴대폰번호 없음
    infoWithoutPhoneNumber: {
      name: "김재영",
      phoneNumber: null,
      request: "테스트",
      email: "test@test.test"
    },

    // [선택] 요청사항, 이메일 없음
    infoWithoutRequestNEmail: {
      name: "김재영",
      phoneNumber: "01012345678",
      request: null,
      email: null
    },

    // 전부 없음
    infoEmpty: {
      name: null,
      phone: null,
      request: null,
      email: null
    }
  },
  refundAccount: {
    // 환불받을 은행 : 토스뱅크, NH농협, 우리, 신한, KB국민, 하나, 씨티, IBK기업, KDB산업, SC제일, 대구, 부산, 전북, 경남, 제주, 광주, 새마을, 수협, 신협, 우체국, 케이뱅크, 카카오뱅크, SB저축, 산립조합중앙, SBI저축
    validInfo: {
      bank: "신한",
      accountNumber: "110455555244",
      holderName: "김재영",
    },
    invalidInfo: {
      bank: "토스뱅크",
      accountNumber: "1234567890",
      holderName: "홍길동",
    },
    emptyInfo: {
      bank: null,
      accountNumber: null,
      holderName: null,
    }
  },
  // 입금할 은행 : 농협, 국민, 우리, 신한, 기업, 경남, 광주, iM뱅크(대구), 부산, 새마을, 수협, 우체국, 전북, KEB하나
  depositBank: "신한",
  cashReceipt: {
    phoneNumber: {
      type: "PHONENUMBER",
      data: "01012345678",
    },
    cashReceiptCard: {
      type: "CASHRECEIPTCARD",
      data: "1234567890123456",
    },
    businessNumber: {
      type: "BUSINESSNUMBER",
      data: "1234567890",
    },
    none: {
      type: "NONE",
    }
  }

};