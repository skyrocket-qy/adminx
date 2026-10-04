(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,26945,e=>{"use strict";var t=e.i(91644),i=e.i(17064);let r=`
const cyberpunk = () => {
  console.log("Hacking the Gibson...");
  for (let i = 0; i < 10; i++) {
    setTimeout(() => {
      console.log(\`Packet \${i} sent...\`);
    }, i * 500);
  }
};

cyberpunk();
`;e.s(["default",0,()=>{let[e,n]=(0,i.useState)(""),[o,s]=(0,i.useState)(0);return(0,i.useEffect)(()=>{let e=setInterval(()=>{o<r.length?(n(e=>e+r.charAt(o)),s(e=>e+1)):setTimeout(()=>{n(""),s(0)},2e3)},50);return()=>clearInterval(e)},[o]),(0,t.jsx)("div",{className:"code-animation-block",children:(0,t.jsx)("pre",{children:(0,t.jsx)("code",{children:e})})})}])},74749,e=>{"use strict";var t=e.i(91644),i=e.i(17064);e.s(["default",0,()=>{let e=(0,i.useRef)(null);return(0,i.useEffect)(()=>{let t,i=e.current;if(!i)return;let r=i.getContext("2d");if(!r)return;let n=()=>{i.width=window.innerWidth,i.height=document.body.scrollHeight};n();let o=["M","W","K","N","C","X","O",":",";",".",","],s=["#00ff00","#ff00ff","#00ffff","#ffff00"];class l{x;y;character;color;speed;constructor(e,t,i,r){this.x=e,this.y=t,this.character=i,this.color=r,this.speed=1.5*Math.random()+.5}draw(){r&&(r.fillStyle=this.color,r.font="15px Courier New",r.fillText(this.character,this.x,this.y))}update(){i&&(this.y+=this.speed,this.y>i.height&&(this.y=0,this.x=Math.random()*i.width),this.draw())}}let a=[];function h(){if(i){a=[];for(let e=0;e<200;e++){let e=Math.random()*i.width,t=Math.random()*i.height,r=o[Math.floor(Math.random()*o.length)],n=s[Math.floor(Math.random()*s.length)];a.push(new l(e,t,r,n))}}}h(),function e(){r&&i&&(r.fillStyle="rgba(10, 10, 10, 0.1)",r.fillRect(0,0,i.width,i.height),a.forEach(e=>e.update())),t=requestAnimationFrame(e)}();let c=()=>{n(),h()},d=new ResizeObserver(c);return d.observe(document.body),window.addEventListener("resize",c),()=>{window.removeEventListener("resize",c),d.disconnect(),cancelAnimationFrame(t)}},[]),(0,t.jsx)("canvas",{ref:e,style:{display:"block",position:"absolute",top:0,left:0,zIndex:-1}})}])}]);