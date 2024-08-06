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

  container.addEventListener("click", async (e) => {
    const item = e.target.closest(".product-item");
    if (item) {
      const productId = item.getAttribute("data-product-id");
      if (productId) {
        history.pushState(null, "", `/openmarket/product/${productId}`);
        await renderProductDetail(productId);
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

async function renderProductDetail(productId) {
  try {
    const product = await fetchProductDetail(productId);
    const detailContainer = document.createElement("div");
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
    document.querySelector(".product-list-page").replaceWith(detailContainer);
  } catch (error) {
    console.error("상품 상세 정보를 가져오는 데 실패했습니다.", error);
  }
}

async function fetchProductDetail(productId) {
  try {
    const response = await fetch(
      `https://openmarket.weniv.co.kr/products/${productId}/`
    );
    if (!response.ok)
      throw new Error("상품 상세 데이터를 가져오는 데 실패했습니다.");

    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
}
