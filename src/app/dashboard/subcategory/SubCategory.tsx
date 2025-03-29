'use client';
import Breadcrumb from '@components/Dashboard/Breadcrumbs/Breadcrumb';
import DefaultLayout from '@components/Dashboard/Layouts/DefaultLayout';
import ProtectedRoute from '@/hooks/AuthHookAdmin';
import { useState } from 'react';
import type { Category } from '@/types/interfaces';
import { SubCategoryComponentProps_dashboard } from '@/types/Pages_props';
import dynamic from 'next/dynamic';
const ViewSubcategries = dynamic(() => import('@/components/Dashboard/Tables/ViewSubcategries'))
const AddSubcategory = dynamic(() => import('@components/AddCategory/AddSubcategory'))


const SubCategoryComponent = ({
  subCategories,
  cetagories,
}: SubCategoryComponentProps_dashboard) => {
  const [menuType, setMenuType] = useState<string>('Sub Categories');
  const [editCategory, seteditCategory] = useState<Category | undefined | null>();
  return (
    <DefaultLayout>
      <Breadcrumb pageName={menuType} />
      {menuType === 'Sub Categories' ? (
        <div className="flex flex-col gap-10">
          <ViewSubcategries
            setMenuType={setMenuType}
            seteditCategory={seteditCategory}
            editCategory={editCategory}
            subCategories={subCategories}
          />
        </div>
      ) : (
        <AddSubcategory
          setMenuType={setMenuType}
          seteditCategory={seteditCategory}
          editCategory={editCategory}
          categoriesList={cetagories}
        />
      )}
    </DefaultLayout>
  );
};

export default ProtectedRoute(SubCategoryComponent);
