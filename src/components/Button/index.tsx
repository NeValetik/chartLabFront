'use client'

import { FC, ReactNode, ButtonHTMLAttributes  } from 'react'
import { Button } from '@headlessui/react'

const toneFragment = `
  bg-monokai-gray-800
  text-monokai-gray-500
  data-[hover]:text-monokai-gray-1000 
`;

const toneInvertedFragment = `
  text-monokai-gray-1000
  data-[hover]:text-monokai-gray-500
  data-[hover]:bg-monokai-gray-800
  data-[hover]:data-[active]:bg-monokai-gray-800
`;

const toneClass = ( tone: IButtonProps["tone"] ) => {
  switch( tone ) {
    case 'red':
      return `
        data-[hover]:bg-monokai-red
        data-[hover]:data-[active]:bg-monokai-red
        ${toneFragment}
      `;
    case 'green':
      return `
        data-[hover]:bg-monokai-green
        data-[hover]:data-[active]:bg-monokai-green
        ${toneFragment}
      `;
    case 'blue':
      return `
        data-[hover]:bg-monokai-blue
        data-[hover]:data-[active]:bg-monokai-blue
        ${toneFragment}
      `; 
    case 'orange':
      return `
        data-[hover]:bg-monokai-orange
        data-[hover]:data-[active]:bg-monokai-orange
        ${toneFragment}
      `;
    case 'violet':
      return `
        data-[hover]:bg-monokai-violet
        data-[hover]:data-[active]:bg-monokai-violet
        ${toneFragment}
      `;
    case 'yellow':
      return `
        data-[hover]:bg-monokai-yellow
        data-[hover]:data-[active]:bg-monokai-yellow
        ${toneFragment}
      `;
    case 'simple':
      return `
        data-[hover]:bg-monokai-gray-500
        data-[hover]:data-[active]:bg-monokai-gray-500
        ${toneFragment}
      `;
    default:
      return "";
  }
};

const toneClassInverted = ( tone: IButtonProps["tone"] ) => {
  switch( tone ) {
    case 'red':
      return `
        bg-monokai-red
        ${toneInvertedFragment}
      `;
    case 'green':
      return `
        bg-monokai-green
        ${toneInvertedFragment}
      `;
    case 'blue':
      return `
        bg-monokai-blue
        ${toneInvertedFragment}
      `; 
    case 'orange':
      return `
        bg-monokai-orange
        ${toneInvertedFragment}
      `;
    case 'violet':
      return `
        bg-monokai-violet
        ${toneInvertedFragment}
      `;
    case 'yellow':
      return `
        bg-monokai-yellow
        ${toneInvertedFragment}
      `;
    case 'simple':
      return `
        bg-monokai-gray-500
        ${toneInvertedFragment}
      `;
    default:
      return "";
  }
};

const getHoverTextClass = (tone: IButtonProps["tone"]) => {
  switch(tone) {
    case 'red':
      return "data-[hover]:text-monokai-red data-[active]:text-monokai-red";
    case 'green':
      return "data-[hover]:text-monokai-green data-[active]:text-monokai-green";
    case 'blue':
      return "data-[hover]:text-monokai-blue data-[active]:text-monokai-blue";
    case 'orange':
      return "data-[hover]:text-monokai-orange data-[active]:text-monokai-orange";
    case 'violet':
      return "data-[hover]:text-monokai-violet data-[active]:text-monokai-violet";
    case 'yellow':
      return "data-[hover]:text-monokai-yellow data-[active]:text-monokai-yellow";
    case 'simple':
      return "data-[hover]:text-monokai-gray-500 data-[active]:text-monokai-gray-500";
    default:
      return "";
  }
};

const getHoverBorderClass = (tone: IButtonProps["tone"]) => {
  switch(tone) {
    case 'red':
      return "data-[hover]:border-monokai-red data-[active]:border-monokai-red";
    case 'green':
      return "data-[hover]:border-monokai-green data-[active]:border-monokai-green";
    case 'blue':
      return "data-[hover]:border-monokai-blue data-[active]:border-monokai-blue";
    case 'orange':
      return "data-[hover]:border-monokai-orange data-[active]:border-monokai-orange";
    case 'violet':
      return "data-[hover]:border-monokai-violet data-[active]:border-monokai-violet";
    case 'yellow':
      return "data-[hover]:border-monokai-yellow data-[active]:border-monokai-yellow";
    case 'simple':
      return "data-[hover]:border-monokai-gray-500 data-[active]:border-monokai-gray-500";
    default:
      return "";
  }
};

const sizeClass = ( size: IButtonProps["size"] ) => {
  switch( size ) {
    case 'small':
      return `
        py-1 px-2
      `;
    case 'medium':
      return `
        py-2 px-4
      `;
    case 'large':
      return `
        py-3 px-6
      `; 
    default:
      return "";
  }
};

const variantClass = (variant: IButtonProps['variant'], tone: IButtonProps['tone']) => {
  switch (variant) {
    case 'primary':
      return `
        ${toneClass(tone)}
      `;
    case 'primary-inverted':
      return `
        ${toneClassInverted(tone)}
      `;  
    case 'secondary':
      return `
        border-2 border-monokai-gray-800
        text-monokai-gray-500
        ${getHoverTextClass(tone)}
        ${getHoverBorderClass(tone)}
      `;
    case 'tertiary':
      return `
        bg-transparent
        text-monokai-gray-500
        ${getHoverTextClass(tone)}
      `;
    default:
      return '';
  }
};

interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'primary-inverted' | 'secondary' | 'tertiary',
  tone?: 'red' | 'green' | 'blue' | 'orange' | 'violet' | 'yellow' | 'simple' ,
  size?: 'small' | 'medium' | 'large',
  underline?: boolean,
  children?: ReactNode,
};

const ButtonBase: FC<IButtonProps> = ( props ) => {
  const {
    tone = 'simple',
    variant='primary',
    className ='',
    size = 'medium',
    children,
    underline,
    ...rest
  } = props;

  return (
    <Button 
      className={`
        rounded 
        transition-colors
        flex justify-center items-center 
        cursor-pointer
        gap-1 
        data-[underline]:underline
        ${variantClass( variant, tone )}
        ${sizeClass( size )}
        ${className}
      `}
      data-underline={underline}
      {...rest}
    >
      {children}
    </Button>
  )
}

export default ButtonBase;