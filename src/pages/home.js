import "/src/style.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ProductList from "../components/ProductList";

export default async function Home() {
  const container = document.createElement("div");

  const header = Header();
  const footer = Footer();

  // 로딩 표시
  const loadingElement = document.createElement("p");
  loadingElement.textContent = "상품 목록을 불러오는 중...";

  container.appendChild(header);
  container.appendChild(loadingElement);
  container.appendChild(footer);

  try {
    const productList = await ProductList();
    container.replaceChild(productList, loadingElement);
  } catch (error) {
    console.error("상품 목록을 불러오는 중 오류 발생:", error);
    const errorElement = document.createElement("p");
    errorElement.textContent =
      "상품 목록을 불러오는 데 실패했습니다. 나중에 다시 시도해 주세요.";
    container.replaceChild(errorElement, loadingElement);
  }

  return container;
}
