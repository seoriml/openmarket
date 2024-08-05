import "/src/style.css";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Home() {
  // 컨테이너 생성
  const container = document.createElement("div");
  container.className = "home-page";

  // 헤더 및 푸터 생성
  const header = Header();
  const footer = Footer();

  // 메인 콘텐츠 생성
  const mainContent = document.createElement("main");
  mainContent.textContent = "메인페이지";

  // 요소들을 컨테이너에 추가
  container.appendChild(header);
  container.appendChild(mainContent);
  container.appendChild(footer);

  return container;
}
