import { url } from "../main";

// 사용자 상태 확인 함수
function getUserStatus() {
  const user = JSON.parse(localStorage.getItem("userToken"));
  console.log(user);

  if (user && user.user_type) {
    switch (user.user_type) {
      case "BUYER":
        return "buyer";
      case "SELLER":
        return "seller";
      default:
        return "guest";
    }
  } else {
    return "guest";
  }
}

// 로그아웃 함수
async function handleLogout() {
  try {
    const response = await fetch(`${url}/accounts/logout/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("로그아웃 요청에 실패했습니다.");
    }

    // 로그아웃 성공 시
    localStorage.removeItem("userToken");
    alert("로그아웃 되었습니다.");
    window.location.href = "/";
  } catch (error) {
    alert(error.message);
  }
}

export default function Header() {
  const header = document.createElement("header");
  header.className = "shadow-lg";

  const userStatus = getUserStatus();

  const navItems = {
    guest: [
      {
        href: "#cart",
        text: "장바구니",
        icon: "/src/images/icon-shopping-cart.svg",
      },
      {
        href: "#login",
        text: "로그인",
        icon: "/src/images/icon-user.svg",
      },
    ],
    buyer: [
      {
        href: "#cart",
        text: "장바구니",
        icon: "/src/images/icon-shopping-cart.svg",
      },
      {
        href: "#logout",
        text: "로그아웃",
        icon: "/src/images/icon-user.svg",
      },
    ],
    seller: [
      {
        href: "#seller-center",
        text: "판매자 센터",
        icon: "/src/images/icon-shop.svg",
      },
      {
        href: "#logout",
        text: "로그아웃",
        icon: "/src/images/icon-user.svg",
      },
    ],
  };

  const createNavItem = ({ href, text, icon }) => `
    <a href="${href}" class="w-[50px] pt-[32px] bg-no-repeat bg-top text-center text-[12px] text-[#767676]" style="background:url('/openmarket/${icon}') no-repeat center top">
      ${text}
    </a>
  `;

  const modalButtonClass =
    "border border-[#c4c4c4] py-[10px] w-[100px] rounded-[5px]";

  header.innerHTML = `
    <section class="m-auto max-w-container flex items-center justify-between py-[20px]">
      <div class="w-full flex gap-[30px]">
        <a href="/">
          <h1 class="w-[124px] h-[38px] indent-[-9999px] bg-[url('/src/images/Logo-hodu.png')] bg-no-repeat bg-contain">
            호두 오픈마켓 메인페이지
          </h1>
        </a>
        <form class="search-form flex items-center justify-between w-full max-w-[400px] px-[22px] rounded-full border border-primary">
          <label for="search-input" class="sr-only">상품 검색</label>
          <input type="text" placeholder="상품을 검색해보세요!" id="search-input" class="focus:outline-none w-full" aria-label="검색어 입력">
          <button type="submit" class="w-[28px] h-[28px] bg-[url('/src/images/icon-search.svg')] bg-no-repeat bg-cover indent-[-9999px]">검색</button>
        </form>
      </div>
      <nav class="flex gap-[26px]">
        ${navItems[userStatus].map(createNavItem).join("")}
      </nav>
    </section>

    <div id="loginModal" class="modal delete-modal fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center hidden">
      <div class="modal-content bg-white pt-[50px] pb-[40px] border border-[#767676] w-full max-w-[360px] text-center relative">
        <button id="modalClose" class="absolute top-[18px] right-[18px] w-[22px] h-[22px] bg-[url('/src/images/icon-delete.svg')] bg-no-repeat bg-center bg-contain">
        </button> 
        <h2>로그인이 필요한 서비스입니다</h2>
        <p>로그인하시겠습니까?</p>
        <div class="flex justify-center gap-[10px] mt-[30px]">
          <button id="modalNo" class="${modalButtonClass}  text-[#767676]">아니요</button>
          <button id="modalYes" class="${modalButtonClass}] bg-primary text-white">예</button>
        </div>
      </div>
    </div>
  `;

  // 비회원 사용자가 장바구니 버튼을 클릭했을 때의 핸들러
  if (userStatus === "guest") {
    const cartButton = header.querySelector('a[href="#cart"]');
    if (cartButton) {
      cartButton.addEventListener("click", (e) => {
        e.preventDefault();
        const modal = document.getElementById("loginModal");
        modal.classList.remove("hidden");

        const modalYes = document.getElementById("modalYes");
        const modalNo = document.getElementById("modalNo");
        const modalClose = document.getElementById("modalClose");

        modalYes.addEventListener("click", () => {
          sessionStorage.setItem("beforePage", window.location.hash);
          window.location.hash = "login";
        });

        modalNo.addEventListener("click", () => {
          modal.classList.add("hidden");
        });

        modalClose.addEventListener("click", () => {
          modal.classList.add("hidden");
        });
      });
    }
  }

  // 로그인 버튼 이벤트 리스너
  const loginButton = header.querySelector('a[href="#login"]');
  if (loginButton) {
    loginButton.addEventListener("click", (e) => {
      e.preventDefault();
      sessionStorage.setItem("beforePage", window.location.hash);
      window.location.hash = "login";
    });
  }

  // 로그아웃 버튼 이벤트 리스너
  const logoutLink = header.querySelector('a[href="#logout"]');
  if (logoutLink) {
    logoutLink.addEventListener("click", (e) => {
      e.preventDefault();
      handleLogout();
    });
  }

  // 검색 폼 이벤트 핸들러
  const searchForm = header.querySelector(".search-form");
  searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const searchInput = header.querySelector("#search-input");
    console.log("검색어:", searchInput.value);
    // 추후 검색 로직 추가
  });

  return header;
}
