import{a as d,i as b,S as I}from"./assets/vendor-DtrmOK3T.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))o(s);new MutationObserver(s=>{for(const n of s)if(n.type==="childList")for(const a of n.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&o(a)}).observe(document,{childList:!0,subtree:!0});function r(s){const n={};return s.integrity&&(n.integrity=s.integrity),s.referrerPolicy&&(n.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?n.credentials="include":s.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function o(s){if(s.ep)return;s.ep=!0;const n=r(s);fetch(s.href,n)}})();const u="https://sound-wave.b.goit.study/api";async function S(e=1,t=8){try{return(await d.get(`${u}/artists`,{params:{page:e,limit:t}})).data}catch(r){throw console.error("Error fetching artists:",r),r}}async function T(e){try{return(await d.get(`${u}/artists/${e}`)).data}catch(t){throw console.error(`Error fetching artist with ID ${e}:`,t),t}}async function Y(e){try{return(await d.get(`${u}/artists/${e}/albums`)).data}catch(t){throw console.error(`Error fetching albums for artist with ID ${e}:`,t),t}}async function D(){try{const e=await d.get(`${u}/feedbacks`);return console.log("Raw feedback response:",e.data),Array.isArray(e.data)?e.data:e.data.data&&Array.isArray(e.data.data)?e.data.data:[]}catch(e){throw console.error("Error fetching feedbacks:",e),e}}const m=document.getElementById("artist-modal"),F=m.querySelector(".modal-overlay"),N=m.querySelector(".modal-close"),y=document.getElementById("loader"),v=document.getElementById("artist-albums");let g=[];function P(e){if(!e||isNaN(e))return"-";const t=Math.floor(e/1e3),r=Math.floor(t/60),o=t%60;return`${r}:${o.toString().padStart(2,"0")}`}async function j(e){m.classList.remove("hidden"),document.body.style.overflow="hidden",y.style.display="block";try{const t=await T(e);await q(t),y.style.display="none"}catch(t){console.error(t),y.textContent="Error loading data"}}async function q(e){document.getElementById("artist-name").textContent=e.strArtist,document.getElementById("artist-image").src=e.strArtistThumb||"";const t=document.getElementById("artist-years");e.intFormedYear&&e.intDiedYear?t.textContent=`Years active: ${e.intFormedYear} – ${e.intDiedYear}`:e.intFormedYear&&!e.intDiedYear?t.textContent=`Years active: ${e.intFormedYear} – present`:t.textContent="Years active: information missing";const r=document.getElementById("artist-gender"),o=document.getElementById("artist-members");e.strArtistType==="person"?(r.textContent=`Sex: ${e.strGender||"information missing"}`,r.classList.remove("hidden"),o.classList.add("hidden")):(o.textContent=`Members: ${e.intMembers||"information missing"}`,o.classList.remove("hidden"),r.classList.add("hidden")),document.getElementById("artist-country").textContent=`Country: ${e.strCountry||"information missing"}`,document.getElementById("artist-bio").textContent=`Biography: ${e.strBiographyEN||"information missing"}`;let s="information missing";Array.isArray(e.genres)?s=e.genres.join(", "):typeof e.genres=="string"&&(s=e.genres),document.getElementById("artist-genres").textContent=`Genres: ${s}`;try{const n=await Y(e._id);v.innerHTML="",n.albumsList.forEach(a=>{const p=document.createElement("div");p.classList.add("album");const A=a.tracks||[],M=`
        <div class="album-header">
          <span>Track</span>
          <span>Time</span>
          <span></span>
        </div>
      `,x=A.map(c=>{const C=c.movie?`
              <a href="${c.movie}" target="_blank" aria-label="YouTube link" class="youtube-link">
                <svg class="icon-youtube" width="21" height="15" aria-hidden="true" focusable="false">
                  <use href="../img/sprite.svg#icon-Youtube"></use>
                </svg>
              </a>`:"";return`
            <li>
              <span>${c.strTrack}</span>
              <div class="track-meta">
                <span>${P(c.intDuration)}</span>
                ${C}
              </div>
            </li>
          `}).join("");p.innerHTML=`
        <h3>${a.strAlbum}</h3>
        ${M}
        <ul>
          ${x}
        </ul>
      `,v.appendChild(p)})}catch(n){console.error("Error loading albums:",n)}}function h(){m.classList.add("hidden"),document.body.style.overflow="",g.forEach(({el:e,event:t,handler:r})=>e.removeEventListener(t,r)),g=[]}function f(e,t,r){e.addEventListener(t,r),g.push({el:e,event:t,handler:r})}f(N,"click",h);f(F,"click",h);f(document,"keydown",e=>{e.key==="Escape"&&h()});f(document,"click",e=>{const t=e.target.closest(".artists-link");if(!t)return;e.preventDefault();const r=t.dataset.id;r&&j(r)});const H=document.querySelector(".artist-gallery"),i=document.querySelector(".artists-btn-load");let w=[],l=1;const E=8;let L=0;function O(e){return`
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
  `}function R(e){return e.map(O).join("")}async function k(e=1){try{const t=await S(e,E);if(!t.artists||t.artists.length===0){b.error({position:"topRight",message:"No more artists"}),B();return}w=[...w,...t.artists],H.insertAdjacentHTML("beforeend",R(t.artists)),L=Math.ceil(t.totalArtists/E),_()}catch(t){console.error("Error loading artists:",t),b.error({title:"Error",message:"Failed to load artists",position:"topRight",color:"red"})}}i.addEventListener("click",async()=>{l+=1,i.disabled=!0,await k(l),i.disabled=!1});function _(){l<L?G():B()}function G(){i.style.display="block"}function B(){i.style.display="none"}k(l);const $=document.querySelector(".feedback-swiper .swiper-wrapper");function V(e){return Math.round(e)}function z(e){const t=document.createElement("div");return t.classList.add("swiper-slide"),t.innerHTML=`
  <div class="feedback-rating">${"⭐".repeat(V(e.rating))}</div>
    <p class="feedback-text">${e.descr}</p>
    <div class="feedback-author">${e.name}</div>
    
  `,t}async function K(){const e=await D();console.log($),e.forEach(t=>{$.appendChild(z(t))}),new I(".feedback-swiper",{slidesPerView:1,spaceBetween:20,loop:!0,navigation:{nextEl:".swiper-button-next",prevEl:".swiper-button-prev"}})}K();
//# sourceMappingURL=index.js.map
