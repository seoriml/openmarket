import "/src/style.css";
import Home from "./pages/home.js";
import Login from "./pages/login";

function renderPage() {
  const content = document.getElementById("app");
  const hash = window.location.hash.slice(1);

  switch (hash) {
    case "login":
      content.appendChild(Login());
      break;
    case "cart":
      content.appendChild(Cart());
      break;
    default:
      content.appendChild(Home());
      break;
  }
}

// 초기 로드 시 페이지 렌더링
window.addEventListener("hashchange", renderPage);
window.addEventListener("load", () => {
  // URL에 해시가 없다면 기본적으로 홈 페이지를 렌더링
  if (!window.location.hash) {
    window.location.hash = "home";
  }
  renderPage();
});
