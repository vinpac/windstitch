import React from 'react';
import { ElementType, forwardRef, ReactElement } from 'react';
import { domElements } from './constants';
import * as W from './types';
import { evaluateClassName } from './utils';

export const styled: W.Styled = function<
  Props,
  DefaultAs extends ElementType<Props>,
  // eslint-disable-next-line @typescript-eslint/ban-types
  Variants extends W.VariantsRecord = {},
  // eslint-disable-next-line @typescript-eslint/ban-types
  DefaultVariants extends W.GetDefaultValues<Variants> = {}
>(
  component: DefaultAs,
  {
    className: defaultClassName,
    variants,
    defaultProps: defaultVariants,
  }: W.ComponentConfig<Variants, DefaultVariants>
): W.Component<DefaultAs, Variants, DefaultVariants> {
  const overrideVariantProps = variants
    ? Object.fromEntries(Object.keys(variants).map(key => [key, undefined]))
    : {};
  const Component = <As extends ElementType>(
    { as: asProp, ...props }: W.StyledProps<As, Variants, DefaultVariants>,
    ref: any
  ): ReactElement<any, any> => {
    const Tag = (asProp || component) as ElementType;
    const isTag = typeof component === 'string';
    return (
      <Tag
        {...props}
        // remove all variants props if the component is a tag name
        {...(isTag ? overrideVariantProps : {})}
        ref={isTag ? ref : undefined}
        className={
          evaluateClassName(
            props,
            variants || {},
            defaultVariants,
            defaultClassName
          ) || undefined
        }
      />
    );
  };

  if (typeof component === 'string') {
    return (forwardRef(Component) as any) as W.Component<
      DefaultAs,
      Variants,
      DefaultVariants
    >;
  }

  return Component as W.Component<DefaultAs, Variants, DefaultVariants>;
} as W.Styled;

// Add all styled.[tag] functions (such as styled.a, styled.div, ...)
domElements.forEach(
  domElement =>
    (styled[domElement] = <Variants extends W.VariantsRecord, DefaultVariants>(
      className: string,
      config?: Omit<W.ComponentConfig<Variants, DefaultVariants>, 'className'>
    ) => styled(domElement, { ...config, className }))
);
