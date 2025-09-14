/// <reference types="cypress" />

// pay
/*** pay
 * @payWithTosspay : 토스페이
 * @payWithVirtualAccount : 가상계좌
 * @payWithCard : 카드
 */
// import { payWithTosspay } from "./Tosspay.js";
import { payWithVirtualAccount } from "./Pay/virtualAccount.js";
// import { payWithCard } from "./card.js";

export const module = {
  // TBD
};

export const node = {
  pay: {
    // 토스페이 결제
    payWithTosspay: function (setup) {
      describe("토스페이 결제", () => {
        payWithTosspay(setup);
      });
    },

    // 가상계좌 결제
    payWithVirtualAccount: function (setup) {
      describe("가상계좌 결제", () => {
        payWithVirtualAccount(setup);
      });
    },

    // 신용·체크카드 결제
    payWithCard: function (setup) {
      describe("신용·체크카드 결제", () => {
        payWithCard(setup);
      });
    },
  },
};
