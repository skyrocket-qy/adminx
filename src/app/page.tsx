'use client';


export default function Home() {

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-stone-50">
        <div>
          <div className="text-black font-bold text-8xl opacity-0 
            animate-[fadeUp_0.8s_ease-out_0.3s_forwards]">
            Hi
          </div>
          <div className="text-4xl text-black opacity-0  animate-[fadeUp_0.8s_ease-out_1s_forwards]">
            <span className="font-bold">I am </span>
            <span className="font-bold bg-[linear-gradient(180deg,_rgba(255,255,255,0)_65%,_#f2e9e4_65%)]">
              Jimmy
            </span>
          </div>
          <p className="text-xl text-amber-900 opacity-0 animate-[fadeUp_0.8s_ease-out_1.7s_forwards]">
            Welcome to my playground
          </p>

        </div>

    </div>
  );
}
