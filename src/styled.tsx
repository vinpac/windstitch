import React from 'react';
import { ElementType, forwardRef, ReactElement } from 'react';
import { domElements } from './constants';
import {
  GetDefaultValues,
  Styled,
  Component,
  ComponentConfig,
  StyledProps,
  VariantsRecord,
} from './types';
import { evaluateClassName } from './utils';

export const styled: Styled = function<
  Props,
  DefaultAs extends ElementType<Props>,
  // eslint-disable-next-line @typescript-eslint/ban-types
  Variants extends VariantsRecord = {},
  // eslint-disable-next-line @typescript-eslint/ban-types
  DefaultVariants extends GetDefaultValues<Variants> = {}
>(
  component: DefaultAs,
  {
    className: defaultClassName,
    variants,
    defaultProps: defaultVariants,
  }: ComponentConfig<Variants, DefaultVariants>
): Component<DefaultAs, Variants, DefaultVariants> {
  const overrideVariantProps = variants
    ? Object.fromEntries(Object.keys(variants).map(key => [key, undefined]))
    : {};
  const Component = <As extends ElementType>(
    { as: asProp, ...props }: StyledProps<As, Variants, DefaultVariants>,
    ref: any
  ): ReactElement<any, any> => {
    const Tag = (asProp || component) as ElementType;
    return (
      <Tag
        {...props}
        // remove all variants props if the component is a tag name
        {...(typeof component === 'string' ? overrideVariantProps : {})}
        ref={ref}
        className={
          evaluateClassName(
            { ...defaultVariants, ...props },
            variants || {},
            defaultClassName
          ) || undefined
        }
      />
    );
  };

  if (typeof component === 'string') {
    return (forwardRef(Component) as any) as Component<
      DefaultAs,
      Variants,
      DefaultVariants
    >;
  }

  return Component as Component<DefaultAs, Variants, DefaultVariants>;
} as Styled;

// Add all styled.[tag] functions (such as styled.a, styled.div, ...)
domElements.forEach(
  domElement =>
    (styled[domElement] = <Variants extends VariantsRecord, DefaultVariants>(
      className: string,
      config?: Omit<ComponentConfig<Variants, DefaultVariants>, 'className'>
    ) => styled(domElement, { ...config, className }))
);
