import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { IProduct } from '@/types/prod';
import ProductSelect from '@/components/ui/multiple-select';
import Loader from '@/components/Loader/Loader';

const initialValues = {
  dining: [
    [],
    [], 
    [], 
    [], 
  ],
  living: [
    [],
    [],
    [],
    [],
  ],
  bedroom: [
    [],
    [],
    [],
  ]
};

const validationSchema = Yup.object({
  dining: Yup.array().of(
    Yup.array().min(1, "At least one product must be selected").required("Please select products")
  ),
  living: Yup.array().of(
    Yup.array().min(1, "At least one product must be selected").required("Please select products")
  ),
  bedroom: Yup.array().of(
    Yup.array().min(1, "At least one product must be selected").required("Please select products")
  ),
});

const ProductLayout = ({ productsData }: { productsData: IProduct[] }) => {
  const handleSubmit = (values: any) => {
    console.log("Form Submitted:", values);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <Form className='space-y-5'>
          {/* Dining Products */}
          <div>
            <h2 className='text-2xl font-bold'>For Dining Products</h2>
            <div className="border mt-4 p-4 space-y-4">
              {['1', '2', '3', '4'].map((section, index) => (
                <Field
                  key={section}
                  name={`dining[${index}]`}
                  component={ProductSelect}
                  productsData={productsData}
                  productLimit={index === 2 || index ===  1 ? 2 : index ===  3 ? 3 : 5}
                  protSlider={ index === 1 && true}
                  landSlider={ index === 2 && true}
                  lastrow={index === 3 && true}
                />
              ))}
            </div>
          </div>

          {/* Living Products */}
          <div>
            <h2 className='text-2xl font-bold'>For Living Products</h2>
            <div className="border mt-4 p-4 space-y-4">
              {['1', '2', '3', '4'].map((section, index) => (
                <Field
                  key={section}
                  name={`living[${index}]`}
                  component={ProductSelect}
                  productsData={productsData}
                  productLimit={index === 2 || index ===  1 ? 2 : index ===  0 ? 5 : 3}
                  protSlider={ index === 1 && true}
                  landSlider={ index === 2 && true}
                  lastrow={index === 0 && true}
                />
              ))}
            </div>
          </div>

          {/* Bedroom Products */}
          <div>
            <h2 className='text-2xl font-bold'>For Bedroom Products</h2>
            <div className="border mt-4 p-4 space-y-4">
              {['1', '2', '3'].map((section, index) => (
                <Field
                  key={section}
                  name={`bedroom[${index}]`}
                  component={ProductSelect}
                  productsData={productsData}
                  productLimit={index ===  1 ? 2 : index ===  0 ? 3 : 5}
                  landSlider={ index === 1 && true}
                  lastrow={index === 2 && true}
                />
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="px-10 py-2 mt-2 bg-black text-white rounded-md shadow-md dark:bg-main dark:border-0"
            disabled={isSubmitting}
          >
            {isSubmitting ? <Loader color="white" /> : 'Submit'}
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default ProductLayout;
