import { ElementType, ReactElement } from 'react';

/**
 * Creates a type from a Variants Object.
 * Function variants get the type inferred by the first argument type
 */
type EvaluateProps<Variants extends VariantsRecord> = {
  [Prop in keyof Variants]: Variants[Prop] extends Record<string, string>
    ? keyof Variants[Prop]
    : Variants[Prop] extends (...args: any) => any
    ? Parameters<Variants[Prop]>[0]
    : never;
};

/**
 * Gets the keys that 2 types have in common
 * GetIntersectionKeys<{ x, y, z }, { h, x, z }> = 'x' | 'z'
 */
type GetIntersectionKeys<T, K extends keyof any> = {
  [k in keyof T]: K extends k ? K : never;
}[keyof T];

/**
 * Create Optional Props type.
 * CreateOptionalProps<{ x: string, y: number}, 'x'> = { x?: string }
 */
type CreateOptionalProps<Props, DefaultValues> = Partial<
  Pick<Props, GetIntersectionKeys<Props, keyof DefaultValues>>
>;

type EvaluatePropsWithDefaultValues<
  Variants extends VariantsRecord,
  DefaultValues extends GetDefaultValues<Variants>
> = Omit<EvaluateProps<Variants>, keyof DefaultValues> &
  CreateOptionalProps<EvaluateProps<Variants>, DefaultValues>;

/**
 * Variants can receive records or functions. This is the function type of it.
 * It would be incredible if we could pass the types to it, but it would need to auto-infer
 * the variants as it's been written.
 */
type ClassNameFunction = (value: any, props: any, variants: any) => string;

export type VariantsRecord = Record<
  string,
  Record<string, string> | ClassNameFunction
>;

/**
 * Configuration to create a Component with variants
 */
export interface ComponentConfig<
  Variants extends VariantsRecord,
  DefaultValues
> {
  className?: string;
  variants?: Variants;
  defaultProps?: DefaultValues;
}

/**
 * Get Default Values types.
 * It could be better, infering which values it could receive, like using
 * = Partial<Infer<DefaultAs, Variants, {}>>
 * But, that breaks `styled`, as it makes all props optional.
 */
export type GetDefaultValues<Variants extends VariantsRecord> = Partial<
  Record<keyof Variants, any>
>;

/**
 * Styled Component. Supports the As prop, which changes the prop types based on the component
 * it's rendering.
 */
export interface Component<
  DefaultAs extends ElementType,
  Variants extends VariantsRecord,
  DefaultValues
> {
  <As extends ElementType = DefaultAs>(
    props: StyledProps<As, Variants, DefaultValues>
  ): ReactElement<any, any>;

  displayName?: string | undefined;
}

/**
 * Extract Props from a Component
 */
type InferAnyComponentProps<T> = T extends ElementType<infer Props> ? Props : T;

/**
 * Extract Props from a W.Component
 */
export type Infer<T> = T extends Component<
  infer DefaultAs,
  infer Variants,
  infer DefaultValues
>
  ? StyledProps<DefaultAs, Variants, DefaultValues>
  : InferAnyComponentProps<T>;

/**
 * Evaluates props based on Variants. Variants that have a Default value become optional.
 * It also merges with the Component's Props, replacing the ones that are variants.
 *   Ex.:
 *   const Component = styled(
 *     ({ color, checked, x }: { color: string, checked: string, x: string }) => null, {
 *     variants: {
 *       color: {
 *         gray: 'foo',
 *         red: 'bar',
 *       },
 *       checked: (value: boolean) => value ? 'x' : 'y'
 *     },
 *     defaultProps: {
 *       color: 'gray'
 *     }
 *   })
 *
 *   <Component x="y" color="red" checked={false} /> // ✅
 *   <Component color="red" checked={false} /> // ❌ missing `x` prop
 *   <Component x={1} color="red" checked={false} /> // ❌ `x` prop should be string
 *   <Component x="y" color="red" checked="x" /> // ❌ `checked` prop should be boolean
 *   <Component x="y" color="red" /> // ❌ missing `checked` prop
 *   <Component x="y" checked={true} /> // ✅
 */
export type StyledProps<
  As extends ElementType,
  Variants extends VariantsRecord,
  DefaultValues
> = { as?: As } & Omit<
  InferAnyComponentProps<
    As extends keyof JSX.IntrinsicElements ? JSX.IntrinsicElements[As] : As
  >,
  keyof Variants | 'as'
> &
  EvaluatePropsWithDefaultValues<Variants, DefaultValues>;

/**
 * Styled Function should infer the Component, the Variants object and the Default
 * Variants values so the created component has the right props.
 */
interface StyledFunction {
  <
    DefaultAs extends ElementType,
    Variants extends VariantsRecord = {},
    DefaultValues extends GetDefaultValues<Variants> = {}
  >(
    component: DefaultAs,
    config: ComponentConfig<Variants, DefaultValues>
  ): Component<DefaultAs, Variants, DefaultValues>;
}

/**
 * Styled should be callable by:
 *   styled('a', { className: 'text-sm', variants: { ... } })
 *   styled(Component, { className: '...', variants: { ... } })
 *   styled.a('text-sm', { variants: { ... } })
 *   styled.a('text-sm')
 */
export type Styled = StyledFunction &
  {
    [DefaultAs in keyof JSX.IntrinsicElements]: <
      Variants extends VariantsRecord = {},
      DefaultValues extends GetDefaultValues<Variants> = {}
    >(
      cx: string,
      config?: Omit<ComponentConfig<Variants, DefaultValues>, 'className'>
    ) => Component<DefaultAs, Variants, DefaultValues>;
  };
