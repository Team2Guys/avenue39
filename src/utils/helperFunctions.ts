import axios, { AxiosResponse } from 'axios';

export const uploadPhotosToBackend = async (files: File[]): Promise<any[]> => {
  if (files.length === 0) throw new Error('No files found');

  let Response_data: any[] = [];

  try {
    for (const file of files) {
      const formData = new FormData();
      formData.append('file', file);
      const response: AxiosResponse<any> = await axios.post(
        `${process.env.NEXT_PUBLIC_PRODUCT_IMAGE}/api/file-upload`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );

      Response_data.push(response.data);
    }

    return Response_data;
  } catch (error) {
    throw error;
  }
};

export const ImageRemoveHandler = async (
  imagePublicId: string,
  setterFunction: any,
) => {
  try {
    // Only call the API if public_id is not empty (i.e., it's not a cropped image without a public_id)
    if (imagePublicId) {
       await axios.delete(
        `${process.env.NEXT_PUBLIC_PRODUCT_IMAGE}/api/file-upload/DelImage/${imagePublicId}`,
      );
    }

    // Remove the image from the state regardless of whether it has a public_id
    setterFunction((prev: any) =>
      prev.filter((item: any) => item.public_id !== imagePublicId),
    );
  } catch (error) {
    throw error;
  }
};



