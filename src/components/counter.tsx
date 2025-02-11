'use client';
import React from 'react';
import { HiMinusSm, HiPlusSm } from 'react-icons/hi';

interface CounterProps {
  count: number;
  stock?: number;
  onIncrement?: () => void;
  onDecrement?: () => void;
}

const Counter: React.FC<CounterProps> = ({
  count,
  stock,
  onIncrement,
  onDecrement,
}) => {
  return (
    <div className="flex items-center border border-gray-300 rounded py-1 md:py-3 w-fit">
      <button
        onClick={onDecrement}
        className="px-2 text-gray-600"
        disabled={count <= 1}
      >
        <HiMinusSm size={20} />
      </button>
      <span className="mx-2">{count}</span>
      <button
        onClick={onIncrement}
        disabled={(stock && stock <= count) || false}
        className="px-2 text-gray-600 disabled:text-gray-300"
      >
        <HiPlusSm size={20} />
      </button>
    </div>
  );
};

export default Counter;
