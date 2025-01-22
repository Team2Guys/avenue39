import React from "react";

interface PageProps {
  number: number;
  children: React.ReactNode;
}

const FlipsPage = React.forwardRef<HTMLDivElement, PageProps>((props, ref) => {
  return (
    <div className="page text-center bg-[#E2E3E5] shadow-lg h-full" ref={ref}>
        <div className="page-text flex h-ful">
          <p>{props.children}</p>
        </div>
    </div>
  );
});

export default FlipsPage;