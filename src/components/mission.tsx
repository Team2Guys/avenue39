import Image from 'next/image';
import React from 'react';

interface CardProps {
  title: string;
  description: string;
  icon: any;
}

const Mission: React.FC<CardProps> = ({ title, description, icon }) => {
  return (
    <div
      className={`p-10 rounded-lg shadow-lg hover:bg-black bg-white text-black  text-center max-w-96 group`}
    >
      <div className="flex justify-center ">
        <Image src={icon} alt="icon" className="group-hover:invert-[1]" />
      </div>
      <h2 className="text-xl font-medium mt-4 group-hover:text-white">
        {title}
      </h2>
      <p className="text-center mt-4 text-sm text-primary-foreground group-hover:text-white leading-5">
        {description}
      </p>
    </div>
  );
};

export default Mission;
