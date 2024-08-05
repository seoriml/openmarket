export default async function ProductList() {
  const container = document.createElement("section");
  container.className = "product-list-page max-w-[1280px] m-auto py-[80px]";

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
          <image src="${product.image}" alt="${product.product_info}" class="w-full h-full max-w-[380px] max-h-[380px] object-cover border border-[#c4c4c4] rounded-[10px]">
          <p class="text-[16px] text-[#767676] mt-[16px]">${product.store_name}</p>
          <h2 class="text-[18px] mt-[10px]">${product.product_name}</h2>
          <p class="text-[18px] mt-[10px]"><b class="text-[24px] font-bold">${product.price.toLocaleString()}</b> 원</p>
        </li>
        `
    )
    .join("");

  container.innerHTML = `
    <ul class="products grid grid-cols-3 gap-[70px]">${productListHTML}</ul>
  `;

  container.addEventListener("click", (e) => {
    if (e.target.closest(".product-item")) {
      const item = e.target.closest(".product-item");
      const productId = item.getAttribute("data-product-id");
      if (productId) {
        window.location.hash = `#${productId}`;
      } else {
        console.error("상품 ID가 없습니다.");
      }
    }
  });

  return container;
}

async function fetchProductList() {
  try {
    const response = await fetch("https://openmarket.weniv.co.kr/products/");
    if (!response.ok)
      throw new Error("상품 데이터를 가져오는 데 실패했습니다.");

    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error(error);
    return [];
  }
}
