export default function Login() {
  const container = document.createElement("div");
  container.className = "flex flex-col items-center mt-[100px]";

  const tapButtonClass =
    " w-full py-[20px] pb-[32px] bg-[#F2F2F2] border border-[#c4c4c4] rounded-[10px]";
  const inputClass =
    " w-full py-5 border-b border-gray-300 text-gray-700 outline-none";

  container.innerHTML = `
    <a href="/">
      <h1 class="w-[238px] h-[74px] bg-[url('/src/images/Logo-hodu.png')] bg-no-repeat bg-contain text-[0px]">
        호두 오픈마켓 메인페이지
      </h1>
    </a>
    
    <section class="w-full max-w-[550px] mt-[70px]">
      <h2 class="sr-only">로그인 폼</h2>
      <ul class="flex text-[18px] font-[600]">
        <li class="flex-1">
          <button type="button" class="${tapButtonClass}">
            구매회원 로그인
          </button>
        </li>
        <li class="flex-1">
          <button type="button" class="${tapButtonClass}">
            판매회원 로그인
          </button>
        </li>
      </ul>
      
      <form class="flex flex-col p-[35px] border border-gray-300 bg-white rounded-[10px] translate-y-[-12px]">
        <label for="userId" class="sr-only">아이디 입력</label>
        <input type="text" id="userId" name="userId" placeholder="아이디" class="${inputClass}" required />
        
        <label for="password" class="sr-only">비밀번호 입력</label>
        <input type="password" id="password" name="password" placeholder="비밀번호" class="${inputClass}" required />
        
        <button type="submit" class="w-full py-[19px] mt-[36px] bg-[#21BF48] text-white text-[18px] font-[700] rounded-lg hover:bg-green-600 focus:outline-none">로그인</button>
      </form>
      
      <div class="flex items-center justify-center text-center mt-[30px] text-[16px] text-[#333]">
        <a href="#sign-up">회원가입</a>
        <span class="inline-block w-[1px] h-[16px] bg-[#333] mx-4"></span>
        <a href="#login">비밀번호 찾기</a>
      </div>
    </section>
  `;

  return container;
}
