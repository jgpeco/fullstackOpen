(this["webpackJsonpexample-a"]=this["webpackJsonpexample-a"]||[]).push([[0],{41:function(t,e,n){},42:function(t,e,n){"use strict";n.r(e);var r=n(0),c=n(1),a=n(17),u=n.n(a),o=n(4),i=n.n(o),s=n(6),l=n(8),j=n(3),b=function(t){var e=t.note,n=t.toggleImportance,c=e.important?"make not important":"make important";return Object(r.jsxs)("li",{className:"note",children:[e.content,Object(r.jsx)("button",{onClick:n,children:c})]})},f=function(t){var e=t.message;return null===e?null:Object(r.jsx)("div",{className:"error",children:e})},p=n(5),d=n.n(p),m="/api/notes",O=function(){return d.a.get(m).then((function(t){return t.data}))},h=function(t){return d.a.post(m,t).then((function(t){return t.data}))},x=function(t,e){return d.a.put("".concat(m,"/").concat(t),e).then((function(t){return t.data}))},v={login:function(){var t=Object(s.a)(i.a.mark((function t(e){var n;return i.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,d.a.post("/api/login",e);case 2:return n=t.sent,t.abrupt("return",n.data);case 4:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()},g=function(){return Object(r.jsxs)("div",{style:{color:"green",fontStyle:"italic",fontSize:"1.2rem",display:"flex",justifyContent:"center",margin:"1.5rem"},children:[Object(r.jsx)("br",{}),Object(r.jsx)("em",{children:"Note app, Department of Pecosville"})]})},S=function(){var t=Object(c.useState)([]),e=Object(j.a)(t,2),n=e[0],a=e[1],u=Object(c.useState)(""),o=Object(j.a)(u,2),p=o[0],d=o[1],m=Object(c.useState)(!0),S=Object(j.a)(m,2),y=S[0],w=S[1],k=Object(c.useState)(null),C=Object(j.a)(k,2),N=C[0],D=C[1],I=Object(c.useState)(""),E=Object(j.a)(I,2),J=E[0],P=E[1],T=Object(c.useState)(""),z=Object(j.a)(T,2),B=z[0],L=z[1],M=Object(c.useState)(null),U=Object(j.a)(M,2),W=U[0],q=U[1];Object(c.useEffect)((function(){O().then((function(t){a(t)}))}),[]);var A=function(t){t.preventDefault();var e={content:p,date:(new Date).toISOString(),important:Math.random()<.5};h(e).then((function(t){a(n.concat(t)),d("")}))},F=function(t){d(t.target.value)},G=function(){var t=Object(s.a)(i.a.mark((function t(e){var n;return i.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return e.preventDefault(),t.prev=1,t.next=4,v.login({username:J,password:B});case 4:n=t.sent,console.log(n),q(n),P(""),L(""),t.next=15;break;case 11:t.prev=11,t.t0=t.catch(1),D("Wrong Credetials"),setTimeout((function(){D(null)}),4e3);case 15:case"end":return t.stop()}}),t,null,[[1,11]])})));return function(e){return t.apply(this,arguments)}}(),H=y?n:n.filter((function(t){return t.important}));return Object(r.jsxs)("div",{children:[Object(r.jsx)("h1",{children:"Notes"}),Object(r.jsx)(f,{message:N}),null===W?Object(r.jsxs)("form",{onSubmit:G,children:[Object(r.jsxs)("div",{children:["username",Object(r.jsx)("input",{type:"text",value:J,name:"Username",onChange:function(t){var e=t.target;return P(e.value)}})]}),Object(r.jsxs)("div",{children:["password",Object(r.jsx)("input",{type:"text",value:B,name:"Password",onChange:function(t){var e=t.target;return L(e.value)}})]}),Object(r.jsx)("button",{type:"submit",children:"Login"})]}):Object(r.jsxs)("div",{children:[Object(r.jsxs)("p",{children:[W.name," logged"]}),Object(r.jsxs)("form",{onSubmit:A,children:[Object(r.jsx)("input",{type:"text",value:p,onChange:F}),Object(r.jsx)("button",{type:"submit",children:"Save"})]})]}),Object(r.jsx)("div",{children:Object(r.jsxs)("button",{onClick:function(){return w(!y)},children:["show ",y?"important":"all"]})}),Object(r.jsx)("ul",{children:H.map((function(t){return Object(r.jsx)(b,{note:t,toggleImportance:function(){return function(t){var e=n.find((function(e){return e.id===t})),r=Object(l.a)(Object(l.a)({},e),{},{important:!e.important});x(t,r).then((function(e){return a(n.map((function(n){return n.id!==t?n:e})))})).catch((function(r){D("Note '".concat(e.content,"' was already removed from server")),setTimeout((function(){return D(null)}),5e3),a(n.filter((function(e){return e.id!==t})))}))}(t.id)}},t.id)}))}),Object(r.jsx)(g,{})]})};n(41);u.a.render(Object(r.jsx)(S,{}),document.getElementById("root"))}},[[42,1,2]]]);
//# sourceMappingURL=main.e94cd5ad.chunk.js.map