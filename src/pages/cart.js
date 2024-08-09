import { url } from "../main";

// 사용자 토큰 정보를 가져옴
const user = JSON.parse(localStorage.getItem("userToken"));

// API 호출을 처리하는 객체
const API = {
  async fetch(endpoint, options = {}) {
    const defaultOptions = {
      headers: {
        "Content-Type": "application/json",
        ...(user && { Authorization: `JWT ${user.token}` }), // 토큰이 있으면 추가
      },
    };

    const response = await fetch(`${url}${endpoint}`, {
      ...defaultOptions,
      ...options,
    });

    if (response.status === 401) {
      alert("인증이 필요합니다. 로그인 페이지로 이동합니다.");
      window.location.href = "/login"; // 로그인 페이지로 리다이렉트
      return;
    }

    if (!response.ok) {
      throw new Error(`API 요청 실패: ${response.statusText}`);
    }

    return response.json();
  },

  getCart: () => API.fetch("/cart/"),
  getProduct: (id) => API.fetch(`/products/${id}/`),
  updateCartItem: (id, data) =>
    API.fetch(`/cart/${id}/`, { method: "PUT", body: JSON.stringify(data) }),
  deleteCartItem: async (id) => {
    const response = await fetch(`${url}/cart/${id}/`, {
      method: "DELETE",
      headers: { Authorization: `JWT ${user.token}` },
    });

    if (response.status === 401) {
      alert("인증이 필요합니다. 로그인 페이지로 이동합니다.");
      window.location.href = "/login"; // 로그인 페이지로 리다이렉트
      return;
    }

    if (!response.ok) {
      throw new Error(`API 요청 실패: ${response.statusText}`);
    }

    return response.status === 204 ? null : response.json();
  },
};

// 장바구니 UI를 생성하고 이벤트 핸들러를 설정하는 함수
export default async function Cart() {
  const cart = document.createElement("section");
  cart.className = "max-w-[1250px] m-auto text-center";

  try {
    // API로부터 장바구니 데이터와 제품 정보를 가져옴
    const cartData = await API.getCart();
    let cartItems = await Promise.all(
      cartData.results.map(async (item) => {
        const product = await API.getProduct(item.product_id);
        return { ...item, product };
      })
    );

    // 장바구니 항목을 렌더링하는 함수
    function renderCartItems() {
      return cartItems
        .map(
          (item) => `
        <tr data-id="${item.cart_item_id}" data-product-id="${item.product.product_id}" data-price="${item.product.price}" data-stock="${item.product.stock}" data-shipping-fee="${item.product.shipping_fee}">
          <td><input type="checkbox" class="item-checkbox" ${item.is_active ? "checked" : ""}></td>
          <td><img src="${item.product.image}" alt="${item.product.products_info}" class="w-[160px] h-[160px]"></td>
          <td>
            <span>${item.product.store_name}</span>
            <h2>${item.product.product_name}</h2>
            <p>${item.product.price.toLocaleString()}원</p>
            <span>${item.product.shipping_method} / ${item.product.shipping_fee.toLocaleString()}원</span>
          </td>
          <td class="quantity-control">
            <button class="decrease-quantity">-</button>
            <span class="quantity">${item.quantity}</span>
            <button class="increase-quantity" ${item.quantity >= item.product.stock ? "disabled" : ""}>+</button>
          </td>
          <td class="item-total-price">      
            ${(item.product.price * item.quantity).toLocaleString()} 원
            <br/>
            <button class="order-item">주문하기</button>
            <button class="delete-item">X</button>
          </td>
        </tr>
      `
        )
        .join("");
    }

    // 장바구니 HTML을 생성
    cart.innerHTML = `
      <h1 class="font-bold text-[36px] py-[52px]">장바구니</h1>
      <table class="w-full">
        <thead class="bg-[#f2f2f2] mb-[35px] py-[18px]">
          <tr>
            <th><input type="checkbox" id="select-all"></th>
            <th></th>
            <th>상품정보</th>
            <th>수량</th>
            <th>상품 금액</th>
          </tr>
        </thead>
        <tbody class="cart-items">
          ${renderCartItems()}
        </tbody>
      </table>
      <div class="flex w-full">
        <div class="summary-item w-full">
          <div>총 상품금액</div>
          <span id="total-price">0원</span>
        </div>
        <div class="summary-item w-full">
          <div>상품 할인</div>
          <span id="discount">0원</span>
        </div>
        <div class="summary-item w-full">
          <div>배송비</div>
          <span id="shipping-fee">0원</span>
        </div>
        <div class="summary-item total w-full">
          <div>결제 예정 금액</div>
          <span id="final-price">0원</span>
        </div>
      </div>
      <button id="order-button">주문하기</button>
  
      <!-- 수량 변경 모달 -->
      <div id="quantity-modal" class="modal fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center hidden">
        <div class="modal-content bg-white p-6 rounded-lg shadow-lg w-80 text-center">
          <h2 class="text-lg font-bold mb-4">수량 변경</h2>
          <input type="number" id="quantity-input" min="1" class="w-full p-2 mb-4 border border-gray-300 rounded" />
          <div class="flex justify-center gap-4">
            <button id="quantity-confirm" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">확인</button>
            <button id="quantity-cancel" class="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">취소</button>
          </div>
        </div>
      </div>
  
      <!-- 삭제 확인 모달 -->
      <div id="delete-modal" class="modal fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center hidden">
        <div class="modal-content bg-white p-6 rounded-lg shadow-lg w-80 text-center">
          <h2 class="text-lg font-bold mb-4">상품을 삭제하시겠습니까?</h2>
          <div class="flex justify-center gap-4">
            <button id="delete-confirm" class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">확인</button>
            <button id="delete-cancel" class="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">취소</button>
          </div>
        </div>
      </div>
    `;

    // 장바구니 요소를 반환
    return cart;
  } catch (error) {
    console.error("장바구니 로드 실패:", error);
    alert("장바구니를 불러오는 중 문제가 발생했습니다.");
  }
}
