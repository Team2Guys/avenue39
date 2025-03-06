'use client';
import React, { useState } from 'react';
import Loader from '../Loader/Loader';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import axios from 'axios';
import showToast from '../Toaster/Toaster';
import { useRouter } from 'next/navigation';

const ForgotForm = () => {
  const [email, setEmail] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setError('');
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setError('Please enter a valid email address.');
      return;
    }
    setLoading(true);

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/user/forget-password`,
        { email },
      );
      console.log('Email sent:', email);
      showToast('success', `Email sent: ${response.data.message}`);
    } catch (err: any) {
      console.error(
        'Error sending Email:',
        err.response?.data?.message || err.message,
      );
      showToast('error', 'Failed to send Email. Please try again.');
    } finally {
      setLoading(false);
      router.push('/login');
    }
  };

  return (
    <div className="w-full text-center flex justify-center items-center">
      <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="Enter Email"
          onChange={handleEmailChange}
          value={email}
          className={error ? 'border-red-500' : ''}
        />
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <Button
          type="submit"
          variant="login"
          className="w-full h-[50px] sm:h-[76px]"
          disabled={loading}
        >
          {loading ? <Loader color="white" /> : 'Send Reset Email'}
        </Button>
      </form>
    </div>
  );
};

export default ForgotForm;
