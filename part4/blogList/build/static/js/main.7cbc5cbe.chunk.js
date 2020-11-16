(this["webpackJsonpbloglist-frontend"]=this["webpackJsonpbloglist-frontend"]||[]).push([[0],{16:function(e,t,n){e.exports=n(40)},39:function(e,t,n){},40:function(e,t,n){"use strict";n.r(t);var r=n(0),a=n.n(r),c=n(15),u=n.n(c),o=n(1),s=n.n(o),l=n(2),i=n(3),p=function(e){var t=e.message,n=e.messageType;return t?a.a.createElement("div",{className:"notification-".concat(n)},t):null},f=function(e){var t=e.blog,n=e.updateBlog,c=e.deleteBlog,u=e.loggedUser,o=Object(r.useState)(!1),p=Object(i.a)(o,2),f=p[0],m=p[1],d=Object(r.useState)(!1),v=Object(i.a)(d,2),b=v[0],g=v[1];Object(r.useEffect)((function(){u.username&&u.username===t.user.username&&g(!0)}),[]);var h={display:f?"":"none"},w=function(){var e=Object(l.a)(s.a.mark((function e(){var r;return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r={user:t.user.id,title:t.title,author:t.author,url:t.url,likes:t.likes+1,id:t.id},e.next=3,n(r);case 3:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),E=function(){var e=Object(l.a)(s.a.mark((function e(){var n;return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!window.confirm("Are you sure you want to delete this blog? This action is irreversible")){e.next=4;break}return n={id:t.id,user:t.user.id},e.next=4,c(n);case 4:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return a.a.createElement("div",{style:{marginBottom:"0.5rem",paddingTop:"0.5rem",border:"1px solid black"}},a.a.createElement("div",null,t.title," ",a.a.createElement("button",{onClick:function(){return m(!f)}},"View Details")),a.a.createElement("div",{style:h},a.a.createElement("p",null,"Author: ",t.author),a.a.createElement("p",null,"URL: ",t.url),t.user?a.a.createElement("p",null,"Likes: ",t.likes," ",a.a.createElement("button",{onClick:w},"like")):null,b&&a.a.createElement("p",null,a.a.createElement("button",{onClick:E},"Remove"))))},m=function(e){var t=e.createBlog,n=Object(r.useState)(""),c=Object(i.a)(n,2),u=c[0],o=c[1],p=Object(r.useState)(""),f=Object(i.a)(p,2),m=f[0],d=f[1],v=Object(r.useState)(""),b=Object(i.a)(v,2),g=b[0],h=b[1],w=function(){var e=Object(l.a)(s.a.mark((function e(n){var r;return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n.preventDefault(),r={title:u,author:m,url:g},e.next=4,t(r);case 4:o(""),d(""),h("");case 7:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();return a.a.createElement("form",{onSubmit:w},a.a.createElement("div",null,"title: ",a.a.createElement("input",{type:"text",value:u,name:"blogTitle",onChange:function(e){var t=e.target;return o(t.value)}})),a.a.createElement("div",null,"author: ",a.a.createElement("input",{type:"text",value:m,name:"blogAuthor",onChange:function(e){var t=e.target;return d(t.value)}})),a.a.createElement("div",null,"url: ",a.a.createElement("input",{type:"text",value:g,onChange:function(e){var t=e.target;return h(t.value)}})),a.a.createElement("button",{type:"submit"},"Create New Blog"))},d=function(e){var t=Object(r.useState)(!1),n=Object(i.a)(t,2),c=n[0],u=n[1],o=function(){return u(!c)},s={display:c?"none":""},l={display:c?"":"none"};return a.a.createElement("div",null,a.a.createElement("div",{style:s},a.a.createElement("button",{onClick:o},e.buttonName)),a.a.createElement("div",{style:l},e.children,a.a.createElement("button",{onClick:o},"Go Back")))},v=n(5),b=n.n(v),g="/api/blogs",h=null,w={getAll:function(){var e=Object(l.a)(s.a.mark((function e(){var t;return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,b.a.get(g);case 2:return t=e.sent,e.abrupt("return",t.data);case 4:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),setToken:function(e){h="Bearer ".concat(e)},create:function(){var e=Object(l.a)(s.a.mark((function e(t){var n,r;return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n={headers:{Authorization:h}},e.next=3,b.a.post(g,t,n);case 3:return r=e.sent,e.abrupt("return",r.data);case 5:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),update:function(){var e=Object(l.a)(s.a.mark((function e(t){var n;return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,b.a.put("".concat(g,"/").concat(t.id),t);case 2:return n=e.sent,e.abrupt("return",n.data);case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),deleteItem:function(){var e=Object(l.a)(s.a.mark((function e(t){var n,r;return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n={headers:{Authorization:h}},console.log("config header",n),console.log("deleteObj received",t),console.log("path using in axios delete","".concat(g,"/").concat(t.id)),e.next=6,b.a.delete("".concat(g,"/").concat(t.id),n,t);case 6:return r=e.sent,console.log("response from the server when deleting",r),e.abrupt("return",r.data);case 9:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()},E={login:function(){var e=Object(l.a)(s.a.mark((function e(t){var n;return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,b.a.post("/api/login",t);case 2:return n=e.sent,e.abrupt("return",n.data);case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()},O=function(){var e=Object(r.useState)([]),t=Object(i.a)(e,2),n=t[0],c=t[1],u=Object(r.useState)(""),o=Object(i.a)(u,2),v=o[0],b=o[1],g=Object(r.useState)(""),h=Object(i.a)(g,2),O=h[0],k=h[1],j=Object(r.useState)(null),x=Object(i.a)(j,2),y=x[0],B=x[1],S=Object(r.useState)(""),C=Object(i.a)(S,2),T=C[0],I=C[1],N=Object(r.useState)(""),U=Object(i.a)(N,2),A=U[0],J=U[1];Object(r.useEffect)(Object(l.a)(s.a.mark((function e(){var t;return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,w.getAll();case 2:t=e.sent,c(t.sort((function(e,t){return t.likes-e.likes})));case 4:case"end":return e.stop()}}),e)}))),[]),Object(r.useEffect)((function(){var e=JSON.parse(window.localStorage.getItem("loggedBloglistUser"));e&&(B(e),w.setToken(e.token))}),[]);var L=function(){b(""),k("")},z=function(e,t){I(e),J(t),setTimeout((function(){I(""),J("")}),4e3)},D=function(){var e=Object(l.a)(s.a.mark((function e(t){var n;return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.preventDefault(),e.prev=1,e.next=4,E.login({username:v,password:O});case 4:n=e.sent,window.localStorage.setItem("loggedBloglistUser",JSON.stringify(n)),w.setToken(n.token),B(n),L(),e.next=15;break;case 11:e.prev=11,e.t0=e.catch(1),z("Wrong Credentials","error"),L();case 15:case"end":return e.stop()}}),e,null,[[1,11]])})));return function(t){return e.apply(this,arguments)}}(),R=function(){var e=Object(l.a)(s.a.mark((function e(t){var r;return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,w.create(t);case 3:r=e.sent,c(n.concat(r)),z("New Blog ".concat(r.title," added"),"success"),e.next=11;break;case 8:e.prev=8,e.t0=e.catch(0),z("Invalid or missing information on form","error");case 11:case"end":return e.stop()}}),e,null,[[0,8]])})));return function(t){return e.apply(this,arguments)}}(),G=function(){var e=Object(l.a)(s.a.mark((function e(t){var r;return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,w.update(t);case 3:r=e.sent,c(n.map((function(e){return e.id===r.id?r:e}))),z("Blog ".concat(r.title," updated"),"success"),e.next=11;break;case 8:e.prev=8,e.t0=e.catch(0),z("Invalid action","error");case 11:case"end":return e.stop()}}),e,null,[[0,8]])})));return function(t){return e.apply(this,arguments)}}(),P=function(){var e=Object(l.a)(s.a.mark((function e(t){return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,w.deleteItem(t);case 3:c(n.filter((function(e){return e.id!==t.id}))),z("Blog Removed","success"),e.next=10;break;case 7:e.prev=7,e.t0=e.catch(0),z("You don't have authorization for this action","error");case 10:case"end":return e.stop()}}),e,null,[[0,7]])})));return function(t){return e.apply(this,arguments)}}();if(null===y)return a.a.createElement("form",{onSubmit:D},a.a.createElement(p,{message:T,messageType:A}),a.a.createElement("div",null,"Username:",a.a.createElement("input",{type:"text",value:v,name:"username",onChange:function(e){return b(e.target.value)}})),a.a.createElement("div",null,"Password:",a.a.createElement("input",{type:"text",value:O,name:"password",onChange:function(e){return k(e.target.value)}})),a.a.createElement("button",{type:"submit"},"Login"));var V=y||!1;return a.a.createElement("div",null,a.a.createElement("h2",null,"blogs"),a.a.createElement(p,{message:T,messageType:A}),a.a.createElement("p",null,y.name," is logged ",a.a.createElement("button",{onClick:function(){window.localStorage.removeItem("loggedBloglistUser"),B(null),w.setToken(null),z("User logged out","success"),L()}},"Logout")),a.a.createElement("h2",null,"Create Blog"),a.a.createElement(d,{buttonName:"Create New Blog"},a.a.createElement(m,{createBlog:R})),n.map((function(e){return a.a.createElement(f,{key:e.id,blog:e,updateBlog:G,deleteBlog:P,loggedUser:V})})))};n(39);u.a.render(a.a.createElement(O,null),document.getElementById("root"))}},[[16,1,2]]]);
//# sourceMappingURL=main.7cbc5cbe.chunk.js.map