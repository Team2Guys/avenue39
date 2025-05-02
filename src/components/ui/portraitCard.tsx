import React, { useState } from 'react'
import { IoIosHeartEmpty } from 'react-icons/io'
import 'swiper/css';
import 'swiper/css/pagination';
import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { generateSlug } from '@/config';
import { Dialog, DialogContent, DialogOverlay, DialogTrigger } from './dialog';
import { BsCartX } from 'react-icons/bs';
import dynamic from 'next/dynamic';
import { PotraitCardProps } from '@/types/interfaces';
import { ProductDetailSkeleton } from '../product-detail/skelton';
import { IoEyeOutline } from 'react-icons/io5';
import { DialogTitle } from '@radix-ui/react-dialog';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
const ProductDetail = dynamic(() => import('../product-detail/product-detail'), { ssr: false, loading: () => <ProductDetailSkeleton /> })

const PortraitCard = ({
    card,
    finalUrl,
    handleAddToWishlist,
    displayName,
    averageRating,
    handleEventProbation,
    handleAddToCard,
    itemToAdd,
    uniqueSizes,
    slider,
    isLandscape,
    cardImageHeight,
    isModel,
    className,
    skeletonHeight,
    isHomepage,
    calculateHeight,
    portSpace,
    accessoriesSlider,
    displayTag,
    isOutStock,
    fill,
    isAccessory
}: PotraitCardProps) => {
    const [isHoverImage, setIsHoverImage] = useState<boolean>(false);
    return (
        <div
            className={`text-center product-card mb-2 flex flex-col  ${slider ? '' : ' justify-between'} h-auto  p-1 rounded-[35px] w-full`}>
            <span className='hidden' >{averageRating}</span>
            <div className={`relative w-full overflow-hidden rounded-t-[35px] group flex ${isLandscape ? ' items-center text-center gap-4' : 'flex-col'}`}>
                {!isLandscape && (<div
                    onClick={(e) => handleAddToWishlist(e)}
                    onMouseEnter={() => setIsHoverImage(true)}
                    onMouseLeave={() => setIsHoverImage(false)}
                    className="absolute z-10 top-4 right-4 md:-right-10 group-hover:right-4 md:opacity-0 group-hover:opacity-100 w-10 h-10 rounded-xl flex justify-center items-center border bg-white hover:border-main hover:bg-main hover:text-white  cursor-pointer  duration-300 transition-all"
                >
                    <IoIosHeartEmpty size={20} />
                </div>)}
                
                <>
                    <div className={`bg-[#E3E4E6] rounded-[35px] border-2 border-transparent group-hover:border-main ${isLandscape ? 'w-3/12' : ''}`}>
                        {/* <span className='pb-10'>{card.subcategories?.map((item) => item.name)}</span> */}
                        {card.discountPrice > 0 && (
                            <p className="z-[1] absolute top-1 -left-9 px-7 transform -rotate-45 bg-red-700 text-white text-14 font-bold w-[120px] h-[40px] flex justify-center items-center">
                                {Math.round(
                                    ((card.price - card.discountPrice) / card.price) * 100,
                                )}
                                %
                            </p>
                        )}
                        {isHomepage ? (
                            <div
                                className={` ${cardImageHeight} flex ${displayTag && 'flex-col gap-0 xsm:gap-10'} justify-center items-center`}
                            >
                                {displayTag && <div className='flex flex-col gap-0 items-center sm:leading-tight'>
                                    <div className='bg-black text-white rounded-lg px-4 xs:px-6 py-2 font-Helveticalight text-12 xsm:text-13 xs:text-18 font-semibold tracking-widest capitalize'>{displayTag.tagPara}</div>
                                    <p className='font-jadyn text-[30px] sm:text-[90px] md:text-[60px] xl:text-[101px]'>{displayTag.displayName}</p>
                                </div>}
                                <Link
                                    href={finalUrl}
                                    style={{
                                        height: displayTag ? '' : calculateHeight
                                            ? calculateHeight
                                            : 'calc(100% - 20px)',
                                    }}
                                    className={`${isLandscape ? 'w-9/12' : 'w-full'} ${isAccessory ? '' : 'min-w-[270px]'}  `}
                                >
                                    <Image
                                        src={card.HomeProductImage ? card.HomeProductImage.imageUrl : card.posterImageUrl}
                                        alt={card.HomeProductImage ? card.HomeProductImage.altText || card.name : card.posterImageAltText || card.name}
                                        width={600}
                                        height={600}
                                        className={cn(
                                            !displayTag && 'h-full',
                                            'w-full',
                                            !isAccessory && 'min-w-[270px]',
                                            slider ? portSpace || 'px-0' : 'px-4 xs:px-6',
                                            fill ? 'object-fill' : 'object-contain',
                                            'cursor-pointer'
                                        )}
                                        loading='lazy'
                                    />
                                </Link>
                            </div>
                        ) : (
                            <div className={`relative ${isLandscape ? 'overflow-hidden' : '' }`}>
                                {isLandscape && (<div
                                    onClick={(e) => handleAddToWishlist(e)}
                                    onMouseEnter={() => setIsHoverImage(true)}
                                    onMouseLeave={() => setIsHoverImage(false)}
                                    className="absolute z-10 top-4 right-4 md:-right-10 group-hover:right-4 md:opacity-0 group-hover:opacity-100 w-10 h-10 rounded-xl flex justify-center items-center border bg-white hover:border-main hover:bg-main hover:text-white  cursor-pointer  duration-300 transition-all"
                                >
                                    <IoIosHeartEmpty size={20} />
                                </div>)}
                                

                                <Link href={finalUrl}>
                                    <Image
                                        src={isHoverImage ? card.hoverImageUrl : card.posterImageUrl}
                                        alt={card.posterImageAltText || card.name}
                                        // onClick={() => handleNavigation()}
                                        width={600}
                                        height={600}
                                        className={cn(
                                            'rounded-[35px] w-full min-h-[300px]',
                                            className,
                                            skeletonHeight,
                                            cardImageHeight,
                                            !isHomepage && !slider && 'border border-main',
                                            isLandscape ? 'object-contain' : ''
                                        )}
                                        onMouseEnter={() => setIsHoverImage(true)}
                                        onMouseLeave={() => setIsHoverImage(false)}
                                        loading='lazy'
                                    />
                                </Link>
                            </div>
                        )}
                    </div>
                    <div className={` space-y-2 xs:space-y-3 ${isLandscape ? 'w-9/12 text-start' : ''}`}>
                        <Link
                            href={finalUrl}
                            className="text-sm md:text-[22px] xs:h-9 text-gray-600 font-Helveticalight mt-2 group-hover:font-bold group-hover:text-black cursor-pointer inline-block"
                        >
                            {displayName ? displayName : card.name}
                        </Link>
                        {isLandscape &&
                            <p className="mt-2 font-normal text-sm max-h-10 text-ellipsis line-clamp-2">
                                {card.description}
                            </p>
                        }
                        {/* {card.subcategories?.map((item) => item.name)} */}
                        {card.discountPrice ? (
                            <div className={`flex gap-2  ${isLandscape ? '' : 'justify-center'}`}>
                                <p className="text-sm md:text-18 font-bold line-through font-Helveticalight">
                                    <span className="font-currency font-normal"></span> {new Intl.NumberFormat("en-US", { style: "decimal" }).format(card.price)}
                                </p>
                                <p className="text-sm md:text-18 font-bold text-red-700">
                                    <span className="font-currency font-bold"></span> {new Intl.NumberFormat("en-US", { style: "decimal" }).format(card.discountPrice)}
                                </p>
                            </div>
                        ) : (
                            <p className="text-sm md:text-18 font-bold">
                                <span className="font-currency font-bold"></span> {new Intl.NumberFormat("en-US", { style: "decimal" }).format(card.price)}
                            </p>
                        )}
                        {/* {averageRating && averageRating > 1 && (
                            <div className="flex gap-1 items-center justify-center mt-1 h-5">
                                {renderStars({ star: averageRating })}
                            </div>
                        )} */}
                        {isModel ? null : isOutStock ?
                            <button className={`bg-red-500 text-white text-12 font-medium uppercase w-full max-w-52 bg-main border cursor-default rounded-full h-9 my-1 flex ${isLandscape ? 'me-auto' : 'mx-auto'} justify-center items-center gap-2`}>
                                <BsCartX size={18} /> Out of Stock</button> : (
                                <div
                                    className={`text-center items-center  w-full flex ${isLandscape ? '' : 'justify-center'} gap-1 md:space-y-0 ${slider ? 'w-fit  mx-auto flex-wrap md:flex-nowrap' : 'w-fit mb-4 flex-wrap 2xl:flex-nowrap'}`}
                                    onClick={(e) => handleEventProbation(e)}
                                >

                                    <button
                                        className={`  my-1  h-8 text-primary border text-12 font-medium border-primary cardBtn-addToCart rounded-full flex items-center justify-center whitespace-nowrap gap-2 hover:bg-primary hover:text-white ${slider ? 'px-6' : 'px-2'}`}
                                        onClick={(e) => handleAddToCard(e)}
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="14.481"
                                            height="14.536"
                                            viewBox="0 0 14.481 14.536"
                                            className="fill-black"
                                        >
                                            <path
                                                id="Path_424"
                                                data-name="Path 424"
                                                d="M11.8,1.49H.768c-.722,0-.683.292-.62,1.037L.558,7.76c.07.834.011.632.894.758L9.57,9.551,9.14,10.8H.4c-.118.442-.279,1.163-.4,1.656H1.453l.14-.5H8.578c1.6-.027,1.442.407,1.826-.978L13.159.959h1.322V0h-2.32c-.108.4-.257,1.082-.357,1.49ZM8.13,12.293a1.121,1.121,0,1,0,1.121,1.121A1.122,1.122,0,0,0,8.13,12.293Zm-4.625,0a1.121,1.121,0,1,0,1.121,1.121A1.122,1.122,0,0,0,3.5,12.293Zm7.333-7.2H9.052L9.7,2.385h1.884l-.218.811h-.007l-.522,1.9ZM8.766,2.386,8.118,5.095H6.4l.651-2.706,1.718,0Zm-2.653,0L5.463,5.095H3.817l.648-2.7,1.648,0Zm-2.583,0L2.882,5.1H1.235L1.053,2.924C1,2.319.9,2.4,1.482,2.4l2.048,0ZM1.293,5.783H2.717l-.47,1.959-.116-.015c-.718-.1-.671.062-.727-.616L1.293,5.783Zm1.86,2.083.5-2.083H5.3l-.552,2.3L3.152,7.866Zm2.5.339.583-2.424H7.954L7.319,8.433,5.65,8.206Zm2.574.351.664-2.774h1.761L9.825,8.776l-1.6-.219Z"
                                                fillRule="evenodd"
                                            />
                                        </svg>
                                        Add to Cart
                                    </button>

                                    <Dialog>
                                        <DialogTrigger className="w-fit align-middle" asChild>
                                            <button className={`my-1  h-8 quick-view-btn whitespace-nowrap text-12 font-medium text-secondary border border-primary cardBtn-quick-view bg-primary rounded-full flex items-center justify-center gap-2 hover:bg-secondary hover:text-primary ${slider ? accessoriesSlider ? ' w-full px-2' : 'px-6' : 'px-2'}`}>
                                                <IoEyeOutline size={15} />
                                                Quick View
                                            </button>
                                        </DialogTrigger>
                                        <DialogOverlay />


                                        <DialogContent className="max-w-[1400px]  w-11/12 bg-white px-0 sm:rounded-3xl   shadow-none gap-0 pb-0" >
                                            <VisuallyHidden>
                                                <DialogTitle>Product Quick View</DialogTitle>
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
                            )}
                    </div>
                </>

            </div>

        </div>
    )
}

export default PortraitCard