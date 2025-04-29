import React, { useState } from 'react';
import { Select } from 'antd';
import { IProduct } from '@/types/prod';
import { toast } from 'react-toastify';
import { FieldProps } from 'formik';

const { Option } = Select;


const ProductSelect = ({
  field,
  form,
  productsData,
  productLimit = 5,
  protSlider,
  landSlider,
  lastrow
}: FieldProps & { productsData: IProduct[]; productLimit: number, protSlider?: boolean , landSlider?: boolean , lastrow?: boolean }) => {
  const [selectedProducts, setSelectedProducts] = useState<string[]>(field.value || []); 

  const handleChange = (value: string[]) => {
    if (value.length > productLimit) {
      toast.warning(`You can only select up to ${productLimit} products.`);
    } else {
      setSelectedProducts(value);
      form.setFieldValue(field.name, value); 
    }
  };

  return (
    <div>
      <h3>Select {productLimit} products for the {protSlider ? 'Portrait Silder' : landSlider ? 'LandScape Silder' : lastrow ? 'Last Row' : 'First Row'}:</h3>

      <Select
        mode="multiple"
        value={selectedProducts}
        onChange={handleChange}
        placeholder="Select products"
        style={{ width: '100%' }}
        maxTagCount={5}
        maxTagTextLength={20}
      >
        {productsData.map((product) => (
          <Option key={product.id} value={product.id}>
            {product.name}
          </Option>
        ))}
      </Select>

      {form.touched[field.name] && form.errors[field.name] && (
        <div style={{ color: 'red' }}>{form.errors[field.name] as any}</div>
      )}
    </div>
  );
};

export default ProductSelect;
