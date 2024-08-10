(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))a(o);new MutationObserver(o=>{for(const c of o)if(c.type==="childList")for(const d of c.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&a(d)}).observe(document,{childList:!0,subtree:!0});function n(o){const c={};return o.integrity&&(c.integrity=o.integrity),o.referrerPolicy&&(c.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?c.credentials="include":o.crossOrigin==="anonymous"?c.credentials="omit":c.credentials="same-origin",c}function a(o){if(o.ep)return;o.ep=!0;const c=n(o);fetch(o.href,c)}})();function I(){const e=JSON.parse(localStorage.getItem("userToken"));if(console.log(e),e&&e.user_type)switch(e.user_type){case"BUYER":return"buyer";case"SELLER":return"seller";default:return"guest"}else return"guest"}async function _(){try{if(!(await fetch(`${k}/accounts/logout/`,{method:"POST",headers:{"Content-Type":"application/json"}})).ok)throw new Error("로그아웃 요청에 실패했습니다.");localStorage.removeItem("userToken"),alert("로그아웃 되었습니다."),window.location.href="/openmarket"}catch(e){alert(e.message)}}function T(){const e=document.createElement("header");e.className="shadow-lg";const s=I(),n={guest:[{href:"#cart",text:"장바구니",icon:"/src/images/icon-shopping-cart.svg"},{href:"#login",text:"로그인",icon:"/src/images/icon-user.svg"}],buyer:[{href:"#cart",text:"장바구니",icon:"/src/images/icon-shopping-cart.svg"},{href:"#logout",text:"로그아웃",icon:"/src/images/icon-user.svg"}],seller:[{href:"#seller-center",text:"판매자 센터",icon:"/src/images/icon-shop.svg"},{href:"#logout",text:"로그아웃",icon:"/src/images/icon-user.svg"}]},a=({href:m,text:p,icon:u})=>`
    <a href="/openmarket/${m}" class="w-[50px] pt-[32px] bg-no-repeat bg-top text-center text-[12px] text-[#767676]" style="background:url('/openmarket/${u}') no-repeat center top">
      ${p}
    </a>
  `,o="border border-[#c4c4c4] py-[10px] w-[100px] rounded-[5px]";if(e.innerHTML=`
    <section class="m-auto max-w-container flex items-center justify-between py-[20px]">
      <div class="w-full flex gap-[30px]">
        <a href="/openmarket">
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
        ${n[s].map(a).join("")}
      </nav>
    </section>

    <div id="loginModal" class="modal delete-modal fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center hidden">
      <div class="modal-content bg-white pt-[50px] pb-[40px] border border-[#767676] w-full max-w-[360px] text-center relative">
        <button id="modalClose" class="absolute top-[18px] right-[18px] w-[22px] h-[22px] bg-[url('/src/images/icon-delete.svg')] bg-no-repeat bg-center bg-contain">
        </button> 
        <h2>로그인이 필요한 서비스입니다</h2>
        <p>로그인하시겠습니까?</p>
        <div class="flex justify-center gap-[10px] mt-[30px]">
          <button id="modalNo" class="${o}  text-[#767676]">아니요</button>
          <button id="modalYes" class="${o}] bg-primary text-white">예</button>
        </div>
      </div>
    </div>
  `,s==="guest"){const m=e.querySelector('a[href="/openmarket/#cart"]');m&&m.addEventListener("click",p=>{p.preventDefault();const u=document.getElementById("loginModal");u.classList.remove("hidden");const g=document.getElementById("modalYes"),f=document.getElementById("modalNo"),h=document.getElementById("modalClose");g.addEventListener("click",()=>{sessionStorage.setItem("beforePage",window.location.hash),window.location.hash="login"}),f.addEventListener("click",()=>{u.classList.add("hidden")}),h.addEventListener("click",()=>{u.classList.add("hidden")})})}const c=e.querySelector('a[href="/openmarket/#login"]');c&&c.addEventListener("click",m=>{m.preventDefault(),sessionStorage.setItem("beforePage",window.location.hash),window.location.hash="login"});const d=e.querySelector('a[href="/openmarket/#logout"]');return d&&d.addEventListener("click",m=>{m.preventDefault(),_()}),e.querySelector(".search-form").addEventListener("submit",m=>{m.preventDefault();const p=e.querySelector("#search-input");console.log("검색어:",p.value)}),e}function j(){const e=document.createElement("footer");return e.className="bg-gray-100 py-8 px-4 border-t border-gray-200",e.innerHTML=`
  <section class=" max-w-container m-auto ">
    <nav class="mb-6 flex justify-between border-b-2">
      <ul class="flex space-x-4 text-sm">
        <li><a href="#" class="text-gray-600 hover:text-gray-900">호두샵 소개</a></li>
        <li><a href="#" class="text-gray-600 hover:text-gray-900">이용약관</a></li>
        <li><a href="#" class="text-gray-600 hover:text-gray-900 font-semibold">개인정보처리방침</a></li>
        <li><a href="#" class="text-gray-600 hover:text-gray-900">전자금융거래약관</a></li>
        <li><a href="#" class="text-gray-600 hover:text-gray-900">청소년보호정책</a></li>
        <li><a href="#" class="text-gray-600 hover:text-gray-900">제휴문의</a></li>
      </ul>
      <div class="flex space-x-4 mb-6">
        <a href="#" class="text-gray-400 hover:text-gray-600">
          <span class="sr-only">Instagram</span>
          <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path fill-rule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clip-rule="evenodd" />
          </svg>
        </a>
        <a href="#" class="text-gray-400 hover:text-gray-600">
          <span class="sr-only">Facebook</span>
          <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path fill-rule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clip-rule="evenodd" />
          </svg>
        </a>
        <a href="#" class="text-gray-400 hover:text-gray-600">
          <span class="sr-only">YouTube</span>
          <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path fill-rule="evenodd" d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z" clip-rule="evenodd" />
          </svg>
        </a>
      </div>
    </nav>
    <div class="text-sm text-gray-500">
      <p class="mb-1">(주)HODU SHOP</p>
      <p class="mb-1">제주특별자치도 제주시 동광고 137 제주코딩베이스캠프</p>
      <p class="mb-1">사업자 번호 : 000-0000-0000 | 통신판매업</p>
      <p>대표 : 김호두</p>
    </div>
  </section>
  `,e}function P(){const e=document.createElement("div");e.className="flex flex-col items-center mt-[100px] mb-[350px]";const s="w-full py-[20px] pb-[32px] bg-[#F2F2F2] border border-[#c4c4c4] rounded-[10px]",n="w-full py-5 border-b border-gray-300 text-gray-700 outline-none";e.innerHTML=`
    <a href="/openmarket">
      <h1 class="w-[238px] h-[74px] bg-[url('/src/images/Logo-hodu.png')] bg-no-repeat bg-contain text-[0px]">
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
        <a href="/openmarket/#sign-up">회원가입</a>
        <span class="inline-block w-[1px] h-[16px] bg-[#333] mx-4"></span>
        <a href="/openmarket/#login">비밀번호 찾기</a>
      </div>
    </section>
  `;const a=e.querySelector("button.buyer"),o=e.querySelector("button.seller"),c=e.querySelector(".user-form");let d=a,y="BUYER";const m=(p,u)=>{const g=u.getAttribute("data-type").toLowerCase(),f=p.getAttribute("data-type");u.classList.contains("active")&&u.classList.remove("active"),!p.classList.contains("active")&&p.classList.add("active"),y=f,c.classList.contains(g)&&c.classList.remove(g),!c.classList.contains(f.toLowerCase())&&c.classList.add(f.toLowerCase()),d=p};return a.addEventListener("click",()=>{m(a,d)}),o.addEventListener("click",()=>{m(o,d)}),c.addEventListener("submit",async p=>{p.preventDefault();const u=e.querySelector("#userId").value.trim(),g=e.querySelector("#password").value.trim(),f=e.querySelector("#loginError");let h="";if(u===""&&g===""?h="아이디와 비밀번호를 입력해주세요.":u===""?h="아이디를 입력해주세요.":g===""&&(h="비밀번호를 입력해주세요."),h){f.textContent=h,f.style.display="block",u===""?e.querySelector("#userId").focus():g===""&&e.querySelector("#password").focus();return}const v=await fetch("https://openmarket.weniv.co.kr/accounts/login/",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({username:u,password:g,login_type:y})});if(v.ok){const $=await v.json(),S={user_type:$.user_type,token:$.token,cart:[]};localStorage.setItem("userToken",JSON.stringify(S));const L=sessionStorage.getItem("beforePage");window.location.href=`/openmarket/${L}`}else f.textContent="아이디 또는 비밀번호가 일치하지 않습니다.",f.style.display="block",g.value="",g.focus()}),e}const q=JSON.parse(localStorage.getItem("userToken")),w={async fetch(e,s={}){const n={headers:{"Content-Type":"application/json",...q&&{Authorization:`JWT ${q.token}`}}},a=await fetch(`${k}${e}`,{...n,...s});if(!a.ok)throw new Error(`API request failed: ${a.statusText}`);return a.json()},getCart:()=>w.fetch("/cart/"),getProduct:e=>w.fetch(`/products/${e}/`),updateCartItem:(e,s)=>w.fetch(`/cart/${e}/`,{method:"PUT",body:JSON.stringify(s)}),deleteCartItem:async e=>{const s=await fetch(`${k}/cart/${e}/`,{method:"DELETE",headers:{Authorization:`JWT ${q.token}`}});if(!s.ok)throw new Error(`API request failed: ${s.statusText}`);return s.status===204?null:s.json()}};async function B(){const e=document.createElement("section");e.className="max-w-container m-auto text-center";const s=await w.getCart();let n=await Promise.all(s.results.map(async t=>{const r=await w.getProduct(t.product_id);return{...t,product:r}}));function a(){return n.map(t=>`
        <!-- 장바구니 항목 시작 -->
        <div class="flex items-center border border-[#c4c4c4] rounded-[10px] py-[20px] px-[30px] mb-[10px] gap-x-[40px] relative" 
          data-id="${t.cart_item_id}" 
          data-product-id="${t.product.product_id}" 
          data-price="${t.product.price}" 
          data-stock="${t.product.stock}" 
          data-shipping-fee="${t.product.shipping_fee}">

          <!-- 체크박스 -->
          <input type="checkbox" class="item-checkbox" 
            ${t.is_active?"checked":""}>

          <!-- 제품 이미지 -->
          <div class="w-full max-w-[160px]">
            <img src="${t.product.image}" 
            alt="${t.product.products_info}" 
            class="w-[160px] h-[160px] object-cover rounded-[10px]">
          </div>

          <!-- 상품 정보 -->
          <div class="w-full text-left">
            <p class="text-sm text-[#767676] mb-[10px]"> 
              ${t.product.store_name}
            </p>
            <h2 class="text-lg mb-[10px]">
              ${t.product.product_name}
            </h2>
            <p class="font-bold mb-[40px]">
              ${t.product.price.toLocaleString()}원
            </p>
            <p class="text-sm text-[#767676] mb-[10px]">
              ${t.product.shipping_method} / ${t.product.shipping_fee.toLocaleString()}원
            </p>
          </div>

          <!-- 수량 -->
          <div class="w-[150px] border border-[#c4c4c4] rounded-[10px] flex items-center justify-center text-lg text-center">
            <button
              class="decrease-quantity w-[50px] h-[50px] bg-contain bg-center bg-no-repeat"
              style="background-image: url('/openmarket/src/images/icon-minus-line.svg'); background-size: 20px;">
            </button>
            <span class="quantity w-[50px] h-[50px] border-x-[1px] border-[#c4c4c4] flex items-center justify-center">
              ${t.quantity}
            </span>
            <button class="decrease-quantity w-[50px] h-[50px] bg-contain bg-center bg-no-repeat" 
              ${t.quantity>=t.product.stock?"disabled":""} 
              style="background-image: url('/openmarket/src/images/icon-plus-line.svg'); background-size: 20px;"></button>
          </div>

          <!-- 상품금액 -->
          <div class="w-full max-w-[130px] mx-[60px]">
            <p class="item-total-price text-lg font-bold text-[#EB5757]">
              ${(t.product.price*t.quantity).toLocaleString()} 원
            </p>
            <button class="order-item bg-primary text-white w-[130px] py-[10px] rounded-[10px] mt-[26px]">주문하기</button>
            <button class="delete-item absolute top-[18px] right-[18px] w-[22px] h-[22px]" style="background-image: url('/openmarket/src/images/icon-delete.svg');"></button>
          </div>
        </div>
      `).join("")}const o="w-1/4",c="w-[34px] h-[34px] bg-white bg-contain bg-center bg-no-repeat rounded-full",d="mb-[12px",y="text-[24px] font-bold",m="modal fixed inset-0 bg-black bg-opacity-50 hidden",p="border border-[#c4c4c4] py-[10px] w-[100px] rounded-[5px]",u="top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-full max-w-[360px] text-center relative bg-white pt-[50px] pb-[40px] border border-[#767676]",g="w-[50px] h-[50px] bg-contain bg-center bg-no-repeat",f="absolute top-[18px] right-[18px] w-[22px] h-[22px] bg-[url('/src/images/icon-delete.svg')] bg-no-repeat bg-center bg-contain",h="w-[50px] h-[50px] border-x-[1px] border-[#c4c4c4] flex items-center justify-center text-center text-[18px] focus:outline-none";e.innerHTML=`
  <h1 class="text-[36px] font-bold text-center py-[52px]">장바구니</h1>
  <div class="w-full">
    <div class="bg-[#f2f2f2] flex py-[18px] mb-[35px] rounded-[10px] px-[30px] text-center gap-x-[40px]">
      <input type="checkbox" id="select-all">
      <div class="w-full max-w-[160px]"></div>
      <div class="w-full text-left px-[6%]">상품정보</div>
      <div class="w-full max-w-[150px]">수량</div>
      <div class="w-full max-w-[130px] mx-[60px]">상품금액</div>
    </div> 
    <div class="cart-items">
      ${a()}
    </div>
  </div>

  <div class="bg-[#f2f2f2] mt-[70px] py-[45px] rounded-[10px]">
    <div class="flex items-center text-center">
      <div class="${o}">
        <p class=${d}>총 상품금액</p>
        <p><span id="total-price" class="${y}">0</span> 원</p>
      </div>
      <div class="${c}" style="background-image: url('/openmarket/src/images/icon-minus-line.svg'); background-size: 19px;"></div>    
      <div class="${o}">
        <p class="${d}">상품 할인</p>
        <p><span id="discount" class="${y}">0</span> 원</p>
      </div>
      <div class="${c}" style="background-image: url('/openmarket/src/images/icon-plus-line.svg'); background-size: 19px;"></div>
      <div class="${o}">
        <p class="${d}">배송비</p>
        <p><span id="shipping-fee" class="${y}">0</span> 원</p>
      </div>
      <div class="${o}">
        <p class="${d} font-bold">결제 예정 금액</p>
        <p class="text-[#EB5757]"><span id="final-price" class="${y}">0</span> 원</p>
      </div>
    </div>
  </div>

  <div class="text-center mt-[40px]  mb-[160px]">
    <button id="order-button" class="bg-primary text-white py-[20px] px-[65px] rounded-[10px] text-[24px] font-bold">주문하기</button>
  </div>

  <!-- 수량 변경 모달 -->
  <div id="quantity-modal" class="${m}">
    <div class="${u} absolute flex flex-col items-center">
      <button id="modalClose" class="${f}"></button> 
      <div class="w-[150px] border border-[#c4c4c4] rounded-[10px] flex items-center justify-center">
        <button id="decrease-quantity" class="${g}" style="background-image: url('/openmarket/src/images/icon-minus-line.svg'); background-size: 20px;"></button>
        <input type="number" id="quantity-input" min="1" class="${h}" />
        <button id="increase-quantity" class="${g}" style="background-image: url('/openmarket/src/images/icon-plus-line.svg'); background-size: 20px;"></button>
      </div>
      <div class="flex justify-center gap-[10px] mt-[30px]">
        <button id="quantity-cancel" class="${p} text-[#767676]">취소</button>
        <button id="quantity-confirm" class="${p} bg-primary text-white">수정</button>
      </div>
    </div>
  </div>

  <!-- 삭제 확인 모달 -->
  <div id="delete-modal" class="class=${m}">
    <div class="${u}">
      <button id="modalClose" class="${f}"></button>   
      <h2 class="font-normal">상품을 삭제하시겠습니까?</h2>
      <div class="flex justify-center gap-[10px] mt-[30px]">
        <button id="delete-cancel" class="${p} text-[#767676]">취소</button>
        <button id="delete-confirm" class="${p} bg-primary text-white">확인</button>
      </div>
    </div>
  </div>
`;const v=()=>{let t=0,r=0;n.forEach(i=>{e.querySelector(`div[data-id="${i.cart_item_id}"] .item-checkbox`).checked&&(t+=i.product.price*i.quantity,r+=i.product.shipping_fee)}),e.querySelector("#total-price").textContent=`${t.toLocaleString()}`,e.querySelector("#shipping-fee").textContent=`${r.toLocaleString()}`,e.querySelector("#final-price").textContent=`${(t+r).toLocaleString()}`},$=async(t,r)=>{const i=n.find(l=>l.cart_item_id===t);if(r>i.product.stock){alert("재고 수량을 초과했습니다.");return}try{await w.updateCartItem(t,{product_id:i.product.product_id,quantity:r,is_active:!0}),i.quantity=r;const l=e.querySelector(`div[data-id="${t}"]`);if(l){const x=l.querySelector(".quantity"),b=l.querySelector(".item-total-price");x&&(x.textContent=r),b?b.innerHTML=`
            ${(i.product.price*r).toLocaleString()} 원
          `:console.error("가격 표시 요소가 없습니다."),v()}else console.error("장바구니 항목을 찾을 수 없습니다.")}catch(l){console.error("수량 업데이트 실패:",l),alert("수량 업데이트에 실패했습니다.")}},S=async t=>{try{const r=await w.deleteCartItem(t);n=n.filter(l=>l.cart_item_id!==t);const i=e.querySelector(`div[data-id="${t}"]`);i&&i.remove(),v()}catch{alert("상품 삭제에 실패했습니다.")}},L=(t,r,i)=>{const l=e.querySelector("#quantity-modal"),x=l.querySelector("#quantity-input");x.value=r,x.max=i,l.style.display="block",l.querySelector("#increase-quantity").onclick=()=>{const b=parseInt(x.value)+1;b<=i&&(x.value=b)},l.querySelector("#decrease-quantity").onclick=()=>{const b=parseInt(x.value)-1;b>=1&&(x.value=b)},x.oninput=()=>{const b=parseInt(x.value);isNaN(b)||b<1?x.value=1:b>i&&(x.value=i)},l.querySelector("#quantity-confirm").onclick=()=>{$(t,parseInt(x.value)),l.style.display="none"},l.querySelector("#quantity-cancel").onclick=()=>{l.style.display="none"},l.querySelector("#modalClose").onclick=()=>{l.style.display="none"}},E=t=>{const r=e.querySelector("#delete-modal");r.style.display="block",r.querySelector("#delete-confirm").onclick=async()=>{await S(t),r.style.display="none"},r.querySelector("#delete-cancel").onclick=()=>{r.style.display="none"},r.querySelector("#modalClose").onclick=()=>{r.style.display="none"}};return e.querySelector(".cart-items").addEventListener("click",t=>{const r=t.target.closest("div[data-id]");if(!r)return;const i=parseInt(r.dataset.id),l=parseInt(r.querySelector(".quantity").textContent),x=parseInt(r.dataset.stock);t.target.classList.contains("increase-quantity")||t.target.classList.contains("decrease-quantity")&&l>1?L(i,l,x):t.target.classList.contains("delete-item")?E(i):t.target.classList.contains("item-checkbox")&&v()}),e.querySelector("#select-all").addEventListener("change",t=>{e.querySelectorAll(".item-checkbox").forEach(r=>r.checked=t.target.checked),v()}),v(),e}async function M(e){try{const s=await fetch(`${k}/products/${e}/`);if(!s.ok)throw new Error("상품 상세 데이터를 가져오는 데 실패했습니다.");return await s.json()}catch(s){throw console.error(s),s}}async function N(e){const s=document.createElement("div");try{const n=await M(e);s.className="product-detail max-w-container m-auto py-[80px]",s.innerHTML=`
        <h1 class="text-[24px] font-bold mb-[20px]">${n.product_name}</h1>
        <img src="${n.image}" alt="${n.product_info}" class="w-full max-w-[600px] mb-[20px]">
        <p class="text-[18px] mb-[10px]">가격: ${n.price.toLocaleString()} 원</p>
        <p class="text-[16px] mb-[10px]">판매처: ${n.store_name}</p>
        <p class="text-[16px]">${n.product_info}</p>
      `}catch(n){console.error("상품 상세 정보를 가져오는 데 실패했습니다.",n)}return s}async function z(){const e=document.createElement("section");e.className="product-list-page max-w-container m-auto py-[80px]";const s=await O();if(s.length===0)return e.innerHTML="<p>상품이 없습니다.</p>",e;console.log(s);const n=s.map(a=>`
        <li data-product-id="${a.product_id}" class="product-item">
          <a href="/openmarket/#detail/${a.product_id}">
            <image src="${a.image}" alt="${a.product_info}" class="w-full h-full max-w-[380px] max-h-[380px] object-cover border border-[#c4c4c4] rounded-[10px]">
          <p class="text-[16px] text-[#767676] mt-[16px]">${a.store_name}</p>
          <h2 class="text-[18px] mt-[10px]">${a.product_name}</h2>
          <p class="text-[18px] mt-[10px]"><b class="text-[24px] font-bold">${a.price.toLocaleString()}</b> 원</p>
          </a>
        </li>
        `).join("");return e.innerHTML=`
    <ul class="products grid grid-cols-3 gap-[70px]">${n}</ul>
  `,e}async function O(){try{const e=await fetch(`${k}/products/`);if(!e.ok)throw new Error("상품 데이터를 가져오는 데 실패했습니다.");return(await e.json()).results}catch(e){return console.error(e),[]}}const k="https://openmarket.weniv.co.kr",H={home:z,login:P,cart:B,detail:N};async function C(){const e=document.getElementById("app");let s=!1,n="",a=window.location.hash.slice(1);a.includes("/")&&(n=a.split("/")[1],a=a.split("/")[0],s=!0),e.innerHTML="";try{const o=H[a]||NotFound,c=s?await o(n):await o();if(a!=="login"){const y=T();e.appendChild(y)}e.appendChild(c);const d=j();e.appendChild(d)}catch(o){console.error("페이지 렌더링 중 오류 발생:",o),e.innerHTML="<p>페이지를 로드하는 중 오류가 발생했습니다.</p>"}}function D(){window.addEventListener("hashchange",C),window.location.hash?C():window.location.hash="home"}window.addEventListener("load",D);
