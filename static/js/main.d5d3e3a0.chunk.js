(this["webpackJsonpmy-app"]=this["webpackJsonpmy-app"]||[]).push([[0],{159:function(t,e,n){t.exports={main:"App_main__2tEjO",sidebar:"App_sidebar__2u_wQ",buttonsBlock:"App_buttonsBlock__6zcgR"}},184:function(t,e,n){},203:function(t,e,n){"use strict";n.r(e);var o=n(15),c=n.n(o),i=n(113),a=n.n(i),s=(n(184),n(12)),r=n(14),d=n(24),u=n(25),j=(n(166),n(159)),l=n.n(j),b=n(43),h=n(138),O=n(49),p=n(206),f=new(function(){function t(){Object(s.a)(this,t),this.users=[],this.activeUser=null,Object(O.d)(this)}return Object(r.a)(t,[{key:"setActiveUser",value:function(t){this.activeUser=t}},{key:"getUsers",value:function(){var t=this;fetch("https://jsonplaceholder.typicode.com/users").then((function(t){return t.json()})).then((function(e){return t.users=e}))}}]),t}()),m=new(function(){function t(){Object(s.a)(this,t),this.todos=[{userId:parseInt(Object(p.a)().split("-").join(""),16),id:129019203,title:"new",completed:!1}],this.activeTodoId=0,Object(O.d)(this,{},{deep:!0})}return Object(r.a)(t,[{key:"addTodo",value:function(t){var e;this.todos.push({userId:null===(e=f.activeUser)||void 0===e?void 0:e.id,id:parseInt(Object(p.a)().split("-").join(""),16),title:t,completed:!1})}},{key:"deleteTodo",value:function(t){this.todos=this.todos.filter((function(e){return e.id!==t}))}},{key:"completeTodo",value:function(t){this.todos=this.todos.map((function(e){return e.id===t?Object(h.a)(Object(h.a)({},e),{},{completed:!e.completed}):e}))}},{key:"getActiveTodoId",value:function(t){this.activeTodoId=t}},{key:"changeTitleForTask",value:function(t){var e=this;this.todos=this.todos.map((function(n){return n.id===e.activeTodoId?Object(h.a)(Object(h.a)({},n),{},{title:t}):n}))}},{key:"fetchTodo",value:function(){var t=this;fetch("https://jsonplaceholder.typicode.com/todos/").then((function(t){return t.json()})).then((function(e){t.todos=[].concat(Object(b.a)(t.todos),Object(b.a)(e))}))}}]),t}()),x=n(121),v=n(123),g=n(125),I=n.n(g),y=n(164),k=n.n(y),T=n(174),w=n(175),C=n(139),B=n.n(C),F=n(21),U=function(t){return Object(F.jsxs)(B.a,{onFieldDataChanged:function(t){console.log(t.component.option("formData")),m.changeTitleForTask(t.component.option("formData").Title)},children:[Object(F.jsx)(C.Item,{dataField:"Title"}),Object(F.jsx)(C.ButtonItem,{children:Object(F.jsx)(C.ButtonOptions,{text:"Submit the Form",useSubmitBehavior:!0})})]})},D=Object(x.a)((function(t){return Object(F.jsx)("div",{className:"App",children:Object(F.jsx)(w.Popup,{visible:t.isPopupVisible,closeOnOutsideClick:!0,onHiding:t.togglePopup,width:500,height:500,resizeEnabled:!0,contentRender:function(){return Object(F.jsx)(U,{id:m.activeTodoId})}})})})),S=n(129),_=n.n(S),M=n(111),P=n(46),A=function(t){return Object(F.jsxs)("div",{style:{display:"flex",justifyContent:"space-between"},children:[Object(F.jsxs)("div",{children:[Object(F.jsx)(T.CheckBox,{value:t.data.data.completed,onValueChange:function(){t.data.data.completed=!t.data.data.completed}}),t.data.data.title]}),Object(F.jsxs)("div",{children:[Object(F.jsx)(k.a,{width:45,style:{margin:"10px"},icon:"rename",onClick:function(){t.togglePopup(t.data.data.id),m.getActiveTodoId(t.data.data.id)}}),Object(F.jsx)(k.a,{width:100,icon:"trash",type:"danger",onClick:function(){return m.deleteTodo(Object(O.h)(t.data.data.id))}})]})]})};function E(){var t;return Object(F.jsxs)("div",{className:"toolbar-label",children:[Object(F.jsx)("b",{children:"Todo's for"})," ",null===(t=f.activeUser)||void 0===t?void 0:t.name]})}var N=function(t){var e=Object(P.g)(),n={type:"back",onClick:function(){e.push("/"),m.todos=[],Object(M.a)("\u0417\u0434\u0435\u0441\u044c \u0431\u0443\u0434\u0435\u0442 \u0432\u043e\u0437\u0432\u0440\u0430\u0442 \u043d\u0430 \u044e\u0437\u0435\u0440\u043e\u0432")}},i=Object(o.useState)(!1),a=Object(v.a)(i,2),s=a[0],r=a[1],d=function(t){r(!s)};return Object(F.jsxs)(c.a.Fragment,{children:[Object(F.jsxs)(_.a,{children:[Object(F.jsx)(S.Item,{location:"before",widget:"dxButton",options:n}),Object(F.jsx)(S.Item,{location:"before",widget:"dxButton",options:R}),Object(F.jsx)(S.Item,{location:"after",locateInMenu:"auto",widget:"dxButton",options:L}),Object(F.jsx)(S.Item,{location:"center",locateInMenu:"never",render:E})]}),Object(F.jsx)(I.a,{height:"100vh",searchMode:"contains",searchExpr:["title"],searchEnabled:!0,itemComponent:function(t){return Object(F.jsx)(A,{data:t,togglePopup:d})},dataSource:t.todos,selectionMode:"multiple",pageLoadMode:"nextButton",scrollByContent:!0,showScrollbar:"never",style:{padding:"22px",margin:"10px",borderRadius:" 30px"},children:Object(F.jsx)(g.ItemDragging,{allowReordering:!0})}),Object(F.jsx)(D,{isPopupVisible:s,togglePopup:d})]})},R={icon:"refresh",onClick:function(){Object(M.a)("\u0417\u0434\u0435\u0441\u044c \u0431\u0443\u0434\u0435\u0442 \u043e\u0431\u043d\u043e\u0432\u043b\u0435\u043d\u0438\u0435!")}},L={icon:"plus",onClick:function(){Object(M.a)("\u0417\u0434\u0435\u0441\u044c \u0431\u0443\u0434\u0435\u0442 \u0432\u0441\u043f\u043b\u044b\u0432\u0430\u0442\u044c \u043c\u043e\u0434\u0430\u043b\u043a\u0430 \u0434\u043e\u0431\u0430\u0432\u043b\u0435\u043d\u0438\u044f!")}},V=Object(x.a)((function(){var t=Object(P.h)();Object(o.useEffect)((function(){m.fetchTodo()}),[]);var e=Object(o.useMemo)((function(){return m.todos.filter((function(e){return e.userId===+t.userId}))}),[m.todos]);return console.log(Object(O.h)(e.map((function(t){return Object(O.h)(t)})))),Object(F.jsx)(F.Fragment,{children:Object(F.jsx)(N,{todos:e})})})),z=n(179),J={display:"flex",justifyContent:"space-between"},H=function(t){return Object(F.jsxs)("pre",{style:J,children:[Object(F.jsx)("b",{children:t.data.name}),Object(F.jsxs)("b",{children:["Users id: ",t.data.id]})]})},Q=Object(x.a)((function(t){var e=Object(o.useState)(""),n=Object(v.a)(e,2),c=n[0],i=n[1];Object(o.useEffect)((function(){f.getUsers()}),[]),console.log(c);var a=Object(o.useMemo)((function(){return f.users.map((function(t){return{id:t.id,name:t.name}}))}),[f.users]);return""!==c?Object(F.jsx)(P.a,{to:"/todos/".concat(c)}):(console.log(f.activeUser),Object(F.jsxs)("div",{children:[Object(F.jsx)("b",{children:" \u0412\u044b\u0431\u0435\u0440\u0438\u0442\u0435 \u044e\u0437\u0435\u0440\u0430 "}),Object(F.jsx)(I.a,{height:"100vh",dataSource:a,itemComponent:H,onItemClick:function(t){var e=t.itemData;Object(z.a)(t,["itemData"]);f.setActiveUser(e),i(e.id)},children:Object(F.jsx)(g.MenuItem,{text:"Show Details",action:function(t){var e=t.itemData;Object(M.a)({message:"Name: ".concat(e.name," ID: ").concat(e.id),width:250,height:250,shading:!0},"info",2e3)}})}),"There will be User"]}))})),q=n(178),G=function(t){Object(d.a)(n,t);var e=Object(u.a)(n);function n(){return Object(s.a)(this,n),e.apply(this,arguments)}return Object(r.a)(n,[{key:"render",value:function(){return Object(F.jsx)(q.a,{children:Object(F.jsxs)("div",{className:l.a.main,children:[Object(F.jsx)("div",{className:l.a.sidebar,children:"1"}),Object(F.jsx)("div",{className:l.a.buttonsBlock,children:Object(F.jsxs)(P.d,{children:[Object(F.jsx)(P.b,{exact:!0,path:"/",render:function(){return Object(F.jsx)(Q,{})}}),Object(F.jsx)(P.b,{exact:!0,path:"/todos/:userId?",render:function(){return Object(F.jsx)(V,{})}})]})})]})})}}]),n}(c.a.Component),K=function(t){t&&t instanceof Function&&n.e(3).then(n.bind(null,207)).then((function(e){var n=e.getCLS,o=e.getFID,c=e.getFCP,i=e.getLCP,a=e.getTTFB;n(t),o(t),c(t),i(t),a(t)}))};a.a.render(Object(F.jsx)(c.a.StrictMode,{children:Object(F.jsx)(G,{})}),document.getElementById("root")),K()}},[[203,1,2]]]);
//# sourceMappingURL=main.d5d3e3a0.chunk.js.map