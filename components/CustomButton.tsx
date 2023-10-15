'use client'

import { twMerge } from 'tailwind-merge';
import { CustomButtonProps } from '../types/index';
import Image from 'next/image';

const CustomButton:React.FC<CustomButtonProps> = ({children, className, rightIcon, ...attributes}) => {
  return (
    <button
      className={twMerge(`custom-btn`, className)}
      {...attributes}
    >
        <span className='flex-1'>
            {children}
        </span>
        
        {rightIcon && (
            <div className="relative w-6 h-6">
                <Image
                  src={rightIcon}
                  alt="arrow_left"
                  fill
                  className="object-contain"
                />
            </div>
        )}
    </button>
  )
}

export default CustomButton