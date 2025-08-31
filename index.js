import{a as d,i as E,S as M}from"./assets/vendor-DtrmOK3T.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))a(r);new MutationObserver(r=>{for(const n of r)if(n.type==="childList")for(const o of n.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&a(o)}).observe(document,{childList:!0,subtree:!0});function s(r){const n={};return r.integrity&&(n.integrity=r.integrity),r.referrerPolicy&&(n.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?n.credentials="include":r.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function a(r){if(r.ep)return;r.ep=!0;const n=s(r);fetch(r.href,n)}})();const u="https://sound-wave.b.goit.study/api";async function x(e=1,t=8){try{return(await d.get(`${u}/artists`,{params:{page:e,limit:t}})).data}catch(s){throw console.error("Error fetching artists:",s),s}}async function I(e){try{return(await d.get(`${u}/artists/${e}`)).data}catch(t){throw console.error(`Error fetching artist with ID ${e}:`,t),t}}async function T(e){try{return(await d.get(`${u}/artists/${e}/albums`)).data}catch(t){throw console.error(`Error fetching albums for artist with ID ${e}:`,t),t}}async function S(){try{const e=await d.get(`${u}/feedbacks`);return console.log("Raw feedback response:",e.data),Array.isArray(e.data)?e.data:e.data.data&&Array.isArray(e.data.data)?e.data.data:[]}catch(e){throw console.error("Error fetching feedbacks:",e),e}}const m=document.getElementById("artist-modal"),Y=m.querySelector(".modal-overlay"),F=m.querySelector(".modal-close"),y=document.getElementById("loader"),w=document.getElementById("artist-albums");let g=[];async function D(e){m.classList.remove("hidden"),document.body.style.overflow="hidden",y.style.display="block";try{const t=await I(e);await P(t),y.style.display="none"}catch(t){console.error(t),y.textContent="Error loading data"}}async function P(e){var r;document.getElementById("artist-name").textContent=e.strArtist,document.getElementById("artist-image").src=e.strArtistThumb||"";const t=document.getElementById("artist-years");e.intFormedYear&&e.intDiedYear?t.textContent=`Years active: ${e.intFormedYear} – ${e.intDiedYear}`:e.intFormedYear&&!e.intDiedYear?t.textContent=`Years active: ${e.intFormedYear} – present`:t.textContent="Years active: information missing";const s=document.getElementById("artist-gender"),a=document.getElementById("artist-members");e.strArtistType==="person"?(s.textContent=`Sex: ${e.strGender||"information missing"}`,s.classList.remove("hidden"),a.classList.add("hidden")):(a.textContent=`Members: ${e.intMembers||"information missing"}`,a.classList.remove("hidden"),s.classList.add("hidden")),document.getElementById("artist-country").textContent=`Country: ${e.strCountry||"information missing"}`,document.getElementById("artist-bio").textContent=`Biography: ${e.strBiographyEN||"information missing"}`,document.getElementById("artist-genres").textContent=`Genres: ${((r=e.genres)==null?void 0:r.join(", "))||"information missing"}`;try{const n=await T(e._id);w.innerHTML="",n.forEach(o=>{var b;const p=document.createElement("div");p.classList.add("album");const C=o.tracks||((b=o.albumsList)==null?void 0:b.tracks)||[];p.innerHTML=`
        <h3>${o.strAlbum}</h3>
        <ul>
          <li class="album-header">
            <span>Track</span>
            <span>Time</span>
            <span></span>
          </li>
          ${C.map(c=>`
            <li>
              <span>${c.strTrack}</span>
              <span>${c.intDuration||"-"}</span>
              ${c.movie?`<a href="${c.movie}" target="_blank" aria-label="YouTube link">▶</a>`:""}
            </li>
          `).join("")}
        </ul>`,w.appendChild(p)})}catch(n){console.error("Error loading albums:",n)}}function h(){m.classList.add("hidden"),document.body.style.overflow="",g.forEach(({el:e,event:t,handler:s})=>e.removeEventListener(t,s)),g=[]}function f(e,t,s){e.addEventListener(t,s),g.push({el:e,event:t,handler:s})}f(F,"click",h);f(Y,"click",h);f(document,"keydown",e=>{e.key==="Escape"&&h()});f(document,"click",e=>{const t=e.target.closest(".artists-link");if(!t)return;e.preventDefault();const s=t.dataset.id;s&&D(s)});const j=document.querySelector(".artist-gallery"),i=document.querySelector(".artists-btn-load");let v=[],l=1;const $=8;let B=0;function q(e){return`
    <li class="artist-card">
      <img src="${e.strArtistThumb}" alt="${e.strArtist}">
      <ul class="artist-genres">
        ${e.genres.map(t=>`<li class="genre-item">${t}</li>`).join("")}
      </ul>
      <div class="artist-container-info">
      <h3 class="artists-name">${e.strArtist}</h3>
      <p class="artist-info">${e.strBiographyEN.substring(0,100)}...</p>
      </div>
      <a href="./modal.html?id=${e._id}"
         class="link artists-link js-learn-more"
         data-id="${e._id}">
        Learn more
        <svg class="icon" width="24" height="24">
          <use href="img/artists-svg/artists.svg#icon-caret-right"></use>
        </svg>
      </a>
    </li>
  `}function N(e){return e.map(q).join("")}async function k(e=1){try{const t=await x(e,$);if(!t.artists||t.artists.length===0){E.error({position:"topRight",message:"No more artists"}),A();return}v=[...v,...t.artists],j.insertAdjacentHTML("beforeend",N(t.artists)),B=Math.ceil(t.totalArtists/$),O()}catch(t){console.error("Error loading artists:",t),E.error({title:"Error",message:"Failed to load artists",position:"topRight",color:"red"})}}i.addEventListener("click",async()=>{l+=1,i.disabled=!0,await k(l),i.disabled=!1});function O(){l<B?R():A()}function R(){i.style.display="block"}function A(){i.style.display="none"}k(l);const L=document.querySelector(".feedback-swiper .swiper-wrapper");function _(e){return Math.round(e)}function H(e){const t=document.createElement("div");return t.classList.add("swiper-slide"),t.innerHTML=`
  <div class="feedback-rating">${"⭐".repeat(_(e.rating))}</div>
    <p class="feedback-text">${e.descr}</p>
    <div class="feedback-author">${e.name}</div>
    
  `,t}async function G(){const e=await S();console.log(L),e.forEach(t=>{L.appendChild(H(t))}),new M(".feedback-swiper",{slidesPerView:1,spaceBetween:20,loop:!0,navigation:{nextEl:".swiper-button-next",prevEl:".swiper-button-prev"}})}G();
//# sourceMappingURL=index.js.map
