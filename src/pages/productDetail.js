import { url } from "../main";

async function fetchProductDetail(productId) {
  try {
    const response = await fetch(`${url}/products/${productId}/`);
    if (!response.ok)
      throw new Error("상품 상세 데이터를 가져오는 데 실패했습니다.");
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export default async function ProductDetail(productId) {
  const detailContainer = document.createElement("div");
  try {
    const product = await fetchProductDetail(productId);
    detailContainer.className =
      "product-detail max-w-container m-auto py-[80px] flex gap-x-[60px]";

    detailContainer.innerHTML = `
        <img src="${product.image}" alt="${
      product.product_name
    }" class="w-full h-full max-w-[600px] max-h-[600px]">
      <div class="w-full">
        <div>
          <p class="text-[18px] text-[#767676] font-[400] mb-[16px]">${product.store_name.replace(
            /\x08/g,
            ""
          )}</p>
         <h1 class="text-[36px] font-[400] mb-[20px]">${
           product.product_name
         }</h1>
          <p class="text-[18px]"><span class="text-[36px] font-[700]">${product.price.toLocaleString()}</span> 원</p>
          <span class="block mt-[88px] text-[#767676] font-[400]">${
            product.shipping_method === "PARCEL" ? "택배배송" : "업체배달"
          } / 
          ${
            product.shipping_fee === 0
              ? "무료배송"
              : `${product.shipping_fee.toLocaleString()}원`
          }</span>
        </div>

        <!-- 수량 -->
        <div class="border-y-2 border-[#c4c4c4] py-[30px] w-full mt-[20px]">
          <div class="w-[150px] border border-[#c4c4c4] rounded-[5px] flex items-center justify-center text-lg text-center">
            <button onclick="alert('준비 중입니다.'); return false;"
              class="decrease-quantity w-[50px] h-[50px] bg-contain bg-center bg-no-repeat"
              style="background-image: url('/openmarket/images/icon-minus-line.svg'); background-size: 20px;">
            </button>
            <span class="quantity w-[50px] h-[50px] border-x-[1px] border-[#c4c4c4] flex items-center justify-center">
              1
            </span>
            <button onclick="alert('준비 중입니다.'); return false;" class="decrease-quantity w-[50px] h-[50px] bg-contain bg-center bg-no-repeat" 
              style="background-image: url('/openmarket/images/icon-plus-line.svg'); background-size: 20px;"></button>
          </div>
        </div>

        <!-- 총 상품 금액 -->
        <div class="flex justify-between items-center py-[30px] text-[18px]">
          <h2 class="font-[500]">총 상품 금액</h2>
          <p class="font-[400] text-[#767676]">
            총 수량 <span class="font-[700] text-primary">1</span>개
            <span class="text-[#c4c4c4] px-[8px]" aria-hidxden="true">|</span>
            <span class="text-[36px] text-primary">${(
              product.price + product.shipping_fee
            ).toLocaleString()}</span><span class="text-primary">원</span>
          </p>
        </div>

        <div class="flex gap-x-[14px] text-lg text-white ">
          <button class="order bg-primary w-full max-w-[416px] py-[19px] rounded-[5px]"  onclick="alert('준비 중입니다.'); return false;">바로 구매</button>
          <button class="cart bg-[#767676] w-full max-w-[200px] py-[19px] rounded-[5px]"  onclick="alert('준비 중입니다.'); return false;">장바구니</button>
        </div>
      </div>
      `;
  } catch (error) {
    console.error("상품 상세 정보를 가져오는 데 실패했습니다.", error);
  }

  return detailContainer;
}
