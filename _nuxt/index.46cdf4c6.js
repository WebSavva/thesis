import{r as M,a as w}from"./index.7a919e48.js";import{a as I}from"./globals.140eb1b7.js";import{f as v,_ as $,o as s,c,F as f,r as R,n as b,g as z,v as V,a as o,t as l,d as p,h as T,i as B,j as C,k,l as g,b as u,m as D,w as E,T as H,p as L,e as P,q as N}from"./entry.f0d13c7a.js";const A=[91],y=()=>{const{lang:e}=I();let t=M.map(i=>({...i,name:i.name[e]}));return e==="ru"?t:t.filter(({rusCode:i})=>!A.includes(i))};function O(e){return e===null}function Y(e){return e===void 0}const U=e=>!O(e)&&!Y(e),S=1470,W="main-content",X=v({name:"RussiaMap",props:{activeRegion:{type:Object,default:null}},emits:["update:activeRegion"],setup(){return{regions:y()}},data(){return{width:null,height:null,tooltipX:null,tooltipY:null,hoveredRegion:null}},computed:{sizeProvider(){const{tooltipX:e,tooltipY:t,height:i,width:a}=this;return{"--width":this.toPixels(a),"--height":this.toPixels(i),"--tooltip-x":this.toPixels(e+20),"--tooltip-y":this.toPixels(t)}},isTooltipShown(){const{hoveredRegion:e,tooltipX:t,tooltipY:i}=this;return[e,t,i].every(a=>U(a))}},methods:{getMainContent(){return document.getElementById(W)},toPixels(e){return e?`${w(e)}px`:null},calculateMapSize(){if(!this.$el)return;const t=this.getMainContent();t&&(window.innerWidth<=S?(this.width=null,this.height=null):(this.width=t.offsetWidth*.65,this.height=t.offsetHeight*.85,+(this.width/this.height).toFixed(2)>1.8&&(this.height=this.width/1.8)))},resetTooltipPosition(){this.tooltipX=null,this.tooltipY=null},onRegionEnter(e){this.hoveredRegion=e,this.$emit("update:activeRegion",e)},onRegionLeave({relatedTarget:e}){e instanceof Element&&e.hasAttribute("data-region-id")||(this.hoveredRegion=null,this.$emit("update:activeRegion",null))},onMouseMove({clientX:e,clientY:t,target:i}){const a=this.getMainContent(),d=this.$refs.tooltip;!a||!d||(this.tooltipX=e,t+d.offsetHeight>=a.offsetHeight?this.tooltipY=t-d.offsetHeight:this.tooltipY=t)}},async mounted(){this.calculateMapSize(),window.addEventListener("resize",this.calculateMapSize)},unmounted(){window.removeEventListener("resize",this.calculateMapSize)},watch:{activeRegion(e){e||this.resetTooltipPosition()}}});const j=["data-region-id","fill","d","onMouseenter"],F={ref:"tooltip",class:"map__tooltip"},q={key:0,class:"map__tooltip__content"},x={class:"map__tooltip__row-name"},G=["src"],K={class:"map__tooltip__name"},J={class:"map__tooltip__row-indicator"},Q={class:"map__tooltip__salary"},Z={class:"map__tooltip__row-indicator"},ee={class:"map__tooltip__employed"},te={class:"map__tooltip__row-indicator"},oe={class:"map__tooltip__losses"};function ne(e,t,i,a,d,h){return s(),c("div",{ref:"mapWrapper",class:"map-wrapper",style:B(e.sizeProvider)},[(s(),c("svg",{viewBox:"-65 0 1134 620",version:"1.1",xmlns:"http://www.w3.org/2000/svg",class:"map",preserveAspectRatio:"none",onMousemove:t[1]||(t[1]=(...r)=>e.onMouseMove&&e.onMouseMove(...r))},[(s(!0),c(f,null,R(e.regions,r=>(s(),c(f,{key:r.id},[(s(!0),c(f,null,R(r.paths,(n,_)=>(s(),c("path",{key:_,"data-region-id":r.id,fill:r.color,d:n,class:b(["map__path",{map__path_active:e.activeRegion&&e.activeRegion.id===r.id}]),onMouseenter:m=>e.onRegionEnter(r),onMouseleave:t[0]||(t[0]=(...m)=>e.onRegionLeave&&e.onRegionLeave(...m))},null,42,j))),128))],64))),128))],32)),z(o("div",F,[e.hoveredRegion?(s(),c("div",q,[o("div",x,[o("img",{src:e.$baseUrl.append(`/regions/${e.hoveredRegion.img}`),class:"map__tooltip__flag"},null,8,G),o("span",K,l(e.hoveredRegion.name),1)]),o("div",J,[p(l(e.$int.dict.panel.map.salary)+": ",1),o("span",null,[o("span",Q,l(e.hoveredRegion.salary),1),p(" "+l(e.$int.dict.measurement.thousand)+" ₽ ",1)])]),o("div",Z,[p(l(e.$int.dict.panel.map.employed)+": ",1),o("span",null,[o("span",ee,l(e.hoveredRegion.employed),1),p(" "+l(e.$int.dict.measurement.thousand),1)])]),o("div",te,[p(l(e.$int.dict.panel.map.costs)+": ",1),o("span",null,[o("span",oe,l(e.hoveredRegion.costs),1),p(" "+l(e.$int.dict.measurement.billion)+" ₽ ",1)])])])):T("",!0)],512),[[V,e.isTooltipShown]])],4)}const se=$(X,[["render",ne],["__scopeId","data-v-4eaaf6b3"]]),ie={viewBox:"0 0 320 512",width:"1.2em",height:"1.2em"},ae=o("path",{fill:"currentColor",d:"M41 288h238c21.4 0 32.1 25.9 17 41L177 448c-9.4 9.4-24.6 9.4-33.9 0L24 329c-15.1-15.1-4.4-41 17-41zm255-105L177 64c-9.4-9.4-24.6-9.4-33.9 0L24 183c-15.1 15.1-4.4 41 17 41h238c21.4 0 32.1-25.9 17-41z"},null,-1),re=[ae];function ce(e,t){return s(),c("svg",ie,re)}const le={name:"fa-solid-sort",render:ce},de={viewBox:"0 0 512 512",width:"1.2em",height:"1.2em"},_e=o("path",{fill:"currentColor",d:"M304 416h-64a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h64a16 16 0 0 0 16-16v-32a16 16 0 0 0-16-16zM16 160h48v304a16 16 0 0 0 16 16h32a16 16 0 0 0 16-16V160h48c14.21 0 21.38-17.24 11.31-27.31l-80-96a16 16 0 0 0-22.62 0l-80 96C-5.35 142.74 1.77 160 16 160zm416 0H240a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h192a16 16 0 0 0 16-16v-32a16 16 0 0 0-16-16zm-64 128H240a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h128a16 16 0 0 0 16-16v-32a16 16 0 0 0-16-16zM496 32H240a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h256a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16z"},null,-1),he=[_e];function pe(e,t){return s(),c("svg",de,he)}const ue={name:"fa-solid-sort-amount-up",render:pe},me={viewBox:"0 0 512 512",width:"1.2em",height:"1.2em"},ge=o("path",{fill:"currentColor",d:"M304 416h-64a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h64a16 16 0 0 0 16-16v-32a16 16 0 0 0-16-16zm-128-64h-48V48a16 16 0 0 0-16-16H80a16 16 0 0 0-16 16v304H16c-14.19 0-21.37 17.24-11.29 27.31l80 96a16 16 0 0 0 22.62 0l80-96C197.35 369.26 190.22 352 176 352zm256-192H240a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h192a16 16 0 0 0 16-16v-32a16 16 0 0 0-16-16zm-64 128H240a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h128a16 16 0 0 0 16-16v-32a16 16 0 0 0-16-16zM496 32H240a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h256a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16z"},null,-1),ve=[ge];function fe(e,t){return s(),c("svg",me,ve)}const $e={name:"fa-solid-sort-amount-down",render:fe},Re=v({name:"RegionsTableSort",props:{activeDir:{type:String,default:null},activeSort:{type:String,default:null},sort:{type:String,required:!0}},emits:["change"],computed:{isAscDir(){return this.activeDir==="asc"},icon(){return this.activeSort!==this.sort?le:this.isAscDir?$e:ue}},methods:{onClick(){const e=this.isAscDir?"desc":"asc";this.$emit("change",this.sort,e)}}});function we(e,t,i,a,d,h){return s(),C(k(e.icon),{onClick:e.onClick},null,8,["onClick"])}const ye=$(Re,[["render",we]]),be={ru:"ru-RU",en:"en-GB"},Ce=v({name:"RegionsTable",components:{SortIcon:ye},props:{activeRegion:{type:Object,default:null}},emits:["update:activeRegion"],setup(){return{regions:y()}},data(){return{sortDir:"asc",sortId:"name"}},computed:{columns(){return[{id:"name",label:{en:"Region",ru:"Субъект РФ"},sortType:"character"},{id:"salary",label:{en:"Average salary, th. ₽",ru:"Средняя зарплата, тыс. ₽"},sortType:"numeric"},{id:"employed",label:{en:"Number of employed, th.",ru:"Численность занятых, тыс."},sortType:"numeric"},{id:"costs",label:{en:"Total costs, bn. ₽",ru:"Суммарные потери, млрд. ₽"},sortType:"numeric"}].map(e=>({...e,label:e.label[this.$int.lang]}))},localeCompareParam(){return be[this.$int.lang]},rows(){const{sortType:e}=this.columns.find(({id:a})=>this.sortId===a),{sortDir:t}=this;return[...this.regions].sort((a,d)=>{const h=t==="asc";if(e==="character"){const r=this.sortId,n=a[r],_=d[r];return h?n.localeCompare(_,this.localeCompareParam):_.localeCompare(n,this.localeCompareParam)}else{const r=this.sortId,n=a[r],_=d[r];return h?n-_:_-n}})}},methods:{onSelect(e){var t;this.$emit("update:activeRegion",e.id===((t=this.activeRegion)==null?void 0:t.id)?null:e)},onSort(e,t){this.sortId=e,this.sortDir=t}},watch:{activeRegion(e){const t=this.$refs.tableBody;if(!t||!e)return;const{id:i}=e,a=t.querySelector(`[data-region-id="${i}"]`);!a||window.innerWidth<=S||a.scrollIntoView({block:"center"})}}});const Se={class:"regions-table"},Me={class:"regions-table__head"},Ie={ref:"tableBody",class:"regions-table__body"},ze=["data-region-id","onClick"],Ve={class:"regions-table__row__cell"},Te={class:"regions-table__row__cell"},Be={class:"regions-table__row__cell"},ke={class:"regions-table__row__cell"};function De(e,t,i,a,d,h){const r=g("SortIcon");return s(),c("div",Se,[o("div",Me,[(s(!0),c(f,null,R(e.columns,({id:n,label:_})=>(s(),c("div",{key:n,class:"regions-table__row__cell"},[p(l(_)+" ",1),u(r,{"active-sort":e.sortId,"active-dir":e.sortDir,sort:n,class:"regions-table__head__sort",onChange:e.onSort},null,8,["active-sort","active-dir","sort","onChange"])]))),128))]),o("div",Ie,[(s(!0),c(f,null,R(e.rows,n=>(s(),c("div",{key:n.id,"data-region-id":n.id,class:b(["regions-table__row",{"regions-table__row_selected":e.activeRegion&&e.activeRegion.id===n.id}]),onClick:_=>e.onSelect(n)},[o("div",Ve,l(n.name),1),o("div",Te,l(n.salary),1),o("div",Be,l(n.employed),1),o("div",ke,l(n.costs),1)],10,ze))),128))],512)])}const Ee=$(Ce,[["render",De],["__scopeId","data-v-a22371e7"]]),He={viewBox:"0 0 512 512",width:"1.2em",height:"1.2em"},Le=o("path",{fill:"currentColor",d:"M332.8 320h38.4c6.4 0 12.8-6.4 12.8-12.8V172.8c0-6.4-6.4-12.8-12.8-12.8h-38.4c-6.4 0-12.8 6.4-12.8 12.8v134.4c0 6.4 6.4 12.8 12.8 12.8zm96 0h38.4c6.4 0 12.8-6.4 12.8-12.8V76.8c0-6.4-6.4-12.8-12.8-12.8h-38.4c-6.4 0-12.8 6.4-12.8 12.8v230.4c0 6.4 6.4 12.8 12.8 12.8zm-288 0h38.4c6.4 0 12.8-6.4 12.8-12.8v-70.4c0-6.4-6.4-12.8-12.8-12.8h-38.4c-6.4 0-12.8 6.4-12.8 12.8v70.4c0 6.4 6.4 12.8 12.8 12.8zm96 0h38.4c6.4 0 12.8-6.4 12.8-12.8V108.8c0-6.4-6.4-12.8-12.8-12.8h-38.4c-6.4 0-12.8 6.4-12.8 12.8v198.4c0 6.4 6.4 12.8 12.8 12.8zM496 384H64V80c0-8.84-7.16-16-16-16H16C7.16 64 0 71.16 0 80v336c0 17.67 14.33 32 32 32h464c8.84 0 16-7.16 16-16v-32c0-8.84-7.16-16-16-16z"},null,-1),Pe=[Le];function Ne(e,t){return s(),c("svg",He,Pe)}const Ae={name:"fa-solid-chart-bar",render:Ne},Oe={viewBox:"0 0 192 512",width:"1.2em",height:"1.2em"},Ye=o("path",{fill:"currentColor",d:"M176 432c0 44.112-35.888 80-80 80s-80-35.888-80-80s35.888-80 80-80s80 35.888 80 80zM25.26 25.199l13.6 272C39.499 309.972 50.041 320 62.83 320h66.34c12.789 0 23.331-10.028 23.97-22.801l13.6-272C167.425 11.49 156.496 0 142.77 0H49.23C35.504 0 24.575 11.49 25.26 25.199z"},null,-1),Ue=[Ye];function We(e,t){return s(),c("svg",Oe,Ue)}const Xe={name:"fa-solid-exclamation",render:We},je=v({name:"RegionCard",components:{ChartBarIcon:Ae,ExclamationIcon:Xe},props:{activeRegion:{type:Object,default:null}},setup(e){const t=y(),i=w(t.reduce((d,{costs:h})=>d+h,0));return{shareValue:D(()=>(e.activeRegion?w(e.activeRegion.costs/i*100):0).toFixed(2))}}});const Fe=e=>(L("data-v-b8015e0e"),e=e(),P(),e),qe={class:"region-card"},xe={class:"region-card__header"},Ge={class:"region-card__header__icon-holder"},Ke={class:"region-card__header__share"},Je={class:"region-card__header__share__title"},Qe={class:"region-card__header__share__details"},Ze=Fe(()=>o("span",{class:"region-card__header__share__details__percent"}," % ",-1)),et={class:"region-card__footer"};function tt(e,t,i,a,d,h){const r=g("ChartBarIcon"),n=g("ExclamationIcon");return s(),c("div",qe,[o("div",xe,[o("div",Ge,[u(r,{class:"region-card__header__icon-holder__icon"})]),o("div",Ke,[o("span",Je,l(e.$int.dict.panel.card.heading),1),o("span",Qe,[u(H,{name:"roll",mode:"out-in"},{default:E(()=>[(s(),c("span",{key:e.shareValue,class:"region-card__header__share__details__value"},l(e.shareValue),1))]),_:1}),Ze])])]),o("div",et,[u(n,{class:"region-card__footer__icon"}),p(" "+l(e.$int.dict.panel.card.hint),1)])])}const ot=$(je,[["render",tt],["__scopeId","data-v-b8015e0e"]]),nt=v({name:"RegionSection",components:{RussianMap:se,RegionsTable:Ee,RegionCard:ot},setup(){return{activeRegion:N(null)}}});const st={class:"region-section"};function it(e,t,i,a,d,h){const r=g("RussianMap"),n=g("RegionsTable"),_=g("RegionCard");return s(),c("div",st,[u(r,{activeRegion:e.activeRegion,"onUpdate:activeRegion":t[0]||(t[0]=m=>e.activeRegion=m),class:"region-section__map"},null,8,["activeRegion"]),u(n,{activeRegion:e.activeRegion,"onUpdate:activeRegion":t[1]||(t[1]=m=>e.activeRegion=m),class:"region-section__table"},null,8,["activeRegion"]),u(_,{activeRegion:e.activeRegion,class:"region-section__card"},null,8,["activeRegion"])])}const at=$(nt,[["render",it],["__scopeId","data-v-5b8a6a60"]]),dt=v({__name:"index",setup(e){return(t,i)=>(s(),C(at))}});export{dt as default};