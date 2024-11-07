(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))c(a);new MutationObserver(a=>{for(const r of a)if(r.type==="childList")for(const x of r.addedNodes)x.tagName==="LINK"&&x.rel==="modulepreload"&&c(x)}).observe(document,{childList:!0,subtree:!0});function n(a){const r={};return a.integrity&&(r.integrity=a.integrity),a.referrerPolicy&&(r.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?r.credentials="include":a.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function c(a){if(a.ep)return;a.ep=!0;const r=n(a);fetch(a.href,r)}})();function T(){const e=JSON.parse(localStorage.getItem("userToken"));if(console.log(e),e&&e.user_type)switch(e.user_type){case"BUYER":return"buyer";case"SELLER":return"seller";default:return"guest"}else return"guest"}async function B(){try{if(!(await fetch(`${L}/accounts/logout/`,{method:"POST",headers:{"Content-Type":"application/json"}})).ok)throw new Error("로그아웃 요청에 실패했습니다.");localStorage.removeItem("userToken"),alert("로그아웃 되었습니다."),window.location.href="/openmarket"}catch(e){alert(e.message)}}function j(){const e=document.createElement("header");e.className="shadow-lg";const s=T(),n={guest:[{href:"#cart",text:"장바구니",icon:"icon-shopping-cart.svg"},{href:"#login",text:"로그인",icon:"icon-user.svg"}],buyer:[{href:"#cart",text:"장바구니",icon:"icon-shopping-cart.svg"},{href:"#logout",text:"로그아웃",icon:"icon-user.svg"}],seller:[{href:"#seller-center",text:"판매자 센터",icon:"icon-shop.svg"},{href:"#logout",text:"로그아웃",icon:"icon-user.svg"}]},c=({href:l,text:p,icon:u})=>`
    <a href="/openmarket/${l}" class="w-[50px] pt-[32px] bg-no-repeat bg-top text-center text-[12px] text-[#767676]" style="background:url('/openmarket/images/${u}') no-repeat center top">
      ${p}
    </a>
  `,a="border border-[#c4c4c4] py-[10px] w-[100px] rounded-[5px]";if(e.innerHTML=`
    <section class="m-auto max-w-container flex items-center justify-between py-[20px]">
      <div class="w-full flex gap-[30px]">
        <a href="/openmarket">
          <h1 class="w-[124px] h-[38px] indent-[-9999px] bg-[url('/images/Logo-hodu.png')] bg-no-repeat bg-contain">
            호두 오픈마켓 메인페이지
          </h1>
        </a>
        <form class="search-form flex items-center justify-between w-full max-w-[400px] px-[22px] rounded-full border border-primary">
          <label for="search-input" class="sr-only">상품 검색</label>
          <input type="text" placeholder="상품을 검색해보세요!" id="search-input" class="focus:outline-none w-full" aria-label="검색어 입력">
          <button type="submit" class="w-[28px] h-[28px] bg-[url('/images/icon-search.svg')] bg-no-repeat bg-cover indent-[-9999px]">검색</button>
        </form>
      </div>
      <nav class="flex gap-[26px]">
        ${n[s].map(c).join("")}
      </nav>
    </section>

    <div id="loginModal" class="z-50 modal delete-modal fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center hidden">
      <div class="modal-content bg-white pt-[50px] pb-[40px] border border-[#767676] w-full max-w-[360px] text-center relative">
        <button id="modalClose" class="absolute top-[18px] right-[18px] w-[22px] h-[22px] bg-[url('/images/icon-delete.svg')] bg-no-repeat bg-center bg-contain">
        </button> 
        <h2>로그인이 필요한 서비스입니다</h2>
        <p>로그인하시겠습니까?</p>
        <div class="flex justify-center gap-[10px] mt-[30px]">
          <button id="modalNo" class="${a}  text-[#767676]">아니요</button>
          <button id="modalYes" class="${a} bg-primary text-white">예</button>
        </div>
      </div>
    </div>
  `,s==="guest"){const l=e.querySelector('a[href="/openmarket/#cart"]');l&&l.addEventListener("click",p=>{p.preventDefault();const u=document.getElementById("loginModal");u.classList.remove("hidden");const f=document.getElementById("modalYes"),h=document.getElementById("modalNo"),w=document.getElementById("modalClose");f.addEventListener("click",()=>{sessionStorage.setItem("beforePage",window.location.hash),window.location.hash="login"}),h.addEventListener("click",()=>{u.classList.add("hidden")}),w.addEventListener("click",()=>{u.classList.add("hidden")})})}const r=e.querySelector('a[href="/openmarket/#login"]');r&&r.addEventListener("click",l=>{l.preventDefault(),sessionStorage.setItem("beforePage",window.location.hash),window.location.hash="login"});const x=e.querySelector('a[href="/openmarket/#logout"]');x&&x.addEventListener("click",l=>{l.preventDefault(),B()}),e.querySelector(".search-form").addEventListener("submit",l=>{l.preventDefault();const p=e.querySelector("#search-input");console.log("검색어:",p.value)});function b(){if(window.location.hash==="#cart"){const p=e.querySelector('a[href="/openmarket/#cart"]');p&&(p.style.backgroundImage="url('/openmarket/images/icon-shopping-cart-2.svg')",p.classList.add("text-green-500"))}}return b(),window.addEventListener("hashchange",b),e}const N="flex space-x-[14px] text-sm mb-[30px]",$="border-r border-[#c4c4c4] pr-[14px] last:border-none",S="text-[#767676] hover:text-gray-600";function P(){const e=document.createElement("footer");return e.className="bg-[#f2f2f2] py-[60px]",e.innerHTML=`
  <section class="max-w-container m-auto">
    <nav class="mb-[30px] flex justify-between border-b-2">
      <ul class="${N}">
        <li class="${$}">
          <a href="#">호두샵 소개</a>
        </li>
        <li class="${$}">
          <a href="#">이용약관</a>
        </li>
        <li class="${$}">
          <a href="#" class="font-bold">개인정보처리방침</a>
        </li>
        <li class="${$}">
          <a href="#">전자금융거래약관</a>
        </li>
        <li class="${$}">
          <a href="#">청소년보호정책</a>
        </li>
        <li>
          <a href="#">제휴문의</a>
        </li>
      </ul>

      <div class="flex space-x-[14px]">
        <a href="#" class="${S}">
          <span class="sr-only">Instagram</span>
          <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path fill-rule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clip-rule="evenodd" />
          </svg>
        </a>
        <a href="#" class="${S}">
          <span class="sr-only">Facebook</span>
          <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path fill-rule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clip-rule="evenodd" />
          </svg>
        </a>
        <a href="#" class="${S}">
          <span class="sr-only">YouTube</span>
          <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path fill-rule="evenodd" d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z" clip-rule="evenodd" />
          </svg>
        </a>
      </div>
    </nav>
    <div class="text-sm text-[#767676] leading-[24px]">
      <p class="font-semibold">(주)HODU SHOP</p>
      <p>제주특별자치도 제주시 동광고 137 제주코딩베이스캠프</p>
      <p>사업자 번호 : 000-0000-0000 | 통신판매업</p>
      <p>대표 : 김호두</p>
    </div>
  </section>
  `,e}function M(){const e=document.createElement("div");e.className="flex flex-col items-center mt-[100px] mb-[350px]";const s="w-full py-[20px] pb-[32px] bg-[#F2F2F2] border border-[#c4c4c4] rounded-[10px]",n="w-full py-5 border-b border-gray-300 text-gray-700 outline-none";e.innerHTML=`
    <a href="/openmarket">
      <h1 class="w-[238px] h-[74px] bg-[url('/images/Logo-hodu.png')] bg-no-repeat bg-contain text-[0px]">
        호두 오픈마켓 메인페이지
      </h1>
    </a>

    <section class="w-full max-w-[550px] mt-[70px]">
      <h2 class="sr-only">로그인 폼</h2>

      <ul class="flex text-[18px] font-medium">
        <li class="flex-1">
          <button type="button" data-type="BUYER" class="buyer tab-btn active ${s}">
            구매회원 로그인
          </button>
        </li>
        <li class="flex-1">
          <button type="button" data-type="SELLER" class="tab-btn seller ${s}">
            판매회원 로그인
          </button>
        </li>
      </ul>
      
      <form class="user-form buyer flex flex-col p-[35px] border border-gray-300 bg-white translate-y-[-20px]">
        <label for="userId" class="sr-only">아이디 입력</label>
        <input type="text" id="userId" name="userId" placeholder="아이디" class="${n}" />
        
        <label for="password" class="sr-only">비밀번호 입력</label>
        <input type="password" id="password" name="password" placeholder="비밀번호" class="${n} mb-[10px]" />
    
        <div id="loginError" class="error-message hidden text-red-500 mt-[16px]"></div>
       
        <button type="submit" class="w-full py-[19px] mt-[26px] bg-primary text-white text-[18px] font-[700] rounded-lg hover:bg-green-600 focus:outline-none">로그인</button>
      </form>

      <div class="flex items-center justify-center text-center mt-[30px] text-[16px] text-[#333]">
        <a href="/openmarket/#sign-up" onclick="alert('준비 중입니다.'); return false;">회원가입</a>
        <span class="inline-block w-[1px] h-[16px] bg-[#333] mx-4"></span>
        <a href="/openmarket/#login">비밀번호 찾기</a>
      </div>
    </section>
  `;const c=e.querySelector("button.buyer"),a=e.querySelector("button.seller"),r=e.querySelector(".user-form");let x=c,g="BUYER";const b=(l,p)=>{const u=p.getAttribute("data-type").toLowerCase(),f=l.getAttribute("data-type");p.classList.contains("active")&&p.classList.remove("active"),!l.classList.contains("active")&&l.classList.add("active"),g=f,r.classList.contains(u)&&r.classList.remove(u),!r.classList.contains(f.toLowerCase())&&r.classList.add(f.toLowerCase()),x=l};return c.addEventListener("click",()=>{b(c,x)}),a.addEventListener("click",()=>{b(a,x)}),r.addEventListener("submit",async l=>{l.preventDefault();const p=e.querySelector("#userId").value.trim(),u=e.querySelector("#password").value.trim(),f=e.querySelector("#loginError");let h="";if(p===""&&u===""?h="아이디와 비밀번호를 입력해주세요.":p===""?h="아이디를 입력해주세요.":u===""&&(h="비밀번호를 입력해주세요."),h){f.textContent=h,f.style.display="block",p===""?e.querySelector("#userId").focus():u===""&&e.querySelector("#password").focus();return}const w=await fetch("https://estapi.openmarket.weniv.co.kr/accounts/login/",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({username:p,password:u,login_type:g})});if(w.ok){const k=await w.json(),y={user_type:k.user_type,token:k.token,cart:[]};localStorage.setItem("userToken",JSON.stringify(y));const q=sessionStorage.getItem("beforePage");window.location.href=`/openmarket/${q}`}else f.textContent="아이디 또는 비밀번호가 일치하지 않습니다.",f.style.display="block",u.value="",u.focus()}),e}async function z(){const e=JSON.parse(localStorage.getItem("userToken")),s={async fetch(t,o={}){const d={headers:{"Content-Type":"application/json",...e&&{Authorization:`JWT ${e.token}`}}},i=await fetch(`${L}/${t}`,{...d,...o});if(!i.ok)throw new Error(`API request failed: ${i.statusText}`);return i.json()},getCart:()=>s.fetch("/cart/"),getProduct:t=>s.fetch(`/products/${t}/`),updateCartItem:(t,o)=>s.fetch(`/cart/${t}/`,{method:"PUT",body:JSON.stringify(o)}),deleteCartItem:async t=>{const o=await fetch(`${L}/cart/${t}/`,{method:"DELETE",headers:{Authorization:`JWT ${e.token}`}});if(!o.ok)throw new Error(`API request failed: ${o.statusText}`);return o.status===204?null:o.json()}},n=document.createElement("section");n.className="max-w-container m-auto text-center";const c=await s.getCart();let a=await Promise.all(c.results.map(async t=>{const o=await s.getProduct(t.product_id);return{...t,product:o}}));function r(){return a.map(t=>`
        <!-- 장바구니 항목 시작 -->
        <div class="flex items-center border border-[#c4c4c4] rounded-[10px] py-[20px] px-[30px] mb-[10px] gap-x-[40px] relative" 
          data-id="${t.cart_item_id}" 
          data-product-id="${t.product.product_id}" 
          data-price="${t.product.price}" 
          data-stock="${t.product.stock}" 
          data-shipping-fee="${t.product.shipping_fee}">

          <!-- 체크박스 -->
          <label for="item-${t.cart_item_id}" class="relative flex items-center cursor-pointer">
            <input type="checkbox" id="item-${t.cart_item_id}" class="hidden peer item-checkbox" ${t.is_active?"checked":""} />
            <span class="w-6 h-6 block bg-[url('/openmarket/images/cart-check-off.svg')] bg-no-repeat bg-center peer-checked:bg-[url('/openmarket/images/cart-check-on.svg')]"></span>
          </label>
          
          <!-- 제품 이미지 -->
          <div class="w-full max-w-[160px]">
            <img src="${t.product.image}" 
            alt="${t.product.products_info}" 
            class="w-[160px] h-[160px] object-cover rounded-[10px]">
          </div>

          <!-- 상품 정보 -->
          <div class="w-full text-left">
            <p class="text-sm text-[#767676] mb-[10px]"> 
              ${t.product.store_name.replace(/\x08/g,"")}
            </p>
            <h2 class="text-lg mb-[10px]">
              ${t.product.product_name}
            </h2>
            <p class="font-bold mb-[40px]">
              ${t.product.price.toLocaleString()}원
            </p>
            <p class="text-sm text-[#767676] mb-[10px]">
              ${t.product.shipping_method==="PARCEL"?"택배배송":"업체배달"} / 
              ${t.product.shipping_fee===0?"무료배송":`${t.product.shipping_fee.toLocaleString()}원`}
            </p>
          </div>

          <!-- 수량 -->
          <div class="w-[150px] border border-[#c4c4c4] rounded-[5px] flex items-center justify-center text-lg text-center">
            <button
              class="decrease-quantity w-[50px] h-[50px] bg-contain bg-center bg-no-repeat"
              style="background-image: url('/openmarket/images/icon-minus-line.svg'); background-size: 20px;">
            </button>
            <span class="quantity w-[50px] h-[50px] border-x-[1px] border-[#c4c4c4] flex items-center justify-center">
              ${t.quantity}
            </span>
            <button class="decrease-quantity w-[50px] h-[50px] bg-contain bg-center bg-no-repeat" 
              ${t.quantity>=t.product.stock?"disabled":""} 
              style="background-image: url('/openmarket/images/icon-plus-line.svg'); background-size: 20px;"></button>
          </div>

          <!-- 상품금액 -->
          <div class="w-full max-w-[130px] mx-[60px]">
            <p class="item-total-price text-lg font-bold text-[#EB5757]">
              ${(t.product.price*t.quantity).toLocaleString()} 원
            </p>
            <button class="order-item bg-primary text-white w-[130px] py-[10px] rounded-[5px] mt-[26px]"  onclick="alert('준비 중입니다.'); return false;">주문하기</button>
            <button class="delete-item absolute top-[18px] right-[18px] w-[22px] h-[22px]" style="background-image: url('/openmarket/images/icon-delete.svg');"></button>
          </div>
        </div>
      `).join("")}const x="w-1/4",g="w-[34px] h-[34px] bg-white bg-contain bg-center bg-no-repeat rounded-full",b="mb-[12px",l="text-[24px] font-bold",p="modal fixed inset-0 bg-black bg-opacity-50 hidden z-50 ",u="border border-[#c4c4c4] py-[10px] w-[100px] rounded-[5px]",f="top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-full max-w-[360px] text-center relative bg-white pt-[50px] pb-[40px] border border-[#767676]",h="w-[50px] h-[50px] bg-contain bg-center bg-no-repeat",w="absolute top-[18px] right-[18px] w-[22px] h-[22px] bg-[url('/images/icon-delete.svg')] bg-no-repeat bg-center bg-contain",k="w-[50px] h-[50px] border-x-[1px] border-[#c4c4c4] flex items-center justify-center text-center text-[18px] focus:outline-none";n.innerHTML=`
  <h1 class="text-[36px] font-bold text-center py-[52px]">장바구니</h1>
  <div class="w-full">
    <div class="bg-[#f2f2f2] flex py-[18px] mb-[35px] rounded-[10px] px-[30px] text-center gap-x-[40px]">
      <label class="relative flex items-center cursor-pointer">
        <input type="checkbox" id="select-all" class="peer sr-only" />
        <span class="w-6 h-6 block bg-[url('/openmarket/images/cart-check-off.svg')] bg-no-repeat bg-center peer-checked:bg-[url('/openmarket/images/cart-check-on.svg')]"></span>
      </label>
      <div class="w-full max-w-[160px]"></div>
      <div class="w-full text-left px-[6%]">상품정보</div>
      <div class="w-full max-w-[150px]">수량</div>
      <div class="w-full max-w-[130px] mx-[60px]">상품금액</div>
    </div> 
    <div class="cart-items">
      ${r()}
    </div>
  </div>

  <div class="bg-[#f2f2f2] mt-[70px] py-[45px] rounded-[10px]">
    <div class="flex items-center text-center">
      <div class="${x}">
        <p class=${b}>총 상품금액</p>
        <p><span id="total-price" class="${l}">0</span> 원</p>
      </div>
      <div class="${g}" style="background-image: url('/openmarket/images/icon-minus-line.svg'); background-size: 19px;"></div>    
      <div class="${x}">
        <p class="${b}">상품 할인</p>
        <p><span id="discount" class="${l}">0</span> 원</p>
      </div>
      <div class="${g}" style="background-image: url('/openmarket/images/icon-plus-line.svg'); background-size: 19px;"></div>
      <div class="${x}">
        <p class="${b}">배송비</p>
        <p><span id="shipping-fee" class="${l}">0</span> 원</p>
      </div>
      <div class="${x}">
        <p class="${b} font-bold">결제 예정 금액</p>
        <p class="text-[#EB5757]"><span id="final-price" class="${l}">0</span> 원</p>
      </div>
    </div>
  </div>

  <div class="text-center mt-[40px]  mb-[160px]">
    <button id="order-button" class="bg-primary text-white py-[20px] px-[65px] rounded-[5px] text-[24px] font-bold"  onclick="alert('준비 중입니다.'); return false;">주문하기</button>
  </div>

  <!-- 수량 변경 모달 -->
  <div id="quantity-modal" class="${p}">
    <div class="${f} absolute flex flex-col items-center">
      <button id="quantity-close" class="${w}"></button> 
      <div class="w-[150px] border border-[#c4c4c4] rounded-[5px] flex items-center justify-center">
        <button id="decrease-quantity" class="${h}" style="background-image: url('/openmarket/images/icon-minus-line.svg'); background-size: 20px;"></button>
        <input type="number" id="quantity-input" min="1" class="${k}" />
        <button id="increase-quantity" class="${h}" style="background-image: url('/openmarket/images/icon-plus-line.svg'); background-size: 20px;"></button>
      </div>
      <div class="flex justify-center gap-[10px] mt-[30px]">
        <button id="quantity-cancel" class="${u} text-[#767676]">취소</button>
        <button id="quantity-confirm" class="${u} bg-primary text-white">수정</button>
      </div>
    </div>
  </div>

  <!-- 삭제 확인 모달 -->
  <div id="delete-modal" class="class=${p}">
    <div class="${f}">
      <button id="delete-close" class="${w}"></button>   
      <h2 class="font-normal">상품을 삭제하시겠습니까?</h2>
      <div class="flex justify-center gap-[10px] mt-[30px]">
        <button id="delete-cancel" class="${u} text-[#767676]">취소</button>
        <button id="delete-confirm" class="${u} bg-primary text-white">확인</button>
      </div>
    </div>
  </div>
`;const y=()=>{let t=0,o=0;a.forEach(d=>{n.querySelector(`div[data-id="${d.cart_item_id}"] .item-checkbox`).checked&&(t+=d.product.price*d.quantity,o+=d.product.shipping_fee)}),n.querySelector("#total-price").textContent=`${t.toLocaleString()}`,n.querySelector("#shipping-fee").textContent=`${o.toLocaleString()}`,n.querySelector("#final-price").textContent=`${(t+o).toLocaleString()}`},q=async(t,o)=>{const d=a.find(i=>i.cart_item_id===t);if(o>d.product.stock){alert("재고 수량을 초과했습니다.");return}try{await s.updateCartItem(t,{product_id:d.product.product_id,quantity:o,is_active:!0}),d.quantity=o;const i=n.querySelector(`div[data-id="${t}"]`);if(i){const m=i.querySelector(".quantity"),v=i.querySelector(".item-total-price");m&&(m.textContent=o),v?v.innerHTML=`
            ${(d.product.price*o).toLocaleString()} 원
          `:console.error("가격 표시 요소가 없습니다."),y()}else console.error("장바구니 항목을 찾을 수 없습니다.")}catch(i){console.error("수량 업데이트 실패:",i),alert("수량 업데이트에 실패했습니다.")}},I=async t=>{try{const o=await s.deleteCartItem(t);a=a.filter(i=>i.cart_item_id!==t);const d=n.querySelector(`div[data-id="${t}"]`);d&&d.remove(),y()}catch{alert("상품 삭제에 실패했습니다.")}},C=(t,o,d)=>{const i=n.querySelector("#quantity-modal"),m=i.querySelector("#quantity-input");m.value=o,m.max=d,i.style.display="block",i.querySelector("#increase-quantity").onclick=()=>{const v=parseInt(m.value)+1;v<=d&&(m.value=v)},i.querySelector("#decrease-quantity").onclick=()=>{const v=parseInt(m.value)-1;v>=1&&(m.value=v)},m.oninput=()=>{const v=parseInt(m.value);isNaN(v)||v<1?m.value=1:v>d&&(m.value=d)},i.querySelector("#quantity-confirm").onclick=()=>{q(t,parseInt(m.value)),i.style.display="none"},i.querySelector("#quantity-cancel").onclick=()=>{i.style.display="none"},i.querySelector("#quantity-close").onclick=()=>{i.style.display="none"}},_=t=>{const o=n.querySelector("#delete-modal");o.style.display="block",o.querySelector("#delete-confirm").onclick=async()=>{await I(t),o.style.display="none"},o.querySelector("#delete-cancel").onclick=()=>{o.style.display="none"},o.querySelector("#delete-close").onclick=()=>{o.style.display="none"}};return n.querySelector(".cart-items").addEventListener("click",t=>{const o=t.target.closest("div[data-id]");if(!o)return;const d=parseInt(o.dataset.id),i=parseInt(o.querySelector(".quantity").textContent),m=parseInt(o.dataset.stock);t.target.classList.contains("increase-quantity")||t.target.classList.contains("decrease-quantity")?C(d,i,m):t.target.classList.contains("delete-item")?_(d):t.target.classList.contains("item-checkbox")&&y()}),n.querySelector("#select-all").addEventListener("change",t=>{n.querySelectorAll(".item-checkbox").forEach(o=>o.checked=t.target.checked),y()}),y(),n}async function O(){try{const e=await fetch(`${L}/products/`);if(!e.ok)throw new Error("상품 데이터를 가져오는 데 실패했습니다.");return(await e.json()).results}catch(e){return console.error(e),[]}}async function A(){const e=document.createElement("section");e.className="product-list-page max-w-container m-auto py-[80px]";const s=await O();if(s.length===0)return e.innerHTML="<p>상품이 없습니다.</p>",e;const n=s.map(c=>`
        <li data-product-id="${c.id}" class="product-item">
          <a href="/openmarket/#detail/${c.id}">
            <image src="${c.image}" alt="${c.name}" class="w-full h-full max-w-[380px] max-h-[380px] object-cover border border-[#c4c4c4] rounded-[10px]">
          <p class="text-[16px] text-[#767676] mt-[16px]">${c.seller.name.replace(/\x08/g,"")}</p>
          <h2 class="text-[18px] mt-[10px]">${c.name}</h2>
          <p class="text-[18px] mt-[10px]"><b class="text-[24px] font-bold">${c.price.toLocaleString()}</b> 원</p>
          </a>
        </li>
        `).join("");return e.innerHTML=`
    <ul class="products grid grid-cols-3 gap-[70px]">${n}</ul>
  `,e}async function H(e){try{const s=await fetch(`${L}/products/${e}/`);if(!s.ok)throw new Error("상품 상세 데이터를 가져오는 데 실패했습니다.");return await s.json()}catch(s){throw console.error(s),s}}async function D(e){const s=document.createElement("div");try{const n=await H(e);s.className="product-detail max-w-container m-auto py-[80px] flex gap-x-[60px]",s.innerHTML=`
        <img src="${n.image}" alt="${n.product_name}" class="w-full h-full max-w-[600px] max-h-[600px]">
      <div class="w-full">
        <div>
          <p class="text-[18px] text-[#767676] font-[400] mb-[16px]">${n.seller.name.replace(/\x08/g,"")}</p>
         <h1 class="text-[36px] font-[400] mb-[20px]">${n.name}</h1>
          <p class="text-[18px]"><span class="text-[36px] font-[700]">${n.price.toLocaleString()}</span> 원</p>
          <span class="block mt-[88px] text-[#767676] font-[400]">${n.shipping_method==="PARCEL"?"택배배송":"업체배달"} / 
          ${n.shipping_fee===0?"무료배송":`${n.shipping_fee.toLocaleString()}원`}</span>
        </div>

        <!-- 수량 -->
        <div class="border-y-2 border-[#c4c4c4] py-[30px] w-full mt-[20px]">
          <div class="w-[150px] border border-[#c4c4c4] rounded-[5px] flex items-center justify-center text-lg text-center">
            <button onclick="alert('준비 중입니다.'); return false;"
              class="decrease-quantity w-[50px] h-[50px] bg-contain bg-center bg-no-repeat"
              style="background-image: url('/openmarket/images/icon-minus-line.svg'); background-size: 20px;">
            </button>
            <span class="quantity w-[50px] h-[50px] border-x-[1px] border-[#c4c4c4] flex items-center justify-center">
              1
            </span>
            <button onclick="alert('준비 중입니다.'); return false;" class="decrease-quantity w-[50px] h-[50px] bg-contain bg-center bg-no-repeat" 
              style="background-image: url('/openmarket/images/icon-plus-line.svg'); background-size: 20px;"></button>
          </div>
        </div>

        <!-- 총 상품 금액 -->
        <div class="flex justify-between items-center py-[30px] text-[18px]">
          <h2 class="font-[500]">총 상품 금액</h2>
          <p class="font-[400] text-[#767676]">
            총 수량 <span class="font-[700] text-primary">1</span>개
            <span class="text-[#c4c4c4] px-[8px]" aria-hidxden="true">|</span>
            <span class="text-[36px] text-primary">${(n.price+n.shipping_fee).toLocaleString()}</span><span class="text-primary">원</span>
          </p>
        </div>

        <div class="flex gap-x-[14px] text-lg text-white ">
          <button class="order bg-primary w-full max-w-[416px] py-[19px] rounded-[5px]"  onclick="alert('준비 중입니다.'); return false;">바로 구매</button>
          <button class="cart bg-[#767676] w-full max-w-[200px] py-[19px] rounded-[5px]"  onclick="alert('준비 중입니다.'); return false;">장바구니</button>
        </div>
      </div>
      `}catch(n){console.error("상품 상세 정보를 가져오는 데 실패했습니다.",n)}return s}function F(){const e=["https://via.placeholder.com/1200x500?text=Banner+1","https://via.placeholder.com/1200x500?text=Banner+2","https://via.placeholder.com/1200x500?text=Banner+3"];let s=0,n;function c(){const a=document.createElement("div");a.className="relative w-full h-full mx-auto bg-[#f2f2f2] max-h-[500px] overflow-hidden";const r=document.createElement("img");r.src=e[s],r.alt=`배너 ${s+1}`,r.className="w-full h-auto transition-opacity duration-500",a.appendChild(r);const x="absolute top-1/2 transform -translate-y-1/2 text-white px-4 py-2 focus:outline-none w-[8px] h-[16px] bg-no-repeat bg-center",g=document.createElement("button");g.className=`${x} bg-[url('/images/icon-swiper-1.svg')] left-4`,g.addEventListener("click",()=>{s=(s-1+e.length)%e.length,p(),h()});const b=document.createElement("button");b.className=`${x} bg-[url('/images/icon-swiper-2.svg')] right-4`,b.addEventListener("click",()=>{s=(s+1)%e.length,p(),h()}),a.appendChild(g),a.appendChild(b);const l=document.createElement("div");l.className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2",e.forEach((w,k)=>{const y=document.createElement("span");y.className=`w-[6px] h-[6px] rounded-full cursor-pointer transition-colors duration-300 ${k===s?"bg-black":"bg-white"}`,y.addEventListener("click",()=>{s=k,p(),h()}),l.appendChild(y)}),a.appendChild(l);function p(){r.src=e[s],r.alt=`배너 ${s+1}`,u()}function u(){l.querySelectorAll("span").forEach((k,y)=>{k.className=`w-2 h-2 rounded-full cursor-pointer transition-colors duration-300 ${y===s?"bg-black":"bg-white"}`})}function f(){n=setInterval(()=>{s=(s+1)%e.length,p()},3e3)}function h(){clearInterval(n),f()}return f(),a}return c()}const L="https://estapi.openmarket.weniv.co.kr",J={login:M,cart:z,home:A,detail:D};async function E(){const e=document.getElementById("app");let s=!1,n="",c=window.location.hash.slice(1);c.includes("/")&&(n=c.split("/")[1],c=c.split("/")[0],s=!0),e.innerHTML="";try{const a=J[c]||NotFound,r=s?await a(n):await a();if(c!=="login"){const g=j();e.appendChild(g)}if(c==="home"){const g=F();e.appendChild(g)}e.appendChild(r);const x=P();e.appendChild(x)}catch(a){console.error("페이지 렌더링 중 오류 발생:",a),e.innerHTML="<p>페이지를 로드하는 중 오류가 발생했습니다.</p>"}}function R(){window.addEventListener("hashchange",E),window.location.hash?E():window.location.hash="home"}window.addEventListener("load",R);
