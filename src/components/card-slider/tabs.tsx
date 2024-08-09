'use client';
import React, { useState } from 'react';
import SliderComponent from './card-slider';
import { ISliderData } from '@/types/types';
import { useSelector } from 'react-redux';
import { State } from '@/redux/store';

interface TabsProps {
  slidersData: ISliderData[];
}

const Tabs: React.FC<TabsProps> = ({ slidersData }) => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="">
      <div className="flex flex-row flex-wrap justify-center lg:justify-between gap-6 items-center mt-8">
        <div>
          <h3 className="text-3xl font-semibold mb-4 md:mb-0 text-nowrap">
            Most Popular Items
          </h3>
        </div>

        <div className="flex flex-nowrap gap-4 max-w-[450px] overflow-x-auto">
          {slidersData.map((slider: any, index: any) => (
            <button
              key={index}
              onClick={() => setActiveTab(index)}
              className={`font-medium px-4 py-2 rounded-full transition-colors duration-300 ${index === activeTab ? 'bg-primary text-secondary' : 'bg-white text-primary'}`}
            >
              {slider.tabTitle}
            </button>
          ))}
        </div>
      </div>
      <div className="mt-4 sliderTabes">
        <SliderComponent cards={slidersData[activeTab].cards} />
      </div>
    </div>
  );
};

export default Tabs;
