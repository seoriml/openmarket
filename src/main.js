import "/src/style.css";
import Header from "./components/Header.js";
import Footer from "./components/Footer.js";
import Login from "./pages/login.js";
import Cart from "./pages/cart.js";
import ProductList from "./components/ProductList.js";
import ProductDetail from "./pages/productDetail.js";
import Banner from "./components/Banner.js";

// API 요청에 사용될 기본 URL
export const url = "https://estapi.openmarket.weniv.co.kr/";

// 해시에 해당하는 렌더링할 컴포넌트를 매핑한 객체
const routes = {
  login: Login,
  cart: Cart,
  home: ProductList,
  detail: ProductDetail,
};

/* 현재 URL 해시에 따라 적절한 페이지를 렌더링하는 함수 */
async function renderPage() {
  const content = document.getElementById("app"); // 페이지가 렌더링될 DOM 요소
  let checkDetail = false; // 상품 상세 페이지인지 여부를 확인하는 플래그
  let detailId = ""; // 상품 ID를 저장할 변수
  let hash = window.location.hash.slice(1); // 해시 값에서 '#'을 제거하여 얻은 문자열

  // 해시가 슬래시를 포함하는 경우, 상세 페이지로 간주
  if (hash.includes("/")) {
    detailId = hash.split("/")[1]; // 해시에서 상품 ID를 추출
    hash = hash.split("/")[0]; // 해시의 첫 부분을 다시 설정 ("detail")
    checkDetail = true; // 상세 페이지 플래그를 true로 설정
  }

  content.innerHTML = ""; // 이전 페이지 내용 제거

  try {
    const page = routes[hash] || NotFound; // 해시 값에 해당하는 페이지 컴포넌트를 가져오고, 없으면 NotFound 컴포넌트 사용
    const renderedPage = !checkDetail ? await page() : await page(detailId); // 상세 페이지인 경우, 해당 ID를 전달하여 페이지를 렌더링

    if (hash !== "login") {
      const header = Header();
      content.appendChild(header);
    }
    // 홈 페이지에서만 배너를 추가
    if (hash === "home") {
      const banner = Banner();
      content.appendChild(banner);
    }
    content.appendChild(renderedPage);
    const footer = Footer();
    content.appendChild(footer);
  } catch (error) {
    console.error("페이지 렌더링 중 오류 발생:", error);
    content.innerHTML = "<p>페이지를 로드하는 중 오류가 발생했습니다.</p>";
  }
}

/* 앱을 초기화하고 페이지를 렌더링하는 함수 */
function initializeApp() {
  window.addEventListener("hashchange", renderPage); // URL 해시가 변경될 때마다 renderPage 함수를 호출

  if (!window.location.hash) {
    window.location.hash = "home";
  } else {
    renderPage();
  }
}

// 브라우저가 페이지를 로드할 때 initializeApp 함수를 실행
window.addEventListener("load", initializeApp);
