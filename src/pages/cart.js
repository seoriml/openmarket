import { url } from "../main";

const user = JSON.parse(localStorage.getItem("userToken"));

// API 호출을 처리하는 객체
const API = {
  async fetch(endpoint, options = {}) {
    const defaultOptions = {
      headers: {
        "Content-Type": "application/json",
        ...(user && { Authorization: `JWT ${user.token}` }),
      },
    };

    const response = await fetch(`${url}${endpoint}`, {
      ...defaultOptions,
      ...options,
    });

    if (!response.ok)
      throw new Error(`API request failed: ${response.statusText}`);
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
    if (!response.ok)
      throw new Error(`API request failed: ${response.statusText}`);
    return response.status === 204 ? null : response.json();
  },
};

// 장바구니 UI를 생성하고 이벤트 핸들러를 설정하는 함수
export default async function Cart() {
  const cart = document.createElement("section");
  cart.className = "max-w-[1250px] m-auto text-center";

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
        <tr class="">
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

  // 총 가격을 계산하고 업데이트하는 함수
  const updateTotalPrice = () => {
    let total = 0;
    let shippingFee = 0;

    cartItems.forEach((item) => {
      const checkbox = cart.querySelector(
        `tr[data-id="${item.cart_item_id}"] .item-checkbox`
      );
      if (checkbox.checked) {
        total += item.product.price * item.quantity;
        shippingFee += item.product.shipping_fee;
      }
    });

    cart.querySelector("#total-price").textContent =
      `${total.toLocaleString()} 원`;
    cart.querySelector("#shipping-fee").textContent =
      `${shippingFee.toLocaleString()} 원`;
    cart.querySelector("#final-price").textContent =
      `${(total + shippingFee).toLocaleString()} 원`;
  };

  // 장바구니 항목의 수량을 업데이트하는 함수
  const updateItemQuantity = async (cartItemId, newQuantity) => {
    // 1. 장바구니 항목 찾기
    const item = cartItems.find((item) => item.cart_item_id === cartItemId);

    // 2. 재고 초과 확인
    if (newQuantity > item.product.stock) {
      alert("재고 수량을 초과했습니다."); // 경고 메시지
      return; // 함수 종료
    }

    try {
      // 3. 서버에 수량 업데이트 요청
      await API.updateCartItem(cartItemId, {
        product_id: item.product.product_id,
        quantity: newQuantity,
        is_active: true,
      });

      // 4. 장바구니 항목의 수량 업데이트
      item.quantity = newQuantity;

      // 5. UI에서 수량과 가격 업데이트
      const row = cart.querySelector(`tr[data-id="${cartItemId}"]`);
      row.querySelector(".quantity").textContent = newQuantity;
      row.querySelector(".item-total-price").innerHTML = `
      ${(item.product.price * newQuantity).toLocaleString()} 원
      <br/>
      <button class="order-item">주문하기</button>
    `;

      // 6. 전체 장바구니 가격과 배송비 업데이트
      updateTotalPrice();
    } catch (error) {
      // 7. 에러 처리
      console.error("수량 업데이트 실패:", error);
      alert("수량 업데이트에 실패했습니다.");
    }
  };

  // 장바구니 항목을 삭제하는 함수
  const deleteItem = async (cartItemId) => {
    try {
      const result = await API.deleteCartItem(cartItemId);
      // 성공적으로 삭제되면 장바구니 항목 배열에서 제거
      cartItems = cartItems.filter((item) => item.cart_item_id !== cartItemId);
      // UI에서 항목 제거
      const row = cart.querySelector(`tr[data-id="${cartItemId}"]`);
      if (row) row.remove();
      // 총 가격과 배송비 업데이트
      updateTotalPrice();
      // 페이지 새로고침
      window.location.reload();
      console.log(user);
    } catch (error) {
      console.log(user);

      alert("상품 삭제에 실패했습니다.");
    }
  };

  // 수량 변경 모달을 표시하는 함수
  const showQuantityModal = (cartItemId, currentQuantity, maxQuantity) => {
    const modal = cart.querySelector("#quantity-modal");
    const input = modal.querySelector("#quantity-input");
    input.value = currentQuantity;
    input.max = maxQuantity;
    modal.style.display = "block";

    modal.querySelector("#quantity-confirm").onclick = () => {
      updateItemQuantity(cartItemId, parseInt(input.value));
      modal.style.display = "none";
    };

    modal.querySelector("#quantity-cancel").onclick = () => {
      modal.style.display = "none";
    };
  };

  // 삭제 확인 모달을 표시하는 함수
  const showDeleteModal = (cartItemId) => {
    const modal = cart.querySelector("#delete-modal");
    modal.style.display = "block";

    modal.querySelector("#delete-confirm").onclick = async () => {
      await deleteItem(cartItemId);
      modal.style.display = "none";
    };

    modal.querySelector("#delete-cancel").onclick = () => {
      modal.style.display = "none";
    };
  };

  // 장바구니 항목에 대한 클릭 이벤트 핸들러 설정
  cart.querySelector(".cart-items").addEventListener("click", (e) => {
    const row = e.target.closest("tr");
    if (!row) return;
    const cartItemId = parseInt(row.dataset.id);
    const currentQuantity = parseInt(
      row.querySelector(".quantity").textContent
    );
    const maxQuantity = parseInt(row.dataset.stock);

    if (e.target.classList.contains("increase-quantity")) {
      showQuantityModal(cartItemId, currentQuantity, maxQuantity);
    } else if (
      e.target.classList.contains("decrease-quantity") &&
      currentQuantity > 1
    ) {
      showQuantityModal(cartItemId, currentQuantity, maxQuantity);
    } else if (e.target.classList.contains("delete-item")) {
      showDeleteModal(cartItemId);
    } else if (e.target.classList.contains("item-checkbox")) {
      updateTotalPrice();
    }
  });

  // "전체 선택" 체크박스 클릭 시 모든 항목 선택/해제
  cart.querySelector("#select-all").addEventListener("change", (e) => {
    cart
      .querySelectorAll(".item-checkbox")
      .forEach((checkbox) => (checkbox.checked = e.target.checked));
    updateTotalPrice();
  });

  updateTotalPrice();

  return cart;
}
