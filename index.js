import{a as u,i as b,S as I}from"./assets/vendor-DAK8oDSN.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))o(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const a of s.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&o(a)}).observe(document,{childList:!0,subtree:!0});function n(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function o(r){if(r.ep)return;r.ep=!0;const s=n(r);fetch(r.href,s)}})();const m="https://sound-wave.b.goit.study/api";async function q(e=1,t=8){try{return(await u.get(`${m}/artists`,{params:{page:e,limit:t}})).data}catch(n){throw console.error("Error fetching artists:",n),n}}async function T(e){try{return(await u.get(`${m}/artists/${e}`)).data}catch(t){throw console.error(`Error fetching artist with ID ${e}:`,t),t}}async function F(e){try{return(await u.get(`${m}/artists/${e}/albums`)).data}catch(t){throw console.error(`Error fetching albums for artist with ID ${e}:`,t),t}}async function Y(){try{const e=await u.get(`${m}/feedbacks`);return console.log("Raw feedback response:",e.data),Array.isArray(e.data)?e.data:e.data.data&&Array.isArray(e.data.data)?e.data.data:[]}catch(e){throw console.error("Error fetching feedbacks:",e),e}}const i=document.getElementById("artist-modal"),D=i.querySelector(".modal-overlay"),N=i.querySelector(".modal-close"),y=document.getElementById("loader"),v=document.getElementById("artist-albums"),j=document.querySelector(".artist-gallery");let E=[];function H(e){if(!e||isNaN(e))return"-";const t=Math.floor(e/1e3),n=Math.floor(t/60),o=t%60;return`${n}:${o.toString().padStart(2,"0")}`}async function O(e){i.classList.remove("hidden"),document.body.style.overflow="hidden",y.style.display="block";try{const t=await T(e);await P(t),y.style.display="none"}catch(t){console.error(t),y.textContent="Error loading data"}}async function P(e){document.getElementById("artist-name").textContent=e.strArtist,document.getElementById("artist-image").src=e.strArtistThumb||"";const t=document.getElementById("artist-years");e.intFormedYear&&e.intDiedYear?t.textContent=`Years active: ${e.intFormedYear} – ${e.intDiedYear}`:e.intFormedYear&&!e.intDiedYear?t.textContent=`Years active: ${e.intFormedYear} – present`:t.textContent="Years active: information missing";const n=document.getElementById("artist-gender"),o=document.getElementById("artist-members");e.strArtistType==="person"?(n.textContent=`Sex: ${e.strGender||"information missing"}`,n.classList.remove("hidden"),o.classList.add("hidden")):(o.textContent=`Members: ${e.intMembers||"information missing"}`,o.classList.remove("hidden"),n.classList.add("hidden")),document.getElementById("artist-country").textContent=`Country: ${e.strCountry||"information missing"}`,document.getElementById("artist-bio").textContent=`Biography: ${e.strBiographyEN||"information missing"}`;let r="information missing";Array.isArray(e.genres)?r=e.genres.join(", "):typeof e.genres=="string"&&(r=e.genres),document.getElementById("artist-genres").textContent=`Genres: ${r}`;try{const s=await F(e._id);v.innerHTML="",s.albumsList.forEach(a=>{const f=document.createElement("div");f.classList.add("album");const M=a.tracks||[],S=`
        <div class="album-header">
          <span>Track</span>
          <span>Time</span>
          <span></span>
        </div>
      `,x=M.map(l=>{const C=l.movie?`
              <a href="${l.movie}" target="_blank" aria-label="YouTube link" class="youtube-link">
                <svg class="icon-youtube" width="21" height="15" aria-hidden="true" focusable="false">
                  <use href="/img/sprite.svg#icon-Youtube"></use>
                </svg>
              </a>`:"";return`
            <li>
              <span>${l.strTrack}</span>
              <div class="track-meta">
                <span>${H(l.intDuration)}</span>
                ${C}
              </div>
            </li>
          `}).join("");f.innerHTML=`
        <h3>${a.strAlbum}</h3>
        ${S}
        <ul>
          ${x}
        </ul>
      `,v.appendChild(f)})}catch(s){console.error("Error loading albums:",s)}}function p(){i.classList.add("hidden"),document.body.style.overflow="",E.forEach(({el:e,event:t,handler:n})=>e.removeEventListener(t,n)),E=[]}N.addEventListener("click",p);D.addEventListener("click",p);document.addEventListener("keydown",e=>{e.key==="Escape"&&p()});i.addEventListener("click",e=>{i.querySelector(".modal-content").contains(e.target)||p()});j.addEventListener("click",e=>{const t=e.target.closest(".js-learn-more");if(!t)return;e.preventDefault();const n=t.dataset.id;n&&O(n)});const _=document.querySelector(".artist-gallery"),c=document.querySelector(".artists-btn-load");let w=[],d=1;const L=8;let k=0;function R(e){return`
    <li class="artist-card">
      <img src="${e.strArtistThumb}" alt="${e.strArtist}">
      <ul class="artist-genres">
        ${e.genres.map(t=>`<li class="genre-item">${t}</li>`).join("")}
      </ul>
      <div class="artist-container-info">
      <h3 class="artists-name">${e.strArtist}</h3>
      <p class="artists-info">${e.strBiographyEN.substring(0,100)}...</p>
      </div>
      <a href="./modal.html?id=${e._id}"
         class="link artists-link js-learn-more"
         data-id="${e._id}">
        Learn more<span class="artists-arrow">▶</span>
      </a>
    </li>
  `}function G(e){return e.map(R).join("")}async function B(e=1){try{const t=await q(e,L);if(!t.artists||t.artists.length===0){b.error({position:"topRight",message:"No more artists"}),A();return}w=[...w,...t.artists],_.insertAdjacentHTML("beforeend",G(t.artists)),k=Math.ceil(t.totalArtists/L),V()}catch(t){console.error("Error loading artists:",t),b.error({title:"Error",message:"Failed to load artists",position:"topRight",color:"red"})}}c.addEventListener("click",async()=>{d+=1,c.disabled=!0,await B(d),c.disabled=!1});function V(){d<k?z():A()}function z(){c.style.display="block"}function A(){c.style.display="none"}B(d);const $=document.querySelector(".feedback-swiper .swiper-wrapper"),g=document.querySelector(".swiper-button-next"),h=document.querySelector(".swiper-button-prev"),K=document.querySelector(".swiper-pagination");function U(e){const t=document.createElement("div");t.classList.add("swiper-slide","feedback-card");const n=Math.round(e.rating??0);let o="";for(let r=1;r<=5;r++)o+=`<span class="star" style="color: ${r<=n?"#764191":"transparent"};">★</span>`;return t.innerHTML=`
    <div class="feedback-rating">${o}</div>
    <p class="feedback-text">${e.descr}</p>
    <div class="feedback-author">${e.name}</div>
  `,t}async function W(){try{const t=(await Y()).slice(0,10);t.forEach(o=>$.appendChild(U(o)));const n=new I(".feedback-swiper",{slidesPerView:1,spaceBetween:20,loop:!1,navigation:{nextEl:g,prevEl:h},pagination:{el:K,clickable:!0,renderBullet:function(o,r){return`<span class="${r}"></span>`}},keyboard:{enabled:!0},on:{slideChange:function(){h.classList.toggle("swiper-button-disabled",this.isBeginning),g.classList.toggle("swiper-button-disabled",this.isEnd)}}});h.classList.add("swiper-button-disabled"),t.length<=1&&g.classList.add("swiper-button-disabled")}catch(e){console.error("Failed to load feedbacks:",e),$.innerHTML="<p>Failed to load feedbacks.</p>"}}W();document.addEventListener("DOMContentLoaded",()=>{const e={openBtn:document.querySelector("[data-menu-open]"),closeBtns:document.querySelectorAll("[data-menu-close]"),modal:document.querySelector("[data-menu]")};function t(){e.modal.classList.toggle("is-open"),document.body.classList.toggle("no-scroll")}e.openBtn.addEventListener("click",t),e.closeBtns.forEach(n=>{n.addEventListener("click",t)})});
//# sourceMappingURL=index.js.map
