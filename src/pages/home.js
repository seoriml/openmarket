// src/pages/Home.js
import "/src/style.css";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default class Home {
  render() {
    const container = document.createElement("div");
    container.className = "home-page";

    const header = new Header().render();
    const footer = new Footer().render();

    container.appendChild(header);
    container.innerHTML += `
      <main>
      메인페이지
      </main>
    `;
    container.appendChild(footer);

    return container;
  }
}
