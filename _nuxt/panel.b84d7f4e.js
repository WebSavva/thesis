import{f as L,B as S,k as N,l as I,z as B,o as _,c as i,a as e,t as o,A as s,F as C,r as T,n as c,b as f,w as v,T as $,C as w,m as W,p as z,e as E,_ as M}from"./entry.4478c12f.js";import{_ as F}from"./nuxt-link.1f40bc2c.js";import{u as P}from"./use-page-type.bd98ecde.js";import{u as V}from"./use-internalization.1d170f5d.js";const d=n=>(z("data-v-b1ed1498"),n=n(),E(),n),A={class:"panel"},D={class:"panel__sidebar__head"},O={class:"panel__sidebar__head__text"},R=d(()=>e("i",{class:"fas fa-bars panel__sidebar__head__toggler__icon"},null,-1)),U=[R],j={class:"panel__sidebar__nav"},q={class:"panel__sidebar__nav__menu"},G={class:"panel__sidebar__nav__menu__item__text"},H=["href"],J={class:"panel__sidebar__nav__menu__item__text"},K=d(()=>e("div",{class:"panel__blur"},null,-1)),Q={class:"panel__main"},X={class:"panel__main__head"},Y=d(()=>e("i",{class:"fas fa-virus panel__main__head__icon"},null,-1)),Z={id:"main-content",class:"panel__main__content"},ee=L({__name:"panel",setup(n){const r=S(),a=V();P("panel");const p=[{icon:"shield-virus",label:a.dict.sidebar.mapLinkName,id:"region",path:a.hrefWithLang("/panel"),heading:a.dict.heading.map},{icon:"chart-line",label:a.dict.sidebar.sectorLinkName,id:"sector",path:a.hrefWithLang("/panel/sector"),heading:a.dict.heading.sector},{icon:"book-open",label:a.dict.sidebar.thesisLinkName,id:"thesis",path:a.hrefWithLang("/panel/thesis"),heading:a.dict.heading.thesis},{icon:"chalkboard",label:a.dict.sidebar.presentationLinkName,path:a.hrefWithLang("/presentation.html"),external:!0}],h=N(()=>p.find(({path:m})=>r.path===m)),t=I(!1);function g(){t.value=!t.value}function x(){t.value=!1}return B(()=>r.path,()=>x()),(m,ae)=>{const k=w;return _(),i("div",A,[e("aside",{class:c(["panel__sidebar",{panel__sidebar_expanded:s(t)}])},[e("div",D,[e("div",O,o(s(a).dict.sidebar.mainMenuTitle),1),e("div",{class:"panel__sidebar__head__toggler",onClick:g},U)]),e("nav",j,[e("ul",q,[(_(),i(C,null,T(p,({icon:u,label:b,path:l,external:y})=>e("li",{key:l},[y?(_(),i("a",{key:1,href:l,class:"panel__sidebar__nav__menu__item"},[e("i",{class:c(["fas panel__sidebar__nav__menu__item__icon",`fa-${u}`])},null,2),e("span",J,o(b),1)],8,H)):(_(),W(s(F),{key:0,href:l,class:"panel__sidebar__nav__menu__item","exact-active-class":"panel__sidebar__nav__menu__item_selected"},{default:v(()=>[e("i",{class:c(["fas panel__sidebar__nav__menu__item__icon",`fa-${u}`])},null,2),e("span",G,o(b),1)]),_:2},1032,["href"]))])),64))])])],2),K,e("main",Q,[e("header",X,[f($,{name:"roll",mode:"out-in"},{default:v(()=>[(_(),i("h1",{key:s(h).heading,class:"panel__main__head__text"},o(s(h).heading),1))]),_:1}),Y]),e("div",Z,[f(k)])])])}}});const ie=M(ee,[["__scopeId","data-v-b1ed1498"]]);export{ie as default};