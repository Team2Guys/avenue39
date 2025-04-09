'use client';
import TopHero from '@/components/top-hero';
import { profilebreadcrumbs } from '@/data/data';
import Link from 'next/link';
import React, { useState, Fragment, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Container from '@/components/ui/Container';
import { Button } from '@/components/ui/button';
import { useDispatch, useSelector } from 'react-redux';
import { State } from '@/redux/store';
import showToast from '@/components/Toaster/Toaster';
import {
  ImageRemoveHandler,
  uploadPhotosToBackend,
} from '@/utils/helperFunctions';
import { loggedInUserAction } from '@/redux/slices/user/userSlice';
import UseAuth from '@/hooks/useAuth';

function ProfileComponent() {
  const { loggedInUser } = useSelector((state: State) => state.usrSlice);

  const router = useRouter();

  const [formData, setFormData] = useState({ fullName: '', email: '' });
  const [profilePhoto, setProfilePhoto] = useState<any>({});
  // const token = Cookies.get('user_token');
  const dispatch = useDispatch();

  const handlePhotoChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      let imageUrl: any = await uploadPhotosToBackend([file]);

      imageUrl ? setProfilePhoto(() => imageUrl) : null;
    }
  };

  useEffect(() => {
    if (loggedInUser) {
      setProfilePhoto({
        imageUrl: loggedInUser?.userImageUrl,
        public_id: loggedInUser.userPublicId,
      });
      setFormData({ fullName: loggedInUser.name, email: loggedInUser.email });
    }
  }, [loggedInUser]);

  // const AddminProfileTriggerHandler = async () => {
  //   try {
  //     if (!token) return;
  //     let user: any = await axios.get(
  //       `${process.env.NEXT_PUBLIC_BASE_URL}/api/user/getuserHandler`,
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       },
  //     );
  //     dispatch(loggedInUserAction(user.data.user));
  //   } catch (err: any) {
  //     console.log(err, 'err');
  //   }
  // };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    let { fullName, ...userDetails }: any = {
      id: loggedInUser.id,
      name: formData.fullName,
      ...formData,
    };
    console.log(fullName, 'fullName');
    userDetails = {
      ...userDetails,
      userImageUrl: profilePhoto.imageUrl || '',
      userImagePublicId: profilePhoto.public_id || '',
    };


    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/user/edit-user`,
        userDetails,
      );

      showToast('success', res.data.message);
      dispatch(loggedInUserAction(res.data.user));
    } catch  {
      showToast('error', 'Their is something wrong!');
    }
  };

  const logoutHhandler = () => {
    try {
      Cookies.remove('user_token', { path: '/' });
      router.push('/login');
      dispatch(loggedInUserAction(null));
    } catch  {
      return "Their is something wrong!";
    }
  };

  const handleDelete = async () => {
    try {
      await ImageRemoveHandler(loggedInUser.userImagePublicId, profilePhoto);
      setProfilePhoto({});
      showToast('success', 'Image removed successfully🎉');
    } catch (err: any) {
      showToast(
        'error',
        err?.response?.data?.message ||
          err?.response ||
          'Their is something wrong!',
      );
    }
  };

  return (
    <Fragment>
      <TopHero breadcrumbs={profilebreadcrumbs} />

      <Container className="mt-4  dark:border-strokedark dark:bg-boxdark dark:border-strokedark dark:bg-boxdark dark:bg-black dark:text-white dark:bg-boxdark dark:border-white border">
        <div className="flex flex-wrap md:flex-nowrap md:gap-4">
          <div className="p-2 rounded-md shadow w-full md:w-4/12 hidden md:block">
            <div className="space-y-2 flex flex-col">
              <Link
                className="border border-gray p-2 max-w-full rounded-md hover:bg-primary hover:text-white md:text-lg font-medium md:font-semibold shadow"
                href={'/order-history'}
              >
                Order History
              </Link>
              <Link
                className="border border-gray p-2 max-w-full rounded-md hover:bg-primary hover:text-white md:text-lg font-medium md:font-semibold shadow"
                href={'/about'}
              >
                About Us
              </Link>
              <p
                className="border border-gray p-2 max-w-full rounded-md hover:bg-primary hover:text-white md:text-lg font-medium md:font-semibold shadow cursor-pointer"
                onClick={() => logoutHhandler()}
              >
                Log Out
              </p>
            </div>
          </div>
          <div className="p-4 rounded-md shadow w-full md:w-8/12">
            <div>
              <div className="mb-4 flex items-center gap-3">
                <div className="h-14 w-14 rounded-full overflow-hidden">
                  <Image
                    src={
                      profilePhoto && profilePhoto.imageUrl
                        ? profilePhoto.imageUrl
                        : '/images/dummy-avatar.jpg'
                    }
                    width={55}
                    height={55}
                    alt={loggedInUser ? loggedInUser.name : 'Profile Photo'}
                  />
                </div>

                <div>
                  <span className="text-black dark:text-white">
                    Edit your photo
                  </span>
                  <span className="flex gap-2">
                    <Button
                      variant={'underline'}
                      className="w-fit h-fit py-0 px-0"
                      onClick={handleDelete}
                    >
                      Delete
                    </Button>
                    <Button
                      variant={'underline'}
                      className="w-fit h-fit py-0 px-0"
                    >
                      Update
                    </Button>
                  </span>
                </div>

                {/* </>

                    )

                  })} */}
              </div>
              <div className="relative mb-4 pt-2 h-36 rounded-md bg-lightbackground dark:bg-meta-4">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoChange}
                  className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                />
                <div className="flex flex-col items-center justify-center">
                  <span className="my-2 inline-block rounded-full bg-white border-red-500 border-2  p-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width="20"
                      height="20"
                    >
                      <path
                        fill="#c72031"
                        d="M10 16v-5h4v5h5l-7 7-7-7h5zm-4-16v2h12v-2h-12zm-4 4h20v2h-20v-2z"
                      />
                    </svg>
                  </span>
                  <p className="text-black dark:text-white text-sm">
                    <span className="text-red-500 font-semibold dark:text-white text-sm">
                      Click to upload
                    </span>{' '}
                    or drag and drop
                  </p>
                  <p className="mt-1.5 text-black dark:text-white text-sm">
                    SVG, PNG, JPG or GIF
                  </p>
                  <p className="text-black dark:text-white text-sm">
                    (max, 800 X 800px)
                  </p>
                </div>
              </div>
            </div>

            <div className="col-span-5 xl:col-span-3 dark:border-strokedark dark:bg-boxdark dark:border-strokedark dark:bg-boxdark dark:bg-black dark:text-white dark:bg-boxdark dark:border-white border">
              <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                <div className="border-b border-stroke px-7 py-4 dark:border-strokedark">
                  <h3 className="font-medium  dark:text-white">
                    Personal Information
                  </h3>
                </div>
                <div className="p-7">
                  <form onSubmit={handleSubmit}>
                    <div className="mb-5 flex flex-col gap-5 sm:flex-row">
                      <div className="mb-5 w-full">
                        <label
                          className="mb-3 block text-sm font-medium  dark:text-white"
                          htmlFor="fullName"
                        >
                          Full Name
                        </label>
                        <input
                          className="w-full rounded border border-stroke bg-gray px-4 py-3  focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                          type="text"
                          name="fullName"
                          id="fullName"
                          placeholder="Full Name"
                          value={formData.fullName}
                          onChange={handleChange}
                        />
                      </div>

                      <div className="mb-5 w-full">
                        <label
                          className="mb-3 block text-sm font-medium  dark:text-white"
                          htmlFor="email"
                        >
                          Email Address
                        </label>
                        <div className="relative">
                          <span className="absolute left-4 top-4  dark:text-white">
                            <svg
                              className="fill-current"
                              width="20"
                              height="20"
                              viewBox="0 0 20 20"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <g opacity="0.8">
                                <path
                                  fillRule="evenodd"
                                  clipRule="evenodd"
                                  d="M3.33301 4.16667C2.87658 4.16667 2.49967 4.54357 2.49967 5V15C2.49967 15.4564 2.87658 15.8333 3.33301 15.8333H16.6663C17.1228 15.8333 17.4997 15.4564 17.4997 15V5C17.4997 4.54357 17.1228 4.16667 16.6663 4.16667H3.33301ZM0.833008 5C0.833008 3.6231 1.9561 2.5 3.33301 2.5H16.6663C18.0432 2.5 19.1663 3.6231 19.1663 5V15C19.1663 16.3769 18.0432 17.5 16.6663 17.5H3.33301C1.9561 17.5 0.833008 16.3769 0.833008 15V5Z"
                                  fill=""
                                />
                                <path
                                  fillRule="evenodd"
                                  clipRule="evenodd"
                                  d="M0.983719 4.52215C1.24765 4.1451 1.76726 4.05341 2.1443 4.31734L9.99975 9.81615L17.8552 4.31734C18.2322 4.05341 18.7518 4.1451 19.0158 4.52215C19.2797 4.89919 19.188 5.4188 18.811 5.68272L10.4776 11.5161C10.1907 11.7169 9.80879 11.7169 9.52186 11.5161L1.18853 5.68272C0.811486 5.4188 0.719791 4.89919 0.983719 4.52215Z"
                                  fill=""
                                />
                              </g>
                            </svg>
                          </span>
                          <input
                            className="w-full rounded border border-stroke bg-gray py-3 pl-11 pr-4  focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                            type="email"
                            name="email"
                            id="email"
                            placeholder="Email Address"
                            value={formData.email}
                            disabled={true}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-end gap-4">
                      <Button variant={'secondary'} className="w-32 shadow">
                        Cancel
                      </Button>
                      <Button
                        type="submit"
                        variant={'default'}
                        className="w-32 font-light shadow"
                      >
                        Save
                      </Button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Fragment>
  );
}
export default UseAuth(ProfileComponent);
