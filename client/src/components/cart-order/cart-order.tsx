'use client';
import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { LabelInput } from '../ui/label-input';
import { Button } from '../ui/button';
import { cities, countries } from '@/data';
import { City } from '@/types/types';
import { SubTotal, TotalProducts } from '@/config';

const CartOrder: React.FC = () => {
  const [filteredCities, setFilteredCities] = useState<City[]>([]);

  const formik = useFormik({
    initialValues: {
      country: '',
      city: '',
      postalCode: '',
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  useEffect(() => {
    if (formik.values.country) {
      setFilteredCities(
        cities.filter((city) => city.country === formik.values.country),
      );
    } else {
      setFilteredCities([]);
    }
  }, [formik.values.country]);

  return (
    <div className="shadow border border-[#EEEEEE] rounded-md p-2 md:p-4 w-full space-y-5 mt-5 md:mt-0">
      <p className="text-center text-[26px]">Cart Total</p>
      <div className="flex justify-between items-center border-t-2 pt-4">
        <p className="text-[#666666] text-20">Subtotal</p>
        <p className="font-bold text-18">
          Dhs.
          <span>
            <SubTotal />
          </span>
          .00
        </p>
      </div>
      <div className="flex flex-wrap md:flex-nowrap justify-between border-t-2 pt-4">
        <p className="text-[#666666] text-20">Subtotal</p>
        <form className="w-full md:w-6/12" onSubmit={formik.handleSubmit}>
          <Select
            onValueChange={(value) => formik.setFieldValue('country', value)}
          >
            <SelectTrigger className="rounded-none border">
              <SelectValue placeholder="Select a country" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {countries.map((country) => (
                  <SelectItem key={country.code} value={country.code}>
                    {country.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>

          <Select
            onValueChange={(value) => formik.setFieldValue('city', value)}
          >
            <SelectTrigger className="rounded-none border">
              <SelectValue placeholder="Select a city" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {filteredCities.map((city) => (
                  <SelectItem key={city.name} value={city.name}>
                    {city.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>

          <LabelInput
            className="rounded-none border"
            type="text"
            placeholder="Postcode/Zip"
            name="postalCode"
            id="postalCode"
            value={formik.values.postalCode}
            onChange={formik.handleChange}
          />

          <Button className="text-18 text-white w-full mt-2 h-[59px] rounded-sm">
            Update Total
          </Button>
        </form>
      </div>
      <div className="flex justify-between items-center pt-4">
        <p className="text-[#666666] text-20">Total</p>
        <p className="font-medium text-[26px]">
          Dhs.
          <span>
            <SubTotal />
          </span>
          .00
        </p>
      </div>
      <div className="flex justify-between items-center border-t-2 pt-4">
        <Button className="text-18 text-white w-full mt-2 h-[71px] rounded-sm">
          Shop now
        </Button>
      </div>
    </div>
  );
};

export default CartOrder;
