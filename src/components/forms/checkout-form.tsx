'use client';
import { useFormik } from 'formik';
import React from 'react';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { LabelInput } from '../ui/label-input';
import { Label } from '../ui/label';

const CheckoutForm = () => {
  const initialValues = {
    firstName: '',
    lastName: '',
    email: '',
    country: '',
    address: '',
    postalCode: '',
    city: '',
    phone: '',
    note: '',
  };

  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  const selectoption = [
    { title: 'Dubai' },
    { title: 'Abu Dhabi' },
    { title: 'Sharjah' },
    { title: 'Ajman' },
    { title: 'Ras Al Khaima' },
    { title: 'Umm Al Quwain' },
    { title: 'Fujairah' },
  ];

  return (
    <>
      <form onSubmit={formik.handleSubmit} className="space-y-5 mt-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <LabelInput
            label="First Name"
            id="firstName"
            name="firstName"
            type="text"
            placeholder="Enter First Name"
            onChange={formik.handleChange}
            value={formik.values.firstName}
          />
          <LabelInput
            label="Last Name"
            id="lastName"
            name="lastName"
            type="text"
            placeholder="Enter last Name"
            onChange={formik.handleChange}
            value={formik.values.lastName}
          />
        </div>
        <LabelInput
          label="Email Address"
          id="email"
          name="email"
          type="text"
          placeholder="Enter Email address"
          onChange={formik.handleChange}
          value={formik.values.email}
        />

        <div className=" flex gap-1 flex-col md:flex-row">
          <LabelInput
            label="Phone Number"
            id="phone"
            name="phone"
            type="number"
            placeholder="+971 00 000 0000"
            onChange={formik.handleChange}
            value={formik.values.phone}
          />
          <LabelInput
            label="Street Address *"
            id="address"
            name="address"
            type="text"
            placeholder="Building, street, city etc (Optional)"
            onChange={formik.handleChange}
            value={formik.values.address}
          />
        </div>
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-1">
            <Label
              htmlFor="country"
              className="mb-1 px-8 text-sm font-semibold text-17 text-[#666666]"
            >
              Country/Region
            </Label>
            <Select
              onValueChange={(value: any) =>
                formik.setFieldValue('country', value)
              }
            >
              <SelectTrigger className="flex-grow h-full rounded-full border-0 bg-[#F6F6F6] pl-8 pr-12 py-2  focus-visible:outline-none focus-visible:ring-0 text-15 font-medium outline-none focus-visible:ring-ring focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50 ">
                <SelectValue placeholder="Country/Region" className="" />
              </SelectTrigger>
              <SelectContent className="rounded-3xl">
                <SelectGroup>
                  <SelectItem
                    value="United Arab Emirates"
                    className="rounded-3xl"
                  >
                    United Arab Emirates
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className="flex-1">
            <Label
              htmlFor="state"
              className="mb-1 px-8 text-sm font-semibold text-17 text-[#666666]"
            >
              State
            </Label>
            <Select
              onValueChange={(value: any) =>
                formik.setFieldValue('state', value)
              }
            >
              <SelectTrigger className="flex-grow h-full rounded-full border-0 bg-[#F6F6F6] pl-8 pr-12 py-1  focus-visible:outline-none focus-visible:ring-0 text-15 font-medium outline-none focus-visible:ring-ring focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50 ">
                <SelectValue placeholder="Select your state" />
              </SelectTrigger>
              <SelectContent className="rounded-3xl">
                <SelectGroup>
                  {selectoption.map((option, index) => (
                    <SelectItem
                      value={option.title}
                      key={index}
                      className="rounded-3xl"
                    >
                      {option.title}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div style={{ marginTop: '3rem' }}>
          <Label
            htmlFor="Notes"
            className="mb-1 px-8 text-sm font-semibold text-17 text-[#666666] mt-3 "
          >
            Order Notes
          </Label>
          <textarea
            className="flex-grow h-32 w-full rounded-3xl bg-[#F6F6F6] mt-2 pt-4 pl-5  pr-4 outline-none py-2 focus:outline-none focus:ring-0 focus:ring-ring text-15 font-medium"
            id="note"
            name="note"
            onChange={formik.handleChange}
            value={formik.values.note}
          />
        </div>
      </form>
    </>
  );
};

export default CheckoutForm;
