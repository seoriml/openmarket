import "./signTab.css";
import { url } from "../main";

async function fetchCart() {
  const user = JSON.parse(localStorage.getItem("userToken"));
  console.log(user.token);

  try {
    const response = await fetch(`${url}/cart/`, {
      method: "GET",
      headers: {
        Authorization: `JWT ${user.token}`,
        "Content-type": "application/json",
      },
    });
    if (!response.ok)
      throw new Error("장바구니 데이터를 가져오는 데 실패했습니다.");
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export default async function Cart() {
  const cart = document.createElement("section");
  cart.className = "max-w-[1250px] m-auto text-center";
  const item = await fetchCart();
  console.log(item);

  const cartItemsHTML = item.results
    .map(
      (item) => `
    <tr data-id="${item.cart_item_id}" data-price="${item.price}">
      <td><input type="checkbox" class="item-checkbox"></td>
      <td><img src="${item.image}" alt="${item.name}"></td>
      <td>${item.name}</td>
      <td class="quantity-control">
        <button class="decrease-quantity">-</button>
        <span class="quantity">${item.quantity}</span>
        <button class="increase-quantity">+</button>
      </td>
      <td>      
        ${(item.price * item.quantity).toLocaleString()} 원
        <br/>
        <button class="order-item">주문하기</button>
      </td>
      <td>
        <button class="delete-item">X</button>
      </td>
    </tr>
  `
    )
    .join("");

  cart.innerHTML = `
    <h1 class="font-bold text-[36px] py-[52px]">장바구니</h1>

    <table class="w-full">
      <thead>
        <tr>
          <th><input type="checkbox" id="select-all"></th>
          <th></th>
          <th>상품정보</th>
          <th>수량</th>
          <th>상품 금액</th>
        </tr>
      </thead>
      <tbody class="cart-items">
        ${cartItemsHTML}
      </tbody>
    </table>

    <div class="flex w-full">
      <div class="summary-item  w-full">
        <div>총 상품금액</div>
        <span id="total-price">0원</span>
      </div>
      -
      <div class="summary-item  w-full">
        <div>상품 할인</div>
        <span id="discount">0원</span>
      </div>
      +
      <div class="summary-item  w-full">
        <div>배송비</div>
        <span id="shipping-fee">0원</span>
      </div>
      <div class="summary-item total  w-full">
        <div>결제 예정 금액</div>
        <span id="final-price">0원</span>
      </div>
    </div>
    
    <button id="order-button">주문하기</button>

    <!-- 수량 변경 모달 -->
    <div id="quantity-modal" class="modal" style="display: none;">
      <div class="modal-content">
        <h2>수량 변경</h2>
        <input type="number" id="quantity-input" min="1">
        <button id="quantity-confirm">확인</button>
        <button id="quantity-cancel">취소</button>
      </div>
    </div>

    <!-- 삭제 확인 모달 -->
    <div id="delete-modal" class="modal" style="display: none;">
      <div class="modal-content">
        <h2>상품을 삭제하시겠습니까?</h2>
        <button id="delete-confirm">확인</button>
        <button id="delete-cancel">취소</button>
      </div>
    </div>
  `;

  const cartItemsContainer = cart.querySelector(".cart-items");
  let currentItemId = null;

  // 수량 변경 모달 처리
  function showQuantityModal(itemId, currentQuantity) {
    const modal = document.getElementById("quantity-modal");
    const input = document.getElementById("quantity-input");
    input.value = currentQuantity;
    modal.style.display = "block";

    document.getElementById("quantity-confirm").onclick = () => {
      updateItemQuantity(itemId, parseInt(input.value));
      modal.style.display = "none";
    };

    document.getElementById("quantity-cancel").onclick = () => {
      modal.style.display = "none";
    };
  }

  // 삭제 확인 모달 처리
  function showDeleteModal(itemId) {
    const modal = document.getElementById("delete-modal");
    modal.style.display = "block";
    currentItemId = itemId;
  }

  // 수량 업데이트
  function updateItemQuantity(itemId, newQuantity) {
    const row = cartItemsContainer.querySelector(`tr[data-id="${itemId}"]`);
    row.querySelector(".quantity").textContent = newQuantity;
    row.querySelector("td:nth-child(5)").textContent =
      `${(row.dataset.price * newQuantity).toLocaleString()} 원`;
    updateTotalPrice();
  }

  // 아이템 삭제
  function deleteItem(itemId) {
    const row = cartItemsContainer.querySelector(`tr[data-id="${itemId}"]`);
    row.remove();
    updateTotalPrice();
  }

  // 총 금액 계산
  function updateTotalPrice() {
    const total = Array.from(
      cartItemsContainer.querySelectorAll(".item-checkbox:checked")
    ).reduce((sum, checkbox) => {
      const row = checkbox.closest("tr");
      const price = parseInt(
        row.querySelector("td:nth-child(5)").textContent.replace(/[^0-9]/g, "")
      );
      return sum + price;
    }, 0);
    document.getElementById("total-price").textContent =
      `${total.toLocaleString()} 원`;
  }

  // 이벤트 리스너 설정
  cartItemsContainer.addEventListener("click", (e) => {
    if (e.target.classList.contains("increase-quantity")) {
      const itemId = e.target.closest("tr").dataset.id;
      const quantity = parseInt(e.target.previousElementSibling.textContent);
      showQuantityModal(itemId, quantity);
    } else if (e.target.classList.contains("decrease-quantity")) {
      const itemId = e.target.closest("tr").dataset.id;
      const quantity = parseInt(e.target.nextElementSibling.textContent);
      if (quantity > 1) {
        showQuantityModal(itemId, quantity);
      }
    } else if (e.target.classList.contains("delete-item")) {
      const itemId = e.target.closest("tr").dataset.id;
      showDeleteModal(itemId);
    }
  });

  cart.querySelector("#select-all").addEventListener("change", (e) => {
    const isChecked = e.target.checked;
    cartItemsContainer
      .querySelectorAll(".item-checkbox")
      .forEach((checkbox) => {
        checkbox.checked = isChecked;
      });
    updateTotalPrice();
  });

  // 모달 이벤트 리스너 설정 (모달이 DOM에 렌더링된 후)
  setTimeout(() => {
    const deleteConfirmButton = document.getElementById("delete-confirm");
    const deleteCancelButton = document.getElementById("delete-cancel");

    if (deleteConfirmButton && deleteCancelButton) {
      deleteConfirmButton.onclick = () => {
        if (currentItemId !== null) {
          deleteItem(currentItemId);
          currentItemId = null;
          document.getElementById("delete-modal").style.display = "none";
        }
      };

      deleteCancelButton.onclick = () => {
        document.getElementById("delete-modal").style.display = "none";
      };
    }
  }, 0);

  return cart;
}
