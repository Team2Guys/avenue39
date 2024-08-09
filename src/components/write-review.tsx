'use client';
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Rate, Spin } from 'antd';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import showToast from './Toaster/Toaster';
import Loader from './Loader/Loader';

interface IWriteReview {
  productId: number;
}

const WriteReview = ({ productId }: IWriteReview) => {
  const [formData, setFormData] = useState({
    productId: productId,
    name: '',
    email: '',
    review: '',
    star: 0,
  });

  const handleStarChange = (value: number) => {
    setFormData({ ...formData, star: value });
  };

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleReviewSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // @ts-expect-error
    mutation.mutate(formData);
  };

  const mutation = useMutation({
    mutationFn: (formData) => {
      return axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/reviews/add-review`,
        formData,
      );
    },
    onSuccess: () => {
      showToast('success', 'Review Added Successfully🎉');
      setFormData({
        productId: productId,
        name: '',
        email: '',
        review: '',
        star: 0,
      });
    },
    onError: (error: any) => {
      showToast('warn', 'Ensure all fields are correctly filled.');
      console.error('Error adding review:', error);
    },
  });

  return (
    <Dialog>
      <DialogTrigger>
        <Button className="bg-warning w-full h-12 rounded-sm font-light">
          Write a Review
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-white">
        <DialogHeader>
          <DialogTitle>Add a Review</DialogTitle>
        </DialogHeader>
        <div>
          <p>Your Email Address Will Not Be Published.</p>
          <form
            onSubmit={handleReviewSubmit}
            className="flex flex-col gap-4 mt-4"
          >
            <Rate onChange={handleStarChange} value={formData.star} />
            <div>
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                className="border px-2 w-full h-10 rounded-md"
                onChange={handleInputChange}
              />
            </div>
            <div>
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                className="border px-2 w-full h-10 rounded-md"
                onChange={handleInputChange}
              />
            </div>
            <div>
              <textarea
                name="review"
                className="border px-2 py-2 w-full rounded-md"
                rows={4}
                placeholder="Write a Review"
                value={formData.review}
                onChange={handleInputChange}
              ></textarea>
            </div>
            <div>
              {mutation.isPending ? (
                <Loader />
              ) : (
                <Button variant={'default'} type="submit">
                  Submit
                </Button>
              )}
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default WriteReview;
