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
  mapVariants?: Record<
    string,
    Record<string, Record<string, any> | undefined> | undefined
  >,
  defaultClassName = ''
): string => {
  const classNames = [defaultClassName, props.className || ''];
  const variantsSelectedByMap = {};
  const getVariantValue = (key: string, useMappedVariants = false) => {
    if (props[key] === undefined) {
      const defaultValue = defaultVariants?.[key];
      if (useMappedVariants) {
        return (
          variantsSelectedByMap[key as keyof typeof variantsSelectedByMap] ||
          defaultValue
        );
      }

      return defaultValue;
    }

    return props[key];
  };

  if (mapVariants) {
    // We need to map variants first so we can use them in the next step
    Object.keys(mapVariants).forEach(key => {
      const map = mapVariants[key];
      const value = getVariantValue(key);
      if (value !== undefined) {
        const mappedVariants = map?.[value];
        if (mappedVariants) {
          Object.assign(variantsSelectedByMap, mappedVariants);
        }
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

    const mappedVariant = mapVariants?.[key]?.[value];

    if (mappedVariant) {
      Object.assign(variantsSelectedByMap, mappedVariant);
    }
  });

  return classNames.filter(Boolean).join(' ');
};
