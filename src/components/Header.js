export default function Header() {
  const header = document.createElement("header");
  header.className = "shadow-lg";

  const navItems = [
    {
      href: "#cart",
      text: "장바구니",
      icon: "/src/images/icon-shopping-cart.svg",
    },
    { href: "#login", text: "로그인", icon: "/src/images/icon-user.svg" },
  ];

  const createNavItem = ({ href, text, icon }) => `
    <a href="${href}" class="w-[50px] pt-[32px] bg-no-repeat bg-top text-center text-[12px] text-[#767676]" style="background:url('/openmarket/${icon}') no-repeat center top">
      ${text}
    </a>
  `;

  header.innerHTML = `
    <section class="m-auto max-w-[1280px] flex items-center justify-between py-[20px]">
      <div class="w-full flex gap-[30px]">
        <a href="/">
          <h1 class="w-[124px] h-[38px] indent-[-9999px] bg-[url('/src/images/Logo-hodu.png')] bg-no-repeat bg-contain">
            호두 오픈마켓 메인페이지
          </h1>
        </a>
        <form class="search-form flex items-center justify-between w-full max-w-[400px] px-[22px] rounded-full border border-[#21BF48]">
          <label for="search-input" class="sr-only">상품 검색</label>
          <input type="text" placeholder="상품을 검색해보세요!" id="search-input" class="focus:outline-none w-full" aria-label="검색어 입력">
          <button type="submit" class="w-[28px] h-[28px] bg-[url('/src/images/icon-search.svg')] bg-no-repeat bg-cover indent-[-9999px]">검색</button>
        </form>
      </div>
      <nav class="flex gap-[26px]">
        ${navItems.map(createNavItem).join("")}
      </nav>
    </section>
  `;

  // 검색 폼 이벤트 핸들러
  const searchForm = header.querySelector(".search-form");
  searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const searchInput = header.querySelector("#search-input");
    console.log("검색어:", searchInput.value);
    // 검색 로직 추가
  });

  return header;
}
