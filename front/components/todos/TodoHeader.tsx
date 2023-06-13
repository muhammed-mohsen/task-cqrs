import { LogoSvg } from '@/components/svgs/LogoSvg';
import React, { PropsWithChildren } from 'react';

interface TodoHeaderProps {
  name: string;
}

export const TodoHeader: React.FC<PropsWithChildren<TodoHeaderProps>> = ({
  name,
}) => {
  return (
    <div className='flex items-center mb-6'>
      <LogoSvg />
      <h4 className='font-semibold ml-3 text-lg'>{name} 's Todos</h4>
    </div>
  );
};
