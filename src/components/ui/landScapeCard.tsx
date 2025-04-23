import { generateSlug, renderStars } from '@/config'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { HiOutlineShoppingBag } from 'react-icons/hi'
import { IoIosHeartEmpty } from 'react-icons/io'
import { Dialog, DialogContent, DialogOverlay, DialogTitle, DialogTrigger } from './dialog'
import { VisuallyHidden } from '@radix-ui/react-visually-hidden'
import dynamic from 'next/dynamic'
import { IProduct } from '@/types/prod'
import { CartItem } from '@/redux/slices/cart/types'
const ProductDetail = dynamic(() => import('../product-detail/product-detail'), { ssr: false })

const LandScapeCard = ({card , finalUrl ,handleAddToWishlist, displayName , averageRating , handleEventProbation , handleAddToCard , itemToAdd , uniqueSizes}: {
    card: IProduct,
    finalUrl: string,
    handleAddToWishlist: any,
    displayName:string | undefined,
    averageRating?: number,
    handleEventProbation: any,
    handleAddToCard: any,
    itemToAdd: CartItem | any,
    uniqueSizes: any,

}) => {
  return (
    <div
    className="rounded-2xl text-center relative product-card mx-2 group flex gap-4 items-center flex-col sm:flex-row cursor-pointer w-full"
  >
    <div className="relative w-fit mx-auto sm:w-5/12 md:w-4/12 overflow-hidden rounded-xl">
      <div
        onClick={(e) => handleAddToWishlist(e)
        }
        className=" w-10 h-12 absolute right-2 top-2 rounded-xl  flex justify-center items-center border bg-white hover:border-main hover:bg-main hover:text-white  cursor-pointer"
      >
        <IoIosHeartEmpty size={25} />
      </div>

      <Link href={finalUrl} className='block bg-[#E3E4E6]'>
        <Image
          src={card.posterImageUrl}
          alt={card.posterImageAltText || card.name}
          width={320}
          height={200}
          className="object-conatin rounded-xl mx-auto w-full h-[250px] sm:h-[300px] xl:h-[400px]"
        />
      </Link>

      {card.discountPrice > 0 && (
        <span className="absolute -top-1 -left-11 px-7 transform -rotate-45 bg-red-700 text-white text-14 font-bold w-[120px] h-[40px] flex justify-center items-center">
          {Math.round(((card.price - card.discountPrice) / card.price) * 100)}
          %
        </span>
      )}
    </div>

    <div className="w-full sm:w-7/12 md:w-8/12 text-center sm:text-start px-4 sm:px-0">
      <h3 className="text-lg font-semibold mt-2"><Link className="cursor-pointer" href={finalUrl}>
        {displayName ? displayName : card.name}
      </Link></h3>
      <p className="mt-2 font-normal text-sm max-h-10 text-ellipsis line-clamp-2">
        {card.description}
      </p>
      {card.discountPrice > 0 ? (
        <p className="text-md font-semibold mt-2">
          <span className="font-currency font-semibold"></span> {new Intl.NumberFormat("en-US", { style: "decimal" }).format(card.discountPrice)}
          <span className="line-through text-secondary-foreground ms-2">
          <span className="font-currency font-semibold"></span> {new Intl.NumberFormat("en-US", { style: "decimal" }).format(card.price)}
          </span>
        </p>
      ) : (
        <p className="text-md font-semibold  pt-2"><span className="font-currency font-semibold"></span> {new Intl.NumberFormat("en-US", { style: "decimal" }).format(card.price)}</p>
      )}
      <div className="flex gap-1 mt-2 items-center justify-center sm:justify-start h-8">
        {averageRating && averageRating > 1 && renderStars({ star: averageRating })}
      </div>
      <div
        className="text-center flex flex-none justify-center sm:justify-start gap-3"
        onClick={(e) => handleEventProbation(e)}
      >
        <button
          className="my-4 w-32 h-8 text-primary border border-primary rounded-full flex items-center justify-center gap-2 hover:bg-primary hover:text-white"
          onClick={(e) => handleAddToCard(e)}
        >
          <HiOutlineShoppingBag />
          <span className="text-10 font-medium">Add to Cart</span>
        </button>
        <Dialog>
          <DialogTrigger>
            <button className="my-4 w-32 h-8 text-secondary border border-primary bg-primary rounded-full flex items-center justify-center gap-2 hover:bg-secondary hover:text-primary">
              <span className="text-10 font-medium">Quick View</span>
            </button>
          </DialogTrigger>
          <DialogOverlay />
          <DialogContent className="max-w-[1400px] w-11/12 bg-white px-0 sm:rounded-3xl border border-black shadow-none gap-0 pb-0">
            <VisuallyHidden>
              <DialogTitle>Product detail</DialogTitle>
            </VisuallyHidden>
            <div className="pb-6 px-5 xs:px-10 me-4 xs:me-7 mt-6 max-h-[80vh] overflow-y-auto custom-scroll">
              <ProductDetail
                params={card}
                isZoom={false}
                gap="gap-10 md:gap-20"
                swiperGap="gap-5"
                detailsWidth="w-full md:w-1/2 lg:w-2/5"
                filterParam={generateSlug(itemToAdd.selectedfilter && itemToAdd.selectedfilter.name)}
                sizeParam={generateSlug(itemToAdd.selectedSize && itemToAdd.selectedSize.name)}
                uniqueSizes={uniqueSizes}
              />
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  </div>
  )
}

export default LandScapeCard