import { url } from "../main";

export default async function Cart() {
  const user = JSON.parse(localStorage.getItem("userToken"));

  /* API 호출을 위한 기본 설정 및 메서드 정의 */
  const API = {
    async fetch(endpoint, options = {}) {
      const defaultOptions = {
        headers: {
          "Content-Type": "application/json",
          ...(user && { Authorization: `JWT ${user.token}` }),
        },
      };

      const response = await fetch(`${url}/${endpoint}`, {
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

  // 장바구니 섹션 생성
  const cart = document.createElement("section");
  cart.className = "max-w-container m-auto text-center";

  // API로부터 장바구니 데이터와 제품 정보를 가져옴
  const cartData = await API.getCart();
  let cartItems = await Promise.all(
    cartData.results.map(async (item) => {
      const product = await API.getProduct(item.product_id);
      return { ...item, product };
    })
  );

  // 장바구니 항목 렌더링
  function renderCartItems() {
    return cartItems
      .map(
        (item) => `
        <!-- 장바구니 항목 시작 -->
        <div class="flex items-center border border-[#c4c4c4] rounded-[10px] py-[20px] px-[30px] mb-[10px] gap-x-[40px] relative" 
          data-id="${item.cart_item_id}" 
          data-product-id="${item.product.product_id}" 
          data-price="${item.product.price}" 
          data-stock="${item.product.stock}" 
          data-shipping-fee="${item.product.shipping_fee}">

          <!-- 체크박스 -->
          <label for="item-${
            item.cart_item_id
          }" class="relative flex items-center cursor-pointer">
            <input type="checkbox" id="item-${
              item.cart_item_id
            }" class="hidden peer item-checkbox" ${
          item.is_active ? "checked" : ""
        } />
            <span class="w-6 h-6 block bg-[url('/openmarket/images/cart-check-off.svg')] bg-no-repeat bg-center peer-checked:bg-[url('/openmarket/images/cart-check-on.svg')]"></span>
          </label>
          
          <!-- 제품 이미지 -->
          <div class="w-full max-w-[160px]">
            <img src="${item.product.image}" 
            alt="${item.product.products_info}" 
            class="w-[160px] h-[160px] object-cover rounded-[10px]">
          </div>

          <!-- 상품 정보 -->
          <div class="w-full text-left">
            <p class="text-sm text-[#767676] mb-[10px]"> 
              ${item.product.store_name.replace(/\x08/g, "")}
            </p>
            <h2 class="text-lg mb-[10px]">
              ${item.product.product_name}
            </h2>
            <p class="font-bold mb-[40px]">
              ${item.product.price.toLocaleString()}원
            </p>
            <p class="text-sm text-[#767676] mb-[10px]">
              ${
                item.product.shipping_method === "PARCEL"
                  ? "택배배송"
                  : "업체배달"
              } / 
              ${
                item.product.shipping_fee === 0
                  ? "무료배송"
                  : `${item.product.shipping_fee.toLocaleString()}원`
              }
            </p>
          </div>

          <!-- 수량 -->
          <div class="w-[150px] border border-[#c4c4c4] rounded-[5px] flex items-center justify-center text-lg text-center">
            <button
              class="decrease-quantity w-[50px] h-[50px] bg-contain bg-center bg-no-repeat"
              style="background-image: url('/openmarket/images/icon-minus-line.svg'); background-size: 20px;">
            </button>
            <span class="quantity w-[50px] h-[50px] border-x-[1px] border-[#c4c4c4] flex items-center justify-center">
              ${item.quantity}
            </span>
            <button class="decrease-quantity w-[50px] h-[50px] bg-contain bg-center bg-no-repeat" 
              ${item.quantity >= item.product.stock ? "disabled" : ""} 
              style="background-image: url('/openmarket/images/icon-plus-line.svg'); background-size: 20px;"></button>
          </div>

          <!-- 상품금액 -->
          <div class="w-full max-w-[130px] mx-[60px]">
            <p class="item-total-price text-lg font-bold text-[#EB5757]">
              ${(item.product.price * item.quantity).toLocaleString()} 원
            </p>
            <button class="order-item bg-primary text-white w-[130px] py-[10px] rounded-[5px] mt-[26px]"  onclick="alert('준비 중입니다.'); return false;">주문하기</button>
            <button class="delete-item absolute top-[18px] right-[18px] w-[22px] h-[22px]" style="background-image: url('/openmarket/images/icon-delete.svg');"></button>
          </div>
        </div>
      `
      )
      .join("");
  }

  // 공통 스타일 및 클래스 정의
  const priceItemClass = "w-1/4";
  const priceiconClass =
    "w-[34px] h-[34px] bg-white bg-contain bg-center bg-no-repeat rounded-full";
  const pricetextClass = "mb-[12px";
  const pricenumberClass = "text-[24px] font-bold";

  const modalBgClass =
    "modal fixed inset-0 bg-black bg-opacity-50 hidden z-50 ";
  const modalButtonClass =
    "border border-[#c4c4c4] py-[10px] w-[100px] rounded-[5px]";
  const modalContentClass =
    "top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-full max-w-[360px] text-center relative bg-white pt-[50px] pb-[40px] border border-[#767676]";
  const modalButtonSize = "w-[50px] h-[50px] bg-contain bg-center bg-no-repeat";
  const modalCloseButtonClass =
    "absolute top-[18px] right-[18px] w-[22px] h-[22px] bg-[url('/images/icon-delete.svg')] bg-no-repeat bg-center bg-contain";
  const modalInputClass =
    "w-[50px] h-[50px] border-x-[1px] border-[#c4c4c4] flex items-center justify-center text-center text-[18px] focus:outline-none";

  // 장바구니 HTML
  cart.innerHTML = `
  <h1 class="text-[36px] font-bold text-center py-[52px]">장바구니</h1>
  <div class="w-full">
    <div class="bg-[#f2f2f2] flex py-[18px] mb-[35px] rounded-[10px] px-[30px] text-center gap-x-[40px]">
      <label class="relative flex items-center cursor-pointer">
        <input type="checkbox" id="select-all" class="peer sr-only" />
        <span class="w-6 h-6 block bg-[url('/openmarket/images/cart-check-off.svg')] bg-no-repeat bg-center peer-checked:bg-[url('/openmarket/images/cart-check-on.svg')]"></span>
      </label>
      <div class="w-full max-w-[160px]"></div>
      <div class="w-full text-left px-[6%]">상품정보</div>
      <div class="w-full max-w-[150px]">수량</div>
      <div class="w-full max-w-[130px] mx-[60px]">상품금액</div>
    </div> 
    <div class="cart-items">
      ${renderCartItems()}
    </div>
  </div>

  <div class="bg-[#f2f2f2] mt-[70px] py-[45px] rounded-[10px]">
    <div class="flex items-center text-center">
      <div class="${priceItemClass}">
        <p class=${pricetextClass}>총 상품금액</p>
        <p><span id="total-price" class="${pricenumberClass}">0</span> 원</p>
      </div>
      <div class="${priceiconClass}" style="background-image: url('/openmarket/images/icon-minus-line.svg'); background-size: 19px;"></div>    
      <div class="${priceItemClass}">
        <p class="${pricetextClass}">상품 할인</p>
        <p><span id="discount" class="${pricenumberClass}">0</span> 원</p>
      </div>
      <div class="${priceiconClass}" style="background-image: url('/openmarket/images/icon-plus-line.svg'); background-size: 19px;"></div>
      <div class="${priceItemClass}">
        <p class="${pricetextClass}">배송비</p>
        <p><span id="shipping-fee" class="${pricenumberClass}">0</span> 원</p>
      </div>
      <div class="${priceItemClass}">
        <p class="${pricetextClass} font-bold">결제 예정 금액</p>
        <p class="text-[#EB5757]"><span id="final-price" class="${pricenumberClass}">0</span> 원</p>
      </div>
    </div>
  </div>

  <div class="text-center mt-[40px]  mb-[160px]">
    <button id="order-button" class="bg-primary text-white py-[20px] px-[65px] rounded-[5px] text-[24px] font-bold"  onclick="alert('준비 중입니다.'); return false;">주문하기</button>
  </div>

  <!-- 수량 변경 모달 -->
  <div id="quantity-modal" class="${modalBgClass}">
    <div class="${modalContentClass} absolute flex flex-col items-center">
      <button id="quantity-close" class="${modalCloseButtonClass}"></button> 
      <div class="w-[150px] border border-[#c4c4c4] rounded-[5px] flex items-center justify-center">
        <button id="decrease-quantity" class="${modalButtonSize}" style="background-image: url('/openmarket/images/icon-minus-line.svg'); background-size: 20px;"></button>
        <input type="number" id="quantity-input" min="1" class="${modalInputClass}" />
        <button id="increase-quantity" class="${modalButtonSize}" style="background-image: url('/openmarket/images/icon-plus-line.svg'); background-size: 20px;"></button>
      </div>
      <div class="flex justify-center gap-[10px] mt-[30px]">
        <button id="quantity-cancel" class="${modalButtonClass} text-[#767676]">취소</button>
        <button id="quantity-confirm" class="${modalButtonClass} bg-primary text-white">수정</button>
      </div>
    </div>
  </div>

  <!-- 삭제 확인 모달 -->
  <div id="delete-modal" class="class=${modalBgClass}">
    <div class="${modalContentClass}">
      <button id="delete-close" class="${modalCloseButtonClass}"></button>   
      <h2 class="font-normal">상품을 삭제하시겠습니까?</h2>
      <div class="flex justify-center gap-[10px] mt-[30px]">
        <button id="delete-cancel" class="${modalButtonClass} text-[#767676]">취소</button>
        <button id="delete-confirm" class="${modalButtonClass} bg-primary text-white">확인</button>
      </div>
    </div>
  </div>
`;

  /* 총 가격과 배송비를 계산하여 업데이트하는 함수 */
  const updateTotalPrice = () => {
    let total = 0;
    let shippingFee = 0;

    // 체크된 항목의 총 가격과 배송비를 계산
    cartItems.forEach((item) => {
      const checkbox = cart.querySelector(
        `div[data-id="${item.cart_item_id}"] .item-checkbox`
      );
      if (checkbox.checked) {
        total += item.product.price * item.quantity; // 총 가격에 항목 가격을 추가
        shippingFee += item.product.shipping_fee; // 총 배송비에 항목 배송비를 추가
      }
    });

    // UI에 총 가격, 배송비, 결제 예정 금액을 업데이트
    cart.querySelector(
      "#total-price"
    ).textContent = `${total.toLocaleString()}`;
    cart.querySelector(
      "#shipping-fee"
    ).textContent = `${shippingFee.toLocaleString()}`;
    cart.querySelector("#final-price").textContent = `${(
      total + shippingFee
    ).toLocaleString()}`;
  };

  /* 장바구니 항목의 수량을 서버에 업데이트하는 함수 */
  const updateItemQuantity = async (cartItemId, newQuantity) => {
    // 1.cartItems 배열에서 cartItemId와 일치하는 항목을 찾기
    const item = cartItems.find((item) => item.cart_item_id === cartItemId);

    // 2.사용자가 입력한 newQuantity가 제품의 재고 수량을 초과하는지 확인
    if (newQuantity > item.product.stock) {
      alert("재고 수량을 초과했습니다.");
      return; // 함수 종료
    }

    // 3.서버에 수량 업데이트 요청
    try {
      await API.updateCartItem(cartItemId, {
        product_id: item.product.product_id,
        quantity: newQuantity,
        is_active: true,
      });

      // 4.장바구니 항목의 수량을 새로운 값으로 변경
      item.quantity = newQuantity;

      // 5. UI에서 수량과 가격 업데이트
      const row = cart.querySelector(`div[data-id="${cartItemId}"]`);
      if (row) {
        // 장바구니 항목이 존재하면, 수량과 총 가격 요소를 찾음.
        const quantityElement = row.querySelector(".quantity");
        const itemTotalPriceElement = row.querySelector(".item-total-price");
        // 수량 요소가 존재하면, 해당 요소의 텍스트 내용을 새로운 수량으로 업데이트
        if (quantityElement) {
          quantityElement.textContent = newQuantity;
        }
        // 총 가격 요소가 존재하면, 해당 요소의 내용을 새로 계산한 총 가격으로 업데이트
        if (itemTotalPriceElement) {
          itemTotalPriceElement.innerHTML = `
            ${(item.product.price * newQuantity).toLocaleString()} 원
          `;
        } else {
          console.error("가격 표시 요소가 없습니다.");
        }

        // 6.장바구니의 총 가격과 배송비를 갱신하기 위해 updateTotalPrice 함수를 호출
        updateTotalPrice();
      } else {
        console.error("장바구니 항목을 찾을 수 없습니다.");
      }
    } catch (error) {
      console.error("수량 업데이트 실패:", error);
      alert("수량 업데이트에 실패했습니다.");
    }
  };

  /* 장바구니 항목 삭제 함수 */
  const deleteItem = async (cartItemId) => {
    try {
      // API.deleteCartItem 메서드를 호출하여 cartItemId에 해당하는 장바구니 항목을 삭제
      const result = await API.deleteCartItem(cartItemId);
      // 성공적으로 삭제되면 장바구니 항목 배열에서 cartItemId가 일치하지 않는 항목만 남기도록 필터링
      cartItems = cartItems.filter((item) => item.cart_item_id !== cartItemId);
      // 장바구니 항목을 나타내는 DOM요소를 제거하여 화면에서 사라지게 함
      const row = cart.querySelector(`div[data-id="${cartItemId}"]`);
      if (row) row.remove();
      // updateTotalPrice 함수를 호출하여 총 가격과 배송비 최신 상태로 갱신
      updateTotalPrice();
    } catch (error) {
      alert("상품 삭제에 실패했습니다.");
    }
  };

  /* 수량 변경 모달 함수 */
  const showQuantityModal = (cartItemId, currentQuantity, maxQuantity) => {
    const modal = cart.querySelector("#quantity-modal");
    const input = modal.querySelector("#quantity-input");
    input.value = currentQuantity;
    input.max = maxQuantity;
    modal.style.display = "block";

    // 플러스 버튼 클릭 시 수량 증가
    modal.querySelector("#increase-quantity").onclick = () => {
      const newQuantity = parseInt(input.value) + 1;
      if (newQuantity <= maxQuantity) {
        input.value = newQuantity;
      }
    };

    // 마이너스 버튼 클릭 시 수량 감소
    modal.querySelector("#decrease-quantity").onclick = () => {
      const newQuantity = parseInt(input.value) - 1;
      if (newQuantity >= 1) {
        input.value = newQuantity;
      }
    };

    // 수량 입력 필드의 값이 변경될 때
    input.oninput = () => {
      const newValue = parseInt(input.value);
      if (isNaN(newValue) || newValue < 1) {
        input.value = 1;
      } else if (newValue > maxQuantity) {
        input.value = maxQuantity;
      }
    };

    // 확인 버튼 클릭 시 수량 업데이트
    modal.querySelector("#quantity-confirm").onclick = () => {
      updateItemQuantity(cartItemId, parseInt(input.value));
      modal.style.display = "none";
    };

    // 모달 닫기
    modal.querySelector("#quantity-cancel").onclick = () => {
      modal.style.display = "none";
    };
    modal.querySelector("#quantity-close").onclick = () => {
      modal.style.display = "none";
    };
  };

  /* 삭제 확인 모달 함수 */
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
    modal.querySelector("#delete-close").onclick = () => {
      modal.style.display = "none";
    };
  };

  /* 장바구니 항목에 대한 클릭 이벤트 핸들러 설정 */
  cart.querySelector(".cart-items").addEventListener("click", (e) => {
    // 클릭한 요소의 가장 가까운 부모 div[data-id]를 찾음
    const row = e.target.closest("div[data-id]");
    if (!row) return; //없으면 함수 종료

    // 클릭된 항목의 cartItemId, currentQuantity, maxQuantity 값을 가져옴
    const cartItemId = parseInt(row.dataset.id);
    const currentQuantity = parseInt(
      row.querySelector(".quantity").textContent
    );
    const maxQuantity = parseInt(row.dataset.stock);

    // '수량 증가' 버튼 클릭 시 수량 변경 모달을 표시
    if (e.target.classList.contains("increase-quantity")) {
      showQuantityModal(cartItemId, currentQuantity, maxQuantity);
    }
    // '수량 감소' 버튼 클릭 시 수량 변경 모달을 표시
    else if (e.target.classList.contains("decrease-quantity")) {
      showQuantityModal(cartItemId, currentQuantity, maxQuantity);
    }
    // '항목 삭제' 버튼 클릭 시 삭제확인 모달 표시
    else if (e.target.classList.contains("delete-item")) {
      showDeleteModal(cartItemId);
    }
    // '체크박스' 클릭 시  선택된 항목의 상태에 따라 총 가격을 업데이트
    else if (e.target.classList.contains("item-checkbox")) {
      updateTotalPrice();
    }
  });

  /* "전체 선택" 체크박스 클릭 시 모든 항목 선택/해제 */
  cart.querySelector("#select-all").addEventListener("change", (e) => {
    cart
      .querySelectorAll(".item-checkbox")
      .forEach((checkbox) => (checkbox.checked = e.target.checked));
    updateTotalPrice();
  });

  updateTotalPrice(); // 페이지 로드 시 또는 장바구니 상태가 변경된 후 총 가격을 업데이트

  return cart;
}
