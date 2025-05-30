'use client';
import DefaultLayout from '@components/Dashboard/Layouts/DefaultLayout';
import dynamic from 'next/dynamic';
const CreateAdmin = dynamic(() => import('@components/SuperAdmin/CreateAdmin/CreateAdmin'))
const AllAdmin = dynamic(() => import('@components/SuperAdmin/AllAdmin/AllAdmin'))
const Breadcrumb = dynamic(() => import('@components/Dashboard/Breadcrumbs/Breadcrumb'))

import React, { useState } from 'react';
const SuperAdmin = () => {
  const [editAdmin, setEditAdmin] = useState<any | undefined>();
  const [selecteMenu, setselecteMenu] = useState<string | null | undefined>(
    'AllAdmin',
  );

  const EditInitialValues: any = {
    fullname: editAdmin?.fullname,
    email: editAdmin?.email,
    password: editAdmin?.password,
    canAddCategory: editAdmin?.canAddCategory,
    canAddProduct: editAdmin?.canAddProduct,
    canCheckProfit: editAdmin?.canCheckProfit,
    canCheckRevenue: editAdmin?.canCheckRevenue,
    canCheckVisitors: editAdmin?.canCheckVisitors,
    canDeleteCategory: editAdmin?.canDeleteCategory,
    canDeleteProduct: editAdmin?.canDeleteProduct,
    canEditCategory: editAdmin?.canEditCategory,
    canEditProduct: editAdmin?.canEditProduct,
    canVeiwAdmins: editAdmin?.canVeiwAdmins,
    canViewSales: editAdmin?.canViewSales,
    canVeiwTotalCategories: editAdmin?.canVeiwTotalproducts,
    canVeiwTotalproducts: editAdmin?.canVeiwTotalproducts,
    canViewUsers: editAdmin?.canViewUsers,
  };

  return (
    <>
      <DefaultLayout>
        <Breadcrumb pageName="Super Admin" />
        <div className="mt-10">
          {selecteMenu == 'AllAdmin' ? (
            <AllAdmin
              setselecteMenu={setselecteMenu}
              setEditAdmin={setEditAdmin}
            />
          ) : (
            <CreateAdmin
              setselecteMenu={setselecteMenu}
              EditInitialValues={editAdmin}
              setEditProduct={setEditAdmin}
              EditAdminValue={
                EditInitialValues &&
                (EditInitialValues.name !== undefined ||
                  EditInitialValues.email !== undefined)
                  ? EditInitialValues
                  : undefined
              }
            />
          )}
        </div>
      </DefaultLayout>
    </>
  );
};

export default SuperAdmin;
