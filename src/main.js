import "/src/style.css";
import Home from "./pages/home.js";
import Login from "./pages/login.js";

const routes = {
  home: Home,
  login: Login,
};

async function renderPage() {
  const content = document.getElementById("app");
  const hash = window.location.hash.slice(1) || "home";

  content.innerHTML = "";

  try {
    const page = routes[hash] || NotFound;
    const renderedPage = await page();
    content.appendChild(renderedPage);
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
