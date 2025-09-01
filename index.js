import{a as m,i as v,S as T}from"./assets/vendor-DCcQGXNB.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))o(r);new MutationObserver(r=>{for(const n of r)if(n.type==="childList")for(const a of n.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&o(a)}).observe(document,{childList:!0,subtree:!0});function s(r){const n={};return r.integrity&&(n.integrity=r.integrity),r.referrerPolicy&&(n.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?n.credentials="include":r.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function o(r){if(r.ep)return;r.ep=!0;const n=s(r);fetch(r.href,n)}})();const p="https://sound-wave.b.goit.study/api";async function F(e=1,t=8){try{return(await m.get(`${p}/artists`,{params:{page:e,limit:t}})).data}catch(s){throw console.error("Error fetching artists:",s),s}}async function Y(e){try{return(await m.get(`${p}/artists/${e}`)).data}catch(t){throw console.error(`Error fetching artist with ID ${e}:`,t),t}}async function q(e){try{return(await m.get(`${p}/artists/${e}/albums`)).data}catch(t){throw console.error(`Error fetching albums for artist with ID ${e}:`,t),t}}async function D(){try{const e=await m.get(`${p}/feedbacks`);return console.log("Raw feedback response:",e.data),Array.isArray(e.data)?e.data:e.data.data&&Array.isArray(e.data.data)?e.data.data:[]}catch(e){throw console.error("Error fetching feedbacks:",e),e}}const i=document.getElementById("artist-modal"),N=i.querySelector(".modal-overlay"),H=i.querySelector(".modal-close"),g=document.getElementById("loader"),E=document.getElementById("artist-albums");let w=[];function P(e){if(!e||isNaN(e))return"-";const t=Math.floor(e/1e3),s=Math.floor(t/60),o=t%60;return`${s}:${o.toString().padStart(2,"0")}`}async function j(e){i.classList.remove("hidden"),document.body.style.overflow="hidden",g.style.display="block";try{const t=await Y(e);await O(t),g.style.display="none"}catch(t){console.error(t),g.textContent="Error loading data"}}async function O(e){document.getElementById("artist-name").textContent=e.strArtist,document.getElementById("artist-image").src=e.strArtistThumb||"";const t=document.getElementById("artist-years");e.intFormedYear&&e.intDiedYear?t.textContent=`Years active: ${e.intFormedYear} – ${e.intDiedYear}`:e.intFormedYear&&!e.intDiedYear?t.textContent=`Years active: ${e.intFormedYear} – present`:t.textContent="Years active: information missing";const s=document.getElementById("artist-gender"),o=document.getElementById("artist-members");e.strArtistType==="person"?(s.textContent=`Sex: ${e.strGender||"information missing"}`,s.classList.remove("hidden"),o.classList.add("hidden")):(o.textContent=`Members: ${e.intMembers||"information missing"}`,o.classList.remove("hidden"),s.classList.add("hidden")),document.getElementById("artist-country").textContent=`Country: ${e.strCountry||"information missing"}`,document.getElementById("artist-bio").textContent=`Biography: ${e.strBiographyEN||"information missing"}`;let r="information missing";Array.isArray(e.genres)?r=e.genres.join(", "):typeof e.genres=="string"&&(r=e.genres),document.getElementById("artist-genres").textContent=`Genres: ${r}`;try{const n=await q(e._id);E.innerHTML="",n.albumsList.forEach(a=>{const y=document.createElement("div");y.classList.add("album");const x=a.tracks||[],C=`
        <div class="album-header">
          <span>Track</span>
          <span>Time</span>
          <span></span>
        </div>
      `,S=x.map(d=>{const I=d.movie?`
              <a href="${d.movie}" target="_blank" aria-label="YouTube link" class="youtube-link">
                <svg class="icon-youtube" width="21" height="15" aria-hidden="true" focusable="false">
                  <use href="../img/sprite.svg#icon-Youtube"></use>
                </svg>
              </a>`:"";return`
            <li>
              <span>${d.strTrack}</span>
              <div class="track-meta">
                <span>${P(d.intDuration)}</span>
                ${I}
              </div>
            </li>
          `}).join("");y.innerHTML=`
        <h3>${a.strAlbum}</h3>
        ${C}
        <ul>
          ${S}
        </ul>
      `,E.appendChild(y)})}catch(n){console.error("Error loading albums:",n)}}function f(){i.classList.add("hidden"),document.body.style.overflow="",w.forEach(({el:e,event:t,handler:s})=>e.removeEventListener(t,s)),w=[]}function l(e,t,s){e.addEventListener(t,s),w.push({el:e,event:t,handler:s})}l(H,"click",f);l(N,"click",f);l(document,"keydown",e=>{e.key==="Escape"&&f()});l(i,"click",e=>{i.querySelector(".modal-content").contains(e.target)||f()});l(document,"click",e=>{const t=e.target.closest(".artists-link");if(!t)return;e.preventDefault();const s=t.dataset.id;s&&j(s)});const _=document.querySelector(".artist-gallery"),c=document.querySelector(".artists-btn-load");let $=[],u=1;const k=8;let B=0;function R(e){return`
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
  `}function G(e){return e.map(R).join("")}async function A(e=1){try{const t=await F(e,k);if(!t.artists||t.artists.length===0){v.error({position:"topRight",message:"No more artists"}),M();return}$=[...$,...t.artists],_.insertAdjacentHTML("beforeend",G(t.artists)),B=Math.ceil(t.totalArtists/k),V()}catch(t){console.error("Error loading artists:",t),v.error({title:"Error",message:"Failed to load artists",position:"topRight",color:"red"})}}c.addEventListener("click",async()=>{u+=1,c.disabled=!0,await A(u),c.disabled=!1});function V(){u<B?z():M()}function z(){c.style.display="block"}function M(){c.style.display="none"}A(u);const L=document.querySelector(".feedback-swiper .swiper-wrapper"),h=document.querySelector(".swiper-button-next"),b=document.querySelector(".swiper-button-prev"),K=document.querySelector(".swiper-pagination");function U(e){const t=document.createElement("div");t.classList.add("swiper-slide","feedback-card");const s=Math.round(e.rating??0);let o="";for(let r=1;r<=5;r++)o+=`<span class="star" style="color: ${r<=s?"#764191":"transparent"};">★</span>`;return t.innerHTML=`
    <div class="feedback-rating">${o}</div>
    <p class="feedback-text">${e.descr}</p>
    <div class="feedback-author">${e.name}</div>
  `,t}async function W(){try{const t=(await D()).slice(0,10);t.forEach(o=>L.appendChild(U(o)));const s=new T(".feedback-swiper",{slidesPerView:1,spaceBetween:20,loop:!1,navigation:{nextEl:h,prevEl:b},pagination:{el:K,clickable:!0,renderBullet:function(o,r){return`<span class="${r}"></span>`}},keyboard:{enabled:!0},on:{slideChange:function(){b.classList.toggle("swiper-button-disabled",this.isBeginning),h.classList.toggle("swiper-button-disabled",this.isEnd)}}});b.classList.add("swiper-button-disabled"),t.length<=1&&h.classList.add("swiper-button-disabled")}catch(e){console.error("Failed to load feedbacks:",e),L.innerHTML="<p>Failed to load feedbacks.</p>"}}W();
//# sourceMappingURL=index.js.map
