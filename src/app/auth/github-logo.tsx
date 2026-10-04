// import { lusitana } from '@/global/fonts';
import Image from 'next/image';

export default function Logo() {
  return (
    <div
      className="flex flex-row items-center justify-center text-sky-300"
    >
      <Image src="/github.png" alt="GitHub" width={40} height={40} className="h-10 w-10 mr-3 justify-center" />
      <p className="text-[22px] whitespace-nowrap justify-center">skyrocketOoO Playground</p>
    </div>
  );
}
