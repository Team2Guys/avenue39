import { useState, FC } from 'react';

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
    <div className="w-full mt-5 px-4 md:px-8 lg:px-16 min-h-48">
      <div className="flex flex-nowrap gap-2 md:gap-4 lg:gap-6 overflow-x-auto scrollbar-hide">
        {tabs.map((tab, index) => (
          <button
            key={index}
            className={`py-2 px-4 rounded-lg focus:outline-none whitespace-nowrap text-sm md:text-base lg:text-lg ${
              activeTab === index
                ? 'border-b-2 border-black text-black'
                : 'text-slate-500'
            }`}
            onClick={() => setActiveTab(index)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="p-4 mt-4  rounded-lg shadow-sm">
        {tabs[activeTab].content}
      </div>
    </div>
  );
};

export default DetailTabs;
