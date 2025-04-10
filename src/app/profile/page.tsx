import { Metadata } from 'next';
import dynamic from 'next/dynamic';
const ProfileComponent = dynamic(() => import('./ProfileComponent'));

export const metadata: Metadata = {
  title: 'Profile Avenue39',
  description: 'Profile description',
  openGraph: {
    title: 'Profile',
    description: 'Profile description',
    url: 'fullUrl',
    images: [
      {
        url: 'imageUrl',
        alt: 'altText',
      },
    ],
  },
  alternates: {
    canonical: 'profile',
  },
};
function Profile() {
  return <ProfileComponent />;
}
export default Profile;
