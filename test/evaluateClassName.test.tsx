import { evaluateClassName } from '../src/utils';

describe('evaluateClassName', () => {
  const defaultClassName = 'm';
  const variants = {
    color: {
      gray: 'x',
      red: 'y',
    },
    size: {
      sm: 'z',
      xl: 'q',
    },
  } as const;

  describe.each([
    ['no props match', 'default class name', {}, [defaultClassName]],
    [
      'no props match',
      'default class name',
      { color: '_' },
      [defaultClassName],
    ],
    [
      'no props match',
      'default class name',
      { color: '_', size: '_' },
      [defaultClassName],
    ],
    [
      'no props match',
      'default class name',
      { size: 'gray' },
      [defaultClassName],
    ],
    [
      'no props match',
      'default class name',
      { color: 'sm' },
      [defaultClassName],
    ],
    [
      '1 prop match',
      'color.gray className',
      { color: 'gray' },
      [variants.color.gray, defaultClassName],
    ],
    [
      '1 prop match',
      'color.red className',
      { color: 'red' },
      [variants.color.red, defaultClassName],
    ],
    [
      '1 prop match',
      'size.sm className',
      { size: 'sm' },
      [variants.size.sm, defaultClassName],
    ],
    [
      '2 props match',
      'color.gray and size.sm className',
      { color: 'gray', size: 'sm' },
      [variants.color.gray, variants.size.sm, defaultClassName],
    ],
    [
      '2 props match',
      'color.red and size.xl className',
      { color: 'red', size: 'xl' },
      [variants.color.red, variants.size.xl, defaultClassName],
    ],
  ])('when %s', (_, expectedResultMessage, props, expectedClassNames) => {
    it(`should render return ${expectedResultMessage}`, () => {
      expect(
        evaluateClassName(props, variants, defaultClassName)
          .split(' ')
          .sort()
      ).toEqual(expectedClassNames.sort());
    });
  });
});
