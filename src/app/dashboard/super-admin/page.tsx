
import dynamic from 'next/dynamic';
const SuperAdmin = dynamic(() => import('./SuperAdmin'))

const SuperAdmin_main = () => {

  return (
<SuperAdmin/>
  );
};

export default SuperAdmin_main;
