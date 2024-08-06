import "/src/style.css";
import ProductList from "../components/ProductList";

export default async function Home() {
  const home = document.createElement("div");

  // 로딩 표시
  const loadingElement = document.createElement("p");
  loadingElement.textContent = "상품 목록을 불러오는 중...";

  home.appendChild(loadingElement);

  try {
    const productList = await ProductList();
    home.replaceChild(productList, loadingElement);
  } catch (error) {
    console.error("상품 목록을 불러오는 중 오류 발생:", error);
    const errorElement = document.createElement("p");
    errorElement.textContent =
      "상품 목록을 불러오는 데 실패했습니다. 나중에 다시 시도해 주세요.";
    home.replaceChild(errorElement, loadingElement);
  }

  return home;
}
