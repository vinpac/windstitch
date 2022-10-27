---
sidebar_position: 5
---

# Reusing styles

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
