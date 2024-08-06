
import React from 'react';
import Tabs from '@/components/card-slider/tabs';
import { slidersData } from '@/data';
import Container from '../ui/Container';

const CardsTabes: React.FC = () => {
  return (
    <Container>
      <Tabs slidersData={slidersData} />
    </Container>
  );
};

export default CardsTabes;
