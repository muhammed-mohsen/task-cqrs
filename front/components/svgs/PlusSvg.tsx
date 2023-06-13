import React from 'react';

interface PlusSvgProps extends React.SVGProps<SVGSVGElement> {}

export const PlusSvg: React.FC<PlusSvgProps> = (props) => {
  return (
    <svg
      className='w-5 h-5 text-gray-400 fill-current'
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      viewBox='0 0 24 24'
      stroke='currentColor'
      {...props}
    >
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth='2'
        d='M12 6v6m0 0v6m0-6h6m-6 0H6'
      />
    </svg>
  );
};
