import React from 'react';
import Container from './ui/Container';
import {
  Breadcrumb,
  BreadcrumbItem as BreadcrumbComponentItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { BsSlash } from 'react-icons/bs';
import Link from 'next/link';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface TopHeroProps {
  title?: string;
  breadcrumbs: BreadcrumbItem[];
  categoryName?: string;
  subCategorName?: string;
  productName?: string;
}

const TopHero: React.FC<TopHeroProps> = ({
  title,
  breadcrumbs,
  categoryName,
  subCategorName,
  productName,
}) => {
  return (
    <div className="bg-[#F6F6F6]">
      <Container className="text-center min-h-14 flex justify-center pt-1 flex-col">
        {title && <p className="text-[36px] font-medium">{title}</p>}
        <Breadcrumb
          className={`flex ${title ? 'justify-center text-[16px] pt-3' : 'justify-start items-center text-[20px] font-semibold'}`}
        >
          <BreadcrumbList>
            {breadcrumbs.map((breadcrumb, index) => (
              <React.Fragment key={index}>
                <BreadcrumbComponentItem className="flex items-center sm:gap-1">
                  {breadcrumb.href ? (
                    <Link
                      className="text-14 font-medium text-[#959595]"
                      href={breadcrumb.href}
                    >
                      {breadcrumb.label}
                    </Link>
                  ) : categoryName ? (
                    <>
                      <BreadcrumbSeparator>
                        <BsSlash />
                      </BreadcrumbSeparator>
                      {subCategorName || productName ? (
                        <Link
                          className="text-14 font-medium text-[#959595] capitalize"
                          href={`/${categoryName?.replaceAll(' ', '-').toLowerCase()}`}
                        >
                          {categoryName}
                        </Link>
                      ) : (
                        <BreadcrumbPage className="text-14 font-semibold text-black capitalize">
                          {categoryName}
                        </BreadcrumbPage>
                      )}
                      {subCategorName && !productName && (
                        <>
                          <BreadcrumbSeparator>
                            <BsSlash />
                          </BreadcrumbSeparator>
                          <BreadcrumbPage className="text-14 font-semibold text-black">
                            {subCategorName?.replace('SUB_', '')}
                          </BreadcrumbPage>
                        </>
                      )}

                      {subCategorName && productName && (
                        <>
                          <BreadcrumbSeparator>
                            <BsSlash />
                          </BreadcrumbSeparator>
                          <Link
                            className="text-14 font-medium text-[#959595] capitalize"
                            href={`/${categoryName?.replaceAll(' ', '-').toLowerCase()}/${subCategorName?.replaceAll(' ', '-').toLowerCase()}`}
                          >
                            {subCategorName?.replace('SUB_', '')}
                          </Link>
                        </>
                      )}
                      {productName && (
                        <>
                          <BreadcrumbSeparator>
                            <BsSlash />
                          </BreadcrumbSeparator>
                          <BreadcrumbPage className="text-14 font-semibold text-black capitalize">
                            {productName}
                          </BreadcrumbPage>
                        </>
                      )}
                    </>
                  ) : (
                    <BreadcrumbPage className="text-14 font-semibold text-black capitalize">
                      {breadcrumb.label}
                    </BreadcrumbPage>
                  )}
                </BreadcrumbComponentItem>
                {index < breadcrumbs.length - 1 && !categoryName && (
                  <BreadcrumbSeparator>
                    <BsSlash />
                  </BreadcrumbSeparator>
                )}
              </React.Fragment>
            ))}
          </BreadcrumbList>
        </Breadcrumb>
      </Container>
    </div>
  );
};

export default TopHero;
