import { VariantsRecord } from './types';

/**
 *
 * @param props
 * @param variants
 * @param defaultClassName
 * @returns
 */
export const evaluateClassName = (
  props: Record<string, any>,
  variants: VariantsRecord,
  defaultClassName = ''
): string => {
  const classNames = [defaultClassName, props.className || ''];

  Object.keys(variants).forEach(key => {
    const variant = variants[key];

    if (typeof variant === 'function') {
      classNames.push(variant(props[key], props, variants)?.trim());
    } else {
      classNames.push(variant[props[key]]?.trim());
    }
  });

  return classNames.filter(Boolean).join(' ');
};
