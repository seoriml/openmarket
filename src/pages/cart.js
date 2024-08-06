import "./signTab.css";

export default function Cart() {
  const cart = document.createElement("div");
  cart.className = "";

  cart.innerHTML = `
    <a href="/">
      <h1 class="w-[238px] h-[74px] bg-[url('/src/images/Logo-hodu.png')] bg-no-repeat bg-contain text-[0px]">
        sfsdfd
      </h1>
    </a>

    <section class="w-full max-w-[550px] mt-[70px]">
      sfsdfsd
    </section>
  `;

  return cart;
}
