var _=Object.defineProperty;var g=Object.getOwnPropertySymbols;var $=Object.prototype.hasOwnProperty,L=Object.prototype.propertyIsEnumerable;var N=(n,t,e)=>t in n?_(n,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):n[t]=e,b=(n,t)=>{for(var e in t||(t={}))$.call(t,e)&&N(n,e,t[e]);if(g)for(var e of g(t))L.call(t,e)&&N(n,e,t[e]);return n};import{R as s,r as d,a as f,b as A}from"./vendor.7f4d3e88.js";const D=function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))r(a);new MutationObserver(a=>{for(const l of a)if(l.type==="childList")for(const i of l.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&r(i)}).observe(document,{childList:!0,subtree:!0});function e(a){const l={};return a.integrity&&(l.integrity=a.integrity),a.referrerpolicy&&(l.referrerPolicy=a.referrerpolicy),a.crossorigin==="use-credentials"?l.credentials="include":a.crossorigin==="anonymous"?l.credentials="omit":l.credentials="same-origin",l}function r(a){if(a.ep)return;a.ep=!0;const l=e(a);fetch(a.href,l)}};D();function k({notification:{type:n,message:t}}){return s.createElement("div",{className:`notification notification--${n}`},s.createElement("span",{className:"notification__message"},t))}function O({notifications:n}){return s.createElement("div",{className:"notifications"},n.map(t=>s.createElement(k,{key:t.message,notification:t})))}const y=({label:n,value:t,onChange:e})=>{const r=a=>e(a.target.value);return s.createElement("label",{className:"form-field"},s.createElement("span",{className:"form-field__label"},n),s.createElement("input",{className:"form-field__control",value:t,onChange:r}))},I=({onSubmit:n})=>{const[t,e]=d.exports.useState(""),[r,a]=d.exports.useState(""),l=E=>{E.preventDefault(),n({name:t,number:r},()=>{e(""),a("")})},i=!(t&&r);return s.createElement("form",{className:"form",onSubmit:l},s.createElement(y,{label:"name",value:t,onChange:e}),s.createElement(y,{label:"number",value:r,onChange:a}),s.createElement("button",{type:"submit",className:"form-button",disabled:i},"add"))},M=({person:{name:n,number:t},onDelete:e})=>s.createElement("tr",{className:"table-row"},s.createElement("td",{className:"table-cell"},n),s.createElement("td",{className:"table-cell"},t),s.createElement("td",{className:"table-cell"},s.createElement("button",{onClick:e},"delete"))),R=({persons:n,onDelete:t})=>s.createElement("table",{className:"table"},s.createElement("thead",null,s.createElement("tr",null,s.createElement("th",{className:"table-hd-cell"},"Name"),s.createElement("th",{className:"table-hd-cell"},"Number"))),s.createElement("tbody",null,n.map(e=>s.createElement(M,{key:e.id,person:e,onDelete:()=>t(e)})))),B=({search:n,onSearchChange:t})=>{const e=r=>{t(r.target.value)};return s.createElement("input",{value:n,onChange:e,placeholder:"filter by name"})},v=({title:n,children:t})=>s.createElement("section",{className:"section"},s.createElement("h2",{className:"section__header"},n),s.createElement("div",{className:"section_body"},t)),w=n=>{var t;return f.isAxiosError(n)&&"error"in((t=n.response)==null?void 0:t.data)},h="api/persons",F=()=>f.get(h).then(({data:t})=>t),j=n=>f.post(h,n).then(({data:e})=>e).catch(e=>{var r,a;throw w(e)?Error((a=(r=e.response)==null?void 0:r.data.error)!=null?a:e.message):e}),K=n=>f.put(`${h}/${n.id}`,n).then(({data:e})=>e).catch(e=>{var r,a;throw w(e)?Error((a=(r=e.response)==null?void 0:r.data.error)!=null?a:e.message):e}),T=n=>f.delete(`${h}/${n.id}`).then(({data:e})=>e).catch(e=>{var r;throw Error(((r=e.response)==null?void 0:r.status)===404?`Person ${n.name} was already removed from the server`:e.message)});var p={getAll:F,create:j,update:K,delete:T};const U=()=>{const[n,t]=d.exports.useState([]),[e,r]=d.exports.useState([]),[a,l]=d.exports.useState("");d.exports.useEffect(()=>{p.getAll().then(t)},[]);const i=o=>{l(o)},E=n.filter(o=>o.name.toLowerCase().includes(a.toLowerCase())),u=o=>{r(e.concat(o)),setTimeout(()=>{const c=e.filter(({message:m})=>m!==o.message);r(c)},5e3)},P=o=>{window.confirm(`Delete ${o.name}?`)&&p.delete(o).then(()=>{t(n.filter(c=>c.id!==o.id))}).catch(c=>{u({type:"error",message:c.message})})},S=o=>{p.create(o).then(c=>{u({type:"success",message:`Added ${c.name}`}),t(n.concat(c))}).catch(c=>{u({type:"error",message:c.message})})},C=o=>{p.update(o).then(c=>{t(n.map(m=>m.id!==c.id?m:c))}).catch(c=>{u({type:"error",message:c.message})})},x=(o,c)=>{const m=n.find(q=>q.name===o.name);m?window.confirm(`${o.name} is already added to Phonebook, replace the old number with the new on`)&&(c(),C(b(b({},m),o))):(c(),S(o))};return s.createElement(s.Fragment,null,Boolean(e.length)&&s.createElement(O,{notifications:e}),s.createElement(v,{title:"Phonebook"},s.createElement(I,{onSubmit:x})),s.createElement(v,{title:"Numbers"},s.createElement(B,{search:a,onSearchChange:i}),s.createElement(R,{persons:E,onDelete:P})))};A.render(s.createElement(s.StrictMode,null,s.createElement(U,null)),document.getElementById("root"));
