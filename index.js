import{a as g,i as E}from"./assets/vendor-CM57OJEz.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))i(r);new MutationObserver(r=>{for(const n of r)if(n.type==="childList")for(const o of n.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&i(o)}).observe(document,{childList:!0,subtree:!0});function s(r){const n={};return r.integrity&&(n.integrity=r.integrity),r.referrerPolicy&&(n.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?n.credentials="include":r.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function i(r){if(r.ep)return;r.ep=!0;const n=s(r);fetch(r.href,n)}})();const p="https://sound-wave.b.goit.study/api";async function C(t=1,e=8){try{return(await g.get(`${p}/artists`,{params:{page:t,limit:e}})).data}catch(s){throw console.error("Error fetching artists:",s),s}}async function M(t){try{return(await g.get(`${p}/artists/${t}`)).data}catch(e){throw console.error(`Error fetching artist with ID ${t}:`,e),e}}async function x(t){try{return(await g.get(`${p}/artists/${t}/albums`)).data}catch(e){throw console.error(`Error fetching albums for artist with ID ${t}:`,e),e}}const d=document.getElementById("artist-modal"),k=d.querySelector(".modal-overlay"),T=d.querySelector(".modal-close"),f=document.getElementById("loader"),$=document.getElementById("artist-albums");let y=[];async function Y(t){d.classList.remove("hidden"),document.body.style.overflow="hidden",f.style.display="block";try{const e=await M(t);await D(e),f.style.display="none"}catch(e){console.error(e),f.textContent="Error loading data"}}async function D(t){var r;document.getElementById("artist-name").textContent=t.strArtist,document.getElementById("artist-image").src=t.strArtistThumb||"";const e=document.getElementById("artist-years");t.intFormedYear&&t.intDiedYear?e.textContent=`Years active: ${t.intFormedYear} – ${t.intDiedYear}`:t.intFormedYear&&!t.intDiedYear?e.textContent=`Years active: ${t.intFormedYear} – present`:e.textContent="Years active: information missing";const s=document.getElementById("artist-gender"),i=document.getElementById("artist-members");t.strArtistType==="person"?(s.textContent=`Sex: ${t.strGender||"information missing"}`,s.classList.remove("hidden"),i.classList.add("hidden")):(i.textContent=`Members: ${t.intMembers||"information missing"}`,i.classList.remove("hidden"),s.classList.add("hidden")),document.getElementById("artist-country").textContent=`Country: ${t.strCountry||"information missing"}`,document.getElementById("artist-bio").textContent=`Biography: ${t.strBiographyEN||"information missing"}`,document.getElementById("artist-genres").textContent=`Genres: ${((r=t.genres)==null?void 0:r.join(", "))||"information missing"}`;try{const n=await x(t._id);$.innerHTML="",n.forEach(o=>{var b;const u=document.createElement("div");u.classList.add("album");const I=o.tracks||((b=o.albumsList)==null?void 0:b.tracks)||[];u.innerHTML=`
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
        </ul>`,$.appendChild(u)})}catch(n){console.error("Error loading albums:",n)}}function h(){d.classList.add("hidden"),document.body.style.overflow="",y.forEach(({el:t,event:e,handler:s})=>t.removeEventListener(e,s)),y=[]}function m(t,e,s){t.addEventListener(e,s),y.push({el:t,event:e,handler:s})}m(T,"click",h);m(k,"click",h);m(document,"keydown",t=>{t.key==="Escape"&&h()});m(document,"click",t=>{const e=t.target.closest(".artists-link");if(!e)return;t.preventDefault();const s=e.dataset.id;s&&Y(s)});const S=document.querySelector(".artist-gallery"),a=document.querySelector(".artists-btn-load");let v=[],l=1;const B=8;let L=0;function F(t){return`
    <li class="artist-card">
      <img src="${t.strArtistThumb}" alt="${t.strArtist}">
      <ul class="artist-genres">
        ${t.genres.map(e=>`<li class="genre-item">${e}</li>`).join("")}
      </ul>
      <h3 class="artist-name">${t.strArtist}</h3>
      <p class="artist-info">${t.strBiographyEN.substring(0,100)}...</p>
      <a href="./modal.html?id=${t._id}"
         class="link artists-link"
         data-id="${t._id}">
        Learn more
        <svg class="icon" width="24" height="24">
          <use href="../img/artists-svg/artists.svg#icon-caret-right"></use>
        </svg>
      </a>
    </li>
  `}function N(t){return t.map(F).join("")}async function w(t=1){try{const e=await C(t,B);if(!e.artists||e.artists.length===0){E.error({position:"topRight",message:"No more artists"}),A();return}v=[...v,...e.artists],S.insertAdjacentHTML("beforeend",N(e.artists)),L=Math.ceil(e.totalArtists/B),O()}catch(e){console.error("Error loading artists:",e),E.error({title:"Error",message:"Failed to load artists",position:"topRight",color:"red"})}}a.addEventListener("click",async()=>{l+=1,a.disabled=!0,await w(l),a.disabled=!1});function O(){l<L?P():A()}function P(){a.style.display="block"}function A(){a.style.display="none"}w(l);const j=fetchAlbumsByArtist("65ada227af9f6d155db46908");console.log(j);
//# sourceMappingURL=index.js.map
