(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[831],{864:()=>{},928:(e,l,t)=>{Promise.resolve().then(t.bind(t,6373))},1099:()=>{},6373:(e,l,t)=>{"use strict";t.d(l,{default:()=>c});var s=t(6658),i=t(9242);t(1099);let a=e=>{let{stories:l,onSelectPost:t}=e,[a,n]=(0,i.useState)("All"),o=["All",...new Set(l.map(e=>e.topic))],r="All"===a?l:l.filter(e=>e.topic===a),c=(e,l)=>e.length<=l?e:e.substring(0,l)+"...";return(0,s.jsxs)("div",{className:"h-full p-4 flex flex-col bg-white rounded-2xl shadow-inner",children:[(0,s.jsx)("label",{htmlFor:"typeFilter",className:"text-sm text-gray-600 mb-2 font-medium",children:"Filter by Topic"}),(0,s.jsx)("select",{id:"typeFilter",value:a,onChange:e=>n(e.target.value),className:"mb-4 p-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-800 focus:outline-none focus:ring-2 focus:ring-violet-400",children:o.map(e=>(0,s.jsx)("option",{value:e,children:e},e))}),(0,s.jsx)("ul",{className:"flex-grow space-y-3 overflow-y-auto pr-1",children:r.map(e=>(0,s.jsx)("li",{children:(0,s.jsxs)("button",{onClick:()=>t(e.title),className:"w-full text-left p-3 rounded-lg hover:bg-violet-100 transition-colors duration-200",children:[(0,s.jsxs)("div",{className:"flex items-center gap-2",children:[(0,s.jsx)("div",{className:"w-2.5 h-2.5 bg-violet-400 rounded-full"}),(0,s.jsx)("h3",{className:"font-semibold text-gray-900 text-sm line-clamp-1",children:e.title})]}),(0,s.jsx)("p",{className:"text-xs text-gray-600 mt-1 pl-5 line-clamp-2",children:c(e.content,100)})]})},e.title))})]})};var n=t(617),o=t(4636);t(864);let r=e=>{let{title:l,content:t,date:i}=e;return(0,s.jsxs)("div",{className:" h-full pl-4 pt-2 justify-center",children:[(0,s.jsx)("div",{className:"font-bold text-5xl flex text-indigo-900 pb-4",children:l}),(0,s.jsx)("p",{className:"text-gray-900 font-medium flex pt-2 pb-2",children:i}),(0,s.jsx)("div",{className:"markdown-body pt-4 ",children:(0,s.jsx)(n.oz,{remarkPlugins:[[o.A]],children:t})})]})},c=e=>{let{stories:l}=e,[t,n]=(0,i.useState)(null),o={title:"Welcome to my playground!!",date:"2024/7/12",topic:"Mainpage",content:"\n      This is a place where I write some stories about technology, personal... or lifestyle\n      \n      This is also a place I'll be experimenting with new technologies and learning about the world around me.\n      "};return(0,s.jsx)("div",{className:"flex w-full h-full bg-violet-50 p-10",children:(0,s.jsxs)("div",{className:"flex w-full h-full mx-auto gap-4",children:[(0,s.jsx)("div",{className:"w-[18%] bg-white h-full rounded-2xl shadow-md overflow-y-auto",children:(0,s.jsx)(a,{stories:l,onSelectPost:e=>{let t=l.find(l=>l.title===e);t&&n(t)}})}),(0,s.jsx)("div",{className:"flex-1 h-full bg-white rounded-2xl shadow-md p-6 overflow-y-auto",children:t?(0,s.jsx)(r,{title:t.title,content:t.content,date:t.date,topic:t.topic}):(0,s.jsx)(r,{title:o.title,content:o.content,date:o.date,topic:o.topic})})]})})}}},e=>{var l=l=>e(e.s=l);e.O(0,[222,188,773,261,358],()=>l(928)),_N_E=e.O()}]);