'use client';
import { useFormik } from 'formik';
import React from 'react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';

const ContactForm = () => {
  const initialValues = {
    name: '',
    email: '',
    subject: '',
    comment: '',
  };

  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });
  return (
    <>
      <form onSubmit={formik.handleSubmit} className="space-y-5 mt-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <Input
            id="name"
            name="name"
            type="text"
            placeholder="Enter Name"
            onChange={formik.handleChange}
            value={formik.values.name}
          />
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="Enter Email"
            onChange={formik.handleChange}
            value={formik.values.email}
          />
        </div>

        <Input
          id="subject"
          name="subject"
          type="text"
          placeholder="Enter Subject"
          onChange={formik.handleChange}
          value={formik.values.subject}
        />
        <textarea
          className="flex-grow h-32 w-full rounded-md   bg-[#F6F6F6] pl-10 pr-12 py-2  placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-0 text-15 font-medium outline-none focus-visible:ring-ring focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50 placeholder:text-15 placeholder:font-bold"
          id="comment"
          name="comment"
          placeholder="Enter Comment"
          onChange={formik.handleChange}
          value={formik.values.comment}
        />
        <Button type="submit" variant={'login'} className=" rounded-none h-[70px] px-14 float-end">
          Send
        </Button>
      </form>
    </>
  );
};

export default ContactForm;
