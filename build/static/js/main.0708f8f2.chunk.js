(this.webpackJsonpgroupshare=this.webpackJsonpgroupshare||[]).push([[0],{35:function(e,t,n){},46:function(e,t,n){},47:function(e,t,n){},72:function(e,t,n){},92:function(e,t,n){},93:function(e,t,n){},94:function(e,t,n){},95:function(e,t,n){"use strict";n.r(t);var i=n(1),a=n.n(i),r=n(17),c=n.n(r),s=(n(46),n(47),n(41)),o=n(4),u=n(16),l=function(){return Object(u.b)()},d=u.c,b=n(2),p=n.n(b),j=n(6),f=n(5),h=n(13),x=n.n(h);function v(){return new Promise((function(e){x.a.get("/api/video/all").then((function(t){e(t)}))}))}function m(e){return new Promise((function(t){x.a.get("/api/video/search/".concat(e)).then((function(e){t(e)}))}))}var g=Object(f.b)("videos/getVideosFromApi",Object(j.a)(p.a.mark((function e(){var t;return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,v();case 2:return t=e.sent,e.abrupt("return",t.data);case 4:case"end":return e.stop()}}),e)})))),O=Object(f.b)("videos/getSearchVideosFromApi",function(){var e=Object(j.a)(p.a.mark((function e(t){var n;return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,m(t);case 2:return n=e.sent,e.abrupt("return",n.data);case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),y=(Object(f.b)("video/getOneVideoFromApi",Object(j.a)(p.a.mark((function e(){var t;return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,v();case 2:return t=e.sent,e.abrupt("return",t.data);case 4:case"end":return e.stop()}}),e)})))),Object(f.c)({name:"upload",initialState:{status:"",videos:[],searchClicks:[0]},reducers:{setVideos:function(e,t){e.videos=t.payload},pushSearchClick:function(e){e.searchClicks[0]=(e.searchClicks[0]+1)%3}},extraReducers:function(e){e.addCase(g.pending,(function(e){e.status="loading"})).addCase(g.fulfilled,(function(e,t){e.status="idle",e.videos=t.payload.videos})).addCase(O.pending,(function(e,t){e.status="loading",e.videos=[]})).addCase(O.fulfilled,(function(e,t){e.status="idle",e.videos=t.payload.videos}))}})),w=y.actions,k=w.setVideos,C=w.pushSearchClick,S=function(e){return e.videos.videos},U=function(e){return e.videos.searchClicks},L=y.reducer,N=n(0);function _(){var e=Object(i.useState)(""),t=Object(s.a)(e,2),n=t[0],a=t[1],r=Object(o.f)(),c=l();return Object(N.jsx)("div",{style:{display:"inline-block",textAlign:"center"},children:Object(N.jsxs)("form",{onSubmit:function(e){e.preventDefault(),r.push("/results/search_query=".concat(encodeURIComponent(n))),c(C())},children:[Object(N.jsx)("input",{type:"text",value:n,onChange:function(e){e.preventDefault(),a(e.target.value)}}),Object(N.jsx)("button",{children:"Search"})]})})}var P=n(12);n(72);function I(){var e=Object(o.g)(),t=decodeURIComponent(e.query),n=l(),a=d(S),r=d(U),c=Object(o.f)();Object(i.useEffect)((function(){n(k([])),n(O(t))}),r);var s=a.map((function(e){return Object(N.jsxs)("div",{className:"searchrow",style:{padding:"20px 0px 20px 0px"},children:[Object(N.jsx)("div",{className:"img__container",children:Object(N.jsx)("img",{src:e.thumbnailPng,onMouseEnter:function(t){t.currentTarget.src=e.thumbnailGif},onMouseLeave:function(t){t.currentTarget.src=e.thumbnailPng},onClick:function(){return t=e._id,void c.push("/watch/".concat(t));var t}})}),Object(N.jsxs)("div",{className:"videoinfo",children:[Object(N.jsx)("p",{className:"video__title",children:e.title.length>50?"".concat(e.title.slice(0,25),"..."):e.title}),Object(N.jsx)("p",{className:"video__author",children:e.author}),Object(N.jsxs)("p",{className:"video__views",children:[e.views," views"]})]})]})}));return Object(N.jsxs)("div",{className:"grid",children:[Object(N.jsx)("div",{id:"sidebar",children:"Sidebar"}),Object(N.jsx)("div",{id:"searchrows",children:s})]})}n(35);function R(e){for(var t=atob(e.split(",")[1]),n=new ArrayBuffer(t.length),i=new Uint8Array(n),a=0;a<t.length;a++)i[a]=t.charCodeAt(a);return new Blob([n],{type:"video/webm"})}var T=Object(f.b)("upload/postVideo",function(){var e=Object(j.a)(p.a.mark((function e(t){var n,i,a,r,c,s,o;return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(n=t.state,i=t.token,a=t.history,""!==n.video){e.next=3;break}return e.abrupt("return");case 3:return t.dispatch(G("uploading")),r=new FormData,console.log("1111"),r.append("author",localStorage.username),r.append("description",n.description),console.log("2222"),e.next=11,fetch(n.thumbnailGifs[n.thumbnailGifsIndex]).then((function(e){return e.blob()}));case 11:return c=e.sent,e.next=14,fetch(n.thumbnailPngs[n.thumbnailPngsIndex]).then((function(e){return e.blob()}));case 14:s=e.sent,r.append("files",c,"".concat(n.fileName,".gif")),r.append("files",s,"".concat(n.fileName,".png")),console.log("33333"),r.append("status",n.status),r.append("title",n.title),r.append("url",n.url),o=R(n.video),r.append("files",o,n.fileName),console.log(r),console.log("4444"),x.a.post("/api/video",r,{headers:{token:i,author:localStorage.username}}).then((function(e){t.dispatch(G("idle")),"successful"===e.data.status?a.push("/"):a.push("/login")}));case 26:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),F=Object(f.c)({name:"upload",initialState:{author:"",description:"",fileName:"Upload",status:"idle",gifsVisibility:"",thumbnailGifsIndex:"0",thumbnailGifs:["","","",""],thumbnailPngsIndex:"0",thumbnailPngs:["","","",""],title:"",url:"",video:""},reducers:{setAuthor:function(e,t){e.author=t.payload},setTitle:function(e,t){e.title=t.payload},setDescription:function(e,t){e.description=t.payload},setUrl:function(e,t){e.url=t.payload},setFilename:function(e,t){e.fileName=t.payload},setGifsVisibility:function(e,t){e.gifsVisibility=t.payload},setThumbnailGifsIndex:function(e,t){e.thumbnailGifsIndex=t.payload},setThumbnailGifs:function(e,t){e.thumbnailGifs=t.payload},setThumbnailPngsIndex:function(e,t){e.thumbnailPngsIndex=t.payload},setThumbnailPngs:function(e,t){e.thumbnailPngs=t.payload},setStatus:function(e,t){e.status=t.payload},setVideo:function(e,t){e.video=t.payload}}}),A=F.actions,D=(A.setAuthor,A.setDescription),V=A.setFilename,E=A.setGifsVisibility,G=A.setStatus,B=A.setThumbnailGifsIndex,M=A.setThumbnailGifs,q=A.setThumbnailPngsIndex,W=A.setThumbnailPngs,J=A.setTitle,z=(A.setUrl,A.setVideo),H=function(e){return e.upload.author},$=function(e){return e.upload.description},K=function(e){return e.upload.fileName},Q=function(e){return e.upload.gifsVisibility},X=function(e){return e.upload.status},Y=function(e){return e.upload.thumbnailGifsIndex},Z=function(e){return e.upload.thumbnailGifs},ee=function(e){return e.upload.thumbnailPngsIndex},te=function(e){return e.upload.thumbnailPngs},ne=function(e){return e.upload.title},ie=function(e){return e.upload},ae=function(e){return e.upload.video},re=F.reducer;function ce(e,t){return new Promise((function(n){x.a.post("api/login/login",{username:e,password:t}).then((function(e){n(e)}))}))}var se={status:"",username:"user",password:"pass",errors:{username:"",password:""},loggedIn:!(void 0===localStorage.expiresAt||localStorage.expiresAt<Date.now())||(document.cookie="",!1),token:localStorage.username||document.cookie?document.cookie:""};var oe=Object(f.b)("login/loginFromApi",function(){var e=Object(j.a)(p.a.mark((function e(t){var n;return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,ce(t.username,t.password);case 2:return n=e.sent,e.abrupt("return",n.data);case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),ue=Object(f.c)({name:"login",initialState:se,reducers:{setUsername:function(e,t){e.username=t.payload},setPassword:function(e,t){e.password=t.payload},setUsernameError:function(e,t){e.errors.username=t.payload},setPasswordError:function(e,t){e.errors.password=t.payload},setLoggedIn:function(e,t){e.loggedIn=t.payload},setToken:function(e,t){e.token=t.payload}},extraReducers:function(e){e.addCase(oe.pending,(function(e){e.status="loading"})).addCase(oe.fulfilled,(function(e,t){e.status="idle"}))}}),le=ue.actions,de=le.setUsername,be=le.setPassword,pe=le.setUsernameError,je=le.setPasswordError,fe=le.setLoggedIn,he=le.setToken,xe=function(e){return e.login},ve=function(e){return e.login.username},me=function(e){return e.login.password},ge=function(e){return e.login.errors.username},Oe=function(e){return e.login.errors.password},ye=function(e){return e.login.loggedIn},we=function(e){return e.login.token},ke=ue.reducer,Ce=n(25),Se=Object(Ce.createFFmpeg)({log:!1});function Ue(){d(H);var e=d(ne),t=d($),n=d(K),a=d(ae),r=d(we),c=d(Q),s=d(Y),u=d(Z),b=d(ee),f=d(te),h=d(X),v=d(ie),m=l(),g=Object(o.f)(),O=d(ye);function y(e){return w.apply(this,arguments)}function w(){return(w=Object(j.a)(p.a.mark((function e(t){var n,i,a;return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!(null===t.target.files||t.target.files.length<1)){e.next=2;break}return e.abrupt("return");case 2:if((n=t.target.files[0]).type.startsWith("video")){e.next=5;break}return e.abrupt("return");case 5:m(G("uploading")),(i=document.createElement("video")).addEventListener("loadeddata",(function(){U(n,i.duration)})),i.src=URL.createObjectURL(new Blob([n])),i.load(),(a=new FileReader).onload=function(){m(z(a.result)),m(V(n.name))},a.readAsDataURL(n);case 13:case"end":return e.stop()}}),e)})))).apply(this,arguments)}O||g.push("/login"),Object(i.useEffect)((function(){O&&k()}),[]);var k=function(){var e=Object(j.a)(p.a.mark((function e(){return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(Se.isLoaded()){e.next=3;break}return e.next=3,Se.load();case 3:x.a.post("/test_file",{url:"https://groupsharetk.s3.us-west-1.amazonaws.com/videos/1625451065385+when+they+call+u+a+good+boi.webm"}).then((function(e){C(e.data.data)}));case 4:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();function C(e){return S.apply(this,arguments)}function S(){return(S=Object(j.a)(p.a.mark((function e(t){var n;return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:m(G("uploading")),(n=document.createElement("video")).addEventListener("loadeddata",(function(){U(t,n.duration)})),n.src=t,n.load(),m(z(t)),m(V("Test file.webm"));case 7:case"end":return e.stop()}}),e)})))).apply(this,arguments)}var U=function(){var e=Object(j.a)(p.a.mark((function e(t,n){var i,a,r,c,s,o,u,l,d,b,j,f,h,x,v,g,O,y;return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.t0=Se,e.next=3,Object(Ce.fetchFile)(t);case 3:return e.t1=e.sent,e.t0.FS.call(e.t0,"writeFile","video.mp4",e.t1),i=4,a=new Array(i),r=new Array(i),c="fps=1/".concat(n/(i+1)),e.next=12,Se.run("-i","video.mp4","-vf",c,"%d.png");case 12:r[0]=Se.FS("readFile","1.png"),r[1]=Se.FS("readFile","2.png"),r[2]=Se.FS("readFile","3.png"),r[3]=Se.FS("readFile","4.png"),s=0;case 17:if(!(s<i)){e.next=34;break}if(o=n/(i+1)*(s+1),u=Math.max(0,o-.5),l=Math.min(n,o+.5),d=u.toString(),b="".concat(s,".gif"),!(u+1<n)){e.next=28;break}return e.next=26,Se.run("-i","video.mp4","-t","1","-ss",d,"-f","gif",b);case 26:e.next=30;break;case 28:return e.next=30,Se.run("-i","video.mp4","-t",(n-l).toString(),"-ss",d,"-f","gif",b);case 30:a[s]=Se.FS("readFile",b);case 31:s++,e.next=17;break;case 34:j=URL.createObjectURL(new Blob([a[0].buffer],{type:"image/gif"})),f=URL.createObjectURL(new Blob([a[1].buffer],{type:"image/gif"})),h=URL.createObjectURL(new Blob([a[2].buffer],{type:"image/gif"})),x=URL.createObjectURL(new Blob([a[3].buffer],{type:"image/gif"})),v=URL.createObjectURL(new Blob([r[0].buffer],{type:"image/png"})),g=URL.createObjectURL(new Blob([r[1].buffer],{type:"image/png"})),O=URL.createObjectURL(new Blob([r[2].buffer],{type:"image/png"})),y=URL.createObjectURL(new Blob([r[3].buffer],{type:"image/png"})),m(M([j,f,h,x])),m(W([v,g,O,y])),m(G("idle"));case 45:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}();var L=Object(N.jsxs)("div",{id:"preview--header",children:[Object(N.jsx)("div",{children:"Preview"}),Object(N.jsxs)("div",{children:[Object(N.jsx)("button",{onClick:function(e){e.preventDefault(),m(E("1"))},children:"Show"}),Object(N.jsx)("button",{onClick:function(e){e.preventDefault(),m(E("0"))},children:"Hide"})]}),Object(N.jsx)("input",{type:"file",accept:"video/*",onChange:y})]});return""===a&&(L=Object(N.jsxs)("div",{children:[Object(N.jsxs)("label",{children:["Video",Object(N.jsxs)("div",{id:"videoprev",style:{textAlign:"end"},children:[n,Object(N.jsx)("input",{style:{color:"black"},accept:"video/*",type:"file",onChange:y})]})]}),Object(N.jsx)("br",{})]})),Object(N.jsx)("form",{onSubmit:function(e){e.preventDefault(),m(T({state:v,token:r,history:g,dispatch:m}))},children:Object(N.jsxs)("div",{id:"form-container",children:[Object(N.jsx)("div",{id:"side-spacer-left"}),Object(N.jsxs)("div",{id:"inputs",className:"inputs",children:[Object(N.jsxs)("label",{id:"title",children:["Title",Object(N.jsx)("br",{}),Object(N.jsx)("textarea",{id:"title__textarea",value:e,onChange:function(e){e.preventDefault(),m(J(e.target.value))}})]}),Object(N.jsx)("br",{}),Object(N.jsx)("br",{}),Object(N.jsxs)("label",{children:["Description",Object(N.jsx)("br",{}),Object(N.jsx)("textarea",{id:"description__textarea",value:t,onChange:function(e){e.preventDefault(),m(D(e.target.value))},style:{height:"120px"}}),Object(N.jsx)("br",{})]}),Object(N.jsx)("br",{}),Object(N.jsxs)("label",{id:"thumbnail",children:["Thumbnail",Object(N.jsx)("br",{}),Object(N.jsx)("div",{id:"thumbnail-box-area",children:Object(N.jsxs)("div",{className:"thumbnail-section",children:[Object(N.jsx)("img",{src:f[0],className:"thumbnail-box",onClick:function(){return m(q("0"))},style:{opacity:"0"===b?"1":"0.25"}}),Object(N.jsx)("img",{src:f[1],className:"thumbnail-box",onClick:function(){return m(q("1"))},style:{opacity:"1"===b?"1":"0.25"}}),Object(N.jsx)("img",{src:f[2],className:"thumbnail-box",onClick:function(){return m(q("2"))},style:{opacity:"2"===b?"1":"0.25"}}),Object(N.jsx)("img",{src:f[3],className:"thumbnail-box",onClick:function(){return m(q("3"))},style:{opacity:"3"===b?"1":"0.25"}})]})})]}),Object(N.jsx)("br",{}),Object(N.jsx)("div",{style:{display:"flex",justifyContent:"center"},children:Object(N.jsx)("button",{children:"Upload"})})]}),Object(N.jsxs)("div",{id:"video-right",children:[Object(N.jsxs)("div",{id:"video-right--dialog",style:{display:"uploading"===h?"block":"none",opacity:"1"},children:[Object(N.jsx)("h3",{style:{paddingTop:"15px"},children:"Loading"}),Object(N.jsx)("hr",{}),Object(N.jsx)("h5",{children:"This may take several seconds."})]}),Object(N.jsxs)("div",{id:"video-right--content",style:{opacity:"idle"===h?"1":"0"},children:[L,Object(N.jsxs)("div",{className:"thumbnail-section",style:{opacity:c,pointerEvents:"0"===c?"none":"unset"},children:[Object(N.jsx)("img",{src:u[0],className:"thumbnail-box",onClick:function(){return m(B("0"))},style:{opacity:"0"===s?"1":"idle"===h?.25:0}}),Object(N.jsx)("img",{src:u[1],className:"thumbnail-box",onClick:function(){return m(B("1"))},style:{opacity:"1"===s?"1":"idle"===h?.25:0}}),Object(N.jsx)("img",{src:u[2],className:"thumbnail-box",onClick:function(){return m(B("2"))},style:{opacity:"2"===s?"1":"idle"===h?.25:0}}),Object(N.jsx)("img",{src:u[3],className:"thumbnail-box",onClick:function(){return m(B("3"))},style:{opacity:"3"===s?"1":"idle"===h?.25:0}})]})]})]}),Object(N.jsx)("div",{id:"side-spacer-right"})]})})}n(92);function Le(){var e=l(),t=d(S),n=Object(o.f)();Object(i.useEffect)((function(){e(g())}),[]);var a=null===t||void 0===t?void 0:t.map((function(e){return Object(N.jsxs)("div",{className:"video",children:[Object(N.jsx)("img",{src:e.thumbnailPng,onMouseEnter:function(t){t.currentTarget.src=e.thumbnailGif},onMouseLeave:function(t){t.currentTarget.src=e.thumbnailPng},onClick:function(){return t=e._id,void n.push("/watch/".concat(t));var t}}),Object(N.jsxs)("div",{children:[Object(N.jsx)("p",{className:"video__title",children:e.title.length>25?"".concat(e.title.slice(0,25),"..."):e.title}),Object(N.jsx)("p",{className:"video__author",children:e.author}),Object(N.jsxs)("p",{className:"video__views",children:[e.views," views"]})]})]})}));return Object(N.jsxs)("div",{id:"home",children:[Object(N.jsx)("div",{id:"sidebar"}),Object(N.jsx)("div",{id:"allvideos",children:a})]})}var Ne=Object(f.c)({name:"upload",initialState:{status:"",video:[]},reducers:{setVideo:function(e,t){e.video[0]=t.payload}}}),_e=Ne.actions.setVideo,Pe=function(e){return e.oneVideo.video},Ie=Ne.reducer;n(93);function Re(){var e=l(),t=(Object(o.f)(),d(Pe)),n=Object(o.g)();return Object(i.useEffect)((function(){var t;(t=n.id,new Promise((function(e){x.a.get("/api/video/one/".concat(t)).then((function(t){e(t)}))}))).then((function(t){e(_e(t.data.videos[0]));var n=document.getElementById("video");n.load(),n.play()}))}),[n.id]),0===t.length||"string"===typeof t[0]?Object(N.jsx)("div",{children:"Loading..."}):Object(N.jsxs)("div",{id:"container",children:[Object(N.jsxs)("div",{id:"onevideocontainer",children:[Object(N.jsx)("div",{id:"video__container",children:Object(N.jsx)("video",{id:"video",controls:!0,children:Object(N.jsx)("source",{src:t[0].src,type:"video/mp4"})})}),Object(N.jsx)("div",{id:"title",children:t[0].title}),Object(N.jsxs)("div",{id:"description",children:[Object(N.jsxs)("span",{style:{paddingRight:"25px"},children:[t[0].views," views"]}),new Date(t[0].date).toDateString()]}),Object(N.jsxs)("div",{children:[Object(N.jsxs)("div",{style:{display:"flex",justifyContent:"flex-end"},children:[t[0].likes," likes"]}),Object(N.jsx)("hr",{})]})]}),Object(N.jsx)("div",{id:"sidebar",children:"Sidebar..."})]})}function Te(){var e=l(),t=d(xe),n=d(ve),i=d(me),a=d(ge),r=d(Oe),c=Object(o.f)();function s(t,n){switch(t){case"username":n.length<4?e(pe("Username must be at least ".concat(4," characters long!"))):e(pe(""));break;case"password":n.length<4?e(je("Password must be at least ".concat(4," characters long!"))):e(je(""))}}return Object(N.jsx)("div",{style:{textAlign:"center"},children:Object(N.jsxs)("form",{onSubmit:function(a){a.preventDefault(),n.length<4||i.length<4||e(oe(t)).then((function(t){"successful"===t.payload.status?(localStorage.setItem("username",t.payload.username),localStorage.setItem("token",t.payload.token),localStorage.setItem("expiresAt",Date.now()+t.payload.expiresIn),document.cookie=t.payload.token,e(fe(!0)),e(he(t.payload.token)),c.push("/")):"wrong_password"===t.payload.status?e(je("Incorrect Password!")):(e(pe("Incorrect Login Details!")),e(je("Incorrect Login Details!")))}))},children:[Object(N.jsxs)("label",{children:["Username:",Object(N.jsx)("br",{}),Object(N.jsx)("input",{type:"text",name:"username",value:n,onChange:function(t){e(de(t.target.value)),s("username",t.target.value)}}),Object(N.jsx)("br",{}),a]}),Object(N.jsx)("br",{}),Object(N.jsxs)("label",{children:["Password:",Object(N.jsx)("br",{}),Object(N.jsx)("input",{type:"password",name:"password",value:i,onChange:function(t){e(be(t.target.value)),s("password",t.target.value)}}),Object(N.jsx)("br",{}),r]}),Object(N.jsx)("br",{}),Object(N.jsx)("br",{}),Object(N.jsx)("input",{type:"submit",value:"Login"})]})})}n(94);var Fe=function(){return Object(N.jsx)("div",{id:"App",children:Object(N.jsxs)(P.a,{children:[Object(N.jsxs)("div",{id:"header",children:[Object(N.jsx)(P.b,{style:{display:"inline-block",textDecoration:"none"},to:"/",children:Object(N.jsx)("p",{id:"logo",children:"GroupShare"})}),Object(N.jsx)("div",{style:{textAlign:"center",paddingTop:"17px"},children:Object(N.jsx)(_,{})}),Object(N.jsxs)("div",{style:{paddingTop:"19px"},children:[Object(N.jsx)("button",{className:"button__square",style:{marginRight:"22px"},children:Object(N.jsx)(P.b,{style:{display:"inline-block",padding:"0 15px 0 15px",textDecoration:"none"},to:"/login",children:d(ye)?"Switch User":"Login"})}),Object(N.jsx)("button",{className:"button__square",children:Object(N.jsx)(P.b,{style:{display:"inline-block",padding:"0 15px 0 15px",textDecoration:"none"},to:"/upload",children:"Upload"})})]})]}),Object(N.jsxs)(o.c,{children:[Object(N.jsx)(o.a,{exact:!0,path:"/",children:Object(N.jsx)(Le,{})}),Object(N.jsx)(o.a,{exact:!0,path:"/watch/:id",children:Object(N.jsx)(Re,{})}),Object(N.jsx)(o.a,{path:"/results/search_query=:query",children:Object(N.jsx)(I,{})}),Object(N.jsx)(o.a,{path:"/login",children:Object(N.jsx)(Te,{})}),Object(N.jsx)(o.a,{path:"/upload",children:Object(N.jsx)(Ue,{})})]})]})})};function Ae(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1;return new Promise((function(t){return setTimeout((function(){return t({data:e})}),500)}))}var De=Object(f.b)("counter/fetchCount",function(){var e=Object(j.a)(p.a.mark((function e(t){var n;return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Ae(t);case 2:return n=e.sent,e.abrupt("return",n.data);case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),Ve=Object(f.c)({name:"counter",initialState:{value:0,status:"idle"},reducers:{increment:function(e){e.value+=1},decrement:function(e){e.value-=1},incrementByAmount:function(e,t){e.value+=t.payload}},extraReducers:function(e){e.addCase(De.pending,(function(e){e.status="loading"})).addCase(De.fulfilled,(function(e,t){e.status="idle",e.value+=t.payload}))}}),Ee=Ve.actions,Ge=(Ee.increment,Ee.decrement,Ee.incrementByAmount,Ve.reducer),Be=Object(f.a)({reducer:{counter:Ge,upload:re,videos:L,oneVideo:Ie,login:ke}});Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(Object(N.jsx)(a.a.StrictMode,{children:Object(N.jsx)(u.a,{store:Be,children:Object(N.jsx)(Fe,{})})}),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[95,1,2]]]);