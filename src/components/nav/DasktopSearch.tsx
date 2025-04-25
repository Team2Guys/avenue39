import { Skeleton } from '../ui/skeleton';
import Image from 'next/image';
import { getAllStock } from '@/config';
import { IProduct } from '@/types/prod';
import { IoCloseOutline, IoSearchOutline } from 'react-icons/io5';
import { CartItem } from '@/redux/slices/cart/types';
import Link from 'next/link';
import { variationProductImage } from '@/redux/slices/cart';

interface SearchProps {
   searchText: string
   setIsProductListOpen: any
   isPending: boolean
   isLoading: boolean
   filteredProducts: IProduct[]
   handleNavigation: any
   isProductListOpen: boolean
   productUrl: any
   setSearchText: any
}

const DasktopSearch = ({searchText, setSearchText , setIsProductListOpen, isPending, isLoading, filteredProducts , isProductListOpen , productUrl}: SearchProps) => {
  return (
    <div className="w-full max-w-[45%] lg:max-w-[58%] xl:max-w-[43%] 2xl:max-w-[40%] xl:mr-[100px] 2xl:mr-[40px]">
              <div className="bg-whtie">
                <form
                  className="relative w-full sm:block hidden bg-white z-[1099]"
                  onSubmit={(e) => e.preventDefault()}
                >
                  <input
                    type="text"
                    name="header-search"
                    value={searchText}
                    autoComplete='off'
                    onChange={(e) => setSearchText(e.target.value)}
                    onClick={() => setIsProductListOpen(true)}
                    className="h-[40px] border focus-visible:outline-none focus-visible:ring-0 block w-full rounded-full custom-input-bg pl-12 z-[199] border-black border-opacity-30 font-extralight"
                    placeholder="Search Here..."
                  />
                  <button
                    type="submit"
                    className="absolute inset-y-0 left-0 flex items-center z-20 pl-4 cursor-pointer"
                    aria-label='Search'
                  >
                    <IoSearchOutline
                      className="cursor-pointer font-extralight text-black"
                      size={18}
                      aria-hidden="true"
                    />
                  </button>
    
                  {isProductListOpen && (
                    <>
                      <div className="absolute top-full w-full p-3 bg-white border border-[#afa183] border-opacity-30 rounded-t-2xl mt-2 max-h-[600px] overflow-y-auto custom-scrollbar z-[999]">
                        <div className="flex justify-end mb-2 sticky top-0">
                          <IoCloseOutline
                            size={24}
                            className="cursor-pointer bg-gray-400 rounded-full text-white p-1 "
                            onClick={() => setIsProductListOpen(false)}
                          />
                        </div>
                        {filteredProducts.length > 0 ? (
                          filteredProducts.map((product, index) => {
                            return (
    
                              <Link key={index} href={
                                productUrl(product as CartItem)}
                                onClick={() => setIsProductListOpen(false)}
                              >
                                <div
                                  className="flex border p-2 my-2 rounded-md bg-white hover:shadow-md transition duration-300 gap-2 cursor-pointer border-[#afa183] border-opacity-30"
                                >
                                  <Image
                                    width={100}
                                    height={100}
                                    src={variationProductImage(product as CartItem) || product.posterImageUrl}
                                    alt={product.name}
                                    className="size-20 md:size-24"
                                    loading='lazy'
                                  />
                                  <div className="pt-1 flex flex-col gap-2 w-full">
                                    <p className="text-17 md:text-21 font-normal capitalize">
                                      {product.name}
                                    </p>
                                    <div className="flex items-center gap-1 xs:gap-4">
                                      {product.discountPrice > 0 ? (
                                        <>
                                          <p className="text-15 font-semibold text-red-700">
                                            <span className="font-currency font-semibold"></span> <span>{product.discountPrice}</span>
                                          </p>
                                          <p className="text-[12px] text-primary-foreground font-bold line-through">
                                            <span className="font-currency font-semibold"></span> <span>{product.price}</span>
                                          </p>
                                        </>
                                      ) : (
                                        <p className="text-15 font-semibold">
                                          <span className="font-currency font-semibold"></span> <span>{product.price}</span>
                                        </p>
                                      )}
                                    </div>
                                    {(product.colorName || product.sizeName) &&
                                      <div className='flex flex-wrap lg:flex-nowrap items-center justify-between gap-3 w-full pr-5'>
                                        <div className='flex items-center gap-1 text-13 lg:w-6/12'>
                                          <span className='capitalize'>{product.filter?.at(0)?.heading}</span>
                                          <span className='capitalize'>{product.colorName}</span>
                                        </div>
    
                                        <span className='text-13 text-start lg:w-3/12'>{product.sizeName}</span>
    
                                        <span className={`text-13 lg:w-3/12 text-end ${Number(getAllStock(product)) <= 0 ? "text-red-500" : ""}`}>{Number(getAllStock(product)) <= 0 ? "Out of Stock" : "In Stock"}</span>
                                      </div>}
                                    {!(product.colorName || product.sizeName) && <span className={`text-13 text-end  pr-5  ${Number(getAllStock(product)) <= 0 ? "text-red-500" : ""}`}>{Number(getAllStock(product)) <= 0 ? "Out of Stock" : "In Stock"}</span>
                                    }
                                    {/* <RenderStars card={product} /> */}
                                  </div>
                                </div>
    
                              </Link>
                            )
    
    
                          })
                        ) : !isPending || !isLoading ? (
                          <div className="grid grid-cols-1 gap-1">
                            {Array(4)
                              .fill(null)
                              .map((_, index) => (
                                <div className="flex border p-3 rounded-md bg-white hover:shadow-md transition duration-300 gap-2 mt-2 items-center" key={index}>
                                  <Skeleton className="w-[100px] h-[100px]"></Skeleton>
                                  <div className="pt-1 flex flex-col gap-3">
                                    <Skeleton className="w-40 h-6 rounded-none"></Skeleton>
                                    <Skeleton className="w-40 h-4 rounded-none"></Skeleton>
                                    <Skeleton className="w-40 h-4 rounded-none"></Skeleton>
                                  </div>
                                </div>
                              ))}
                          </div>
                        ) : (
                          <div>No product is found</div>
                        )}
                      </div>
                      <div
                        onClick={() => setIsProductListOpen(false)}
                        className="fixed inset-0 bg-black bg-opacity-0"
                      ></div>
                    </>
                  )}
                </form>
              </div>
            </div>
  )
}

export default DasktopSearch