'use client';
import React, { useState, useEffect } from 'react';
import Breadcrumb from '@components/Dashboard/Breadcrumbs/Breadcrumb';
import Image from 'next/image';
import DefaultLayout from '@components/Dashboard/Layouts/DefaultLayout';
import ProtectedRoute from '@/hooks/AuthHookAdmin';
import { useAppSelector } from '@components/Others/HelperRedux';
import { uploadPhotosToBackend } from '@/utils/helperFunctions';
import { IMAGE_INTERFACE } from '@/types/interfaces';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useAppDispatch } from '@components/Others/HelperRedux';
import { loggedInAdminAction } from '../../../redux/slices/Admin/AdminsSlice';
import { ImageRemoveHandler } from '@/utils/helperFunctions';
import { Input } from '@/components/ui/input';
import { LabelInput } from '@/components/ui/label-input';

const Settings = () => {
  const { loggedInUser }: any = useAppSelector((state) => state.usersSlice);
  const token = Cookies.get('2guysAdminToken');
  const dispatch = useAppDispatch();
  let AdminType = loggedInUser && loggedInUser.role == 'super-Admin';

  const initialFormData = {
    fullname: loggedInUser ? `${loggedInUser.fullname}` : '',
  };
  const initialValue = {
    name: loggedInUser ? `${loggedInUser.email}` : '',
  };
  const [formData, setFormData] = useState(initialFormData);

  const [profilePhoto, setProfilePhoto] = useState<IMAGE_INTERFACE[]>([]);
  console.log(loggedInUser, 'loggedInUser');

  const handlePhotoChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      let imageUrl: any = await uploadPhotosToBackend([file]);

      imageUrl ? setProfilePhoto(imageUrl) : null;
    }
  };

  const adminUpdateHandler = async () => {
    try {
      let initialFormData = {
        email: loggedInUser.email,
        fullname: formData.fullname,
        profilePhoto: profilePhoto[0],
      };

      if (loggedInUser) {
        let { fullname, profilePhoto, ...extractedData } = loggedInUser;
        console.log(extractedData, 'extractedData');

        if (profilePhoto.length > 0) {
          initialFormData = {
            ...initialFormData,
            profilePhoto: profilePhoto[0],
          };
        }

        let combinedData = {
          ...initialFormData,
          ...extractedData,
        };

        let response: any = await axios.put(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/admins/editAdmin/${loggedInUser._id}`,
          combinedData,
          {
            headers: {
              token: token,
            },
          },
        );

        if (response.status === 200) {
          console.log('Admin updated successfully:', response.data);
        } else {
          console.error('Failed to update admin');
        }
      }
    } catch (error) {
      console.error('Error updating admin:', error);
    }
  };

  useEffect(() => {
    setFormData(initialFormData);
  }, [loggedInUser]);

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    try {
      await adminUpdateHandler();
      await AddminProfileTriggerHandler();
    } catch (err) {
      console.log(err, 'err');
    }
  };

  const AddminProfileTriggerHandler = async () => {
    try {
      let user: any = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/admins/getAdminHandler`,
        {
          headers: {
            token: token,
          },
        },
      );
      dispatch(loggedInAdminAction(user.data.user));
    } catch (err: any) {
      console.log(err, 'err');
    }
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (loggedInUser && loggedInUser.profilePhoto) {
      console.log(loggedInUser.profilePhoto, 'loggedInUser.profilePhoto');
      Object.keys(loggedInUser.profilePhoto).length > 0
        ? setProfilePhoto([loggedInUser.profilePhoto])
        : null;
    }
  }, [loggedInUser]);

  return (
    <DefaultLayout>
      <div className="mx-auto max-w-270">
        <Breadcrumb pageName="Settings" />
        <div className="flex flex-col gap-8">
          <div className="col-span-5 xl:col-span-2">
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="border-b border-stroke px-7 py-4 dark:border-strokedark">
                <h3 className="font-medium text-primary dark:text-black">
                  Profile Photo
                </h3>
              </div>
              <div className="px-7 py-5">
                <div>
                  <div className="mb-4 flex items-center gap-3">
                    {profilePhoto.map((profilePhoto) => {
                      return (
                        <>
                          <div className="h-14 w-14 rounded-full overflow-hidden">
                            <Image
                              src={
                                profilePhoto && profilePhoto.imageUrl
                                  ? profilePhoto.imageUrl
                                  : '/images/dummy-avatar.jpg'
                              }
                              width={55}
                              height={55}
                              alt="User"
                            />
                          </div>

                          <div>
                            <span className="mb-1.5 text-primary dark:text-black">
                              Edit your photo
                            </span>
                            <span className="flex gap-2.5">
                              <button
                                className="text-sm hover:text-primary text-primary dark:text-black"
                                type="button"
                                onClick={() =>
                                  ImageRemoveHandler(
                                    profilePhoto?.public_id
                                      ? profilePhoto?.public_id
                                      : '',
                                    setProfilePhoto,
                                  )
                                }
                              >
                                Delete
                              </button>
                              <button
                                className="text-sm hover:text-primary text-primary dark:text-black"
                                type="button"
                              >
                                Update
                              </button>
                            </span>
                          </div>
                        </>
                      );
                    })}

                    {/* <div className="h-14 w-14 rounded-full overflow-hidden">
                      <Image
                        src={profilePhoto ? profilePhoto.imageUrl : '/images/dummy-avatar.jpg'}
                        width={55}
                        height={55}
                        alt="User"
                      />
                    </div>
                    <div>
                      <span className="mb-1.5 text-black dark:text-white">
                        Edit your photo
                      </span>
                      <span className="flex gap-2.5">
                        <button className="text-sm hover:text-primary text-black dark:text-white" type="button" disabled={AdminType}>
                          Delete
                        </button>
                        <button className="text-sm hover:text-primary text-black dark:text-white" type="button" disabled={AdminType}>
                          Update
                        </button>
                      </span>
                    </div> */}
                  </div>
                  <div className="relative mb-4  rounded-md border-dashed border-stroke dark:border-strokedark bg-primary py-4 text-white dark:bg-black">
                    <input
                      disabled={AdminType}
                      type="file"
                      accept="image/*"
                      onChange={handlePhotoChange}
                      className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    <div className="flex flex-col items-center justify-center">
                      <span className="my-2 inline-block rounded-full bg-white border-primary border  p-2">
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
                      <p className="text-white dark:text-white text-sm">
                        <span className="text-white dark:text-white text-sm">
                          Click to upload
                        </span>{' '}
                        or drag and drop
                      </p>
                      <p className="mt-1.5 text-white dark:text-white text-sm">
                        SVG, PNG, JPG or GIF
                      </p>
                      <p className="text-white dark:text-white text-sm">
                        (max, 800 X 800px)
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-span-5 xl:col-span-3">
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="border-b border-stroke px-7 py-4 dark:border-strokedark">
                <h3 className="font-medium text-primary dark:text-black">
                  Personal Information
                </h3>
              </div>
              <div className="p-7">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                    <div className="w-full sm:w-1/2">
                      {/* Add additional form fields if needed */}
                    </div>
                  </div>

                  <LabelInput
                    label="Full Name"
                    disabled={AdminType}
                    type="text"
                    name="fullname"
                    id="fullname"
                    placeholder="Full Name"
                    value={formData.fullname}
                    onChange={handleChange}
                  />
                  <LabelInput
                    label="Email Address"
                    type="email"
                    name="emailAddress"
                    id="emailAddress"
                    placeholder="Email Address"
                    value={initialValue.name}
                    disabled={true}
                  />

                  <div className="flex justify-end gap-4.5">
                    <button
                      className="flex justify-center rounded bg-primary dark:bg-black px-6 py-2 font-medium text-white hover:bg-opacity-90"
                      type="submit"
                    >
                      Save
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default ProtectedRoute(Settings);
