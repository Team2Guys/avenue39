import { useState, FC } from 'react';
import Container from '../ui/Container';
import { TiArrowSortedUp } from 'react-icons/ti';

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
        <Container>{tabs[activeTab].content}</Container>
      </div>
    </div>
  );
};

export default DetailTabs;
