/// <reference types="cypress" />

import { service, testData } from "../../config.js";

export function payWithVirtualAccount(setup) {
  it("1. 성공 케이스", () => {
    // '상품결제' Page 진입
    if (setup.device == "PC") { // PC 테스트
      cy.visit(service.url, {
        onBeforeLoad(win) {
          Object.defineProperty(win.navigator, "userAgent", {
            value: service.ua.desktop,
            configurable: true, // true 로 해야 오버라이드가 가능
          });
        },
      });
    } else if (setup.device == "MOBILE") { // 모바일 테스트
      cy.visit(service.url, {
        onBeforeLoad(win) {
          Object.defineProperty(win.navigator, "userAgent", {
            value: service.ua.mobile,
            configurable: true, // true 로 해야 오버라이드가 가능
          });
        },
      });
    }

    // === '상품결제' Page ===
    {
      // [결제하기] button 노출 확인 및 클릭 > Bottomsheet 노출
      cy.contains("button", "결제하기", { timeout: 10000 })
        .should("be.visible")
        .click();

      // Bottomsheet_[결제하기] button 노출 확인 맟 클릭 > '결제하기' Page 노출
      cy.get("#purchase-option-form").within(() => {
        cy.contains("button", "결제하기", { timeout: 10000 })
          .should("be.visible")
          .click();
      });
    }

    // === '결제하기' Page ===
    {
      // '기본정보'_'이름' input 노출 확인 및 값 입력
      cy.get('input[name="name"]', { timeout: 10000 })
        .should("be.visible")
        .clear()
        .type(setup.customer.name);

      // '기본정보'_'휴대폰번호' input 노출 확인 값 입력
      cy.get('input[name="phoneNumber"]', { timeout: 10000 })
        .should("be.visible")
        .clear()
        .type(setup.customer.phoneNumber);

      // [선택] '기본정보'_'요청사항' 값 입력 
      if (setup.customer.request != null) {
        // '기본정보'_'요청사항' button 노출 확인 및 클릭 > '요청사항 입력' Layer 등장
        cy.contains('button', '요청사항', { timeout: 10000 })
          .should("be.visible")
          .click();

        // '요청사항 입력' Layer_'요청사항 입력' textarea 노출 확인 및 값 입력
        cy.get('textarea[placeholder="요청사항을 입력하세요 (선택)"]', { timeout: 10000 })
          .should("be.visible")
          .clear()
          .type(setup.customer.request);

        // '요청사항 입력' Layer_[저장하기] button 노출 확인 및 클릭 > '결제하기' Page 노출
        cy.contains('button', '저장하기', { timeout: 10000 })
          .should("be.visible")
          .click();
      };

      // '결제수단'_'가상계좌' radio 노출 확인 및 선택
      cy.get('input[id="icon-account-가상계좌"]', { timeout: 10000 })
        .scrollIntoView() // 버튼이 화면에 보여야 클릭 가능
        .click();

      // [xxx원 결제하기] button 노출 확인 및 클릭 > '환불계좌 입력' Page 노출
      cy.contains('button', /결제하기$/, { timeout: 10000 })
        .scrollIntoView() // 버튼이 화면에 보여야 클릭 가능
        .should("be.visible")
        .click();
    }

    // === '환불받을 은행 선택' Page ===
    {
      var isRefund = true;
      if (setup.refundAccount.bank == null && setup.refundAccount.accountNumber == null && setup.refundAccount.holderName == null) {
        isRefund = false;
      }
      // '환불받을 은행 선택' Page 노출 확인
      cy.contains('span', '환불받을 은행을 선택해주세요', { timeout: 10000 })
        .should("be.visible")

      if (!isRefund) { // 환불 미진행
        // [건너뛰기] button 노출 확인 및 선택 > '입금할 은행 선택' Page 노출
        cy.contains('button', '건너뛰기', { timeout: 10000 })
          .should("be.visible")
          .click({ force: true });
      }
      else { // 환불 진행
        // '환불계좌'_'은행선택' item 노출 확인 및 선택 > '환불계좌 정보 입력' Page 노출
        cy.contains('li.grid-list__item', setup.refundAccount.bank, { timeout: 10000 })
          .should("be.visible")
          .click();
      }
    }

    // === '환불계좌 정보 입력' Page ===
    {
      if (isRefund) {
        // '환불계좌'_'예금주' input 노출 확인 및 값 입력
        cy.get('input[name="holderName"]', { timeout: 10000 })
          .should("be.visible")
          .clear()
          .type(setup.refundAccount.holderName);

        // '환불계좌'_'계좌번호' input 노출 확인 및 값 입력
        cy.get('input[name="accountNumber"]', { timeout: 10000 })
          .should("be.visible")
          .clear()
          .type(setup.refundAccount.accountNumber);

        // [다음] button 노출 확인 및 클릭 > '가상계좌 발급' Page 노출
        cy.contains('button', '다음', { timeout: 10000 })
          .should("be.visible")
          .click();
      }
    }


    // === '입금할 은행 선택' Modal/Page ===
    if (setup.device == "PC") {
      // '입금할 은행 선택' Modal 노출 확인
      cy.get('#___tosspayments_iframe___').then($iframe => {
        const body = $iframe.contents().find('body');
        cy.log(body);
        cy.wrap(body)
          .contains('입금할 은행을 선택해주세요')   // 텍스트 포함 여부 확인
          .should('be.visible');
      });

      cy.contains('h1', '입금할 은행을 선택해주세요', { timeout: 10000 })
        .should("be.visible")

      // '입금할 은행' item 노출 확인 및 선택 > '입금할 은행 정보 입력' Page 노출
      cy.contains('ul', '은행 목록').within(() => {
        cy.contains('li', setup.depositBank, { timeout: 10000 })
          .should("be.visible")
          .click();
      });

    }
    else if (setup.device == "MOBILE") {
      // '입금할 은행 선택' Page 노출 확인
      cy.contains('span', '입금할 은행을 선택해주세요', { timeout: 10000 })
        .should("be.visible")

      // '입금할 은행' item 노출 확인 및 선택 > '입금할 은행 정보 입력' Page 노출
      cy.contains('li.grid-list__item', setup.depositBank, { timeout: 10000 })
        .should("be.visible")
        .click();
    }

    // === '입금할 은행 정보 입력' Page ===
    {
      // [선택] '이메일' input 노출 확인 및 값 입력
      if (setup.customer.email != null) {
        cy.get('input[name="email"]', { timeout: 10000 })
          .should("be.visible")
          .clear()
          .type(setup.customer.email);
      };

      // '현금영수증' select 노출 확인 및 선택 > Bottomsheet 노출
      cy.get('button[aria-label="현금영수증 용도"]', { timeout: 10000 })
        .should("be.visible")
        .click();

      if (setup.cashReceipt.type == "PHONENUMBER") {
        // Bottomsheet_'소득공제용(휴대폰)']' value 노출 확인 맟 클릭 > Bottomsheet 닫힘
        cy.get('.bottom-sheet--container').within(() => {
          cy.contains('li[role="button"]', '소득공제용(휴대폰)')
            .should("be.visible")
            .click();
        });

        // '현금영수증'_'휴대폰번호' input 노출 확인 및 값 입력
        cy.get('input[title="휴대폰번호"]', { timeout: 10000 })
          .should("be.visible")
          .clear()
          .type(setup.cashReceipt.data);
      }
      else if (setup.cashReceipt.type == "CASHRECEIPTCARD") {
        // Bottomsheet_'소득공제용(현금영수증카드)']' value 노출 확인 맟 클릭 > Bottomsheet 닫힘
        cy.get('.bottom-sheet--container').within(() => {
          cy.contains('li[role="button"]', '소득공제용(현금영수증카드)')
            .should("be.visible")
            .click();
        });

        // '현금영수증'_'현금영수증카드' input 노출 확인 및 값 입력
        cy.get('input[title="현금영수증 카드번호"]', { timeout: 10000 })
          .should("be.visible")
          .clear()
          .type(setup.cashReceipt.data);
      }
      else if (setup.cashReceipt.type == "BUSINESSNUMBER") {
        // Bottomsheet_'지출증빙용(사업자번호)']' value 노출 확인 맟 클릭 > Bottomsheet 닫힘
        cy.get('.bottom-sheet--container').within(() => {
          cy.contains('li[role="button"]', '지출증빙용(사업자번호)')
            .should("be.visible")
            .click();
        });

        // '현금영수증'_'사업자번호' input 노출 확인 및 값 입력
        cy.get('input[title="사업자등록번호"]', { timeout: 10000 })
          .should("be.visible")
          .clear()
          .type(setup.cashReceipt.data);
      }
      else if (setup.cashReceipt.type == "NONE") {
        // Bottomsheet_'발급안함']' value 노출 확인 맟 클릭 > Bottomsheet 닫힘
        cy.get('.bottom-sheet--container').within(() => {
          cy.contains('li[role="button"]', '발급안함')
            .should("be.visible")
            .click();
        });
      };

      // 약관 동의 checkbox 노출 확인 및 선택
      cy.get('div[role="checkbox"][aria-label="[필수] 서비스 이용 약관, 개인정보 처리 동의"]', { timeout: 10000 })
        .should("be.visible")
        .should('have.attr', 'aria-checked', 'false') // checkbox Unchecked
        .click()
        .should('have.attr', 'aria-checked', 'true'); // checkbox Checked

      // [확인] button 노출 확인 및 클릭 > '에스크로 서비스 이용여부' Page 노출
      cy.contains('button', "확인", { timeout: 10000 })
        .should("be.visible")
        .click();
    }

    // === '에스크로 서비스 이용여부' Page ===
    {
      // '에스크로 서비스 이용여부' Page 노출 확인
      cy.contains('span', '에스크로 서비스를 이용해서 결제할까요?', { timeout: 10000 })
        .should("be.visible")

      if (setup.isEscrow) {
        // 약관 동의 checkbox 노출 확인 및 선택
        cy.get('div[role="checkbox"][aria-label="에스크로 서비스 이용 약관 동의"]', { timeout: 10000 })
          .should("be.visible")
          .should('have.attr', 'aria-checked', 'false') // checkbox Unchecked
          .click()
          .should('have.attr', 'aria-checked', 'true'); // checkbox Checked

        // [이용하고 결제하기] button 노출 확인 및 클릭 > '가상계좌 발급 진행중' Page 노출
        cy.contains('button', "이용하고 결제하기", { timeout: 10000 })
          .should("be.visible")
          .click();
      }
      else {
        // [이용 안하고 결제하기] button 노출 확인 및 클릭 > '가상계좌 발급 진행중' Page 노출
        cy.contains('button', "이용 안하고 결제하기", { timeout: 10000 })
          .should("be.visible")
          .click();
      }
    }

    // === '가상계좌 발급 진행중' Page ===
    {
      // '가상계좌 발급 진행중' Page 노출 확인
      cy.contains('h5', '요청한 주문을 확인하고 있어요', { timeout: 10000 })
        .should("be.visible")
    }

    // === '가상계좌 발급 완료' Page ===
    {
      // '가상계좌 발급 완료' Page 노출 확인
      cy.contains('h1', '가상계좌 발급완료', { timeout: 20000 })
        .should("be.visible")
    }
  });

  // it("2. 실패 케이스 ", () => {
  //   // TBD
  // });

}
