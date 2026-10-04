(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,7284,e=>{"use strict";function t(){for(var e,t,r=0,i="",n=arguments.length;r<n;r++)(e=arguments[r])&&(t=function e(t){var r,i,n="";if("string"==typeof t||"number"==typeof t)n+=t;else if("object"==typeof t)if(Array.isArray(t)){var a=t.length;for(r=0;r<a;r++)t[r]&&(i=e(t[r]))&&(n&&(n+=" "),n+=i)}else for(i in t)t[i]&&(n&&(n+=" "),n+=i);return n}(e))&&(i&&(i+=" "),i+=t);return i}e.s(["clsx",0,t,"default",0,t])},74851,e=>{"use strict";var t=e.i(17064);let r=(...e)=>e.filter((e,t,r)=>!!e&&""!==e.trim()&&r.indexOf(e)===t).join(" ").trim(),i={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":2,"stroke-linecap":"round","stroke-linejoin":"round"},n=(0,t.createContext)({}),a=(0,t.forwardRef)(({color:e,size:a,width:s,height:o,strokeWidth:l,absoluteStrokeWidth:d,nonScalingStroke:c,className:u="",children:h,iconNode:m=[],icon:f={node:m,aliases:[],size:24},...p},g)=>{let{size:b=24,strokeWidth:x=2,absoluteStrokeWidth:w=!1,nonScalingStroke:v=!1,color:y="currentColor",className:k=""}=(0,t.useContext)(n)??{},j=!!h||(e=>{for(let t in e)if(t.startsWith("aria-")||"role"===t||"title"===t)return!0;return!1})(p),[N,z,A=[]]=function(e,t={}){return function(e,t={}){let n=t.attributeNames??{},a=e=>n[e]??e,s=e.size??e.width??i.width,o=e.size??e.height??i.height,l=e.aliases?.filter(e=>"string"==typeof e&&""!==e.trim()).map(e=>`lucide-${e}`)??[],d=[...e.name?[`lucide-${e.name}`]:[],...l],c=t.className?.split(" ").filter(Boolean)??[],u=!1===t.includeDefaultClasses?r(...c):r("lucide",...d,...c),h=t.absoluteStrokeWidth?Number(t.strokeWidth??i["stroke-width"])*Number(e.size??e.width??i.width)/Number(t.size??t.width??i.width):t.strokeWidth??i["stroke-width"];return["svg",{...Object.entries(i).reduce((e,[t,r])=>(e[a(t)]=r,e),{}),..."color"in t&&t.color&&{[a("stroke")]:t.color},..."size"in t&&null!=t.size&&{[a("width")]:t.size,[a("height")]:t.size},..."width"in t&&null!=t.width&&{[a("width")]:t.width},..."height"in t&&null!=t.height&&{[a("height")]:t.height},[a("stroke-width")]:h,...u&&{[a("class")]:u},[a("viewBox")]:`0 0 ${s} ${o}`,...!1===t.hasA11yProp?{[a("aria-hidden")]:"true"}:{},..."attributes"in t&&t.attributes},e.node.map(e=>{let[r,i,n]=e,s=t.nonScalingStroke?{[a("vector-effect")]:"non-scaling-stroke",...i}:i;return n?[r,s,n]:[r,s]})]}(e,{...t,attributeNames:{...t.attributeNames,class:"className","stroke-width":"strokeWidth","stroke-linecap":"strokeLinecap","stroke-linejoin":"strokeLinejoin","vector-effect":"vectorEffect"}})}(f,{color:e??y,width:s??a??b,height:o??a??b,strokeWidth:l??x,absoluteStrokeWidth:d??w,nonScalingStroke:c??v,className:r(k,u),hasA11yProp:j,attributes:p});return(0,t.createElement)(N,{ref:g,...z},[...A.map(([e,r])=>(0,t.createElement)(e,r)),...Array.isArray(h)?h:[h]])});e.s(["default",0,a],74851)},92491,e=>{"use strict";var t=e.i(17064),r=e.i(74851);e.s(["default",0,function(e,i=[],n=[]){let a,s="string"==typeof e?function(e,t,r=[]){if(null==t)throw Error("[lucide]: iconNode is required when icon name is used");return{name:e?.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase(),size:24,node:t,...r.length>0?{aliases:r}:{}}}(e,i,n):e,o=(0,t.forwardRef)(({className:e,...i},n)=>(0,t.createElement)(r.default,{ref:n,icon:s,className:e,...i}));return s.name&&(o.displayName=(a=(e=>{let t="",r=!1;for(let i of e){if("-"===i||"_"===i||i<=" "){r=t.length>0;continue}0===t.length?t+=i.toLowerCase():t+=r?i.toUpperCase():i,r=!1}return t})(s.name)).charAt(0).toUpperCase()+a.slice(1)),o}],92491)},1770,e=>{"use strict";var t=e.i(91644),r=e.i(19455),i=e.i(92491);let n={name:"code-xml",size:24,node:[["path",{d:"m18 16 4-4-4-4",key:"1inbqp"}],["path",{d:"m6 8-4 4 4 4",key:"15zrgr"}],["path",{d:"m14.5 4-5 16",key:"e7oirm"}]],aliases:["code-2"]};n.node;let a=(0,i.default)(n),s=()=>(0,t.jsx)("header",{className:"fixed top-0 w-full z-50 bg-background/80 backdrop-blur-sm border-b",children:(0,t.jsxs)("div",{className:"container mx-auto px-6 py-4 flex items-center justify-between",children:[(0,t.jsxs)("div",{className:"flex items-center gap-3",children:[(0,t.jsx)(a,{className:"w-8 h-8 text-primary animate-pulse"}),(0,t.jsx)("span",{className:"text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600",children:"Animated Page"})]}),(0,t.jsxs)("nav",{className:"flex items-center gap-4",children:[(0,t.jsx)(r.Button,{variant:"outline",children:"Plans"}),(0,t.jsx)(r.Button,{children:"Try Agent"})]})]})}),o=()=>(0,t.jsxs)("div",{className:"w-full max-w-md bg-white/20 backdrop-blur-lg rounded-2xl shadow-lg p-8 space-y-6 transform hover:scale-105 transition-transform duration-500",children:[(0,t.jsx)("h2",{className:"text-3xl font-bold text-white text-center animate-fade-in-down",children:"Login"}),(0,t.jsxs)("div",{className:"space-y-4 animate-fade-in-up animation-delay-300",children:[(0,t.jsxs)("div",{children:[(0,t.jsx)("label",{className:"text-white/80",children:"Username"}),(0,t.jsx)("input",{type:"text",className:"w-full mt-2 p-3 bg-white/30 rounded-lg border border-white/40 focus:ring-2 focus:ring-white/60 focus:outline-none text-white transition-all duration-300 focus:bg-white/40",placeholder:"Enter your username"})]}),(0,t.jsxs)("div",{children:[(0,t.jsx)("label",{className:"text-white/80",children:"Password"}),(0,t.jsx)("input",{type:"password",className:"w-full mt-2 p-3 bg-white/30 rounded-lg border border-white/40 focus:ring-2 focus:ring-white/60 focus:outline-none text-white transition-all duration-300 focus:bg-white/40",placeholder:"Enter your password"})]})]}),(0,t.jsx)("button",{className:"w-full p-3 bg-pink-500 text-white rounded-lg font-bold hover:bg-pink-600 transition-transform transform hover:scale-105 active:scale-95 duration-300 animate-bounce-in animation-delay-600",children:"Login"})]}),l=`
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
`;{let e=document.createElement("style");e.type="text/css",e.innerText=l,document.head.appendChild(e)}e.s(["default",0,()=>(0,t.jsxs)("div",{className:"min-h-screen bg-gradient-to-br from-purple-400 to-indigo-600 overflow-hidden",children:[(0,t.jsx)(s,{}),(0,t.jsx)("main",{className:"container mx-auto p-4",children:(0,t.jsx)("div",{className:"flex justify-center items-center h-full mt-32",children:(0,t.jsx)(o,{})})})]})],1770)},19455,e=>{"use strict";let t,r;var i=e.i(91644),n=e.i(17064),a=e.i(17739),s=e.i(7284);let o=e=>"boolean"==typeof e?`${e}`:0===e?"0":e,l=s.clsx;var d=e.i(75157);let c=(t="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",r={variants:{variant:{default:"bg-primary text-primary-foreground shadow hover:bg-primary/90",destructive:"bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",outline:"border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",secondary:"bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",ghost:"hover:bg-accent hover:text-accent-foreground",link:"text-primary underline-offset-4 hover:underline"},size:{default:"h-9 px-4 py-2",sm:"h-8 rounded-md px-3 text-xs",lg:"h-10 rounded-md px-8",icon:"h-9 w-9"}},defaultVariants:{variant:"default",size:"default"}},e=>{var i;if((null==r?void 0:r.variants)==null)return l(t,null==e?void 0:e.class,null==e?void 0:e.className);let{variants:n,defaultVariants:a}=r,s=Object.keys(n).map(t=>{let r=null==e?void 0:e[t],i=null==a?void 0:a[t];if(null===r)return null;let s=o(r)||o(i);return n[t][s]}),d=e&&Object.entries(e).reduce((e,t)=>{let[r,i]=t;return void 0===i||(e[r]=i),e},{});return l(t,s,null==r||null==(i=r.compoundVariants)?void 0:i.reduce((e,t)=>{let{class:r,className:i,...n}=t;return Object.entries(n).every(e=>{let[t,r]=e;return Array.isArray(r)?r.includes({...a,...d}[t]):({...a,...d})[t]===r})?[...e,r,i]:e},[]),null==e?void 0:e.class,null==e?void 0:e.className)}),u=n.forwardRef(({className:e,variant:t,size:r,asChild:n=!1,...s},o)=>{let l=n?a.Slot:"button";return(0,i.jsx)(l,{className:(0,d.cn)(c({variant:t,size:r,className:e})),ref:o,...s})});u.displayName="Button",e.s(["Button",0,u],19455)}]);