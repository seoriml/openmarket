export default class Header {
  render() {
    const header = document.createElement("header");
    header.innerHTML = `
      <div class="m-auto max-w-[1150px] flex justify-between items-center">
        <a href="/">
          <img src="./images/Logo-hodu.png" alt="호두 메인페이지" class="w-[238px] h-[74px]" />
        </a>
        <nav>
          <a href="#cart">장바구니</a>
          <a href="#login">로그인</a>
        </nav>
      </div>
    `;
    return header;
  }
}
