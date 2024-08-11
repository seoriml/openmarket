import { url } from "../main";

export default async function ProductList() {
  const container = document.createElement("section");
  container.className = "product-list-page max-w-container m-auto py-[80px]";

  const products = await fetchProductList();

  if (products.length === 0) {
    container.innerHTML = "<p>상품이 없습니다.</p>";
    return container;
  }

  console.log(products);

  const productListHTML = products
    .map(
      (product) => `
        <li data-product-id="${product.product_id}" class="product-item">
          <a href="/openmarket/#detail/${product.product_id}">
            <image src="${product.image}" alt="${
        product.product_name
      }" class="w-full h-full max-w-[380px] max-h-[380px] object-cover border border-[#c4c4c4] rounded-[10px]">
          <p class="text-[16px] text-[#767676] mt-[16px]">${product.store_name.replace(
            /\x08/g,
            ""
          )}</p>
          <h2 class="text-[18px] mt-[10px]">${product.product_name}</h2>
          <p class="text-[18px] mt-[10px]"><b class="text-[24px] font-bold">${product.price.toLocaleString()}</b> 원</p>
          </a>
        </li>
        `
    )
    .join("");

  container.innerHTML = `
    <ul class="products grid grid-cols-3 gap-[70px]">${productListHTML}</ul>
  `;

  return container;
}

async function fetchProductList() {
  try {
    const response = await fetch(`${url}/products/`);
    if (!response.ok)
      throw new Error("상품 데이터를 가져오는 데 실패했습니다.");

    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error(error);
    return [];
  }
}
