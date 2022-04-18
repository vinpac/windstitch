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
  defaultVariants?: Record<string, any>,
  defaultClassName = ''
): string => {
  const classNames = [defaultClassName, props.className || ''];

  Object.keys(variants).forEach(key => {
    const variant = variants[key];
    const value =
      props[key] === undefined ? defaultVariants?.[key] : props[key];

    if (typeof variant === 'function') {
      classNames.push(variant(value, props, variants)?.trim());
    } else {
      classNames.push(variant[value]?.trim());
    }
  });

  return classNames.filter(Boolean).join(' ');
};
