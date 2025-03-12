'use client';
import React, { SetStateAction, useEffect, useRef, useState } from 'react';
import Imageupload from '@components/ImageUpload/Imageupload';
import { RxCross2 } from 'react-icons/rx';
import Image from 'next/image';
import { ImageRemoveHandler, uploadPhotosToBackend } from '@/utils/helperFunctions';
import Toaster from '@components/Toaster/Toaster';
import axios from 'axios';
import { Formik, Form } from 'formik';
import { Category } from '@/types/interfaces';
import { IoMdArrowRoundBack } from 'react-icons/io';
import { categoryInitialValues, categoryValidationSchema } from '@/data/data';
import Loader from '@components/Loader/Loader';
import revalidateTag from '../ServerActons/ServerAction';
import Cookies from 'js-cookie';
import { FaCropSimple } from 'react-icons/fa6';
import { Modal } from 'antd';
import ReactCrop, { Crop, centerCrop, makeAspectCrop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import showToast from '@components/Toaster/Toaster';

// Helper function to center the crop with a specific aspect ratio
function centerAspectCrop(
  mediaWidth: number,
  mediaHeight: number,
  aspect: number,
) {
  return centerCrop(
    makeAspectCrop(
      {
        unit: '%',
        width: 90,
      },
      aspect,
      mediaWidth,
      mediaHeight,
    ),
    mediaWidth,
    mediaHeight,
  );
}
interface editCategoryProps {
  seteditCategory: any;
  editCategory: any;
  setMenuType: React.Dispatch<SetStateAction<string>>;

}

const FormLayout = ({
  seteditCategory,
  editCategory,
  setMenuType,
}: editCategoryProps) => {
  let CategoryName = editCategory && editCategory.name
    ? {
      name: editCategory.name,
      description: editCategory.description,
      meta_title: editCategory.meta_title || '',
      short_description: editCategory.short_description || '',
      meta_description: editCategory.meta_description || '',
      canonical_tag: editCategory.canonical_tag || '',
      images_alt_text: editCategory.images_alt_text || '',
      custom_url: editCategory.custom_url || ""
    }
    : null;
  const [posterimageUrl, setposterimageUrl] = useState<any | null | undefined>(
    editCategory
      ? [
        {
          imageUrl: editCategory.posterImageUrl,
          public_id: editCategory.posterImagePublicId,
        },
      ]
      : null,
  );

  const [loading, setloading] = useState<boolean>(false);
  const [editCategoryName, setEditCategoryName] = useState<Category | null | undefined>(CategoryName);
  const [isCropModalVisible, setIsCropModalVisible] = useState<boolean>(false);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [crop, setCrop] = useState<Crop>();
  const [croppedImage, setCroppedImage] = useState<string | null>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  const token = Cookies.get('2guysAdminToken');
  const superAdminToken = Cookies.get('superAdminToken');
  let finalToken = token ? token : superAdminToken;

  const onSubmit = async (values: Category, { resetForm }: any) => {
    try {
      setloading(true);
      let posterImageUrl = posterimageUrl && posterimageUrl[0];
      if (!posterImageUrl) throw new Error('Please select relevant Images');
      let newValue = { ...values, posterImageUrl };

      let updateFlag = editCategoryName ? true : false;
      let addProductUrl = updateFlag ? `/api/category/update-category` : null;
      let url = `${process.env.NEXT_PUBLIC_BASE_URL}${updateFlag ? addProductUrl : '/api/category/add-category'
        }`;
      const response = await axios.post(
        url,
        updateFlag ? { ...newValue, id: editCategory.id } : newValue,
        {
          headers: {
            token: finalToken,
          },
        },
      );
      revalidateTag('categories');
      console.log(response, 'response');
      setloading(false);
      Toaster(
        'success',
        updateFlag
          ? 'Category has been sucessufully updated !'
          : 'Category has been sucessufully Created !',
      );
      updateFlag ? seteditCategory(null) : null;
      setposterimageUrl(null);
      setMenuType('Categories');
      resetForm();
    } catch (err) {
      console.log('error occurred', err);
      setloading(false);
    }
  };

  const handleCropClick = (imageUrl: string) => {
    setImageSrc(imageUrl);
    setIsCropModalVisible(true);
  };

  const onImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const { width, height } = e.currentTarget;
    const newCrop = centerAspectCrop(width, height, 16 / 9);
    setCrop(newCrop);
  };

  const onCropComplete = (crop: Crop) => {
    const image = imgRef.current;
    if (!image || !crop.width || !crop.height) return;

    const canvas = document.createElement('canvas');
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext('2d');

    if (ctx) {
      ctx.drawImage(
        image,
        crop.x * scaleX,
        crop.y * scaleY,
        crop.width * scaleX,
        crop.height * scaleY,
        0,
        0,
        crop.width,
        crop.height,
      );
    }

    const base64Image = canvas.toDataURL('image/jpeg');
    setCroppedImage(base64Image);
  };

  const handleCropModalOk = async () => {
    if (croppedImage) {
      try {
        const file = base64ToFile(croppedImage, `cropped_${Date.now()}.jpg`);
        const response = await uploadPhotosToBackend([file]);
        setposterimageUrl([{ imageUrl: response[0].imageUrl, public_id: response[0].public_id }]);
        setIsCropModalVisible(false);
        setCroppedImage(null);
      } catch (error) {
        console.error('Error uploading cropped image:', error);
        showToast('error', 'Failed to upload cropped image');
      }
    }
  };

  const base64ToFile = (base64: string, filename: string): File => {
    const arr = base64.split(',');
    const mimeMatch = arr[0].match(/:(.*?);/);
    const mime = mimeMatch ? mimeMatch[1] : '';
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], filename, { type: mime });
  };

  const handleCropModalCancel = () => {
    setIsCropModalVisible(false);
    setCroppedImage(null);
  };

  useEffect(() => {
    setEditCategoryName(CategoryName)

  }, [editCategory])


  return (
    <>
      <p
        className="text-lg font-black mb-4 flex items-center justify-center gap-2 hover:bg-gray-200 w-fit p-2 cursor-pointer text-black dark:bg-boxdark dark:bg-black dark:text-white dark:bg-boxdark dark:border-white"
        onClick={() => {
          setMenuType('Categories');
        }}
      >
        <IoMdArrowRoundBack /> Back
      </p>

      <Formik
        initialValues={
          editCategoryName ? editCategoryName : categoryInitialValues
        }
        validationSchema={categoryValidationSchema}
        onSubmit={onSubmit}
      >
        {(formik) => {
          return (
            <Form onSubmit={formik.handleSubmit}>
              <div className="flex justify-center dark:bg-boxdark dark:bg-black dark:text-white dark:bg-boxdark dark:border-white">
                <div className="flex flex-col gap-5 md:gap-9 w-full lg:w-4/5 xl:w-2/5 dark:bg-boxdark dark:bg-black dark:text-white dark:bg-boxdark dark:border-white">
                  <div className="rounded-sm border border-stroke bg-white  dark:bg-boxdark dark:bg-black dark:text-white dark:bg-boxdark dark:border-white p-3">
                    <div className="rounded-sm border border-stroke bg-white  dark:border-strokedark dark:bg-boxdark dark:bg-black">
                      <div className="border-b border-stroke py-4 px-2 dark:bg-boxdark dark:bg-black dark:text-white dark:bg-boxdark dark:border-white">
                        <h3 className="font-medium text-black dark:text-white">
                          Add Category Images
                        </h3>
                      </div>
                      {posterimageUrl && posterimageUrl.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4  dark:border-white dark:bg-black">
                          {posterimageUrl.map((item: any, index: number) => {
                            return (
                              <div
                                className="relative group rounded-lg overflow-hidden shadow-md bg-white transform transition-transform duration-300 hover:scale-105"
                                key={index}
                              >
                                <div className="absolute top-1 right-1 invisible group-hover:visible text-red bg-white rounded-full ">
                                  <RxCross2
                                    className="cursor-pointer text-red-500 dark:text-red-700"
                                    size={17}
                                    onClick={() => {
                                      ImageRemoveHandler(
                                        item.public_id,
                                        setposterimageUrl,
                                      );
                                    }}
                                  />
                                </div>
                                <div className="absolute top-7 right-1 bg-main rounded-full w-5 h-5 flex items-center justify-center opacity-0 group-hover:opacity-100 cursor-pointer">
                                  <FaCropSimple
                                    className="text-white"
                                    size={12}
                                    onClick={() => handleCropClick(item.imageUrl)}
                                  />
                                </div>
                                <Image
                                  key={index}
                                  className="object-cover w-full h-full dark:bg-black dark:shadow-lg"
                                  width={300}
                                  height={200}
                                  src={item.imageUrl}
                                  loading='lazy'
                                  alt={`productImage-${index}`}
                                />
                              </div>
                            );
                          })}
                        </div>
                      ) : (
                        <Imageupload setposterimageUrl={setposterimageUrl} />
                      )}
                    </div>
                    <Modal
                      title="Crop Image"
                      visible={isCropModalVisible}
                      onOk={handleCropModalOk}
                      onCancel={handleCropModalCancel}
                      width={500}
                      height={400}
                    >
                      {imageSrc && (
                        <ReactCrop
                          crop={crop}
                          onChange={(newCrop) => setCrop(newCrop)}
                          onComplete={onCropComplete}
                        >
                          <Image
                            width={500}
                            height={300}
                            ref={imgRef}
                            src={imageSrc}
                            alt="Crop me"
                            style={{ maxWidth: '100%' }}
                            onLoad={onImageLoad}
                          />
                        </ReactCrop>
                      )}
                    </Modal>
                    <div className="flex flex-col">


                      <div>
                        <label className="mb-3 block py-4 px-2 text-sm font-medium text-black dark:text-white">
                          Category Title
                        </label>
                        <input
                          type="text"
                          name="name"
                          onChange={formik.handleChange}
                          value={formik.values.name}
                          placeholder="Title"
                          className={`w-full rounded-lg border-[1.5px]  px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whitebg-black dark:text-white ${formik.touched.name && formik.errors.name
                              ? 'border-red-500'
                              : ''
                            }`}
                        />
                        {formik.touched.name && formik.errors.name ? (
                          <div className="text-red-500 text-sm">
                            {formik.errors.name}
                          </div>
                        ) : null}
                      </div>

                      <div>
                        <label className="mb-3 block py-4 px-2 text-sm font-medium text-black dark:text-white">
                          Custom Url
                        </label>
                        <input
                          type="text"
                          name="custom_url"
                          onChange={formik.handleChange}
                          value={formik.values.custom_url}
                          placeholder="Custom Url"
                          className={`w-full rounded-lg border-[1.5px]  px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whitebg-black dark:text-white ${formik.touched.custom_url && formik.errors.custom_url
                              ? 'border-red-500'
                              : ''
                            }`}
                        />
                        {formik.touched.custom_url && formik.errors.custom_url ? (
                          <div className="text-red-500 text-sm">
                            {formik.errors.custom_url}
                          </div>
                        ) : null}
                      </div>
                      <div>
                        <label className="mb-3 block py-4 px-2 text-sm font-medium text-black dark:text-white">
                          Category Description
                        </label>
                        <textarea
                          name="description"
                          onChange={formik.handleChange}
                          value={formik.values.description}
                          placeholder="Description"
                          className={`w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter  dark:text-white dark:focus:border-primary ${formik.touched.name && formik.errors.name
                              ? 'border-red-500'
                              : ''
                            }`}
                        />
                        {formik.touched.name && formik.errors.name ? (
                          <div className="text-red-500 text-sm">
                            {formik.errors.name}
                          </div>
                        ) : null}
                      </div>
                      <div>
                        <label className="mb-3 block py-4 px-2 text-sm font-medium text-black dark:text-white">
                          Short Description
                        </label>
                        <textarea
                          name="short_description"
                          onChange={formik.handleChange}
                          value={formik.values.short_description}
                          placeholder="Short Description"
                          className={`w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter  dark:text-white dark:focus:border-primary ${formik.touched.name && formik.errors.name
                              ? 'border-red-500'
                              : ''
                            }`}
                        />
                        {formik.touched.name && formik.errors.name ? (
                          <div className="text-red-500 text-sm">
                            {formik.errors.name}
                          </div>
                        ) : null}
                      </div>
                      <div className="flex gap-4 mt-4">
                        <div className="w-2/4">
                          <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                            Meta Title
                          </label>
                          <input
                            type="text"
                            name="meta_title"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.meta_title}
                            placeholder="Meta Title"
                            className={`w-full rounded-lg border-[1.5px] border-stroke placeholder:text-lightgrey bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary ${formik.touched.meta_title &&
                                formik.errors.meta_title
                                ? 'border-red-500'
                                : ''
                              }`}
                          />
                          {formik.touched.meta_title &&
                            formik.errors.meta_title ? (
                            <div className="text-red text-sm">
                              {formik.errors.meta_title as String}
                            </div>
                          ) : null}
                        </div>
                        <div className="w-2/4">
                          <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                            Canonical Tag
                          </label>
                          <input
                            onBlur={formik.handleBlur}
                            type="text"
                            name="canonical_tag"
                            onChange={formik.handleChange}
                            value={formik.values.canonical_tag}
                            placeholder="Canonical Tag"
                            className={`w-full rounded-lg border-[1.5px] border-stroke placeholder:text-lightgrey bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary ${formik.touched.canonical_tag &&
                                formik.errors.canonical_tag
                                ? 'border-red-500'
                                : ''
                              }`}
                          />

                          {formik.touched.canonical_tag &&
                            formik.errors.canonical_tag ? (
                            <div className="text-red text-sm">
                              {formik.errors.canonical_tag as String}
                            </div>
                          ) : null}
                        </div>
                      </div>
                      <div className="mt-4">
                        <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                          Meta Description
                        </label>
                        <textarea
                          name="meta_description"
                          onChange={formik.handleChange}
                          value={formik.values.meta_description}
                          placeholder="Meta Description"
                          className={`w-full rounded-lg border-[1.5px] border-stroke placeholder:text-lightgrey bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary ${formik.touched.meta_description &&
                              formik.errors.meta_description
                              ? 'border-red-500'
                              : ''
                            }`}
                        />
                        {formik.touched.meta_description &&
                          formik.errors.meta_description ? (
                          <div className="text-red text-sm">
                            {formik.errors.meta_description as String}
                          </div>
                        ) : null}
                      </div>
                      <div className="flex gap-4 mt-2">
                        <div className="w-full">
                          <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                            Images Alt Text
                          </label>
                          <input
                            type="text"
                            name="images_alt_text"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.images_alt_text}
                            placeholder="Images Alt Text"
                            className={`w-full rounded-lg border-[1.5px] border-stroke placeholder:text-lightgrey bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary ${formik.touched.images_alt_text &&
                                formik.errors.images_alt_text
                                ? 'border-red-500'
                                : ''
                              }`}
                          />
                          {formik.touched.images_alt_text &&
                            formik.errors.images_alt_text ? (
                            <div className="text-red text-sm">
                              {formik.errors.images_alt_text as String}
                            </div>
                          ) : null}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex justify-center">
                <button
                  type="submit"
                  className="mt-4 px-8 py-2 bg-primary dark:bg-main dark:border-0 text-white rounded "
                  disabled={loading}
                >
                  {loading ? <Loader color="#fff" /> : 'Submit'}
                </button>
              </div>
            </Form>
          );
        }}
      </Formik>
    </>
  );
};

export default FormLayout
