export default async function ProductList() {
  const container = document.createElement("section");
  container.className = "product-list-page";

  // Fetch product data
  const products = await fetchProductList();

  if (products.length === 0) {
    container.innerHTML = "<p>상품이 없습니다.</p>";
    return container;
  }

  console.log(products);

  // Generate product list HTML
  const productListHTML = products
    .map(
      (product) => `
    <div class="product-item">
      <h2>${product.product_name}</h2>
      <p>판매자: ${product.seller_store}</p>
      <p>가격: ${product.price.toLocaleString()} 원</p>
      <button data-product-id="${product.product_id}">상세보기</button>
    </div>
  `
    )
    .join("");

  container.innerHTML = `
    <h1>상품 목록</h1>
    <div class="products">${productListHTML}</div>
  `;

  // Add click event handlers for detail buttons
  container.querySelectorAll(".product-item button").forEach((button) => {
    button.addEventListener("click", (e) => {
      const productId = e.target.getAttribute("data-product-id");
      window.location.href = `/product-detail.html?productId=${productId}`;
    });
  });

  return container;
}

// Separate function for fetching product list
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
