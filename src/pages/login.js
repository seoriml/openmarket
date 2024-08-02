export default class Login {
  render() {
    const container = document.createElement("div");
    container.innerHTML = `
        <h1> 
        <a href="/">
          <img src="./images/Logo-hodu.png" alt="호두 메인페이지" class="w-[238px] h-[74px]" />
        </a></h1>
        <form>
          <label for="username">Username:</label>
          <input type="text" id="username" name="username" required />
          <br />
          <label for="password">Password:</label>
          <input type="password" id="password" name="password" required />
          <br />
          <button type="submit">Login</button>
        </form>

        
      `;
    return container;
  }
}
