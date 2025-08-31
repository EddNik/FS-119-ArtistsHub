import{a as d,i as E,S as x}from"./assets/vendor-DtrmOK3T.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))a(r);new MutationObserver(r=>{for(const n of r)if(n.type==="childList")for(const o of n.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&a(o)}).observe(document,{childList:!0,subtree:!0});function s(r){const n={};return r.integrity&&(n.integrity=r.integrity),r.referrerPolicy&&(n.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?n.credentials="include":r.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function a(r){if(r.ep)return;r.ep=!0;const n=s(r);fetch(r.href,n)}})();const u="https://sound-wave.b.goit.study/api";async function C(e=1,t=8){try{return(await d.get(`${u}/artists`,{params:{page:e,limit:t}})).data}catch(s){throw console.error("Error fetching artists:",s),s}}async function M(e){try{return(await d.get(`${u}/artists/${e}`)).data}catch(t){throw console.error(`Error fetching artist with ID ${e}:`,t),t}}async function I(e){try{return(await d.get(`${u}/artists/${e}/albums`)).data}catch(t){throw console.error(`Error fetching albums for artist with ID ${e}:`,t),t}}async function T(){try{const e=await d.get(`${u}/feedbacks`);return console.log("Raw feedback response:",e.data),Array.isArray(e.data)?e.data:e.data.data&&Array.isArray(e.data.data)?e.data.data:[]}catch(e){throw console.error("Error fetching feedbacks:",e),e}}const m=document.getElementById("artist-modal"),S=m.querySelector(".modal-overlay"),Y=m.querySelector(".modal-close"),y=document.getElementById("loader"),w=document.getElementById("artist-albums");let g=[];async function F(e){m.classList.remove("hidden"),document.body.style.overflow="hidden",y.style.display="block";try{const t=await M(e);await D(t),y.style.display="none"}catch(t){console.error(t),y.textContent="Error loading data"}}async function D(e){var r;document.getElementById("artist-name").textContent=e.strArtist,document.getElementById("artist-image").src=e.strArtistThumb||"";const t=document.getElementById("artist-years");e.intFormedYear&&e.intDiedYear?t.textContent=`Years active: ${e.intFormedYear} – ${e.intDiedYear}`:e.intFormedYear&&!e.intDiedYear?t.textContent=`Years active: ${e.intFormedYear} – present`:t.textContent="Years active: information missing";const s=document.getElementById("artist-gender"),a=document.getElementById("artist-members");e.strArtistType==="person"?(s.textContent=`Sex: ${e.strGender||"information missing"}`,s.classList.remove("hidden"),a.classList.add("hidden")):(a.textContent=`Members: ${e.intMembers||"information missing"}`,a.classList.remove("hidden"),s.classList.add("hidden")),document.getElementById("artist-country").textContent=`Country: ${e.strCountry||"information missing"}`,document.getElementById("artist-bio").textContent=`Biography: ${e.strBiographyEN||"information missing"}`,document.getElementById("artist-genres").textContent=`Genres: ${((r=e.genres)==null?void 0:r.join(", "))||"information missing"}`;try{const n=await I(e._id);w.innerHTML="",n.forEach(o=>{var b;const p=document.createElement("div");p.classList.add("album");const A=o.tracks||((b=o.albumsList)==null?void 0:b.tracks)||[];p.innerHTML=`
        <h3>${o.strAlbum}</h3>
        <ul>
          <li class="album-header">
            <span>Track</span>
            <span>Time</span>
            <span></span>
          </li>
          ${A.map(c=>`
            <li>
              <span>${c.strTrack}</span>
              <span>${c.intDuration||"-"}</span>
              ${c.movie?`<a href="${c.movie}" target="_blank" aria-label="YouTube link">▶</a>`:""}
            </li>
          `).join("")}
        </ul>`,w.appendChild(p)})}catch(n){console.error("Error loading albums:",n)}}function h(){m.classList.add("hidden"),document.body.style.overflow="",g.forEach(({el:e,event:t,handler:s})=>e.removeEventListener(t,s)),g=[]}function f(e,t,s){e.addEventListener(t,s),g.push({el:e,event:t,handler:s})}f(Y,"click",h);f(S,"click",h);f(document,"keydown",e=>{e.key==="Escape"&&h()});f(document,"click",e=>{const t=e.target.closest(".artists-link");if(!t)return;e.preventDefault();const s=t.dataset.id;s&&F(s)});const P=document.querySelector(".artist-gallery"),i=document.querySelector(".artists-btn-load");let v=[],l=1;const $=8;let L=0;function j(e){return`
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
          <use href="../img/artists-svg/artists.svg#icon-caret-right"></use>
        </svg>
      </a>
    </li>
  `}function q(e){return e.map(j).join("")}async function B(e=1){try{const t=await C(e,$);if(!t.artists||t.artists.length===0){E.error({position:"topRight",message:"No more artists"}),k();return}v=[...v,...t.artists],P.insertAdjacentHTML("beforeend",q(t.artists)),L=Math.ceil(t.totalArtists/$),N()}catch(t){console.error("Error loading artists:",t),E.error({title:"Error",message:"Failed to load artists",position:"topRight",color:"red"})}}i.addEventListener("click",async()=>{l+=1,i.disabled=!0,await B(l),i.disabled=!1});function N(){l<L?O():k()}function O(){i.style.display="block"}function k(){i.style.display="none"}B(l);const R=document.querySelector(".feedback-swiper .swiper-wrapper");function _(e){return Math.round(e)}function H(e){const t=document.createElement("div");return t.classList.add("swiper-slide"),t.innerHTML=`
    <p class="feedback-text">${e.text}</p>
    <div class="feedback-author">${e.author}</div>
    <div class="feedback-rating">${"⭐".repeat(_(e.rating))}</div>
  `,t}async function G(){(await T()).forEach(t=>{R.appendChild(H(t))}),new x(".feedback-swiper",{slidesPerView:1,spaceBetween:20,loop:!0,navigation:{nextEl:".swiper-button-next",prevEl:".swiper-button-prev"}})}G();
//# sourceMappingURL=index.js.map
