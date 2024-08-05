# 오픈마켓 서비스

## 1. 프로젝트 개요

### 1.1 목표

오픈마켓 프로젝트는 JavaScript를 사용하여 상품 등록, 결제, 상품에 대한 CRUD를 직접 구현해보는 개인 프로젝트입니다. 이 프로젝트에서는 서버 API를 활용하여 다양한 기능을 구현합니다.

- **상품 등록 및 관리**: 판매자는 상품을 등록하고 수정할 수 있습니다.
- **상품 CRUD**: 상품의 생성(Create), 읽기(Read), 수정(Update), 삭제(Delete) 기능을 구현합니다.
- **결제 시스템**: 구매자는 상품을 장바구니에 담고 결제할 수 있는 기능을 제공합니다.
- **사용자 관리**: 로그인 및 회원가입 기능을 통해 구매자와 판매자를 구분합니다.

### 1.2 주요 기능

- **상품 등록 및 수정**: 판매자는 상품을 등록하고 수정할 수 있는 기능을 제공합니다.
- **상품 목록 및 상세 보기**: 구매자는 상품 목록을 보고, 상세 정보를 확인할 수 있습니다.
- **장바구니 및 결제**: 구매자는 상품을 장바구니에 추가하고 결제할 수 있습니다.
- **로그인 및 회원가입**: 사용자는 로그인과 회원가입을 통해 서비스에 접근할 수 있습니다.
- **구매자와 판매자 구분**: 구매자와 판매자는 각기 다른 권한을 가지며, 구매자는 상품을 구매할 수 있지만 판매자는 구매 기능이 없습니다.

### 1.3 팀 구성

- **프론트엔드 개발**: 이서림

## 2. 개발 환경 및 배포

### 2.1 개발 환경

- **웹 프레임워크**: Django 3.x (Python 3.8)
- **서비스 배포 환경**: Amazon Lightsail

### 2.2 배포 URL

- **URL**: [https://www.studyin.co.kr/](https://www.studyin.co.kr/)

### 2.3 URL 구조 (모놀리식)

| App      | URL                                                   | Views Function                    | HTML File Name                                  | Note                          |
| -------- | ----------------------------------------------------- | --------------------------------- | ----------------------------------------------- | ----------------------------- |
| main     | `/`                                                   | home                              | main/home.html                                  | 홈화면                        |
| main     | `/about/`                                             | about                             | main/about.html                                 | 소개화면                      |
| accounts | `/accounts/signup/`                                   | register                          | accounts/register.html                          | 구매자 계정 생성              |
| accounts | `/accounts/signup_seller/`                            | register_seller                   | accounts/register_seller.html                   | 판매자 계정 생성              |
| accounts | `/accounts/signup/valid/username/`                    | valid_username                    | accounts/valid_username.html                    | 아이디 중복 검증              |
| accounts | `/accounts/signup/valid/company_registration_number/` | valid_company_registration_number | accounts/valid_company_registration_number.html | 사업자등록번호 검증           |
| accounts | `/accounts/login/`                                    | login                             | accounts/login.html                             | 로그인                        |
| accounts | `/accounts/logout/`                                   | logout                            | accounts/logout.html                            | 로그아웃                      |
| accounts | `/accounts/profile/`                                  | profile                           | accounts/profile.html                           | 비밀번호 변경 / 프로필 수정   |
| products | `/products/`                                          | product_list                      | products/product_list.html                      | 전체 상품 목록 조회           |
| products | `/products/<int:product_id>/`                         | product_detail                    | products/product_detail.html                    | 특정 상품 상세 조회           |
| products | `/products/`                                          | product_create                    | products/product_create.html                    | 상품 등록                     |
| products | `/products/<int:product_id>/edit/`                    | product_edit                      | products/product_edit.html                      | 특정 상품 수정                |
| products | `/products/<int:product_id>/delete/`                  | product_delete                    | products/product_delete.html                    | 특정 상품 삭제                |
| products | `/products/search/`                                   | product_search                    | products/product_search.html                    | 상품 검색                     |
| cart     | `/cart/`                                              | cart_list                         | cart/cart_list.html                             | 장바구니 목록 조회            |
| cart     | `/cart/`                                              | cart_add                          | cart/cart_add.html                              | 장바구니에 상품 추가          |
| cart     | `/cart/<int:cart_item_id>/`                           | cart_detail                       | cart/cart_detail.html                           | 장바구니 아이템 상세 조회     |
| cart     | `/cart/<int:cart_item_id>/edit/`                      | cart_edit                         | cart/cart_edit.html                             | 장바구니 상품 수량 수정       |
| cart     | `/cart/`                                              | cart_delete_all                   | cart/cart_delete_all.html                       | 장바구니 전체 삭제            |
| cart     | `/cart/<int:cart_item_id>/delete/`                    | cart_delete                       | cart/cart_delete.html                           | 장바구니 개별 아이템 삭제     |
| orders   | `/order/`                                             | order_list                        | orders/order_list.html                          | 주문 목록 조회                |
| orders   | `/order/`                                             | order_create                      | orders/order_create.html                        | 주문 생성 (바로주문)          |
| orders   | `/order/`                                             | order_create_from_cart            | orders/order_create_from_cart.html              | 장바구니에서 주문 생성        |
| orders   | `/order/`                                             | order_create_single               | orders/order_create_single.html                 | 장바구니에서 하나만 주문 생성 |

## 3. 요구사항 명세 및 기능 명세

- **요구사항 명세**: [MindMeister 모델링](https://www.mindmeister.com/)
- **머메이드 다이어그램**: [머메이드 다이어그램 예시](https://mermaid-js.github.io/mermaid-live-editor/)

## 4. 프로젝트 구조 및 개발 일정

### 4.1 프로젝트 구조

프로젝트 구조는 다음과 같습니다:

```
openmarket/
├── accounts
│   ├── migrations
│   ├── __pycache__
│   ├── admin.py
│   ├── apps.py
│   ├── forms.py
│   ├── models.py
│   ├── tests.py
│   ├── urls.py
│   ├── views.py
│   └── __init__.py
├── products
│   ├── migrations
│   ├── __pycache__
│   ├── admin.py
│   ├── apps.py
│   ├── forms.py
│   ├── models.py
│   ├── tests.py
│   ├── urls.py
│   ├── views.py
│   └── __init__.py
├── cart
│   ├── migrations
│   ├── __pycache__
│   ├── admin.py
│   ├── apps.py
│   ├── forms.py
│   ├── models.py
│   ├── tests.py
│   ├── urls.py
│   ├── views.py
│   └── __init__.py
├── orders
│   ├── migrations
│   ├── __pycache__
│   ├── admin.py
│   ├── apps.py
│   ├── forms.py
│   ├── models.py
│   ├── tests.py
│   ├── urls.py
│   ├── views.py
│   └── __init__.py
├── media
│   ├── products
│   └── cart
├── static
│   ├── assets
│   │   ├── css
│   │   │   ├── pages
│   │   │   ├── styles.css
│   │   │   └── index.css
│   │   └── images
│   └── favicon.ico
├── db.sqlite3
├── manage.py
├── requirements.txt
└── README.md
```

### 4.2 개발 일정 (8월 2일 ~ 8월 11일)

- **8월 2일**: 요구사항 분석
- **8월 3일 ~ 8월 4일**: 로그인 페이지 개발
- **8월 5일 ~ 8월 6일**: 상품 목록 페이지 개발
- **8월 7일**: 장바구니 페이지 개발
- **8월 8일**: 회원가입 페이지 개발(선택)
- **8월 9일**: 상품 상세 페이지 개발(선택)
- **8월 10일**: 주문/결제 페이지 개발(선택)

## 5. 문의

프로젝트 관련 문의는 [esr619@naver.com]으로 연락해 주세요.
