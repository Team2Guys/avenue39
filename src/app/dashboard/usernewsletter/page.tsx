import axios from 'axios';
import dynamic from 'next/dynamic';
const NewsLetter = dynamic(() => import('./NewsLetter'))

const productHandler = async () => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/newsletters/get-all`,
    );
    const data = response.data;
    return data;
  } catch (err) {
    console.log('Error Occurred', err);
    return [];
  }
};

const UserNewsletter = async () => {
  const newsLetters = await productHandler();
  return <NewsLetter newsLetters={newsLetters} />;
};

export default UserNewsletter;
