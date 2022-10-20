---
sidebar_position: 5
---

# Map Variants

To map variants is to map a variant's value to other variants, giving them a default value.

See the following example:

```typescript
import { w, W } from 'windstitch';

const Text = w.p(``, {
  variants: {
    size: {
      base: 'text-base',
      xl: 'text-8xl',
    },
    weight: {
      normal: 'font-normal',
      bold: 'font-bold',
    },
    theme: {
      h1: '',
      base: '',
    },
  },
  defaultVariants: {
    variant: 'base',
    weight: 'normal',
    size: 'base',
  },
  mapVariants: {
    theme: {
      h1: {
        size: 'xl',
        weight: 'bold',
      },
      base: {
        size: 'base',
        weight: 'normal',
      },
    },
  },
});

// <Text theme="h1" /> class="font-bold text-8xl"
// <Text theme="base" /> class="text-8xl font-base"
// <Text theme="h1" weight="normal" /> class="font-normal text-8xl"
// <Text theme="h1" size="base" /> class="text-base font-bold"
```

On the above example, we make the `theme` variant select other variants values when they are not set.
