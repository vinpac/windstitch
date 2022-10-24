import React from 'react';
import { ElementType, forwardRef, ReactElement } from 'react';
import { domElements } from './constants';
import * as W from './types';
import { evaluateClassName } from './utils';

export const styled: W.Styled = function(
  component,
  {
    className: defaultClassName,
    variants,
    transient,
    defaultProps,
    compoundVariants,
    defaultVariants,
  }
) {
  const overrideVariantProps = variants
    ? Object.fromEntries(Object.keys(variants).map(key => [key, undefined]))
    : {};
  const overrideTransientProps =
    transient && variants
      ? Object.fromEntries(
          Object.keys(variants)
            .filter(key => transient.includes(key))
            .map(key => [key, undefined])
        )
      : {};
  const Component = <As extends ElementType>(
    { as: asProp, ...props }: W.StyledProps<As, any, any>,
    ref: any
  ): ReactElement<any, any> => {
    const Tag = (asProp || component) as ElementType;
    const isTag = typeof component === 'string';
    return (
      <Tag
        {...defaultProps}
        {...props}
        // remove all variants props if the component is a tag name
        {...(isTag ? overrideVariantProps : overrideTransientProps)}
        ref={isTag ? ref : undefined}
        className={
          evaluateClassName(
            props,
            variants || {},
            defaultVariants,
            compoundVariants,
            defaultClassName
          ) || undefined
        }
      />
    );
  };

  if (typeof component === 'string') {
    return forwardRef(Component) as any;
  }

  return Component;
} as W.Styled;

// Add all styled.[tag] functions (such as styled.a, styled.div, ...)
domElements.forEach(domElement => {
  styled[domElement] = ((className, config) =>
    styled(domElement, { ...config, className })) as W.StyledTagFunction<
    typeof domElement
  >;
});
