import React from 'react';
import Container from './ui/Container';
import {
  Breadcrumb,
  BreadcrumbItem as BreadcrumbComponentItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { BsSlash } from 'react-icons/bs';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface TopHeroProps {
  title?: string;
  category?: string;
  breadcrumbs: BreadcrumbItem[];
}

const TopHero: React.FC<TopHeroProps> = ({ title, breadcrumbs, category }) => {
  return (
    <div className="bg-light">
      <Container className="pt-3 text-center">
        {title && <p className="text-[36px] font-medium">{title}</p>}
        <Breadcrumb
          className={`flex ${title ? 'justify-center text-[16px]' : 'justify-start text-[20px] font-semibold'}`}
        >
          <BreadcrumbList>
            {breadcrumbs.map((breadcrumb, index) => (
              <React.Fragment key={index}>
                <BreadcrumbComponentItem>
                  {breadcrumb.href ? (
                    <BreadcrumbLink className="text-16" href={breadcrumb.href}>
                      {breadcrumb.label}
                    </BreadcrumbLink>
                  ) : (
                    <BreadcrumbPage className="text-16 ">
                      {breadcrumb.label}
                    </BreadcrumbPage>
                  )}
                </BreadcrumbComponentItem>
                {index < breadcrumbs.length - 1 && (
                  <BreadcrumbSeparator>
                    <BsSlash />
                  </BreadcrumbSeparator>
                )}
              </React.Fragment>
            ))}
          </BreadcrumbList>
        </Breadcrumb>
        <div
          className={`flex mt-3 ${category ? 'justify-start ' : 'justify-start font-semibold'}`}
        >
          {category && <p className="text-[21px] font-medium">{category}</p>}
        </div>
      </Container>
    </div>
  );
};

export default TopHero;
