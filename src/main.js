import "/src/style.css";
import Header from "./components/Header.js";
import Footer from "./components/Footer.js";
import Login from "./pages/login.js";
import Cart from "./pages/cart.js";
import ProductDetail from "./pages/productDetail.js";
import ProductList from "./components/ProductList.js";

export const url = "https://openmarket.weniv.co.kr";

const routes = {
  home: ProductList,
  login: Login,
  cart: Cart,
  detail: ProductDetail,
};

async function renderPage() {
  const content = document.getElementById("app");
  let checkDetail = false;
  let detailId = "";
  let hash = window.location.hash.slice(1);
  if (hash.includes("/")) {
    detailId = hash.split("/")[1];
    hash = hash.split("/")[0];
    checkDetail = true;
  }

  content.innerHTML = "";

  try {
    const page = routes[hash] || NotFound;
    const renderedPage = !checkDetail ? await page() : await page(detailId);

    if (hash !== "login") {
      const header = Header();
      content.appendChild(header);
    }
    content.appendChild(renderedPage);
    const footer = Footer();
    content.appendChild(footer);
  } catch (error) {
    console.error("페이지 렌더링 중 오류 발생:", error);
    content.innerHTML = "<p>페이지를 로드하는 중 오류가 발생했습니다.</p>";
  }
}

function initializeApp() {
  window.addEventListener("hashchange", renderPage);

  if (!window.location.hash) {
    window.location.hash = "home";
  } else {
    renderPage();
  }
}

window.addEventListener("load", initializeApp);
