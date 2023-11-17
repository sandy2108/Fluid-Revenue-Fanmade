"use client"
import React, { useState } from 'react';
import Image from 'next/image';
import { RiMenu5Line } from 'react-icons/ri';
import { AiOutlineClose } from 'react-icons/ai';
import Link from 'next/link';

const navItems = [
  {
    title: 'Fluid Bot',
    link: 'https://t.me/FluidGMXBot?start=6076473108',
  },
  {
    title: 'Telegram',
    link: 'https://t.me/FluidTradingPortal',
  },
  {
    title: 'Twitter',
    link: 'https://twitter.com/FluidToken',
  },
  {
    title: 'Website',
    link: 'https://fluid.trade/',
  },
];

const Navbar = () => {
  const [activeButton, setActiveButton] = useState('Fluid Bot');
  const [active, setActive] = useState('Fluid Bot');
  const [toggle, setToggle] = useState(false);

  const handleButtonClick = (buttonName) => {
    setActiveButton((prevActiveButton) => (prevActiveButton === buttonName ? 'Fluid Bot' : buttonName));
    setActive(buttonName);
  };

  return (
    <div className='w-full bg-[#000004] '>
      <div className='max-w-[1240px] mx-auto p-4'>
        <div className='flex items-center justify-between'>
          <div className='flex'>
            <Image src="/logo.svg" height={150} width={150} alt='Fluid logo'/>
          </div>
          <div className='hidden md:flex justify-between gap-x-1 text-[#000000]'>
            {navItems.map((navItem) => (
              <button
                key={navItem.title}
                className={`rounded-2xl px-4 py-1 text-[#A3C7FF] ${activeButton === navItem.title ? 'bg-[#19ddf7] text-black' : ''}`}
                onClick={() => handleButtonClick(navItem.title)}
              >
                {navItem.title}
              </button>
            ))}
          </div>
          <div className="md:hidden flex  justify-end items-center">
            {toggle ? (
              <AiOutlineClose
                className="text-2xl text-white cursor-pointer"
                onClick={() => setToggle(!toggle)}
              />
            ) : (
              <RiMenu5Line
                size={30}
                className="text-2xl cursor-pointer text-white"
                onClick={() => setToggle(!toggle)}
              />
            )}
            
            {/* Mobile Menu */}
            <div
              className={`${
                toggle ? "flex" : "hidden"
              } p-6 bg-black  border-2 border-[#A3C7FF]/80 absolute top-20 right-0 mx-4 my-2 min-w-[140px] z-20 rounded-xl`}
            >
              <ul className="list-none flex justify-end items-start flex-1 flex-col">
                {/* Mobile Navigation Links */}
                {navItems.map((navItem) => (
                  <li
                    key={navItem.title}
                    className={`font-poppins font-medium cursor-pointer text-[16px] ${
                      active === navItem.title ? "text-[#19ddf7]" : "text-white"
                    } ${navItems.indexOf(navItem) === navItems.length - 1 ? "mb-0" : "mb-4"}`}
                  >
                    <Link target='_blank' href={`${navItem.link}`}>{navItem.title}</Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
