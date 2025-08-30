import{a as p,i as l}from"./assets/vendor-CM57OJEz.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))c(e);new MutationObserver(e=>{for(const s of e)if(s.type==="childList")for(const n of s.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&c(n)}).observe(document,{childList:!0,subtree:!0});function o(e){const s={};return e.integrity&&(s.integrity=e.integrity),e.referrerPolicy&&(s.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?s.credentials="include":e.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function c(e){if(e.ep)return;e.ep=!0;const s=o(e);fetch(e.href,s)}})();const h="https://sound-wave.b.goit.study/api";async function y(r=1,t=8){try{return(await p.get(`${h}/artists`,{params:{page:r,limit:t}})).data}catch(o){throw console.error("Error fetching artists:",o),o}}const b=document.querySelector(".artist-gallery"),i=document.querySelector(".artists-btn-load");let d=[],a=1;const u=8;let f=0;function A(r){return`
    <li class="artist-card">
      <img src="${r.strArtistThumb}" alt="${r.strArtist}">
      <ul class="artist-genres">
        ${r.genres.map(t=>`<li class="genre-item">${t}</li>`).join("")}
      </ul>
      <h3 class="artist-name">${r.strArtist}</h3>
      <p class="artist-info">${r.strBiographyEN.substring(0,100)}...</p>
      <a href="./modal.html?id=${r._id}"
         class="link artists-link"
         data-id="${r._id}">
        Learn more
        <svg class="icon" width="24" height="24">
          <use href="../img/artists-svg/artists.svg#icon-caret-right"></use>
        </svg>
      </a>
    </li>
  `}function L(r){return r.map(A).join("")}async function g(r=1){try{const t=await y(r,u);if(!t.artists||t.artists.length===0){l.error({position:"topRight",message:"No more artists"}),m();return}d=[...d,...t.artists],b.insertAdjacentHTML("beforeend",L(t.artists)),f=Math.ceil(t.totalArtists/u),$()}catch(t){console.error("Error loading artists:",t),l.error({title:"Error",message:"Failed to load artists",position:"topRight",color:"red"})}}i.addEventListener("click",async()=>{a+=1,i.disabled=!0,await g(a),i.disabled=!1});function $(){a<f?v():m()}function v(){i.style.display="block"}function m(){i.style.display="none"}g(a);const w=fetchAlbumsByArtist("65ada227af9f6d155db46908");console.log(w);
//# sourceMappingURL=index.js.map
