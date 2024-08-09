import Image, { StaticImageData } from 'next/image';
import Link from 'next/link';

interface DiscountCardProps {
  productItems: Array<{
    id: number;
    imageUrl: string | StaticImageData;
    title: string;
  }>;
}

const DiscountCard: React.FC<DiscountCardProps> = ({ productItems }) => {
  return (
    <div className="flex gap-6 w-max mb-2">
      {productItems.map((item) => (
        <Link href="/products" key={item.id}>
          <Image src={item.imageUrl} alt="product image" className="w-full" />
          <div className="text-16 font-bold mt-3 pb-1 border-b-2 w-max border-black">
            {item.title}
          </div>
        </Link>
      ))}
    </div>
  );
};

export default DiscountCard;
