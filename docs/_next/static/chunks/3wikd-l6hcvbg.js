(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,7284,e=>{"use strict";function t(){for(var e,t,r=0,a="",n=arguments.length;r<n;r++)(e=arguments[r])&&(t=function e(t){var r,a,n="";if("string"==typeof t||"number"==typeof t)n+=t;else if("object"==typeof t)if(Array.isArray(t)){var s=t.length;for(r=0;r<s;r++)t[r]&&(a=e(t[r]))&&(n&&(n+=" "),n+=a)}else for(a in t)t[a]&&(n&&(n+=" "),n+=a);return n}(e))&&(a&&(a+=" "),a+=t);return a}e.s(["clsx",0,t,"default",0,t])},18550,e=>{"use strict";var t=e.i(23426);let r=e=>{let t=e.replace(/^([A-Z])|[\s-_]+(\w)/g,(e,t,r)=>r?r.toUpperCase():t.toLowerCase());return t.charAt(0).toUpperCase()+t.slice(1)},a=(...e)=>e.filter((e,t,r)=>!!e&&""!==e.trim()&&r.indexOf(e)===t).join(" ").trim();var n={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};let s=(0,t.forwardRef)(({color:e="currentColor",size:r=24,strokeWidth:s=2,absoluteStrokeWidth:i,className:o="",children:l,iconNode:d,...c},u)=>(0,t.createElement)("svg",{ref:u,...n,width:r,height:r,stroke:e,strokeWidth:i?24*Number(s)/Number(r):s,className:a("lucide",o),...c},[...d.map(([e,r])=>(0,t.createElement)(e,r)),...Array.isArray(l)?l:[l]]));e.s(["default",0,(e,n)=>{let i=(0,t.forwardRef)(({className:i,...o},l)=>(0,t.createElement)(s,{ref:l,iconNode:n,className:a(`lucide-${r(e).replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase()}`,`lucide-${e}`,i),...o}));return i.displayName=r(e),i}],18550)},65993,e=>{"use strict";var t=e.i(76979),r=e.i(19455);let a=(0,e.i(18550).default)("code-xml",[["path",{d:"m18 16 4-4-4-4",key:"1inbqp"}],["path",{d:"m6 8-4 4 4 4",key:"15zrgr"}],["path",{d:"m14.5 4-5 16",key:"e7oirm"}]]),n=()=>(0,t.jsx)("header",{className:"fixed top-0 w-full z-50 bg-background/80 backdrop-blur-sm border-b",children:(0,t.jsxs)("div",{className:"container mx-auto px-6 py-4 flex items-center justify-between",children:[(0,t.jsxs)("div",{className:"flex items-center gap-3",children:[(0,t.jsx)(a,{className:"w-8 h-8 text-primary animate-pulse"}),(0,t.jsx)("span",{className:"text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600",children:"Animated Page"})]}),(0,t.jsxs)("nav",{className:"flex items-center gap-4",children:[(0,t.jsx)(r.Button,{variant:"outline",children:"Plans"}),(0,t.jsx)(r.Button,{children:"Try Agent"})]})]})}),s=()=>(0,t.jsxs)("div",{className:"w-full max-w-md bg-white/20 backdrop-blur-lg rounded-2xl shadow-lg p-8 space-y-6 transform hover:scale-105 transition-transform duration-500",children:[(0,t.jsx)("h2",{className:"text-3xl font-bold text-white text-center animate-fade-in-down",children:"Login"}),(0,t.jsxs)("div",{className:"space-y-4 animate-fade-in-up animation-delay-300",children:[(0,t.jsxs)("div",{children:[(0,t.jsx)("label",{className:"text-white/80",children:"Username"}),(0,t.jsx)("input",{type:"text",className:"w-full mt-2 p-3 bg-white/30 rounded-lg border border-white/40 focus:ring-2 focus:ring-white/60 focus:outline-none text-white transition-all duration-300 focus:bg-white/40",placeholder:"Enter your username"})]}),(0,t.jsxs)("div",{children:[(0,t.jsx)("label",{className:"text-white/80",children:"Password"}),(0,t.jsx)("input",{type:"password",className:"w-full mt-2 p-3 bg-white/30 rounded-lg border border-white/40 focus:ring-2 focus:ring-white/60 focus:outline-none text-white transition-all duration-300 focus:bg-white/40",placeholder:"Enter your password"})]})]}),(0,t.jsx)("button",{className:"w-full p-3 bg-pink-500 text-white rounded-lg font-bold hover:bg-pink-600 transition-transform transform hover:scale-105 active:scale-95 duration-300 animate-bounce-in animation-delay-600",children:"Login"})]}),i=`
@keyframes fade-in-down {
  0% {
    opacity: 0;
    transform: translateY(-20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}
@keyframes fade-in-up {
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}
@keyframes bounce-in {
  0% {
    opacity: 0;
    transform: scale(0.3);
  }
  50% {
    opacity: 1;
    transform: scale(1.05);
  }
  70% {
    transform: scale(0.9);
  }
  100% {
    transform: scale(1);
  }
}

.animate-fade-in-down {
  animation: fade-in-down 0.5s ease-out forwards;
}
.animate-fade-in-up {
  animation: fade-in-up 0.5s ease-out forwards;
}
.animate-bounce-in {
  animation: bounce-in 0.6s ease-out forwards;
}

.animation-delay-300 {
  animation-delay: 0.3s;
}
.animation-delay-600 {
  animation-delay: 0.6s;
}
`;{let e=document.createElement("style");e.type="text/css",e.innerText=i,document.head.appendChild(e)}e.s(["default",0,()=>(0,t.jsxs)("div",{className:"min-h-screen bg-gradient-to-br from-purple-400 to-indigo-600 overflow-hidden",children:[(0,t.jsx)(n,{}),(0,t.jsx)("main",{className:"container mx-auto p-4",children:(0,t.jsx)("div",{className:"flex justify-center items-center h-full mt-32",children:(0,t.jsx)(s,{})})})]})],65993)},19455,e=>{"use strict";let t,r;var a=e.i(76979),n=e.i(23426),s=e.i(59247),i=e.i(7284);let o=e=>"boolean"==typeof e?`${e}`:0===e?"0":e,l=i.clsx;var d=e.i(75157);let c=(t="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",r={variants:{variant:{default:"bg-primary text-primary-foreground shadow hover:bg-primary/90",destructive:"bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",outline:"border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",secondary:"bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",ghost:"hover:bg-accent hover:text-accent-foreground",link:"text-primary underline-offset-4 hover:underline"},size:{default:"h-9 px-4 py-2",sm:"h-8 rounded-md px-3 text-xs",lg:"h-10 rounded-md px-8",icon:"h-9 w-9"}},defaultVariants:{variant:"default",size:"default"}},e=>{var a;if((null==r?void 0:r.variants)==null)return l(t,null==e?void 0:e.class,null==e?void 0:e.className);let{variants:n,defaultVariants:s}=r,i=Object.keys(n).map(t=>{let r=null==e?void 0:e[t],a=null==s?void 0:s[t];if(null===r)return null;let i=o(r)||o(a);return n[t][i]}),d=e&&Object.entries(e).reduce((e,t)=>{let[r,a]=t;return void 0===a||(e[r]=a),e},{});return l(t,i,null==r||null==(a=r.compoundVariants)?void 0:a.reduce((e,t)=>{let{class:r,className:a,...n}=t;return Object.entries(n).every(e=>{let[t,r]=e;return Array.isArray(r)?r.includes({...s,...d}[t]):({...s,...d})[t]===r})?[...e,r,a]:e},[]),null==e?void 0:e.class,null==e?void 0:e.className)}),u=n.forwardRef(({className:e,variant:t,size:r,asChild:n=!1,...i},o)=>{let l=n?s.Slot:"button";return(0,a.jsx)(l,{className:(0,d.cn)(c({variant:t,size:r,className:e})),ref:o,...i})});u.displayName="Button",e.s(["Button",0,u],19455)}]);