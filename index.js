import{a as m,i as v,S as T}from"./assets/vendor-DAK8oDSN.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const o of s)if(o.type==="childList")for(const a of o.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function r(s){const o={};return s.integrity&&(o.integrity=s.integrity),s.referrerPolicy&&(o.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?o.credentials="include":s.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function n(s){if(s.ep)return;s.ep=!0;const o=r(s);fetch(s.href,o)}})();const f="https://sound-wave.b.goit.study/api";async function q(e=1,t=8){try{return(await m.get(`${f}/artists`,{params:{page:e,limit:t}})).data}catch(r){throw console.error("Error fetching artists:",r),r}}async function F(e){try{return(await m.get(`${f}/artists/${e}`)).data}catch(t){throw console.error(`Error fetching artist with ID ${e}:`,t),t}}async function Y(e){try{return(await m.get(`${f}/artists/${e}/albums`)).data}catch(t){throw console.error(`Error fetching albums for artist with ID ${e}:`,t),t}}async function D(){try{const e=await m.get(`${f}/feedbacks`);return console.log("Raw feedback response:",e.data),Array.isArray(e.data)?e.data:e.data.data&&Array.isArray(e.data.data)?e.data.data:[]}catch(e){throw console.error("Error fetching feedbacks:",e),e}}const c=document.getElementById("artist-modal"),N=c.querySelector(".modal-overlay"),j=c.querySelector(".modal-close"),g=document.getElementById("loader"),E=document.getElementById("artist-albums"),H=document.querySelector(".artist-gallery");let L=[];function O(e){if(!e||isNaN(e))return"-";const t=Math.floor(e/1e3),r=Math.floor(t/60),n=t%60;return`${r}:${n.toString().padStart(2,"0")}`}async function P(e){c.classList.remove("hidden"),document.body.style.overflow="hidden",g.style.display="block";try{const t=await F(e);await _(t),g.style.display="none"}catch(t){console.error(t),g.textContent="Error loading data"}}async function _(e){document.getElementById("artist-name").textContent=e.strArtist,document.getElementById("artist-image").src=e.strArtistThumb||"";const t=document.getElementById("artist-years");e.intFormedYear&&e.intDiedYear?t.textContent=`Years active: ${e.intFormedYear} – ${e.intDiedYear}`:e.intFormedYear&&!e.intDiedYear?t.textContent=`Years active: ${e.intFormedYear} – present`:t.textContent="Years active: information missing";const r=document.getElementById("artist-gender"),n=document.getElementById("artist-members");e.strArtistType==="person"?(r.textContent=`Sex: ${e.strGender||"information missing"}`,r.classList.remove("hidden"),n.classList.add("hidden")):(n.textContent=`Members: ${e.intMembers||"information missing"}`,n.classList.remove("hidden"),r.classList.add("hidden")),document.getElementById("artist-country").textContent=`Country: ${e.strCountry||"information missing"}`,document.getElementById("artist-bio").textContent=`Biography: ${e.strBiographyEN||"information missing"}`;let s="information missing";Array.isArray(e.genres)?s=e.genres.join(", "):typeof e.genres=="string"&&(s=e.genres),document.getElementById("artist-genres").textContent=`Genres: ${s}`;try{const o=await Y(e._id);E.innerHTML="",o.albumsList.forEach(a=>{const y=document.createElement("div");y.classList.add("album");const x=a.tracks||[],M=`
        <div class="album-header">
          <span>Track</span>
          <span>Time</span>
          <span></span>
        </div>
      `,C=x.map(d=>{const I=d.movie?`
              <a href="${d.movie}" target="_blank" aria-label="YouTube link" class="youtube-link">
                <svg class="icon-youtube" width="21" height="15" aria-hidden="true" focusable="false">
                  <use href="/youtube.svg#icon-Youtube"></use>
                </svg>
              </a>`:"";return`
            <li>
              <span>${d.strTrack}</span>
              <div class="track-meta">
                <span>${O(d.intDuration)}</span>
                ${I}
              </div>
            </li>
          `}).join("");y.innerHTML=`
        <h3>${a.strAlbum}</h3>
        ${M}
        <ul>
          ${C}
        </ul>
      `,E.appendChild(y)})}catch(o){console.error("Error loading albums:",o)}}function p(){c.classList.add("hidden"),document.body.style.overflow="",L.forEach(({el:e,event:t,handler:r})=>e.removeEventListener(t,r)),L=[]}j.addEventListener("click",p);N.addEventListener("click",p);document.addEventListener("keydown",e=>{e.key==="Escape"&&p()});c.addEventListener("click",e=>{c.querySelector(".modal-content").contains(e.target)||p()});H.addEventListener("click",e=>{const t=e.target.closest(".js-learn-more");if(!t)return;e.preventDefault();const r=t.dataset.id;r&&P(r)});const R=document.querySelector(".artist-gallery"),l=document.querySelector(".artists-btn-load");let w=[],u=1;const $=8;let B=0;function G(e){return`
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
  `}function V(e){return e.map(G).join("")}async function A(e=1){try{const t=await q(e,$);if(!t.artists||t.artists.length===0){v.error({position:"topRight",message:"No more artists"}),S();return}w=[...w,...t.artists],R.insertAdjacentHTML("beforeend",V(t.artists)),B=Math.ceil(t.totalArtists/$),z()}catch(t){console.error("Error loading artists:",t),v.error({title:"Error",message:"Failed to load artists",position:"topRight",color:"red"})}}l.addEventListener("click",async()=>{u+=1,l.disabled=!0,await A(u),l.disabled=!1});function z(){u<B?K():S()}function K(){l.style.display="block"}function S(){l.style.display="none"}A(u);const k=document.querySelector(".feedback-swiper .swiper-wrapper"),h=document.querySelector(".swiper-button-next"),b=document.querySelector(".swiper-button-prev"),i=document.querySelectorAll(".custom-pagination .dot");function U(e){const t=document.createElement("div");t.classList.add("swiper-slide","feedback-card");const r=Math.round(e.rating??0);let n="";for(let s=1;s<=5;s++)n+=`<span class="star" style="color: ${s<=r?"#764191":"#ffffff"};">★</span>`;return t.innerHTML=`
    <div class="feedback-rating">${n}</div>
    <p class="feedback-text">${e.descr}</p>
    <div class="feedback-author">${e.name}</div>
  `,t}async function W(){try{const t=(await D()).slice(0,10);t.forEach(n=>k.appendChild(U(n)));const r=new T(".feedback-swiper",{slidesPerView:1,spaceBetween:20,loop:!1,navigation:{nextEl:h,prevEl:b},keyboard:{enabled:!0},on:{slideChange:function(){b.classList.toggle("swiper-button-disabled",this.isBeginning),h.classList.toggle("swiper-button-disabled",this.isEnd),i.forEach(n=>n.classList.remove("active")),this.activeIndex===0?i[0].classList.add("active"):this.activeIndex===9?i[2].classList.add("active"):i[1].classList.add("active")}}});b.classList.add("swiper-button-disabled"),t.length<=1&&h.classList.add("swiper-button-disabled"),i.forEach(n=>{n.addEventListener("click",()=>{const s=n.dataset.index;s==="first"&&r.slideTo(0),s==="middle"&&r.slideTo(1),s==="last"&&r.slideTo(9)})}),i[0].classList.add("active")}catch(e){console.error("Failed to load feedbacks:",e),k.innerHTML="<p>Failed to load feedbacks.</p>"}}W();document.addEventListener("DOMContentLoaded",()=>{const e={openBtn:document.querySelector("[data-menu-open]"),closeBtns:document.querySelectorAll("[data-menu-close]"),modal:document.querySelector("[data-menu]")};function t(){e.modal.classList.toggle("is-open"),document.body.classList.toggle("no-scroll")}e.openBtn.addEventListener("click",t),e.closeBtns.forEach(n=>{n.addEventListener("click",t)}),document.querySelectorAll("[data-menu-close-artist], [data-menu-close-aboutus], [data-menu-close-reviews]").forEach(n=>{n.addEventListener("click",t)})});
//# sourceMappingURL=index.js.map
