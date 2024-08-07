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
      "product-detail max-w-[1280px] m-auto py-[80px]";

    detailContainer.innerHTML = `
        <h1 class="text-[24px] font-bold mb-[20px]">${product.product_name}</h1>
        <img src="${product.image}" alt="${product.product_info}" class="w-full max-w-[600px] mb-[20px]">
        <p class="text-[18px] mb-[10px]">가격: ${product.price.toLocaleString()} 원</p>
        <p class="text-[16px] mb-[10px]">판매처: ${product.store_name}</p>
        <p class="text-[16px]">${product.product_info}</p>
      `;

    // 기존 컨텐츠를 새로운 상세 페이지로 교체
  } catch (error) {
    console.error("상품 상세 정보를 가져오는 데 실패했습니다.", error);
  }

  return detailContainer;
}
