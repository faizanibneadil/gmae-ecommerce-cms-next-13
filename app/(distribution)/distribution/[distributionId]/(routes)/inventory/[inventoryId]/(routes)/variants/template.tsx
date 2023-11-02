"use client";

import SearchVariants from "./_components/search-variants";

interface Props {
  children: React.ReactNode;
}

const Template: React.FC<Props> = ({ children }) => {
  return (
    <div className="space-y-1">
      <SearchVariants />
      {children}
    </div>
  );
};

export default Template;
