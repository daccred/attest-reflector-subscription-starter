import * as React from 'react';
import { cn } from '@/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';

const inputContentVariants = cva('', {
  variants: {
    iconPosition: {
      left: 'z-10 absolute cursor-pointer left-4 top-1/2 -translate-y-1/2 transform text-muted-foreground',
      right:
        'z-10 absolute cursor-pointer left-auto right-2 top-1/2 -translate-y-1/2 transform text-muted-foreground',
    },
  },
  defaultVariants: {
    iconPosition: 'left',
  },
});

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputContentVariants> {
  startContent?: React.ReactElement;
  endContent?: React.ReactElement;
  startContentAction?: () => void;
  endContentAction?: () => void;
  error?: boolean;
  font?: 'default' | 'sans';
}

const startIconPadding = 'pl-10';
const endIconPadding = 'pr-10';
const bothIconsPadding = 'pl-10 pr-10';

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type,
      startContent,
      endContent,
      startContentAction,
      endContentAction,
      error,
      font = 'default',
      ...props
    },
    ref,
  ) => {
    const combinedPadding =
      startContent && endContent
        ? bothIconsPadding
        : startContent
          ? startIconPadding
          : endContent
            ? endIconPadding
            : 'px-4';

    const fontClass =
      font === 'sans' ? 'font-mona-sans' : 'font-pp-supply-mono';

    const inputClassName = cn(
      'relative flex h-full w-full rounded-10 border border-stroke bg-transparent py-4 text-black outline-none transition duration-200 file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 dark:text-white md:text-sm',
      fontClass,
      { 'border-red-600 focus-visible:ring-red-500': error },
      { 'shadow-normal focus:shadow-focus': !error },
      combinedPadding,
      className,
    );

    return (
      <>
        {startContent || endContent ? (
          <div className="relative inline-block h-11 w-full">
            {startContent && (
              <div
                onClick={startContentAction}
                className={inputContentVariants({ iconPosition: 'left' })}
              >
                {startContent}
              </div>
            )}
            <input
              type={type}
              className={inputClassName}
              ref={ref}
              {...props}
            />
            {endContent && (
              <div
                onClick={endContentAction}
                className={cn(
                  inputContentVariants({ iconPosition: 'right' }),
                  '-bottom-1.5',
                )}
              >
                {endContent}
              </div>
            )}
          </div>
        ) : (
          <input type={type} className={inputClassName} ref={ref} {...props} />
        )}
      </>
    );
  },
);

Input.displayName = 'Input';

export { Input, inputContentVariants };
