import{_ as e,e as t,a as s,l as a,d as l,r as n,k as o,b as c,C as h,D as d,p as r,n as i,u as v,w as p,A as u,i as w,g as C}from"./index-9486f725.js";const b={},g={width:"25",height:"25",viewBox:"0 0 20 16",fill:"black",xmlns:"http://www.w3.org/2000/svg"},M=[a("path",{d:"M15.7 14.3l-4.2-4.2c-0.2-0.2-0.5-0.3-0.8-0.3 0.8-1 1.3-2.4 1.3-3.8 0-3.3-2.7-6-6-6s-6 2.7-6 6 2.7 6 6 6c1.4 0 2.8-0.5 3.8-1.4 0 0.3 0 0.6 0.3 0.8l4.2 4.2c0.2 0.2 0.5 0.3 0.7 0.3s0.5-0.1 0.7-0.3c0.4-0.3 0.4-0.9 0-1.3zM6 10.5c-2.5 0-4.5-2-4.5-4.5s2-4.5 4.5-4.5 4.5 2 4.5 4.5-2 4.5-4.5 4.5z"},null,-1)];const m=e(b,[["render",function(e,a){return t(),s("svg",g,M)}]]),_={class:"at-searchbar-host"},f=["placeholder"],x=e(l({__name:"ATSearchbar",props:{placeholder:null},emits:["search-changed"],setup(e,{emit:l}){const r=n("");return o(r,(e=>{l("search-changed",e)})),(l,n)=>(t(),s("div",_,[c(m,{class:"searchbar-icon"}),h(a("input",{class:"native-input-element",placeholder:e.placeholder,"onUpdate:modelValue":n[0]||(n[0]=e=>r.value=e)},null,8,f),[[d,r.value]])]))}}),[["__scopeId","data-v-88010e0d"]]),z={},L={width:"25",height:"25",viewBox:"0 0 20 16",fill:"white",xmlns:"http://www.w3.org/2000/svg"},D=[a("path",{d:"M14 7h-5v-5h-2v5h-5v2h5v5h2v-5h5v-2z"},null,-1)];const H=e(z,[["render",function(e,a){return t(),s("svg",L,D)}]]),V={},y={width:"25",height:"25",viewBox:"0 0 17 17",class:"at-icon-host",xmlns:"http://www.w3.org/2000/svg"},A=[(e=>(r("data-v-bf972bbb"),e=e(),i(),e))((()=>a("path",{d:"M10.9999 1.992C10.9999 2.016 10.9999 2.016 10.9999 2.016L9.22394 4.008H3.99194C3.46394 4.008 3.00794 4.44 3.00794 4.992V13.008C3.00794 13.536 3.43994 13.992 3.99194 13.992H6.53594C6.84794 14.04 7.15994 14.04 7.47194 13.992H12.0079C12.5359 13.992 12.9919 13.56 12.9919 13.008V8.784L14.9359 6.624L15.0079 6.672V12.984C15.0079 14.664 13.6639 16.008 12.0079 16.008H4.01594C2.33594 16.008 0.991943 14.664 0.991943 12.984V4.992C0.991943 3.336 2.33594 1.992 4.01594 1.992H10.9999ZM12.2719 3.624L13.6159 5.112L8.71994 10.68C8.50394 10.92 7.83194 11.232 6.67994 11.616C6.65594 11.64 6.60794 11.64 6.55994 11.616C6.46394 11.592 6.39194 11.472 6.43994 11.376C6.75194 10.248 7.03994 9.552 7.25594 9.312L12.2719 3.624ZM12.9199 2.856L14.2879 1.32C14.6479 0.911996 15.2719 0.887996 15.6799 1.272C16.0879 1.632 16.1119 2.28 15.7519 2.688L14.2639 4.368L12.9199 2.856Z"},null,-1)))];const B=e(V,[["render",function(e,a){return t(),s("svg",y,A)}],["__scopeId","data-v-bf972bbb"]]),I={class:"at-delete-modal-buttons-host"},O=e(l({__name:"ATDeleteModal",props:{title:null,handleCloseModalDeleteOnCancel:{type:Function},handleCloseModalDeleteOnConfirm:{type:Function}},setup(e){const a=v().i18n;return(l,n)=>(t(),s("div",I,[c(u,{title:e.title},{buttons:p((()=>[c(w,{title:C(a).cancel,secondary:"",onPress:e.handleCloseModalDeleteOnCancel,width:"200px"},null,8,["title","onPress"]),c(w,{title:C(a).delete,primary:"",onPress:e.handleCloseModalDeleteOnConfirm,width:"200px",class:"delete-button"},null,8,["title","onPress"])])),_:1},8,["title"])]))}}),[["__scopeId","data-v-801dcebd"]]),P={},Z=e=>(r("data-v-f78c5ba0"),e=e(),i(),e),k={width:"25",height:"20",viewBox:"0 0 20 16",xmlns:"http://www.w3.org/2000/svg",class:"at-trash-bin-icon-host"},F=[Z((()=>a("path",{d:"M13 3s0-0.51-2-0.8v-0.7c-0.017-0.832-0.695-1.5-1.53-1.5-0 0-0 0-0 0h-3c-0.815 0.017-1.47 0.682-1.47 1.5 0 0 0 0 0 0v0.7c-0.765 0.068-1.452 0.359-2.007 0.806l-0.993-0.006v1h12v-1h-1zM6 1.5c0.005-0.274 0.226-0.495 0.499-0.5l3.001-0c0 0 0.001 0 0.001 0 0.282 0 0.513 0.22 0.529 0.499l0 0.561c-0.353-0.042-0.763-0.065-1.178-0.065-0.117 0-0.233 0.002-0.349 0.006-0.553-0-2.063-0-2.503 0.070v-0.57z"},null,-1))),Z((()=>a("path",{d:"M2 5v1h1v9c1.234 0.631 2.692 1 4.236 1 0.002 0 0.003 0 0.005 0h1.52c0.001 0 0.003 0 0.004 0 1.544 0 3.002-0.369 4.289-1.025l-0.054-8.975h1v-1h-12zM6 13.92q-0.51-0.060-1-0.17v-6.75h1v6.92zM9 14h-2v-7h2v7zM11 13.72c-0.267 0.070-0.606 0.136-0.95 0.184l-0.050-6.904h1v6.72z"},null,-1)))];const T=e(P,[["render",function(e,a){return t(),s("svg",k,F)}],["__scopeId","data-v-f78c5ba0"]]);export{T as A,O as a,B as b,x as c,H as d};
