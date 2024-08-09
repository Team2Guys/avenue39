import { useState, FC } from 'react';
import Container from '../ui/Container';
import { TiArrowSortedUp } from 'react-icons/ti';
import SideCard from '@/components/side-card/side-card';
import { productData, bestSellerProducts, features } from '@/data';
import Card from '../ui/card';
import FeatureSlider from '../card-slider/feature-slider';

interface Tab {
  label: string;
  content: React.ReactNode;
}

interface DetailTabsProps {
  tabs: Tab[];
}

const DetailTabs: FC<DetailTabsProps> = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState<number>(0);

  return (
    <div className="w-full mt-5 min-h-48 border-t-[1px]">
      <Container>
        <div className="flex flex-nowrap gap-8 sm:gap-16 md:gap-24 lg:gap-32 py-9 w-76 sm:w-full overflow-x-auto overflow-y-hidden">
          {tabs.map((tab, index) => (
            <button
              key={index}
              className={`focus:outline-none whitespace-nowrap text-16 xs:text-lg ${
                activeTab === index
                  ? 'text-black relative font-medium'
                  : 'text-slate-400'
              }`}
              onClick={() => setActiveTab(index)}
            >
              {tab.label}
              {activeTab === index && (
                <TiArrowSortedUp
                  size={30}
                  className="absolute -bottom-12 left-1/2 -translate-x-1/2"
                />
              )}
            </button>
          ))}
        </div>
      </Container>
      {/* Tab Content */}
      <div className="border-t-[1px] pt-6">
        <Container className="flex flex-col sm:flex-row gap-2 xl:gap-10">
          <div className="w-full sm:w-2/3 lg:w-3/4 px-4">
            {tabs[activeTab].content}
            <div className="w-full relative">
              <h1 className="text-2xl py-3 text-left font-semibold absolute -top-3">Best Seller</h1>
              <FeatureSlider  />
            </div>
          </div>
          <div className="w-1/3 lg:w-1/4 hidden sm:block ">
            <h2 className="text-2xl font-medium mb-5">
              Match With
            </h2>
            <SideCard data={productData} />
          </div>
        </Container>
      </div>
    </div>
  );
};

export default DetailTabs;
