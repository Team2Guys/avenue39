import { useState } from 'react';
import CategoryFilter from './category-filter';
import { productcetagories, saleitems } from '@/data';
import { Slider, SliderPrimitive } from '@/components/ui/slider';
import Salecard from '../ui/sale-card';
import Image, { StaticImageData } from 'next/image';

interface SidebarFilterProps {
  onCategoryChange: (category: string, isChecked: boolean) => void;
  onPriceChange: (range: [number, number]) => void;
  sideBanner: StaticImageData;
}

const SidebarFilter = ({
  onCategoryChange,
  onPriceChange,
  sideBanner,
}: SidebarFilterProps) => {
  const [range, setRange] = useState<[number, number]>([0, 500]);

  const handleValueChange = ([start, end]: [number, number]) => {
    setRange([start, end]);
    onPriceChange([start, end]);
  };

  return (
    <div>
      <div className="w-full">
        <h3 className="py-5 text-xl font-medium">Filter</h3>
        <div className="border-t-2 py-6">
          <CategoryFilter
            items={productcetagories}
            onCategoryChange={onCategoryChange}
          />
        </div>
        <div className="border-t-2 py-6">
          <h4 className="text-xl font-medium mb-5">Prices</h4>
          <div>
            <Slider
              defaultValue={[1, 500]}
              max={500}
              step={1}
              onValueChange={handleValueChange}
            >
              <SliderPrimitive.Thumb />
              <SliderPrimitive.Thumb />
            </Slider>
            <div className="flex justify-between mt-2">
              {range.map((item, index) => (
                <span className="text-14 font-medium" key={index}>
                  Dhs {item}
                </span>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-4">
          <h4 className="text-2xl font-semibold mb-5">Pay Your Way</h4>
          <div className="flex justify-center flex-wrap xs:flex-nowrap gap-2 xs:gap-4 px-1 xs:px-2">
            {saleitems.map((item) => (
              <Salecard key={item.id} cards={item} />
            ))}
          </div>
          <div className="mt-10">
            <Image src={sideBanner} alt="sale banner" className="mx-auto" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SidebarFilter;
