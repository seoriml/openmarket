import "./signTab.css";

export default function Login() {
  const container = document.createElement("div");
  container.className = "flex flex-col items-center mt-[100px]";

  const tapButtonClass =
    "w-full py-[20px] pb-[32px] bg-[#F2F2F2] border border-[#c4c4c4] rounded-[10px]";
  const inputClass =
    "w-full py-5 border-b border-gray-300 text-gray-700 outline-none";

  container.innerHTML = `
    <a href="/">
      <h1 class="w-[238px] h-[74px] bg-[url('/src/images/Logo-hodu.png')] bg-no-repeat bg-contain text-[0px]">
        호두 오픈마켓 메인페이지
      </h1>
    </a>

    <section class="w-full max-w-[550px] mt-[70px]">
      <h2 class="sr-only">로그인 폼</h2>

      <ul class="flex text-[18px] font-medium">
        <li class="flex-1">
          <button type="button" data-type="BUYER" class="buyer tab-btn active ${tapButtonClass}">
            구매회원 로그인
          </button>
        </li>
        <li class="flex-1">
          <button type="button" data-type="SELLER" class="tab-btn seller ${tapButtonClass}">
            판매회원 로그인
          </button>
        </li>
      </ul>
      
      <form class="user-form buyer flex flex-col p-[35px] border border-gray-300 bg-white translate-y-[-20px]">
        <label for="userId" class="sr-only">아이디 입력</label>
        <input type="text" id="userId" name="userId" placeholder="아이디" class="${inputClass}" />
        
        <label for="password" class="sr-only">비밀번호 입력</label>
        <input type="password" id="password" name="password" placeholder="비밀번호" class="${inputClass}" />
    
        <div id="loginError" class="error-message" style="display: none; color: red;"></div>
       
        <button type="submit" class="w-full py-[19px] mt-[36px] bg-[#21BF48] text-white text-[18px] font-[700] rounded-lg hover:bg-green-600 focus:outline-none">로그인</button>
      </form>

      <div class="flex items-center justify-center text-center mt-[30px] text-[16px] text-[#333]">
        <a href="#sign-up">회원가입</a>
        <span class="inline-block w-[1px] h-[16px] bg-[#333] mx-4"></span>
        <a href="#login">비밀번호 찾기</a>
      </div>
    </section>
  `;

  /* 탭 버튼 클릭 이벤트 */
  const buyerBtn = container.querySelector("button.buyer");
  const sellerBtn = container.querySelector("button.seller");
  const userForm = container.querySelector(".user-form");
  let beforeBtn = buyerBtn; // 이전에 활성화된 버튼을 추적
  let userType = "BUYER"; // 기본 로그인 유형을 'BUYER'로 설정

  // 탭 버튼 클릭 시 호출되는 핸들러 함수
  const tabBtnClickHandler = (activeBtn, unactiveBtn) => {
    const unactiveBtnType = unactiveBtn.getAttribute("data-type").toLowerCase();
    const activeBtnType = activeBtn.getAttribute("data-type");

    // 비활성 버튼의 'active' 클래스를 제거
    unactiveBtn.classList.contains("active") &&
      unactiveBtn.classList.remove("active");
    // 활성화된 버튼에 'active' 클래스를 추가
    !activeBtn.classList.contains("active") &&
      activeBtn.classList.add("active");

    userType = activeBtnType; // 현재 선택된 로그인 유형을 업데이트

    // 현재 비활성화된 폼 클래스를 제거하고 활성화된 폼 클래스를 추가
    userForm.classList.contains(unactiveBtnType) &&
      userForm.classList.remove(unactiveBtnType);
    !userForm.classList.contains(activeBtnType.toLowerCase()) &&
      userForm.classList.add(activeBtnType.toLowerCase());
    beforeBtn = activeBtn; // 현재 버튼을 이전 버튼으로 설정
  };

  // 탭 버튼 클릭 시 탭 버튼 핸들러 호출
  buyerBtn.addEventListener("click", (e) => {
    tabBtnClickHandler(buyerBtn, beforeBtn);
  });
  sellerBtn.addEventListener("click", (e) => {
    tabBtnClickHandler(sellerBtn, beforeBtn);
  });

  /* 폼 유효성 검사 및 제출 이벤트 */
  userForm.addEventListener("submit", async (e) => {
    e.preventDefault(); // 기본 폼 제출 동작을 방지

    // 입력 필드의 값을 가져오고 공백을 제거
    const userId = container.querySelector("#userId").value.trim();
    const password = container.querySelector("#password").value.trim();
    const loginError = container.querySelector("#loginError");

    let errorMessage = "";

    // 입력 필드 검증
    if (userId === "" && password === "") {
      errorMessage = "아이디와 비밀번호를 입력해주세요.";
    } else if (userId === "") {
      errorMessage = "아이디를 입력해주세요.";
    } else if (password === "") {
      errorMessage = "비밀번호를 입력해주세요.";
    }

    // 에러 메시지가 있는 경우, 표시하고 포커스
    if (errorMessage) {
      loginError.textContent = errorMessage;
      loginError.style.display = "block";
      if (userId === "") container.querySelector("#userId").focus();
      else if (password === "") container.querySelector("#password").focus();
      return;
    }

    // API 요청
    try {
      const response = await fetch(
        "https://openmarket.weniv.co.kr//accounts/login/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: userId,
            password: password,
            login_type: userType,
          }),
        }
      );

      if (response.ok) {
        alert("로그인 성공!");
        window.history.back(); // 로그인 성공 시 이전 페이지로 이동
      } else {
        loginError.textContent = "아이디 또는 비밀번호가 일치하지 않습니다.";
        loginError.style.display = "block";
        container.querySelector("#password").value = ""; // 비밀번호 입력란을 비움
        container.querySelector("#password").focus(); // 비밀번호 입력란에 포커스
      }
    } catch (error) {
      loginError.textContent = "로그인 중 오류가 발생했습니다.";
      loginError.style.display = "block";
      container.querySelector("#password").value = ""; // 비밀번호 입력란을 비움
      container.querySelector("#password").focus(); // 비밀번호 입력란에 포커스
    }
  });

  return container;
}
