import React from "react";
import Image from "next/image";
import Link from "next/link";
import { FaXTwitter,FaTelegram } from "react-icons/fa6";
import { GiVileFluid } from "react-icons/gi";

const Footer = () => {
  return (
    <div className="w-full bg-[#000004] border-t-2 border-[#323232]">
      <div className="flex items-center justify-between max-w-[1240px] mx-auto p-4">
        <div className="flex items-center justify-center my-3">
          <Image
            src="/logo.svg"
            height={140}
            width={150}
            priority
            className="h-[35px] md:h-[40px]"
            style={{ WebkitUserDrag: 'none', userDrag: 'none', userSelect: 'none' }}
            alt="socials"
          />
        </div>
        <div className="flex items-center justify-center py-5 space-x-5">
          <Link
            className="cursor-pointer"
            href="https://twitter.com/FluidToken"
            target="_blank"
          >
            {" "}
            <FaXTwitter className="text-white " size={30}/>
          </Link>
          <Link
            className="cursor-pointer"
            href="https://t.me/FluidTradingPortal"
            target="_blank"
          >
            {" "}
            <FaTelegram className="text-white" size={30} />
          </Link>
          <Link
            className="cursor-pointer"
            href="https://fluid.trade/"
            target="_blank"
          >
            {" "}
            <GiVileFluid className="text-white" size={30} />
          </Link>
        
          
        </div>
      </div>
    </div>
)}

export default Footer;