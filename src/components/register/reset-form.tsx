'use client';
import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import axios from 'axios';
import { Button } from '../ui/button';
import Loader from '../Loader/Loader';
import { Input } from '../ui/input';
import showToast from '../Toaster/Toaster';

const ResetForm = () => {
  const searchParams = useSearchParams();
  const [verifiedToken, setVerifiedToken] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadingSkeleton, setLoadingSkeleton] = useState(true);

  const token = searchParams.get('token');
  const router = useRouter();
  const verify_token = async () => {
    try {
      if (!token) return;
      await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/user/getuserHandler`,
        {
          headers: { authorization: `Bearer ${token}` },
        },
      );
      setVerifiedToken(true);
      setLoadingSkeleton(false);
    } catch (error: any) {
      console.error(error);
      setVerifiedToken(false);
      setLoadingSkeleton(false);
    }
  };

  useEffect(() => {
    verify_token();
  }, [token]);

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    setError('');
  };

  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setConfirmPassword(e.target.value);
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    if (!password || password.length < 8) {
      setError('Password must be at least 8 characters long.');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/user/update_password`,
        { password },
        { headers: { authorization: `Bearer ${token}` } },
      );
      showToast('success', response.data.message);
    } catch (error: any) {
      console.error(
        'Error updating password:',
        error.response?.data?.message || error.message,
      );
      showToast('error', 'Failed to update password. Please try again.');
    } finally {
      setLoading(false);
      router.push('/login');
    }
  };

  return (
    <div className="w-full text-center flex justify-center items-center">
      {loadingSkeleton ? (
        <div className="w-full max-w-md">
          <Loader />
        </div>
      ) : verifiedToken ? (
        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
          <Input
            id="password"
            name="password"
            type="password"
            placeholder="Enter New Password"
            onChange={handlePasswordChange}
            value={password}
          />
          <Input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            placeholder="Confirm New Password"
            onChange={handleConfirmPasswordChange}
            value={confirmPassword}
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <Button
            type="submit"
            variant="login"
            className="w-full h-[50px] sm:h-[76px]"
            disabled={loading}
          >
            {loading ? <Loader color="white" /> : 'Update Password'}
          </Button>
        </form>
      ) : (
        <p className="text-red-500">
          Invalid or expired token. Please try again.
        </p>
      )}
    </div>
  );
};

export default ResetForm;
