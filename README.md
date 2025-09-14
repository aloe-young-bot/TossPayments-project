# TossPayments-project ([github](https://github.com/aloe-young-bot/TossPayments-project))
> 2025년 09월 - 토스페이먼츠 사전 과제: ‘가상계좌’ 결제 수단의 결제 자동화

## `TL;DR`
- 자동화 테스트 도구로 `cypress@15.2.0`을 사용함
- MacOS(M3) 환경에서 작업하였음
- `cypress`를 로컬에 설치하고 CLI를 통해 Test Script를 실행하는 방법이 있고, application을 활용하여 실행하는 방법이 있음
  - `cypress`는 node.js 런타임 필요
- 활용 도구/기술
  - `javascript` on `node.js` runtime
  - `cypress`
- 작업 내역
  - Test Script 설계 및 실행

## ✔️ cypress 환경 구성하기

### cypress 란?
cypress : 웹 브라우저 상에서 실행되는 모든 것을 테스트할 수 있는 웹 프론트엔드 테스트 자동화 도구

### `cypress` 로컬 설치
1. 프로젝트 루트에서 설치 및 실행
```bash
## 설치
$ npm install cypress --save-dev

## 실행
$ npx cypress open
```

## ✔️ 참고자료 
- cypress 참고자료
  - https://docs.cypress.io/
 
## ✔️ 재현영상
- https://drive.google.com/file/d/1yi84d5apn1ZXmj89oR0sTgWk_uocQRTz/view?usp=drive_link
![‘가상계좌’ 결제 수단의 결제 자동화_성공 케이스](https://github.com/aloe-young-bot/TossPayments-project/blob/636c6a75c29c47d3e96272df68447e74d892e173/result_happy_case.gif)
