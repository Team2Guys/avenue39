import { IProductCategories } from '@/types/types';
import React from 'react';

interface ICategoryFilter {
  items: IProductCategories[];
  onCategoryChange: (category: string, isChecked: boolean) => void;
}

const CategoryFilter = ({ items, onCategoryChange }: ICategoryFilter) => {
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    onCategoryChange(value, checked);
  };

  return (
    <>
      <h4 className="text-xl font-medium mb-5">Categories</h4>
      <div>
        <form
          action=""
          className="flex flex-col gap-5 custom-scroll overflow-y-auto max-h-64"
        >
          {items.map((item) => (
            <div className="flex items-center gap-2" key={item.id}>
              <input
                type="checkbox"
                name="filter"
                id={`Category${item.id}`}
                value={item.title}
                className="rounded-none border-1 border-black w-4 h-4"
                onChange={handleCheckboxChange}
              />
              <label
                htmlFor={`Category${item.id}`}
                className="text-16 uppercase"
              >
                {item.title}
              </label>
              <span className="bg-light px-[2px] font-semibold text-[10px] tracking-tight">
                {item.totalItems}
              </span>
            </div>
          ))}
        </form>
      </div>
    </>
  );
};

export default CategoryFilter;
