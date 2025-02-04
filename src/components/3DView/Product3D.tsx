import React from 'react';
// import { Canvas } from '@react-three/fiber';
// import { OrbitControls, Environment, useGLTF } from '@react-three/drei';

// interface ModelProps {
//   modelPath: string;
// }

// const Model: React.FC<ModelProps> = ({ modelPath }) => {
//   const { scene } = useGLTF(modelPath);
//   return <primitive object={scene} scale={[2, 2, 2]} />;
// };

interface Product3DProps {
  modelUrl: string;
}

const Product3D: React.FC<Product3DProps> = ({ modelUrl }) => {
  return (
    // <div className="w-[1000px] h-[700px]">
    //   <Canvas camera={{ position: [0, 2, 10], fov: 40 }}>
    //     <ambientLight intensity={0.8} />{' '}
    //     <pointLight position={[10, 10, 10]} intensity={1} />{' '}
    //     <Model modelPath={modelUrl} />
    //     <OrbitControls />
    //     <Environment preset="warehouse" />
    //   </Canvas>
    // </div>
    <div>{modelUrl}</div>
  );
};

export default Product3D;
