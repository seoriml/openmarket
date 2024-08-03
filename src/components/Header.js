export default function Header() {
  const navItemsClass =
    "w-[50px] pt-[32px] bg-no-repeat bg-top text-center text-[12px] text-[#767676]";

  const header = document.createElement("header");
  header.insertAdjacentHTML(
    "beforeend",
    `<section class="m-auto max-w-[1150px] flex items-center justify-between py-[20px]">
        <div class="w-full flex gap-[30px]">
          <a href="/">
            <h1 class="w-[124px] h-[38px] indent-[-9999px] bg-[url('/src/images/Logo-hodu.png')] bg-no-repeat bg-contain">
              호두 오픈마켓 메인페이지
            </h1>
          </a>
          <form class="flex items-center justify-between w-full max-w-[400px] px-[22px] rounded-full border border-[#21BF48]">
            <label for="search-input" class="sr-only">상품 검색</label>
            <input type="text" placeholder="상품을 검색해보세요!" id="search-input" class="focus:outline-none" aria-label="검색어 입력">
            <button type="button" class="w-[28px] h-[28px] bg-[url('/src/images/icon-search.svg')] bg-no-repeat bg-cover indent-[-9999px]">검색</button>
          </form>
        </div>
        <nav class="flex gap-[26px]">
          <a href="#cart" class="${navItemsClass} bg-[url('/src/images/icon-shopping-cart.svg')]">장바구니</a>
          <a href="#login" class="${navItemsClass} bg-[url('/src/images/icon-user.svg')]">로그인</a>
        </nav>
      </section>`
  );
  return header;
}
