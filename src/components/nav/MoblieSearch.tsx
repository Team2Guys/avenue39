import { Drawer, DrawerClose, DrawerContent, DrawerTitle, DrawerTrigger } from '../ui/drawer';
import { IoCloseOutline, IoSearchOutline, IoSearchSharp } from 'react-icons/io5';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import { Skeleton } from '../ui/skeleton';
import Image from 'next/image';
import { getAllStock } from '@/config';
import { IProduct } from '@/types/prod';

interface SearchProps {
   searchText: string
   setIsProductListOpen: any
   isPending: boolean
   error: any
   isLoading: boolean
   filteredProducts: IProduct[]
   handleNavigation: any
   setSearchText: any
}

const MoblieSearch = ({searchText , setIsProductListOpen, isPending, error, isLoading, filteredProducts, handleNavigation , setSearchText}: SearchProps) => {
  return (
   <Drawer direction="top">
     <DrawerTrigger asChild>

       <form
         className="relative w-full bg-white z-[199]"
         onSubmit={(e) => e.preventDefault()}
         role="search"
         aria-labelledby="search-form"
       >
        <label htmlFor="header-search" className="sr-only">
          Search
        </label>
         <input
         id="header-search"
           type="text"
           name="header-search"
           value={searchText}
           autoComplete='off'
           onChange={(e) => setSearchText(e.target.value)}
           onClick={() => setIsProductListOpen(true)}
           className=" h-[25px] sm:h-[40px] max-sm:placeholder:text-12 border focus-visible:outline-none focus-visible:ring-0 block w-full rounded-full custom-input-bg pl-9 pr-2 z-[199] border-[#afa183] border-opacity-30 font-extralight"
           placeholder="Search Here..."
         />
         <button
           type="submit"
           className="absolute inset-y-0 left-0 flex items-center z-20 pl-3 cursor-pointer"
           aria-label="Search"
           aria-hidden={false}
         >
           <IoSearchOutline
             className="cursor-pointer font-extralight text-[#A6A6A6]"
             size={18}
           />
         </button>
       </form>
     </DrawerTrigger>
     <DrawerContent className='!z-[200]'>
       <VisuallyHidden>
         <DrawerTitle>Navbar</DrawerTitle>
       </VisuallyHidden>
       <div className="max-w-screen-xs w-full mx-auto m-2 space-y-5 p-2">
         <DrawerClose asChild>
           <IoCloseOutline
             size={24}
             className="cursor-pointer bg-gray-400 rounded-full text-white p-1 absolute top-2 right-2 z-50 shadow-md hover:bg-gray-500 transition duration-300"
           />
         </DrawerClose>
         <div className="relative rounded-md w-full">
           <input
             type="text"
             value={searchText}
             onChange={(e) => setSearchText(e.target.value)}
             className="py-4 px-4 pe-11 border block w-full rounded-full text-sm disabled:opacity-50 "
             placeholder="Search Here..."
             ref={(node) => {
               if (node) {
                 node.focus();
               }
             }}
           />
           <button
             type="submit"
             className="absolute inset-y-0 end-0 flex items-center z-20 pe-4 cursor-pointer"
           >
             <IoSearchSharp className="cursor-pointer" size={30} />
           </button>
         </div>
         {isPending && (
           <div className="grid grid-cols-2 gap-2">
             {Array(4)
               .fill(null)
               .map((_, index) => (
                 <div className="flex flex-col border p-3 rounded-md bg-white hover:shadow-md transition duration-300 gap-2 mt-2 items-center" key={index}>
                   <Skeleton className="w-[100px] h-[100px]"></Skeleton>
                   <div className="pt-1 flex flex-col gap-3">
                     <Skeleton className="w-40 h-6 rounded-none"></Skeleton>
                     <Skeleton className="w-40 h-4 rounded-none"></Skeleton>
                     <Skeleton className="w-40 h-4 rounded-none"></Skeleton>
                   </div>
                 </div>
               ))}
           </div>
         )}
         {error && (
           <div>Error fetching products: {error.message}</div>
         )}
         {!isLoading && !isPending && !error && filteredProducts.length > 0 && (
           <div className=" p-2 max-h-[600px] overflow-y-auto w-full custom-scrollbar ">
             <div className="flex flex-wrap justify-center gap-2 -m-2">
               {filteredProducts.map((product: any, index: number) => {

                 return (
                   <DrawerTrigger asChild key={index}>
                     <div
                       onClick={() => handleNavigation(product)}
                       className="flex border p-2 rounded-md flex-col hover:shadow-md items-center transition duration-300 gap-2 w-[48%] mt-2 cursor-pointer bg-white"
                     >
                       <Image
                         width={100}
                         height={100}
                         src={product.posterImageUrl}
                         alt={product.name}
                         className="min-h-[100px] min-w-[130px]"
                         loading='lazy'
                       />
                       <div className="flex flex-col gap-2 justify-between h-full">
                         <p className="text-16 text-center font-normal capitalize">
                           {product.name}
                         </p>

                         <div className="flex justify-center items-center gap-2 xs:gap-4">
                           <p className={`text-14 xs:text-15 font-semibold  ${product.discountPrice ? "text-red-700" : ""}`}>
                             <span className="font-currency font-normal"></span> <span>{product.discountPrice ? product.discountPrice : product.price}</span>
                           </p>
                           {(product.discountPrice && product.discountPrice > 0) ?

                             <p className="text-11 xs:text-[12px] text-primary-foreground font-bold line-through ">
                               <span className="font-currency font-normal"></span> {product.price}
                             </p> : ''
                           }

                         </div>
                         {(product.colorName || product.sizeName) &&
                           <div className='flex items-center justify-center gap-3 flex-wrap'>
                             <div className='flex items-center gap-1 text-13'>
                               <span className='capitalize'>{product.filter?.at(0)?.heading}</span>
                               <span className='capitalize'>{product.colorName}</span>
                             </div>
                             <span className='text-13'>{product.sizeName}</span>
                             {<span className={`text-13  ${Number(getAllStock(product)) <= 0 ? "text-red-500" : ""}`}>{Number(getAllStock(product)) <= 0 ? "Out of Stock" : "In Stock"}</span>
                             }
                           </div>}



                         {!(product.colorName || product.sizeName) && <span className={`text-13 text-center ${Number(getAllStock(product)) <= 0 ? "text-red-500" : ""}`}>{Number(getAllStock(product)) <= 0 ? "Out of Stock" : "In Stock"}</span>
                         }
                         <div>
                           {/* <RenderStars card={product} /> */}
                         </div>
                       </div>
                     </div>
                   </DrawerTrigger>
                 )

               })}
             </div>
           </div>
         )}
         {!isPending && filteredProducts.length < 1 && (
           <div>No product is found</div>
         )}
       </div>
     </DrawerContent>
   </Drawer>
  )
}

export default MoblieSearch