// components/LinkBar.tsx
import React from 'react';
import LinkItem from '@/app/components/LinkItem';

const LinkBar = () => {
  const links = [
    { href: 'https://github.com/skyrocket-qy', src: '/github.png', alt: 'GitHub' },
    { href: 'https://www.instagram.com/jimmyjenny0801', src: '/instagram.png', alt: 'Instagram' },
    { href: 'https://www.linkedin.com/in/jimmy-huang-07aa4722a/', src: '/linkedin.png', alt: 'LinkedIn' },
    { href: 'https://leetcode.com/u/rivendinner/', src: '/leetcode.svg', alt: 'LeetCode' },
    { href: 'https://www.hackerrank.com/profile/skyrocketqy81', src: '/hackerrank.png', alt: 'HackerRank' },
  ];

  return (
    <div className=" h-full rounded-lg">
      <img src='/head.png' className='m-0.5 mb-2 h-9 w-9'/>
      <div className="">
        {links.map((link, index) => (
          <LinkItem key={index} href={link.href} src={link.src} alt={link.alt} />
        ))}
      </div>
    </div>
  );
};

export default LinkBar;
