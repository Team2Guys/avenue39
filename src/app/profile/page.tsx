import { Metadata } from 'next';
import ProfileComponent from './ProfileComponent';

export const metadata: Metadata = {
  title: 'Profile Avenue 39',
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
