import{a as u,i as b,S as I}from"./assets/vendor-DAK8oDSN.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))a(r);new MutationObserver(r=>{for(const n of r)if(n.type==="childList")for(const o of n.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&a(o)}).observe(document,{childList:!0,subtree:!0});function s(r){const n={};return r.integrity&&(n.integrity=r.integrity),r.referrerPolicy&&(n.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?n.credentials="include":r.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function a(r){if(r.ep)return;r.ep=!0;const n=s(r);fetch(r.href,n)}})();const m="https://sound-wave.b.goit.study/api";async function T(e=1,t=8){try{return(await u.get(`${m}/artists`,{params:{page:e,limit:t}})).data}catch(s){throw console.error("Error fetching artists:",s),s}}async function F(e){try{return(await u.get(`${m}/artists/${e}`)).data}catch(t){throw console.error(`Error fetching artist with ID ${e}:`,t),t}}async function Y(e){try{return(await u.get(`${m}/artists/${e}/albums`)).data}catch(t){throw console.error(`Error fetching albums for artist with ID ${e}:`,t),t}}async function q(){try{const e=await u.get(`${m}/feedbacks`);return console.log("Raw feedback response:",e.data),Array.isArray(e.data)?e.data:e.data.data&&Array.isArray(e.data.data)?e.data.data:[]}catch(e){throw console.error("Error fetching feedbacks:",e),e}}const i=document.getElementById("artist-modal"),D=i.querySelector(".modal-overlay"),N=i.querySelector(".modal-close"),y=document.getElementById("loader"),v=document.getElementById("artist-albums"),j=document.querySelector(".artist-gallery");let w=[];function H(e){if(!e||isNaN(e))return"-";const t=Math.floor(e/1e3),s=Math.floor(t/60),a=t%60;return`${s}:${a.toString().padStart(2,"0")}`}async function P(e){i.classList.remove("hidden"),document.body.style.overflow="hidden",y.style.display="block";try{const t=await F(e);await O(t),y.style.display="none"}catch(t){console.error(t),y.textContent="Error loading data"}}async function O(e){document.getElementById("artist-name").textContent=e.strArtist,document.getElementById("artist-image").src=e.strArtistThumb||"";const t=document.getElementById("artist-years");e.intFormedYear&&e.intDiedYear?t.textContent=`Years active: ${e.intFormedYear} – ${e.intDiedYear}`:e.intFormedYear&&!e.intDiedYear?t.textContent=`Years active: ${e.intFormedYear} – present`:t.textContent="Years active: information missing";const s=document.getElementById("artist-gender"),a=document.getElementById("artist-members");e.strArtistType==="person"?(s.textContent=`Sex: ${e.strGender||"information missing"}`,s.classList.remove("hidden"),a.classList.add("hidden")):(a.textContent=`Members: ${e.intMembers||"information missing"}`,a.classList.remove("hidden"),s.classList.add("hidden")),document.getElementById("artist-country").textContent=`Country: ${e.strCountry||"information missing"}`,document.getElementById("artist-bio").textContent=`Biography: ${e.strBiographyEN||"information missing"}`;let r="information missing";Array.isArray(e.genres)?r=e.genres.join(", "):typeof e.genres=="string"&&(r=e.genres),document.getElementById("artist-genres").textContent=`Genres: ${r}`;try{const n=await Y(e._id);v.innerHTML="",n.albumsList.forEach(o=>{const f=document.createElement("div");f.classList.add("album");const M=o.tracks||[],x=`
        <div class="album-header">
          <span>Track</span>
          <span>Time</span>
          <span></span>
        </div>
      `,S=M.map(l=>{const C=l.movie?`
              <a href="${l.movie}" target="_blank" aria-label="YouTube link" class="youtube-link">
                <svg class="icon-youtube" width="21" height="15" aria-hidden="true" focusable="false">
                  <use href="/src/img/sprite.svg#icon-Youtube"></use>
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
        <h3>${o.strAlbum}</h3>
        ${x}
        <ul>
          ${S}
        </ul>
      `,v.appendChild(f)})}catch(n){console.error("Error loading albums:",n)}}function p(){i.classList.add("hidden"),document.body.style.overflow="",w.forEach(({el:e,event:t,handler:s})=>e.removeEventListener(t,s)),w=[]}N.addEventListener("click",p);D.addEventListener("click",p);document.addEventListener("keydown",e=>{e.key==="Escape"&&p()});i.addEventListener("click",e=>{i.querySelector(".modal-content").contains(e.target)||p()});j.addEventListener("click",e=>{const t=e.target.closest(".js-learn-more");if(!t)return;e.preventDefault();const s=t.dataset.id;s&&P(s)});const _=document.querySelector(".artist-gallery"),c=document.querySelector(".artists-btn-load");let E=[],d=1;const $=8;let k=0;function R(e){return`
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
  `}function G(e){return e.map(R).join("")}async function B(e=1){try{const t=await T(e,$);if(!t.artists||t.artists.length===0){b.error({position:"topRight",message:"No more artists"}),A();return}E=[...E,...t.artists],_.insertAdjacentHTML("beforeend",G(t.artists)),k=Math.ceil(t.totalArtists/$),V()}catch(t){console.error("Error loading artists:",t),b.error({title:"Error",message:"Failed to load artists",position:"topRight",color:"red"})}}c.addEventListener("click",async()=>{d+=1,c.disabled=!0,await B(d),c.disabled=!1});function V(){d<k?z():A()}function z(){c.style.display="block"}function A(){c.style.display="none"}B(d);const L=document.querySelector(".feedback-swiper .swiper-wrapper"),g=document.querySelector(".swiper-button-next"),h=document.querySelector(".swiper-button-prev"),K=document.querySelector(".swiper-pagination");function U(e){const t=document.createElement("div");t.classList.add("swiper-slide","feedback-card");const s=Math.round(e.rating??0);let a="";for(let r=1;r<=5;r++)a+=`<span class="star" style="color: ${r<=s?"#764191":"transparent"};">★</span>`;return t.innerHTML=`
    <div class="feedback-rating">${a}</div>
    <p class="feedback-text">${e.descr}</p>
    <div class="feedback-author">${e.name}</div>
  `,t}async function W(){try{const t=(await q()).slice(0,10);t.forEach(a=>L.appendChild(U(a)));const s=new I(".feedback-swiper",{slidesPerView:1,spaceBetween:20,loop:!1,navigation:{nextEl:g,prevEl:h},pagination:{el:K,clickable:!0,renderBullet:function(a,r){return`<span class="${r}"></span>`}},keyboard:{enabled:!0},on:{slideChange:function(){h.classList.toggle("swiper-button-disabled",this.isBeginning),g.classList.toggle("swiper-button-disabled",this.isEnd)}}});h.classList.add("swiper-button-disabled"),t.length<=1&&g.classList.add("swiper-button-disabled")}catch(e){console.error("Failed to load feedbacks:",e),L.innerHTML="<p>Failed to load feedbacks.</p>"}}W();
//# sourceMappingURL=index.js.map
