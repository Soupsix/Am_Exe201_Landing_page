'use client';

import * as React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { cn } from '@/lib/utils';

export interface CustomButtonProps extends HTMLMotionProps<'button'> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'link';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}

const CustomButton = React.forwardRef<HTMLButtonElement, CustomButtonProps>(
  ({ className, children, variant = 'primary', size = 'md', fullWidth = false, ...props }, ref) => {
    return (
      <motion.button
        ref={ref}
        whileTap={{ scale: 0.98 }}
        transition={{ type: 'spring', stiffness: 400, damping: 15 }}
        className={cn(
          // Base transition, typography, and spacing
          'inline-flex items-center justify-center font-sans font-semibold tracking-wide border transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2',
          
          // Variants
          {
            // Primary: Deep Herbal Green background, Cream text
            'bg-primary border-primary text-background hover:bg-primary-container hover:border-primary-container shadow-diffused-sm':
              variant === 'primary',
            // Secondary: Border and Text deep green
            'bg-transparent border-primary text-primary hover:bg-primary hover:text-background':
              variant === 'secondary',
            // Ghost: transparent background, text green
            'bg-transparent border-transparent text-primary hover:bg-surface-low':
              variant === 'ghost',
            // Link: no border, underlined hover
            'bg-transparent border-transparent p-0 text-primary underline-offset-4 hover:underline focus:ring-0 focus:ring-offset-0':
              variant === 'link',
          },

          // Sizes matching standard spacing (primary radius 16px is rounded-lg or rounded-xl)
          {
            'px-4 py-2 text-sm rounded-lg': size === 'sm' && variant !== 'link',
            'px-6 py-3 text-base rounded-lg': size === 'md' && variant !== 'link',
            'px-8 py-4 text-lg rounded-xl': size === 'lg' && variant !== 'link',
          },

          // Full width option
          fullWidth ? 'w-full' : '',
          
          className
        )}
        {...props}
      >
        {children}
      </motion.button>
    );
  }
);

CustomButton.displayName = 'CustomButton';

export { CustomButton };
