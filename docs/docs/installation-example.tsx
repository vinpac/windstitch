import React from 'react';
import { w, W } from 'windstitch';
import { useColorMode } from '@docusaurus/theme-common';

const Container = w.div('', {
  variants: {
    isDarkMode: (yes: boolean) => (yes ? 'bg-gray-800 dark' : ''),
  },
});

const variants = {
  color: {
    gray: `
      bg-gray-300
      hover:bg-gray-400
      dark:bg-gray-700
      dark:hover:bg-gray-600
      text-gray-900
      dark:text-white
      ring-gray-400
    `,
    violet: `
      bg-violet-500
      hover:bg-violet-400
      dark:bg-violet-700
      dark:hover:bg-violet-600
      text-white
      dark:text-white
      ring-violet-400
    `,
  },
  size: {
    xs: 'px-1.5 py-0.5 rounded text-xs',
    sm: 'px-2 py-1 rounded-md text-sm',
    base: 'px-3 py-2 rounded-md text-base',
    md: 'px-4 py-3 rounded-md text-lg',
    lg: 'px-5 py-4 rounded-lg text-lg',
    xl: 'px-6 py-5 rounded-lg text-xl',
  },
} as const;
const Button = w.button(
  `
  hover:shadow-outline text-center
  font-bold focus:outline-none
  focus:ring-4 ring-opacity-40
`,
  {
    variants,
    defaultProps: {
      size: 'base',
      color: 'violet',
    },
  }
);
type ButtonProps = W.Infer<typeof Button>;

const isVisuallyEven = (value: boolean) =>
  value ? 'bg-gray-100 dark:bg-gray-900' : 'bg-gray-200 dark:bg-gray-800';

const Td = w.td('px-2 py-2', {
  variants: {
    isVisuallyEven,
  },
});

const Th = w.th('', {
  variants: {
    isVisuallyEven,
  },
});

const Example = () => {
  const { isDarkTheme } = useColorMode();
  return (
    <div data-tailwind="true">
      <Container isDarkMode={isDarkTheme}>
        <table className="w-full">
          <thead>
            <tr className="px-2">
              <Th isVisuallyEven={false} />
              {Object.keys(variants.size).map((size, i) => (
                <Th key={size} isVisuallyEven={i % 2 === 0}>
                  {size}
                </Th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Object.keys(variants.color).map(color => (
              <tr key={color}>
                <Th isVisuallyEven={false}>{color}</Th>
                {Object.keys(variants.size).map((size, i) => (
                  <Td key={size} isVisuallyEven={i % 2 === 0}>
                    <Button
                      color={color as ButtonProps['color']}
                      size={size as ButtonProps['size']}
                    >
                      Button
                    </Button>
                  </Td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </Container>
    </div>
  );
};

export default Example;
