// components/LinkItem.tsx
import React from 'react';
// import Image from 'next/image';
import Link from 'next/link';

interface LinkItemProps {
  href: string;
  src: string;
  alt: string;
}

const LinkItem: React.FC<LinkItemProps> = ({ href, src, alt }) => (
  <Link href={href} target="_blank" rel="noopener noreferrer">
    <div className="size-10 relative ml-auto mb-8 mt-4 hover:bg-violet-200 rounded-full">
      <img src={src} alt={alt}  sizes="40px 40px,40px" className="object-contain size-8 absolute inset-0 w-full h-full" />
    </div>
  </Link>
);

export default LinkItem;
