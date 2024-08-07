(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))s(n);new MutationObserver(n=>{for(const c of n)if(c.type==="childList")for(const i of c.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&s(i)}).observe(document,{childList:!0,subtree:!0});function l(n){const c={};return n.integrity&&(c.integrity=n.integrity),n.referrerPolicy&&(c.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?c.credentials="include":n.crossOrigin==="anonymous"?c.credentials="omit":c.credentials="same-origin",c}function s(n){if(n.ep)return;n.ep=!0;const c=l(n);fetch(n.href,c)}})();function g(){const t=document.createElement("header");t.className="shadow-lg";const r=[{href:"#cart",text:"장바구니",icon:"/src/images/icon-shopping-cart.svg"},{href:"#login",text:"로그인",icon:"/src/images/icon-user.svg"}],l=({href:n,text:c,icon:i})=>`
    <a href="${n}" class="w-[50px] pt-[32px] bg-no-repeat bg-top text-center text-[12px] text-[#767676]" style="background:url('/openmarket/${i}') no-repeat center top">
      ${c}
    </a>
  `;return t.innerHTML=`
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
        ${r.map(l).join("")}
      </nav>
    </section>
  `,t.querySelector(".search-form").addEventListener("submit",n=>{n.preventDefault();const c=t.querySelector("#search-input");console.log("검색어:",c.value)}),t}function w(){const t=document.createElement("footer");return t.innerHTML=`
        <p>&copy; 2024 Open Market</p>
      `,t}function v(){const t=document.createElement("div");t.className="flex flex-col items-center mt-[100px]";const r="w-full py-[20px] pb-[32px] bg-[#F2F2F2] border border-[#c4c4c4] rounded-[10px]",l="w-full py-5 border-b border-gray-300 text-gray-700 outline-none";t.innerHTML=`
    <a href="/">
      <h1 class="w-[238px] h-[74px] bg-[url('/src/images/Logo-hodu.png')] bg-no-repeat bg-contain text-[0px]">
        호두 오픈마켓 메인페이지
      </h1>
    </a>

    <section class="w-full max-w-[550px] mt-[70px]">
      <h2 class="sr-only">로그인 폼</h2>

      <ul class="flex text-[18px] font-medium">
        <li class="flex-1">
          <button type="button" data-type="BUYER" class="buyer tab-btn active ${r}">
            구매회원 로그인
          </button>
        </li>
        <li class="flex-1">
          <button type="button" data-type="SELLER" class="tab-btn seller ${r}">
            판매회원 로그인
          </button>
        </li>
      </ul>
      
      <form class="user-form buyer flex flex-col p-[35px] border border-gray-300 bg-white translate-y-[-20px]">
        <label for="userId" class="sr-only">아이디 입력</label>
        <input type="text" id="userId" name="userId" placeholder="아이디" class="${l}" />
        
        <label for="password" class="sr-only">비밀번호 입력</label>
        <input type="password" id="password" name="password" placeholder="비밀번호" class="${l} mb-[10px]" />
    
        <div id="loginError" class="error-message hidden text-red-500 mt-[16px]"></div>
       
        <button type="submit" class="w-full py-[19px] mt-[26px] bg-[#21BF48] text-white text-[18px] font-[700] rounded-lg hover:bg-green-600 focus:outline-none">로그인</button>
      </form>

      <div class="flex items-center justify-center text-center mt-[30px] text-[16px] text-[#333]">
        <a href="#sign-up">회원가입</a>
        <span class="inline-block w-[1px] h-[16px] bg-[#333] mx-4"></span>
        <a href="#login">비밀번호 찾기</a>
      </div>
    </section>
  `;const s=t.querySelector("button.buyer"),n=t.querySelector("button.seller"),c=t.querySelector(".user-form");let i=s,p="BUYER";const y=(d,e)=>{const o=e.getAttribute("data-type").toLowerCase(),a=d.getAttribute("data-type");e.classList.contains("active")&&e.classList.remove("active"),!d.classList.contains("active")&&d.classList.add("active"),p=a,c.classList.contains(o)&&c.classList.remove(o),!c.classList.contains(a.toLowerCase())&&c.classList.add(a.toLowerCase()),i=d};return s.addEventListener("click",d=>{y(s,i)}),n.addEventListener("click",d=>{y(n,i)}),c.addEventListener("submit",async d=>{d.preventDefault();const e=t.querySelector("#userId").value.trim(),o=t.querySelector("#password").value.trim(),a=t.querySelector("#loginError");let u="";if(e===""&&o===""?u="아이디와 비밀번호를 입력해주세요.":e===""?u="아이디를 입력해주세요.":o===""&&(u="비밀번호를 입력해주세요."),u){a.textContent=u,a.style.display="block",e===""?t.querySelector("#userId").focus():o===""&&t.querySelector("#password").focus();return}try{const m=await fetch("https://openmarket.weniv.co.kr//accounts/login/",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({username:e,password:o,login_type:p})});if(m.ok){const f=await m.json(),b={user_type:f.user_type,token:f.token,cart:[]};localStorage.setItem("userToken",JSON.stringify(b)),alert("로그인 성공!"),window.history.back(),e.value="",o.value=""}else a.textContent="아이디 또는 비밀번호가 일치하지 않습니다.",a.style.display="block",o.value="",o.focus()}catch{a.textContent="로그인 중 오류가 발생했습니다.",a.style.display="block",o.focus()}}),t}function L(){const t=document.createElement("section");t.className="max-w-[1250px] m-auto text-center";const l=[{id:1,name:"상품 1",image:"https://via.placeholder.com/100",price:1e4,quantity:1},{id:2,name:"상품 2",image:"https://via.placeholder.com/100",price:2e4,quantity:2}].map(e=>`
    <tr data-id="${e.id}" data-price="${e.price}">
      <td><input type="checkbox" class="item-checkbox"></td>
      <td><img src="${e.image}" alt="${e.name}"></td>
      <td>${e.name}</td>
      <td class="quantity-control">
        <button class="decrease-quantity">-</button>
        <span class="quantity">${e.quantity}</span>
        <button class="increase-quantity">+</button>
      </td>
      <td>      
        ${(e.price*e.quantity).toLocaleString()} 원
        <br/>
        <button class="order-item">주문하기</button>
      </td>
      <td>
        <button class="delete-item">X</button>
      </td>
    </tr>
  `).join("");t.innerHTML=`
    <h1 class="font-bold text-[36px] py-[52px]">장바구니</h1>

    <table class="w-full">
      <thead>
        <tr>
          <th><input type="checkbox" id="select-all"></th>
          <th></th>
          <th>상품정보</th>
          <th>수량</th>
          <th>상품 금액</th>
        </tr>
      </thead>
      <tbody class="cart-items">
        ${l}
      </tbody>
    </table>

    <div class="flex w-full">
      <div class="summary-item  w-full">
        <div>총 상품금액</div>
        <span id="total-price">0원</span>
      </div>
      -
      <div class="summary-item  w-full">
        <div>상품 할인</div>
        <span id="discount">0원</span>
      </div>
      +
      <div class="summary-item  w-full">
        <div>배송비</div>
        <span id="shipping-fee">0원</span>
      </div>
      <div class="summary-item total  w-full">
        <div>결제 예정 금액</div>
        <span id="final-price">0원</span>
      </div>
    </div>
    
    <button id="order-button">주문하기</button>

    <!-- 수량 변경 모달 -->
    <div id="quantity-modal" class="modal" style="display: none;">
      <div class="modal-content">
        <h2>수량 변경</h2>
        <input type="number" id="quantity-input" min="1">
        <button id="quantity-confirm">확인</button>
        <button id="quantity-cancel">취소</button>
      </div>
    </div>

    <!-- 삭제 확인 모달 -->
    <div id="delete-modal" class="modal" style="display: none;">
      <div class="modal-content">
        <h2>상품을 삭제하시겠습니까?</h2>
        <button id="delete-confirm">확인</button>
        <button id="delete-cancel">취소</button>
      </div>
    </div>
  `;const s=t.querySelector(".cart-items");let n=null;function c(e,o){const a=document.getElementById("quantity-modal"),u=document.getElementById("quantity-input");u.value=o,a.style.display="block",document.getElementById("quantity-confirm").onclick=()=>{p(e,parseInt(u.value)),a.style.display="none"},document.getElementById("quantity-cancel").onclick=()=>{a.style.display="none"}}function i(e){const o=document.getElementById("delete-modal");o.style.display="block",n=e}function p(e,o){const a=s.querySelector(`tr[data-id="${e}"]`);a.querySelector(".quantity").textContent=o,a.querySelector("td:nth-child(5)").textContent=`${(a.dataset.price*o).toLocaleString()} 원`,d()}function y(e){s.querySelector(`tr[data-id="${e}"]`).remove(),d()}function d(){const e=Array.from(s.querySelectorAll(".item-checkbox:checked")).reduce((o,a)=>{const u=a.closest("tr"),m=parseInt(u.querySelector("td:nth-child(5)").textContent.replace(/[^0-9]/g,""));return o+m},0);document.getElementById("total-price").textContent=`${e.toLocaleString()} 원`}return s.addEventListener("click",e=>{if(e.target.classList.contains("increase-quantity")){const o=e.target.closest("tr").dataset.id,a=parseInt(e.target.previousElementSibling.textContent);c(o,a)}else if(e.target.classList.contains("decrease-quantity")){const o=e.target.closest("tr").dataset.id,a=parseInt(e.target.nextElementSibling.textContent);a>1&&c(o,a)}else if(e.target.classList.contains("delete-item")){const o=e.target.closest("tr").dataset.id;i(o)}}),t.querySelector("#select-all").addEventListener("change",e=>{const o=e.target.checked;s.querySelectorAll(".item-checkbox").forEach(a=>{a.checked=o}),d()}),setTimeout(()=>{const e=document.getElementById("delete-confirm"),o=document.getElementById("delete-cancel");e&&o&&(e.onclick=()=>{n!==null&&(y(n),n=null,document.getElementById("delete-modal").style.display="none")},o.onclick=()=>{document.getElementById("delete-modal").style.display="none"})},0),t}async function q(t){try{const r=await fetch(`${x}/products/${t}/`);if(!r.ok)throw new Error("상품 상세 데이터를 가져오는 데 실패했습니다.");return await r.json()}catch(r){throw console.error(r),r}}async function E(t){const r=document.createElement("div");try{const l=await q(t);r.className="product-detail max-w-[1280px] m-auto py-[80px]",r.innerHTML=`
        <h1 class="text-[24px] font-bold mb-[20px]">${l.product_name}</h1>
        <img src="${l.image}" alt="${l.product_info}" class="w-full max-w-[600px] mb-[20px]">
        <p class="text-[18px] mb-[10px]">가격: ${l.price.toLocaleString()} 원</p>
        <p class="text-[16px] mb-[10px]">판매처: ${l.store_name}</p>
        <p class="text-[16px]">${l.product_info}</p>
      `}catch(l){console.error("상품 상세 정보를 가져오는 데 실패했습니다.",l)}return r}async function $(){const t=document.createElement("section");t.className="product-list-page max-w-[1280px] m-auto py-[80px]";const r=await I();if(r.length===0)return t.innerHTML="<p>상품이 없습니다.</p>",t;console.log(r);const l=r.map(s=>`
        <li data-product-id="${s.product_id}" class="product-item">
          <a href="/#detail/${s.product_id}">
            <image src="${s.image}" alt="${s.product_info}" class="w-full h-full max-w-[380px] max-h-[380px] object-cover border border-[#c4c4c4] rounded-[10px]">
          <p class="text-[16px] text-[#767676] mt-[16px]">${s.store_name}</p>
          <h2 class="text-[18px] mt-[10px]">${s.product_name}</h2>
          <p class="text-[18px] mt-[10px]"><b class="text-[24px] font-bold">${s.price.toLocaleString()}</b> 원</p>
          </a>
        </li>
        `).join("");return t.innerHTML=`
    <ul class="products grid grid-cols-3 gap-[70px]">${l}</ul>
  `,t}async function I(){try{const t=await fetch(`${x}/products/`);if(!t.ok)throw new Error("상품 데이터를 가져오는 데 실패했습니다.");return(await t.json()).results}catch(t){return console.error(t),[]}}const x="https://openmarket.weniv.co.kr",k={home:$,login:v,cart:L,detail:E};async function h(){const t=document.getElementById("app");let r=!1,l="",s=window.location.hash.slice(1);s.includes("/")&&(l=s.split("/")[1],s=s.split("/")[0],r=!0),console.log(s),t.innerHTML="";try{const n=k[s]||NotFound,c=r?await n(l):await n();if(console.log(n,"page"),s!=="login"){const p=g();t.appendChild(p)}t.appendChild(c);const i=w();t.appendChild(i)}catch(n){console.error("페이지 렌더링 중 오류 발생:",n),t.innerHTML="<p>페이지를 로드하는 중 오류가 발생했습니다.</p>"}}function S(){window.addEventListener("hashchange",h),window.location.hash?h():window.location.hash="home"}window.addEventListener("load",S);
