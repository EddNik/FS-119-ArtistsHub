import{a as d,i as E,S as Y}from"./assets/vendor-DtrmOK3T.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))a(r);new MutationObserver(r=>{for(const n of r)if(n.type==="childList")for(const o of n.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&a(o)}).observe(document,{childList:!0,subtree:!0});function s(r){const n={};return r.integrity&&(n.integrity=r.integrity),r.referrerPolicy&&(n.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?n.credentials="include":r.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function a(r){if(r.ep)return;r.ep=!0;const n=s(r);fetch(r.href,n)}})();const u="https://sound-wave.b.goit.study/api";async function q(e=1,t=8){try{return(await d.get(`${u}/artists`,{params:{page:e,limit:t}})).data}catch(s){throw console.error("Error fetching artists:",s),s}}async function D(e){try{return(await d.get(`${u}/artists/${e}`)).data}catch(t){throw console.error(`Error fetching artist with ID ${e}:`,t),t}}async function H(e){try{return(await d.get(`${u}/artists/${e}/albums`)).data}catch(t){throw console.error(`Error fetching albums for artist with ID ${e}:`,t),t}}async function N(){try{const e=await d.get(`${u}/feedbacks`);return console.log("Raw feedback response:",e.data),Array.isArray(e.data)?e.data:e.data.data&&Array.isArray(e.data.data)?e.data.data:[]}catch(e){throw console.error("Error fetching feedbacks:",e),e}}const m=document.getElementById("artist-modal"),P=m.querySelector(".modal-overlay"),j=m.querySelector(".modal-close"),y=document.getElementById("loader"),L=document.getElementById("artist-albums"),O=document.querySelector(".js-modal-backdrop");let v=[];function _(e){if(!e||isNaN(e))return"-";const t=Math.floor(e/1e3),s=Math.floor(t/60),a=t%60;return`${s}:${a.toString().padStart(2,"0")}`}async function R(e){m.classList.remove("hidden"),document.body.style.overflow="hidden",y.style.display="block";try{const t=await D(e);await G(t),y.style.display="none"}catch(t){console.error(t),y.textContent="Error loading data"}}async function G(e){document.getElementById("artist-name").textContent=e.strArtist,document.getElementById("artist-image").src=e.strArtistThumb||"";const t=document.getElementById("artist-years");e.intFormedYear&&e.intDiedYear?t.textContent=`Years active: ${e.intFormedYear} – ${e.intDiedYear}`:e.intFormedYear&&!e.intDiedYear?t.textContent=`Years active: ${e.intFormedYear} – present`:t.textContent="Years active: information missing";const s=document.getElementById("artist-gender"),a=document.getElementById("artist-members");e.strArtistType==="person"?(s.textContent=`Sex: ${e.strGender||"information missing"}`,s.classList.remove("hidden"),a.classList.add("hidden")):(a.textContent=`Members: ${e.intMembers||"information missing"}`,a.classList.remove("hidden"),s.classList.add("hidden")),document.getElementById("artist-country").textContent=`Country: ${e.strCountry||"information missing"}`,document.getElementById("artist-bio").textContent=`Biography: ${e.strBiographyEN||"information missing"}`;let r="information missing";Array.isArray(e.genres)?r=e.genres.join(", "):typeof e.genres=="string"&&(r=e.genres),document.getElementById("artist-genres").textContent=`Genres: ${r}`;try{const n=await H(e._id);L.innerHTML="",n.albumsList.forEach(o=>{const g=document.createElement("div");g.classList.add("album");const S=o.tracks||[],I=`
        <div class="album-header">
          <span>Track</span>
          <span>Time</span>
          <span></span>
        </div>
      `,T=S.map(c=>{const F=c.movie?`
              <a href="${c.movie}" target="_blank" aria-label="YouTube link" class="youtube-link">
                <svg class="icon-youtube" width="21" height="15" aria-hidden="true" focusable="false">
                  <use href="../img/sprite.svg#icon-Youtube"></use>
                </svg>
              </a>`:"";return`
            <li>
              <span>${c.strTrack}</span>
              <div class="track-meta">
                <span>${_(c.intDuration)}</span>
                ${F}
              </div>
            </li>
          `}).join("");g.innerHTML=`
        <h3>${o.strAlbum}</h3>
        ${I}
        <ul>
          ${T}
        </ul>
      `,L.appendChild(g)})}catch(n){console.error("Error loading albums:",n)}}function p(){m.classList.add("hidden"),document.body.style.overflow="",v.forEach(({el:e,event:t,handler:s})=>e.removeEventListener(t,s)),v=[]}function f(e,t,s){e.addEventListener(t,s),v.push({el:e,event:t,handler:s})}f(j,"click",p);f(P,"click",p);f(document,"keydown",e=>{e.key==="Escape"&&p()});f(document,"click",e=>{e.preventDefault();const t=e.target.closest(".artists-link");if(!t)return;const s=t.dataset.id;console.log(s),s&&R(s)});O.addEventListener("click",V);function V(e){e.target===e.currentTarget&&p()}const z=document.querySelector(".artist-gallery"),i=document.querySelector(".artists-btn-load");let $=[],l=1;const k=8;let M=0;function K(e){return`
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
  `}function U(e){return e.map(K).join("")}async function C(e=1){try{const t=await q(e,k);if(!t.artists||t.artists.length===0){E.error({position:"topRight",message:"No more artists"}),x();return}$=[...$,...t.artists],z.insertAdjacentHTML("beforeend",U(t.artists)),M=Math.ceil(t.totalArtists/k),W()}catch(t){console.error("Error loading artists:",t),E.error({title:"Error",message:"Failed to load artists",position:"topRight",color:"red"})}}i.addEventListener("click",async()=>{l+=1,i.disabled=!0,await C(l),i.disabled=!1});function W(){l<M?J():x()}function J(){i.style.display="block"}function x(){i.style.display="none"}C(l);const B=document.querySelector(".feedback-swiper .swiper-wrapper"),h=document.querySelector(".swiper-button-next"),b=document.querySelector(".swiper-button-prev"),w=document.querySelector(".swiper-pagination");function Q(e){const t=document.createElement("div");t.classList.add("swiper-slide");const s=Math.round(e.rating??0);return t.innerHTML=`
    <input type="number" class="star-rating" value="${s}" readonly>
    <p class="feedback-text">${e.descr}</p>
    <div class="feedback-author">${e.name}</div>
  `,t}async function X(){try{const t=(await N()).slice(0,10);t.forEach(a=>B.appendChild(Q(a))),w.innerHTML="";for(let a=0;a<3;a++){const r=document.createElement("span");w.appendChild(r)}const s=new Y(".feedback-swiper",{slidesPerView:1,spaceBetween:20,loop:!1,navigation:{nextEl:h,prevEl:b},keyboard:{enabled:!0},on:{slideChange:function(){b.classList.toggle("disabled",this.isBeginning),h.classList.toggle("disabled",this.isEnd),A(this.activeIndex)}}});b.classList.add("disabled"),t.length<=1&&h.classList.add("disabled"),A(s.activeIndex)}catch(e){console.error("Failed to load feedbacks:",e),B.innerHTML="<p>Failed to load feedbacks.</p>"}}function A(e){const t=w.querySelectorAll("span");t.forEach(s=>s.classList.remove("swiper-pagination-bullet-active")),e===0?t[0].classList.add("swiper-pagination-bullet-active"):e===9?t[2].classList.add("swiper-pagination-bullet-active"):t[1].classList.add("swiper-pagination-bullet-active")}X();
//# sourceMappingURL=index.js.map
