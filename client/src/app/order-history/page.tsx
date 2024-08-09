import FilterTable from '@/components/Dashboard/Tables/FilterTable';
import TopHero from '@/components/top-hero';
import { Button } from '@/components/ui/button';
import Container from '@/components/ui/Container';
import { Orderbreadcrumbs } from '@/data/data';
import {
  historycolumns,
  historydata,
  ordercolumns,
  Orderdata,
} from '@/data/table';
import Link from 'next/link';
import React from 'react';
import { FaRegUser } from 'react-icons/fa6';

const OrderHistory = () => {
  return (
    <>
      <TopHero breadcrumbs={Orderbreadcrumbs} />
      <Container className="py-10">
        <div className="flex justify-between">
          <div className="space-y-2">
            <h1 className="text-2xl lg:text-3xl font-semibold">Account</h1>
            <Button className="gap-2 text-xl" variant={'ghost'}>
              <FaRegUser size={20} /> Logout
            </Button>
          </div>
          <div className="space-y-2">
            <h1 className="text-2xl lg:text-3xl font-medium">
              Account details
            </h1>
            <div className="space-y-2">
              <p>Muhammad Ahmad</p>
              <button className="underline">View addresses</button>
            </div>
          </div>
        </div>
        <div className="mt-10">
          <h1 className="text-2xl lg:text-3xl font-medium">Order history</h1>
          {Orderdata.length ? (
            <FilterTable data={historydata} columns={historycolumns} />
          ) : (
            <p>You haven&apos;t placed any orders yet.</p>
          )}
        </div>
      </Container>
    </>
  );
};

export default OrderHistory;
