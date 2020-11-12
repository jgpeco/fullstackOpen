(this["webpackJsonpbloglist-frontend"]=this["webpackJsonpbloglist-frontend"]||[]).push([[0],{16:function(e,t,n){e.exports=n(39)},39:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),u=n(15),c=n.n(u),o=n(1),l=n.n(o),s=n(3),i=n(4),p=function(e){var t=e.blog;return r.a.createElement("div",null,t.title," ",t.author)},f=n(5),m=n.n(f),g=null,v={getAll:function(){var e=Object(s.a)(l.a.mark((function e(){var t;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,m.a.get("/api/blogs");case 2:return t=e.sent,e.abrupt("return",t.data);case 4:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),setToken:function(e){g="Bearer ".concat(e)},create:function(){var e=Object(s.a)(l.a.mark((function e(t){var n,a;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n={headers:{Authorization:g}},e.next=3,m.a.post("/api/blogs",t,n);case 3:return a=e.sent,e.abrupt("return",a.data);case 5:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()},b={login:function(){var e=Object(s.a)(l.a.mark((function e(t){var n;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,m.a.post("/api/login",t);case 2:return n=e.sent,e.abrupt("return",n.data);case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()},d=function(){var e=Object(a.useState)([]),t=Object(i.a)(e,2),n=t[0],u=t[1],c=Object(a.useState)(""),o=Object(i.a)(c,2),f=o[0],m=o[1],g=Object(a.useState)(""),d=Object(i.a)(g,2),h=d[0],O=d[1],E=Object(a.useState)(""),j=Object(i.a)(E,2),w=j[0],x=j[1],k=Object(a.useState)(""),y=Object(i.a)(k,2),S=y[0],C=y[1],B=Object(a.useState)(""),T=Object(i.a)(B,2),I=T[0],A=T[1],J=Object(a.useState)(null),U=Object(i.a)(J,2),N=U[0],D=U[1],L=Object(a.useState)(""),z=Object(i.a)(L,2),M=z[0],P=z[1];Object(a.useEffect)(Object(s.a)(l.a.mark((function e(){var t;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,v.getAll();case 2:t=e.sent,u(t);case 4:case"end":return e.stop()}}),e)}))),[]),Object(a.useEffect)((function(){var e=JSON.parse(window.localStorage.getItem("loggedBloglistUser"));e&&(D(e),v.setToken(e.token))}),[]);var W=function(){C(""),A("")},q=function(){m(""),O(""),x("")},F=function(){var e=Object(s.a)(l.a.mark((function e(t){var n;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.preventDefault(),e.prev=1,e.next=4,b.login({username:S,password:I});case 4:n=e.sent,window.localStorage.setItem("loggedBloglistUser",JSON.stringify(n)),v.setToken(n.token),D(n),W(),e.next=17;break;case 11:e.prev=11,e.t0=e.catch(1),P("Wrong Credentials"),W(),console.log(M),setTimeout((function(){P("")}),4e3);case 17:case"end":return e.stop()}}),e,null,[[1,11]])})));return function(t){return e.apply(this,arguments)}}(),G=function(){var e=Object(s.a)(l.a.mark((function e(t){var a;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.preventDefault(),e.prev=1,e.next=4,v.create({title:f,author:h,url:w});case 4:a=e.sent,u(n.concat(a)),q(),e.next=14;break;case 9:e.prev=9,e.t0=e.catch(1),P("Invalid or Missing Blog Information"),q(),setTimeout((function(){P("")}),4e3);case 14:case"end":return e.stop()}}),e,null,[[1,9]])})));return function(t){return e.apply(this,arguments)}}();return null===N?r.a.createElement("form",{onSubmit:F},r.a.createElement("div",null,"Username:",r.a.createElement("input",{type:"text",value:S,name:"username",onChange:function(e){return C(e.target.value)}})),r.a.createElement("div",null,"Password:",r.a.createElement("input",{type:"text",value:I,name:"password",onChange:function(e){return A(e.target.value)}})),r.a.createElement("button",{type:"submit"},"Login")):r.a.createElement("div",null,r.a.createElement("h2",null,"blogs"),r.a.createElement("p",null,N.name," is logged ",r.a.createElement("button",{onClick:function(){window.localStorage.removeItem("loggedBloglistUser"),D(null),v.setToken(null),W(),q()}},"Logout")),r.a.createElement("h2",null,"Create Blog"),r.a.createElement("form",{onSubmit:G},r.a.createElement("div",null,"title: ",r.a.createElement("input",{type:"text",value:f,name:"blogTitle",onChange:function(e){var t=e.target;return m(t.value)}})),r.a.createElement("div",null,"author: ",r.a.createElement("input",{type:"text",value:h,name:"blogAuthor",onChange:function(e){var t=e.target;return O(t.value)}})),r.a.createElement("div",null,"url: ",r.a.createElement("input",{type:"text",value:w,onChange:function(e){var t=e.target;return x(t.value)}})),r.a.createElement("button",{type:"submit"},"Create New Blog")),n.map((function(e){return r.a.createElement(p,{key:e.id,blog:e})})))};c.a.render(r.a.createElement(d,null),document.getElementById("root"))}},[[16,1,2]]]);
//# sourceMappingURL=main.cb6467ad.chunk.js.map