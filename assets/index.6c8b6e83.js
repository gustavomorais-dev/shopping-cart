(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))c(t);new MutationObserver(t=>{for(const o of t)if(o.type==="childList")for(const s of o.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&c(s)}).observe(document,{childList:!0,subtree:!0});function n(t){const o={};return t.integrity&&(o.integrity=t.integrity),t.referrerpolicy&&(o.referrerPolicy=t.referrerpolicy),t.crossorigin==="use-credentials"?o.credentials="include":t.crossorigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function c(t){if(t.ep)return;t.ep=!0;const o=n(t);fetch(t.href,o)}})();const w=document.getElementsByClassName("cep-input")[0],P=document.getElementsByClassName("cart__address")[0],v=async e=>{if(!e||e.length!==8)return"Termo de busca n\xE3o informado";try{const n=await fetch(`https://cep.awesomeapi.com.br/json/${e}`),c=await fetch(`https://brasilapi.com.br/api/cep/v2/${e}`);console.log(n),console.log(c);const t=await Promise.any([n,c]).then(p=>p.json()),o=t.address_type,s=t.address_name,{district:d,city:i,state:l}=t;return`${o} ${s} - ${d} - ${i} - ${l}`}catch{return"CEP n\xE3o encontrado"}},N=async()=>{const e=await v(w.value);P.innerHTML=e},f=document.getElementsByClassName("products")[0],L=()=>{const e=document.createElement("h1");e.innerHTML="Carregando...",e.className="loading",f.appendChild(e)},I=()=>{const e=document.getElementsByClassName("loading")[0];e&&e.remove()},g=()=>{const e=document.createElement("h1");e.innerHTML="Algum erro ocorreu, recarregue a p\xE1gina e tente novamente",e.className="error",f.appendChild(e)},C=()=>{const e=document.getElementsByClassName("error")[0];e&&e.remove()},_=async e=>{if(C(),!e)throw new Error("ID n\xE3o informado");try{return await(await fetch(`https://api.mercadolibre.com/items/${e}`)).json()}catch{g()}},b=async e=>{if(C(),!e)throw new Error("Termo de busca n\xE3o informado");try{return(await(await fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${e}`)).json()).results}catch{g()}},m=()=>{const e=localStorage.getItem("cartProducts");return e?JSON.parse(e):[]},B=e=>{if(!e)throw new Error("Voc\xEA deve fornecer um ID");const n=[...m(),e];localStorage.setItem("cartProducts",JSON.stringify(n))},h=()=>{const e=document.getElementsByClassName("total-price")[0],n=document.getElementsByClassName("cart__products")[0].childNodes;let c=0;n.forEach(t=>{const o=t.getElementsByClassName("product__price__value")[0].innerText;c+=parseFloat(o)}),e.innerText=c},$=e=>{if(!e)throw new Error("Voc\xEA deve fornecer um ID");const r=[...m()],n=r.indexOf(e);r.splice(n,1),localStorage.setItem("cartProducts",JSON.stringify(r)),h()},u=e=>{const r=document.createElement("img");return r.className="product__image",r.src=e.replace("I.jpg","O.jpg"),r},a=(e,r,n="")=>{const c=document.createElement(e);return c.className=r,c.innerText=n,c},S=(e,r)=>{e.remove(),$(r)},E=({id:e,title:r,price:n,pictures:c})=>{const t=document.createElement("li");t.className="cart__product";const o=a("div","cart__product__image-container"),s=u(c[0].url);o.appendChild(s);const d=u((c[1]||c[0]).url);o.appendChild(d),t.appendChild(o);const i=a("div","cart__product__info-container");i.appendChild(a("span","product__title",r));const l=a("span","product__price","R$ ");l.appendChild(a("span","product__price__value",n)),i.appendChild(l),t.appendChild(i);const p=a("i","material-icons cart__product__remove","delete");return t.appendChild(p),t.addEventListener("click",()=>S(t,e)),t},O=({id:e,title:r,thumbnail:n,price:c})=>{const t=document.createElement("section");t.className="product",t.appendChild(a("span","product__id",e));const o=a("div","img__container");o.appendChild(u(n)),t.appendChild(o),t.appendChild(a("span","product__title",r));const s=a("span","product__price","R$ ");s.appendChild(a("span","product__price__value",c)),t.appendChild(s);const d=a("button","product__add","Adicionar ao carrinho!");return t.appendChild(d),t};document.querySelector(".cep-button").addEventListener("click",N);const T=document.getElementsByClassName("products")[0],y=document.getElementsByClassName("cart__products")[0],D=async()=>{const r=m().map(async n=>await _(n));await Promise.all(r).then(n=>{n.forEach(c=>{const{id:t,title:o,price:s,pictures:d}=c,i=E({id:t,title:o,price:s,pictures:d});y.appendChild(i)})}),h()},j=async e=>{const r=e.target.parentNode.firstChild.innerText;B(r);const n=await _(r),{id:c,title:t,price:o,pictures:s}=n,d=E({id:c,title:t,price:o,pictures:s});y.appendChild(d),h()},x=async()=>{L();const e=await b("computador");I(),e.forEach(r=>{const{id:n,title:c,thumbnail:t,price:o}=r,s=O({id:n,title:c,thumbnail:t,price:o});s.addEventListener("click",j),T.appendChild(s)})};x();D();
