import React from 'react';
interface Product3DProps {
  modelUrl: string;
}

const Product3D: React.FC<Product3DProps> = ({ modelUrl }) => {
  return (
    <div>{modelUrl}</div>
  );
};

export default Product3D;
