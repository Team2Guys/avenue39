import Container from '../ui/Container';
import { serviceItems } from '@/data';
import Image from 'next/image';

const Services: React.FC = () => {
  return (
    <section className="bg-lightbackground py-8 mt-4">
    <Container>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 xs:gap-6">
        {serviceItems.map((item) => (
          <div key={item.id} className="flex flex-col justify-center items-center gap-3 bg-white p-4 drop-shadow-sm rounded-sm h-28 xs:h-32">
            <Image src={item.icon} width={20} height={20} alt="icon" />
            <div className='text-xs sm:text-16 md:text-18 xl:text-20 font-medium text-center xs:text-start'>{item.title}</div>
          </div>
        ))}
      </div>
    </Container>
  </section>
  );
};

export default Services;
