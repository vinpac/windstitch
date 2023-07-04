---
sidebar_position: 4
---

# Variants

Variants are properties that create different versions of your component.

<img src="/img/example.gif" style={{ marginBottom: '24px' }} />

## Record Variants

Record variants are simple objects mapping a key, which will become an accepted value for that variant, and a value which will be the className applied to the component.

```typescript
import { w, W } from 'windstitch';

const Button = w.button('bg-white', {
  variants: {
    color: {
      gray: 'bg-gray-500',
      red: 'bg-red-500',
    },
  },
});
type ButtonProps = W.Infer<typeof Button>;
// ButtonProps['color'] is 'gray' | 'red'
```

## Function Variants

For complex values, use a function to style it. The prop type is inferred from the first argument type. Always remember to set it.

```typescript
import { w, W } from 'windstitch';

const Checkbox = w.input('bg-white', {
  variants: {
    checked: (yes: boolean) => (yes ? 'bg-indigo-500' : 'bg-white'),
  },
});
type CheckboxProps = W.Infer<typeof Checkbox>;
// CheckboxProps['checked'] is boolean
```

## Set a Default Variant to make it optional

All Variants are required by default. To make one optional, just set a default value for it through `defaultProps`.

```typescript
import { w, W } from 'windstitch';

const Checkbox = w.input('bg-white', {
  variants: {
    color: {
      gray: 'bg-gray-500',
      red: 'bg-red-500',
    },
    checked: (yes: boolean) => (yes ? 'bg-indigo-500' : 'bg-white'),
  },
  defaultVariants: {
    color: 'gray',
    checked: false,
  },
});
type CheckboxProps = W.Infer<typeof Checkbox>;
// CheckboxProps['checked'] is boolean | undefined
// CheckboxProps['color'] is 'gray' | 'red' | undefined
```

## Transient Variants

Sometimes you want to pass a variant that is not a custom component prop. You can do that with `transient` option. This is useful if you want a pass a variable only for styling purposes to variant.

```typescript
import { w, W } from 'windstitch';

const CustomComponent: React.FC<{
  className: string;
  active?: boolean;
}> = props => <p {...props}>{props.active ? "I'm active" : "I'm inactive"}</p>;

const StyledComponent = w(CustomComponent, {
  variants: {
    active: (yes: boolean) => (yes ? 'text-indigo-500' : 'text-white'),
  },
  transient: ['active'],
});

<StyledComponent active={true} />;
// Renders <p class="text-indigo-500">I'm inactive</p>
```

If `transient` options is not set, the variant will be passed to the component as a prop, sometimes resulting in an HTML error.

```typescript
import { w, W } from 'windstitch';

const CustomComponent: React.FC<{
  className: string;
  active?: boolean;
}> = props => <p {...props}>{props.active ? "I'm active" : "I'm inactive"}</p>;

const StyledComponent = w(CustomComponent, {
  variants: {
    active: (yes: boolean) => (yes ? 'text-indigo-500' : 'text-white'),
  },
});

<StyledComponent active={true} />;
// Renders <p class="text-indigo-500">I'm active</p>,
// but gives a warning: "Received `true` for a non-boolean attribute `active`" in the console
```
