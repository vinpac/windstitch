import { ComponentConfig } from '../src/types';
import { evaluateClassName } from '../src/utils';

describe('evaluateClassName', () => {
  const size = {
    sm: 'z',
    xl: 'q',
  };
  const defaultClassName = 'm';
  const variants = {
    color: {
      gray: 'x',
      red: 'y',
    },
    size: (value: 'sm' | 'xl') => size[value],
  } as const;

  describe('when nothing matches and no defaultClassName is given', () => {
    it('should return an empty string', () => {
      expect(evaluateClassName({}, {})).toEqual('');
    });
  });

  describe('when using compoundVariants', () => {
    const variants = {
      size: {
        base: 'text-base',
        xl: 'text-8xl',
      },
      weight: {
        normal: 'font-normal',
        bold: 'font-bold',
      },
      theme: {
        h1: '',
        base: '',
      },
    };
    const defaultVariants = {
      theme: 'base',
      weight: 'normal',
      size: 'base',
    };
    const compoundVariants: ComponentConfig<
      typeof variants,
      typeof defaultVariants,
      'button'
    >['compoundVariants'] = [
      {
        theme: 'h1',
        defaultTo: {
          size: 'xl',
          weight: 'bold',
        },
      },
      {
        theme: 'base',
        defaultTo: {
          size: 'base',
          weight: 'normal',
        },
      },
    ];

    // {
    //   theme: {
    //     h1: {
    //       size: 'xl',
    //       weight: 'bold',
    //     },
    //     base: {
    //       size: 'base',
    //       weight: 'normal',
    //     },
    //   },
    // };

    const evaluate = (props = {}) =>
      evaluateClassName(props, variants, defaultVariants, compoundVariants, '');

    describe('if no prop is given', () => {
      it('should return the default compounded variants', () => {
        expect(evaluate()).toEqual('text-base font-normal');
      });
    });

    describe('if no prop is given and the default variant value is diff than the default value given by the compounded variant', () => {
      it('should return the default compounded variants', () => {
        expect(
          evaluateClassName(
            {},
            variants,
            {
              ...defaultVariants,
              size: 'xl',
            },
            compoundVariants,
            ''
          )
        ).toEqual('text-base font-normal');
      });
    });

    describe('if the compounded variant is given a value', () => {
      it('should return the selected variants on the map', () => {
        expect(evaluate({ theme: 'h1' })).toEqual('text-8xl font-bold');
      });
    });

    describe('if the compounded variant is given a value and a compounded variant is also given a value', () => {
      it('should return the selected variants on the map', () => {
        expect(evaluate({ theme: 'h1', size: 'base' })).toEqual(
          'text-base font-bold'
        );
      });
    });
  });

  describe.each([
    ['no props match', 'default class name', {}, {}, [defaultClassName]],
    [
      'no props match',
      'default class name',
      { color: '_' },
      undefined,
      [defaultClassName],
    ],
    [
      'no props match',
      'default class name',
      { color: '_', size: '_' },
      {},
      [defaultClassName],
    ],
    [
      'no props match',
      'default class name',
      { size: 'gray' },
      {},
      [defaultClassName],
    ],
    [
      'no props match but has a default prop value',
      'default class name',
      { color: '_' },
      { size: 'sm' },
      [defaultClassName, size.sm],
    ],
    [
      'no props match',
      'default class name',
      { color: 'sm' },
      {},
      [defaultClassName],
    ],
    [
      '1 prop match',
      'color.gray className',
      { color: 'gray' },
      {},
      [variants.color.gray, defaultClassName],
    ],
    [
      '1 prop match and has a default prop value',
      'color.gray and size.sm className',
      { color: 'gray' },
      { size: 'sm' },
      [variants.color.gray, size.sm, defaultClassName],
    ],
    [
      '1 prop match',
      'color.red className',
      { color: 'red' },
      {},
      [variants.color.red, defaultClassName],
    ],
    [
      '1 prop match',
      'size.sm className',
      { size: 'sm' },
      {},
      [size.sm, defaultClassName],
    ],
    [
      '2 props match',
      'color.gray and size.sm className',
      { color: 'gray', size: 'sm' },
      {},
      [variants.color.gray, size.sm, defaultClassName],
    ],
    [
      '2 props match',
      'color.red and size.xl className',
      { color: 'red', size: 'xl' },
      {},
      [variants.color.red, size.xl, defaultClassName],
    ],
    [
      'has a default prop value and undefined is declared',
      'size.sm className',
      { size: undefined },
      { size: 'sm' },
      [size.sm, defaultClassName],
    ],
    [
      'prop.className is passed',
      'defaultClassName and prop.className',
      { className: 'customprop' },
      {},
      ['customprop', defaultClassName],
    ],
    [
      'prop.className is passed and variants are given',
      'defaultClassName and prop.className',
      { color: 'gray', size: 'sm', className: 'customprop' },
      {},
      ['customprop', variants.color.gray, size.sm, defaultClassName],
    ],
  ])(
    'when %s',
    (_, expectedResultMessage, props, defaultVariants, expectedClassNames) => {
      it(`should return ${expectedResultMessage}`, () => {
        expect(
          evaluateClassName(
            props,
            variants,
            defaultVariants,
            undefined,
            defaultClassName
          )
            .split(' ')
            .sort()
        ).toEqual(expectedClassNames.sort());
      });
    }
  );
});
