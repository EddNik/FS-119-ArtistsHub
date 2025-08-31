import{a as g,i as E}from"./assets/vendor-CM57OJEz.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))i(r);new MutationObserver(r=>{for(const n of r)if(n.type==="childList")for(const o of n.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&i(o)}).observe(document,{childList:!0,subtree:!0});function s(r){const n={};return r.integrity&&(n.integrity=r.integrity),r.referrerPolicy&&(n.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?n.credentials="include":r.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function i(r){if(r.ep)return;r.ep=!0;const n=s(r);fetch(r.href,n)}})();const p="https://sound-wave.b.goit.study/api";async function C(e=1,t=8){try{return(await g.get(`${p}/artists`,{params:{page:e,limit:t}})).data}catch(s){throw console.error("Error fetching artists:",s),s}}async function M(e){try{return(await g.get(`${p}/artists/${e}`)).data}catch(t){throw console.error(`Error fetching artist with ID ${e}:`,t),t}}async function x(e){try{return(await g.get(`${p}/artists/${e}/albums`)).data}catch(t){throw console.error(`Error fetching albums for artist with ID ${e}:`,t),t}}const d=document.getElementById("artist-modal"),k=d.querySelector(".modal-overlay"),T=d.querySelector(".modal-close"),f=document.getElementById("loader"),$=document.getElementById("artist-albums");let y=[];async function Y(e){d.classList.remove("hidden"),document.body.style.overflow="hidden",f.style.display="block";try{const t=await M(e);await D(t),f.style.display="none"}catch(t){console.error(t),f.textContent="Error loading data"}}async function D(e){var r;document.getElementById("artist-name").textContent=e.strArtist,document.getElementById("artist-image").src=e.strArtistThumb||"";const t=document.getElementById("artist-years");e.intFormedYear&&e.intDiedYear?t.textContent=`Years active: ${e.intFormedYear} – ${e.intDiedYear}`:e.intFormedYear&&!e.intDiedYear?t.textContent=`Years active: ${e.intFormedYear} – present`:t.textContent="Years active: information missing";const s=document.getElementById("artist-gender"),i=document.getElementById("artist-members");e.strArtistType==="person"?(s.textContent=`Sex: ${e.strGender||"information missing"}`,s.classList.remove("hidden"),i.classList.add("hidden")):(i.textContent=`Members: ${e.intMembers||"information missing"}`,i.classList.remove("hidden"),s.classList.add("hidden")),document.getElementById("artist-country").textContent=`Country: ${e.strCountry||"information missing"}`,document.getElementById("artist-bio").textContent=`Biography: ${e.strBiographyEN||"information missing"}`,document.getElementById("artist-genres").textContent=`Genres: ${((r=e.genres)==null?void 0:r.join(", "))||"information missing"}`;try{const n=await x(e._id);$.innerHTML="",n.forEach(o=>{var b;const u=document.createElement("div");u.classList.add("album");const I=o.tracks||((b=o.albumsList)==null?void 0:b.tracks)||[];u.innerHTML=`
        <h3>${o.strAlbum}</h3>
        <ul>
          <li class="album-header">
            <span>Track</span>
            <span>Time</span>
            <span></span>
          </li>
          ${I.map(c=>`
            <li>
              <span>${c.strTrack}</span>
              <span>${c.intDuration||"-"}</span>
              ${c.movie?`<a href="${c.movie}" target="_blank" aria-label="YouTube link">▶</a>`:""}
            </li>
          `).join("")}
        </ul>`,$.appendChild(u)})}catch(n){console.error("Error loading albums:",n)}}function h(){d.classList.add("hidden"),document.body.style.overflow="",y.forEach(({el:e,event:t,handler:s})=>e.removeEventListener(t,s)),y=[]}function m(e,t,s){e.addEventListener(t,s),y.push({el:e,event:t,handler:s})}m(T,"click",h);m(k,"click",h);m(document,"keydown",e=>{e.key==="Escape"&&h()});m(document,"click",e=>{const t=e.target.closest(".artists-link");if(!t)return;e.preventDefault();const s=t.dataset.id;s&&Y(s)});const S=document.querySelector(".artist-gallery"),a=document.querySelector(".artists-btn-load");let v=[],l=1;const L=8;let B=0;function j(e){return`
    <li class="artist-card">
      <img src="${e.strArtistThumb}" alt="${e.strArtist}">
      <ul class="artist-genres">
        ${e.genres.map(t=>`<li class="genre-item">${t}</li>`).join("")}
      </ul>
      <h3 class="artist-name">${e.strArtist}</h3>
      <p class="artist-info">${e.strBiographyEN.substring(0,100)}...</p>
      <a href="./modal.html?id=${e._id}"
         class="link artists-link js-learn-more"
         data-id="${e._id}">
        Learn more
        <svg class="icon" width="24" height="24">
          <use href="../img/artists-svg/artists.svg#icon-caret-right"></use>
        </svg>
      </a>
    </li>
  `}function F(e){return e.map(j).join("")}async function w(e=1){try{const t=await C(e,L);if(!t.artists||t.artists.length===0){E.error({position:"topRight",message:"No more artists"}),A();return}v=[...v,...t.artists],S.insertAdjacentHTML("beforeend",F(t.artists)),B=Math.ceil(t.totalArtists/L),N()}catch(t){console.error("Error loading artists:",t),E.error({title:"Error",message:"Failed to load artists",position:"topRight",color:"red"})}}a.addEventListener("click",async()=>{l+=1,a.disabled=!0,await w(l),a.disabled=!1});function N(){l<B?O():A()}function O(){a.style.display="block"}function A(){a.style.display="none"}w(l);
//# sourceMappingURL=index.js.map
