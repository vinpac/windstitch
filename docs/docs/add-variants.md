---
sidebar_position: 4
---

# Add Variants

Variants are fields that create different versions of your component. Use them to power you components.

<img src="/img/example.gif" style={{ marginBottom: '24px' }} />

## Record Variants

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
type ButtonProps = W.infer<typeof Button>;
// ButtonProps['color'] is 'gray' | 'red'
```

## Function Variants

For complex values, use a function style it. The prop type is inferred from the first argument type. Always remember to set it.

```typescript
import { w, W } from 'windstitch';

const Checkbox = w.input('bg-white', {
  variants: {
    checked: (yes: boolean) => (yes ? 'bg-indigo-500' : 'bg-white'),
  },
});
type CheckboxProps = W.infer<typeof Checkbox>;
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
type CheckboxProps = W.infer<typeof Checkbox>;
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

## Reusing styles

As prop types are inferred by your variants shape, you can easily reuse styles across components.

### Record

```typescript
const textSize = {
  small: 'text-sm',
  large: 'text-lg',
} as const;

const Td = w.td('px-2 py-2', {
  variants: {
    textSize,
  },
});

const Th = w.th('', {
  variants: {
    textSize,
  },
});

// `textSize` is a required 'small' | 'large' prop on both components
// <Td textSize="large" />
// <Th textSize="small" />
```

### Function

The same goes for functions:

```typescript
const isVisuallyEven = (value: boolean) =>
  value ? 'bg-gray-100 dark:bg-gray-900' : 'bg-gray-200 dark:bg-gray-800';

const Td = w.td('px-2 py-2', {
  variants: {
    isVisuallyEven,
  },
});

const Th = w.th('', {
  variants: {
    isVisuallyEven,
  },
});

// `isVisuallyEven` is a required boolean prop on both components
// <Td isVisuallyEven={false} />
// <Th isVisuallyEven={true} />
```
