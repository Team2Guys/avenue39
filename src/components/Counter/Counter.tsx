'use client';
import { message } from 'antd';
import React from 'react';
import { HiMinusSm, HiPlusSm } from 'react-icons/hi';

interface CounterProps {
  count: number;
  /* eslint-disable */
  onChangeCount: (count: number) => void;
  /* eslint-enable */
}

const Counter: React.FC<CounterProps> = ({ count, onChangeCount }) => {
  const onIncrement = () => {
    onChangeCount(count + 1);
  };

  const onDecrement = () => {
    if (count > 1) {
      onChangeCount(count - 1);
    } else {
      message.error('At least 1 quantity is required!');
    }
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (!isNaN(Number(value)) && value.trim() !== '') {
      onChangeCount(Number(value));
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && count === 1) {
      message.error('Cannot go below 1!');
    }
  };
  console.log(count, 'count');
  return (
    <div className="flex items-center border border-gray-300 rounded py-1 md:p-2 md:py-3 w-24 sm:w-fit">
      <button
        onClick={onDecrement}
        className="px-2 text-gray-600"
        disabled={count <= 0}
      >
        <HiMinusSm size={20} />
      </button>
      <input
        type="text"
        value={count}
        onKeyDown={handleKeyDown}
        onChange={onChange}
        className="mx-2 text-center w-3 sm:w-12 border-none outline-none"
      />
      <button onClick={onIncrement} className="px-2 text-gray-600">
        <HiPlusSm size={20} />
      </button>
    </div>
  );
};

export default Counter;
