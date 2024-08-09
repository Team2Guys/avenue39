import React from 'react';
import CustromTestimonialCard from '../ui/custrom-testimonial-card';
import { ITestimonialCard } from '@/types/types';
import Container from '../ui/Container';

interface TestimonialProps {
  testimonialitems: ITestimonialCard[];
}
const CustomTestimonal: React.FC<TestimonialProps> = ({ testimonialitems }) => {
  return (
    <Container className="text-center py-14">
      <h2 className="font-medium text-[48px]">Testimonial</h2>
      <div className="grid grid-cols-1 xs:grid-cols-2 xl:flex xl:justify-between py-12 gap-6 ">
        {testimonialitems.map((card) => (
          <div key={card.id}>
            <CustromTestimonialCard card={card} />
          </div>
        ))}
      </div>
    </Container>
  );
};

export default CustomTestimonal;
