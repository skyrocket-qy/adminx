// components/LinkItem.tsx
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface LinkItemProps {
  href: string;
  src: string;
  alt: string;
}

const LinkItem: React.FC<LinkItemProps> = ({ href, src, alt }) => (
  <Link href={href} target="_blank" rel="noopener noreferrer" className=''>
    <div className="size-full mb-8 mt-8 hover:bg-violet-200 rounded-full">
      <Image src={src} alt={alt} width={40} height={40} className="object-cover size-full items-center"/>
    </div>
  </Link>
);

export default LinkItem;
