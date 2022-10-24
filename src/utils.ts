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
  compoundVariants?: Record<string, any>[],
  defaultClassName = ''
): string => {
  const classNames = [defaultClassName, props.className || ''];
  let compoundedClassName = '';
  let compoundedDefaults: Record<string, any> = {};

  // get a variant value from props
  const getVariantValue = (key: string, selectFromCompounded = false) => {
    if (props[key] === undefined) {
      const defaultValue = defaultVariants?.[key];
      if (selectFromCompounded) {
        return (
          compoundedDefaults[key as keyof typeof compoundedDefaults] ||
          defaultValue
        );
      }

      return defaultValue;
    }

    return props[key];
  };

  if (compoundVariants) {
    let lastSelectorPrecision = 0;
    // We need to map variants first so we can use them in the next step
    compoundVariants?.some(({ defaultTo, class: className, ...selector }) => {
      const keys = Object.keys(selector);
      const selectorPrecision = keys.length;
      const selectorMatches = keys.every(
        key => getVariantValue(key) === selector[key]
      );

      if (selectorMatches && selectorPrecision >= lastSelectorPrecision) {
        compoundedClassName = className || '';
        compoundedDefaults = defaultTo || {};
        lastSelectorPrecision = selectorPrecision;
      }
    });
  }

  Object.keys(variants).forEach(key => {
    const variant = variants[key];
    const value = getVariantValue(key, true);

    if (typeof variant === 'function') {
      classNames.push(variant(value, props, variants)?.trim());
    } else {
      classNames.push(variant[value]?.trim());
    }
  });

  classNames.push(compoundedClassName);

  return classNames.filter(Boolean).join(' ');
};
