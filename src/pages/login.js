export default function Login() {
  const container = document.createElement("div");
  container.innerHTML = `
        <h1> 
            <a href="/">
                <img src="./images/Logo-hodu.png" alt="호두 메인페이지" class="w-[238px] h-[74px]" />
            </a>
        </h1>
        <form>
            <label for="username">
            <input type="text" id="username" name="username" placeholder="아이디" required />
            </label>
            <br />
            <label for="password">
            <input type="password" id="password" name="password" placeholder="비밀번호" required />
            </label>
            <br />
            <button type="submit">로그인</button>
        </form>
        <ul>
            <li>회원가입</li>
            <li>비밀번호 찾기</li>
        </ul>
      `;
  return container;
}
