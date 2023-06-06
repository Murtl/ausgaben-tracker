import{d as e,e as l,a,k as t,t as i,q as n,j as d,_ as s,v as u,u as o,o as r,r as h,c,b as v,w as m,A as p,f as _,g as y,h as f,i as g,n as q,s as b,F as C,l as F,x as L,y as O,z as M}from"./index-661bf538.js";import{A as x,a as A,b as k,c as w,d as P}from"./ATTrashBinIcon-b6f64dd1.js";const S={class:"at-segment-item-host"},T={class:"first-section"},I={class:"second-section"},j={class:"third-section"},D=s(e({__name:"ATSegmentItem",props:{title:null,value:null,editable:{type:Boolean,default:!1}},setup:e=>(s,u)=>(l(),a("div",S,[t("section",T,i(e.title),1),t("section",I,i(e.value),1),t("section",j,[e.editable?n(s.$slots,"button",{key:0},void 0,!0):d("",!0)])]))}),[["__scopeId","data-v-334bfc39"]]),E={class:"at-segment-host"},U={class:"title-section"},$={class:"slot-section"},B=s(e({__name:"ATSegment",props:{title:null,year:null},setup:e=>(d,s)=>(l(),a("div",E,[t("section",U,i(e.title)+" "+i(e.year),1),t("section",$,[n(d.$slots,"default",{},void 0,!0)])]))}),[["__scopeId","data-v-e7ae8bf6"]]),z=(e,l)=>{let a=0;return e.forEach((e=>{e.month===l.month&&e.year===l.year&&(a=e.height)})),a},G={class:"at-liquid-fund-modal-host"},H=e({__name:"ATLiquidFundModal",props:{title:null,handleCloseModalOnCancel:null,handleCloseModalOnSave:null,liquidFund:{default:void 0},handleCloseModalOnDelete:{type:Function,default:void 0}},setup(e){const t=e,i=o().i18n;r((()=>{t.liquidFund?n.value=t.liquidFund:n.value={id:0,height:0,month:0,year:0}}));const n=h({id:0,height:0,month:0,year:0}),s=c((()=>!(e=>!(0===e.height||!e.height||0===e.month||!e.month||0===e.year||!e.year||e.month>12||e.month<1||e.year<1900||e.year>2100||e.height<0))(n.value))),u=e=>e>0,q=e=>e>0&&e<13,b=e=>e>1900&&e<2100;return(t,o)=>(l(),a("div",G,[v(p,{title:e.title},{inputs:m((()=>[v(_,{title:y(i).height,placeholder:y(i).placeholder_amount,value:n.value.height,"onUpdate:value":o[0]||(o[0]=e=>n.value.height=e),validate:u,"invalid-message":y(i).incorrect_input_at_height},null,8,["title","placeholder","value","invalid-message"]),v(_,{title:y(i).month,placeholder:y(i).placeholder_month,value:n.value.month,"onUpdate:value":o[1]||(o[1]=e=>n.value.month=e),"type-month":"",validate:q,"invalid-message":y(i).incorrect_input_at_month},null,8,["title","placeholder","value","invalid-message"]),v(_,{title:y(i).year,placeholder:y(i).placeholder_year,value:n.value.year,"onUpdate:value":o[2]||(o[2]=e=>n.value.year=e),"type-year":"",validate:b,"invalid-message":y(i).incorrect_input_at_year},null,8,["title","placeholder","value","invalid-message"])])),buttons:m((()=>[e.handleCloseModalOnDelete?(l(),f(g,{key:0,onPress:o[3]||(o[3]=l=>e.handleCloseModalOnDelete?e.handleCloseModalOnDelete(n.value):()=>{}),tertiary:"",width:"50px"},{icon:m((()=>[v(x)])),_:1})):d("",!0),v(g,{title:y(i).cancel,secondary:"",onPress:e.handleCloseModalOnCancel},null,8,["title","onPress"]),v(g,{title:y(i).save,primary:"",onPress:o[4]||(o[4]=l=>e.handleCloseModalOnSave(n.value)),disabled:y(s)},null,8,["title","disabled"])])),_:1},8,["title"])]))}}),J={class:"at-liquid-funds-list-host"},K=s(e({__name:"ATLiquidFundsList",props:{data:null,filter:{default:""}},emits:["delete-liquid-fund","update-liquid-fund"],setup(e,{emit:i}){const n=e,s=o().i18n,r=q(),{allExpenditures:p}=b(r),_=c((()=>L(p.value))),M=c((()=>O(_.value))),x=c((()=>((e,l)=>((e=>{e.sort(((e,l)=>e.year<l.year?-1:e.year>l.year?1:e.month<l.month?-1:e.month>l.month?1:0))})(e),e.filter((e=>!(!u()[e.month-1].toLowerCase().includes(l[0])&&!e.year.toString().includes(l[0])||2===l.length&&(!u()[e.month-1].toLowerCase().includes(l[0])||!e.year.toString().includes(l[1])))))))(Object.create(n.data),n.filter.toLowerCase().split(" ")))),w=h({id:0,height:0,month:0,year:0}),P=h(!1),S=h(!1),T=()=>{P.value=!1},I=()=>{i("delete-liquid-fund",w.value),P.value=!1,S.value=!1},j=()=>{i("update-liquid-fund",w.value),S.value=!1},E=()=>{S.value=!1},U=()=>{P.value=!0};return(e,i)=>(l(),a(C,null,[t("div",J,[(l(!0),a(C,null,F(y(x).slice().reverse(),(e=>(l(),a("section",{key:e.id,class:"liquid-funds-list"},[v(B,{title:y(u)()[e.month-1],year:e.year},{default:m((()=>[v(D,{title:y(s).liquid_funds,value:`${e.height} €`,editable:""},{button:m((()=>[v(g,{onPress:l=>(e=>{w.value=Object.create(e),S.value=!0})(e),width:"40px",secondary:""},{icon:m((()=>[v(k)])),_:2},1032,["onPress"])])),_:2},1032,["title","value"]),v(D,{title:y(s).minus_expenditures,value:`${y(z)(y(M),e)} €`},null,8,["title","value"]),v(D,{title:y(s).balance,value:e.height-y(z)(y(M),e)+" €"},null,8,["title","value"])])),_:2},1032,["title","year"])])))),128))]),S.value?(l(),f(H,{key:0,title:y(s).edit_liquid_fund,"handle-close-modal-on-cancel":E,"handle-close-modal-on-save":j,"liquid-fund":w.value,"handle-close-modal-on-delete":U},null,8,["title","liquid-fund"])):d("",!0),P.value?(l(),f(A,{key:1,title:y(s).really_delete_liquid_fund,"handle-close-modal-delete-on-cancel":T,"handle-close-modal-delete-on-confirm":I},null,8,["title"])):d("",!0)],64))}}),[["__scopeId","data-v-13304652"]]),N={class:"at-balance-host"},Q=s(e({__name:"ATBalance",setup(e){const i=o().i18n,n=M(),{allLiquidFunds:s}=b(n),u=h(""),r=h(!1),c=()=>{r.value=!0},p=()=>{r.value=!1},_=e=>{let l=!1;if(s.value.forEach((a=>{e.month===a.month&&e.year===a.year&&(a.height+=e.height,n.updateLiquidFund(a),l=!0)})),!l){try{e.id=(e=>{let l=0;return e.forEach((e=>{e.id>l&&(l=e.id)})),l})(s.value)+1}catch{e.id=1}n.addLiquidFund(e)}r.value=!1},q=e=>{n.deleteLiquidFund(e.id)},F=e=>{n.updateLiquidFund(e)},L=e=>{u.value=e};return(e,n)=>(l(),a(C,null,[t("div",N,[t("header",null,[v(w,{placeholder:y(i).search_month_year,onSearchChanged:L},null,8,["placeholder"]),v(g,{title:y(i).add_liquid_fund,width:"261px",primary:"",onPress:c},{icon:m((()=>[v(P)])),_:1},8,["title"])]),t("main",null,[v(K,{data:y(s),filter:u.value,onDeleteLiquidFund:q,onUpdateLiquidFund:F},null,8,["data","filter"])])]),r.value?(l(),f(H,{key:0,title:y(i).add_liquid_fund,"handle-close-modal-on-cancel":p,"handle-close-modal-on-save":_},null,8,["title"])):d("",!0)],64))}}),[["__scopeId","data-v-d62dadf7"]]);export{Q as default};
