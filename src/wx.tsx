import * as W from './types';
import { evaluateClassName } from './utils';

export const wx: W.ClassNameFactor = ({
  variants,
  defaultVariants,
  className,
}) => {
  return props => {
    return evaluateClassName(props, variants, defaultVariants, className);
  };
};
