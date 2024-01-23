import{S as p,i as n}from"./assets/vendor-46aac873.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))o(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const i of t.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&o(i)}).observe(document,{childList:!0,subtree:!0});function l(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerpolicy&&(t.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?t.credentials="include":e.crossorigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function o(e){if(e.ep)return;e.ep=!0;const t=l(e);fetch(e.href,t)}})();const f=document.querySelector(".search-form"),c=document.querySelector(".gallery"),a=document.querySelector(".loader"),m=new p(".gallery a",{captionsData:"alt",captionDelay:250});f.addEventListener("submit",h);function h(s){s.preventDefault(),a.style.display="block",c.innerHTML="";const r=s.currentTarget,l=r.elements.query.value.trim();y(l).then(o=>{o.hits.length===0&&n.error({message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight",backgroundColor:"red",icon:"none"}),g(o.hits)}).catch(o=>{n.error({message:"Oops, server connection error!",position:"topRight",backgroundColor:"red",icon:"none"})}).finally(()=>{r.reset(),a.style.display="none"})}function y(s){const r="https://pixabay.com/api",l="41900218-778e908913d1efd90b8f97d56",o=new URLSearchParams({key:l,q:s,image_type:"photo",orientation:"horizontal",safesearch:"true"});return fetch(`${r}/?${o}`).then(e=>{if(!e.ok)throw new Error(e.status);return e.json()})}function g(s){const r=s.map(({largeImageURL:l,webformatURL:o,tags:e,likes:t,views:i,comments:u,downloads:d})=>`<li class="gallery-card">
        <a class="gallery-link" href="${l}">
            <img 
                class="gallery-image"
                    src="${o}"
                    alt="${e}"/>
        </a>
        
        <div class="titles-box">
            <div class="title-element">
                <p class="title-text">Likes:</p>
                <p class="title-value">${t} </p>
            </div>
            <div class="title-element">
                <p class="title-text">Views:</p>
                <p class="title-value">${i} </p>
            </div>
            <div class="title-element">
                <p class="title-text">Comments:</p>
                <p class="title-value">${u} </p>
            </div>
            <div class="title-element">
                <p class="title-text">Downloads:</p>
                <p class="title-value">${d} </p>
            </div>
        </div>
    </li>`).join("");c.insertAdjacentHTML("beforeend",r),m.refresh()}
//# sourceMappingURL=commonHelpers.js.map
