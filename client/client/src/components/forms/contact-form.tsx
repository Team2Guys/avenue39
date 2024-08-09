'use client';
import { useFormik } from 'formik';
import React from 'react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { LabelInput } from '../ui/label-input';
import { Label } from '../ui/label';

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
      <form onSubmit={formik.handleSubmit} className="space-y-10 mt-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 ">
          <LabelInput
            label="Your Name"
            id="name"
            name="name"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.name}
          />
          <LabelInput
            label="Your Email"
            id="email"
            name="email"
            type="email"
            onChange={formik.handleChange}
            value={formik.values.email}
          />
        </div>

        <LabelInput
          label="Subject"
          id="subject"
          name="subject"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.subject}
        />
        <div className="space-y-3">
          <Label className="mb-1 px-8 text-sm font-semibold text-17 text-[#666666]">
            Your Message
          </Label>
          <textarea
            className="flex-grow h-32 w-full rounded-3xl   bg-[#F6F6F6] pl-10 pr-12 py-2  placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-0 text-15 font-medium outline-none focus-visible:ring-ring focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50 "
            id="comment"
            name="comment"
            onChange={formik.handleChange}
            value={formik.values.comment}
          />
        </div>
        <Button
          type="submit"
          variant={'login'}
          className="h-[70px] w-64 px-14 float-end rounded-md"
        >
          Send
        </Button>
      </form>
    </>
  );
};

export default ContactForm;
