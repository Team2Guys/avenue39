import React from 'react'

interface CardProps {
    title: string;
    description: string;
    icon: any;

  }

const Mission: React.FC<CardProps> = ({ title, description, icon  }) => {
  return (
    <div className={`p-6 rounded-lg shadow-lg hover:bg-black hover:text-white bg-white text-black  text-center mx-auto`}>
    <div className="text-3xl mb-4 flex justify-center">
      {icon}
    </div>
    <h2 className="text-xl font-semibold mb-2">{title}</h2>
    <p className="text-center">{description}</p>
  </div>
  )
}

export default Mission