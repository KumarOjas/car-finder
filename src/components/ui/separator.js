import React from 'react';

export const Separator = ({ className = '' }) => {
  return (
    <hr className={`border-t border-gray-200 my-4 ${className}`} />
  );
};
