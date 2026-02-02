import React from 'react';

const Container = ({
  children,
  otherClassName,
}: {
  children: React.ReactNode;
  otherClassName?: string;
}) => {
  return (
    <div
      className={`relative px-4 py-5 mx-auto sm:max-w-212.5 md:max-w-262.5 lg:max-w-325 ${otherClassName}`}
    >
      {children}
    </div>
  );
};

export default Container;
