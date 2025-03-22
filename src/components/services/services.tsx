import React, { useState } from 'react';
import Container from '../ui/Container';
import { serviceItems } from '@/data';
import Image from 'next/image';
import { Modal } from 'antd';
import { IServiceItem } from '@/types/types';

interface servicesProps {
  className?: string;
}

const Services: React.FC<servicesProps> = ({ className }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<IServiceItem | null>(null);

  const showModal = (item: any) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
  };
  return (
    <section className={`py-10 ${className ? className : ''}`}>
      <Container>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 xs:gap-6 md:gap-10 font-helvetica ">
          {serviceItems.map((item) => (
            <div
              key={item.id}
              className={`flex flex-col justify-center items-center gap-2 xs:gap-3 px-5 sm:px-10 lg:px-6 xl:px-10 bg-white py-10 rounded-sm h-28 xs:h-36 shadow-[0px_2px_12px_#00000018] cursor-pointer ${className ? 'custom-service-box' : ''}`}
              onClick={() => showModal(item)}
            >
              <Image src={item.icon} width={100} height={100} alt="icon" className="w-auto" />
              <div className="text-xs xs:text-16 md:text-18 lg:text-14 2xl:text-20 text-center">
                {item.title}
              </div>
            </div>
          ))}
        </div>
        <Modal title={selectedItem?.title} open={isModalOpen} onCancel={handleCancel} footer={null}>
          <div className="flex flex-col items-center">
            <Image src={selectedItem?.icon || ""} width={150} height={150} alt="icon" className="w-auto" />
            <p className="mt-4 text-center text-lg">{selectedItem?.description || "No description available"}</p>
          </div>
        </Modal>
      </Container>
    </section>
  );
};

export default Services;
