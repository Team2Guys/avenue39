import Link from 'next/link'
import React from 'react'
import Container from '../ui/Container'

function CategoryWrapper({ redirect, CategoryName, CategoryDescription, children }:
    { redirect?: string, CategoryName: string, CategoryDescription?: string, children: React.ReactNode, }) {
    return (
        <Container className="my-10">
            <div className="relative px-2 md:px-8 border-2 border-[#707070] rounded-[40px] sm:rounded-[87px]">
                <Link
                    href={`/${redirect}`}
                    className="absolute -top-3 xsm:-top-5 left-1/2 transform -translate-x-1/2 rounded-xl border bg-main xs:left-20 xs:transform-none hover:font-bold hover:bg-black text-white hover:text-white"
                >
                    <h2 className="px-2 text-13 xsm:text-16 md:text-3xl font-Helveticalight capitalize text-center text-shadow">
                        {CategoryName}
                    </h2>
                </Link>

                <div className="max-w-screen-xl mx-auto mt-10 font-Helveticalight px-2 sm:px-4 lg:px-0">
                    {CategoryDescription ? (
                            <p className="text-14 lg:text-[22px] leading-snug text-justify w-fit mx-auto">
                                {CategoryDescription}
                            </p>

                    ) : (
                        <div className="animate-pulse">
                            <div className="h-5 lg:h-6 bg-gray-300 rounded-md w-3/4 mx-auto mb-2" />
                            <div className="h-5 lg:h-6 bg-gray-300 rounded-md w-2/4 mx-auto" />
                        </div>
                    )}
                </div>

                {children}

            </div>
        </Container>
    )
}

export default CategoryWrapper