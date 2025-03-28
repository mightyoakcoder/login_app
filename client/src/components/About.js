import React, { useState, useEffect } from 'react'
import styles from '../styles/About.module.css'

function BulletList({ items }) {
  return (
    <ul className="flex flex-wrap gap-x-4 gap-y-2 items-center">
      {items.map((item, index) => (
        <li key={index} className='flex items-center'>
          <span className="mr-1 text-gray-500">•</span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export default function AboutPage() {
  const [isClient, setIsClient] = useState(false);

  const stackItems = [
    'NodeJs',
    'ReactJS',
    'TailwindCSS'
  ];

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className={`flex ${isClient ? 'flex-col md:flex-row' : 'flex-col'} items-stretch justify-center space-y-8 md:space-y-0 md:space-x-8`}>
        <div className={`${styles.glass} ${isClient ? 'w-full md:w-[90%] lg:w-[80%] xl:w-[70%]' : 'w-full'}`}>
          <div className='title flex flex-col items-center'>
            <h4 className='text-4xl md:text-5xl font-bold mb-6 text-center'>About Me</h4>
            <div className='space-y-4 px-4 md:px-6'>
              <p className='text-lg md:text-xl text-center text-gray-600'>
                Welcome to Shortwave Brewing, a hand-crafted blend of my passions and professional journey.
              </p>
              <p className='text-lg md:text-xl text-center text-gray-600'>
                As a career changer that has been in software engineering for a couple of years now, I'm excited to share my growth and projects here.
              </p>
              <p className='text-lg md:text-xl text-center text-gray-600'>
                This site is inspired by my late father's love for brewing beer and amateur radio. I aim to honor his memory while reflecting my own path. Just as a great beer brings people together and a clear signal connects us, I hope to connect with like-minded individuals through my work.
                Thanks for visiting, and I look forward to sharing my journey with you.
              </p>
            </div>
          </div>
        </div>
  
        <div className={`${styles.glass} ${isClient ? 'w-full md:w-[90%] lg:w-[80%] xl:w-[70%]' : 'w-full'}`}>
          <div className='title flex flex-col items-center'>
            <h4 className='text-4xl md:text-5xl font-bold mb-6 text-center'>Stack</h4>
            <div className='px-4 md:px-6 w-full'>
              <BulletList items={stackItems} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}