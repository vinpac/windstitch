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

## Default Props make Optional Variants

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
  defaultProps: {
    color: 'gray',
    checked: false,
  },
});
type CheckboxProps = W.infer<typeof Checkbox>;
// CheckboxProps['checked'] is boolean | undefined
// CheckboxProps['color'] is 'gray' | 'red' | undefined
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
