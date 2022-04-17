import { VariantsRecord } from '../src/types';
import { evaluateClassName } from '../src/utils';

describe('evaluateClassName', () => {
  const variants: VariantsRecord = {
    color: {
      gray: 'x',
      red: 'y',
    },
    size: {
      sm: 'z',
      xl: 'q',
    },
  };

  it('renders without crashing', () => {
    expect(evaluateClassName({}, variants, 'm')).toEqual('m');
  });
});
