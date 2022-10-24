---
sidebar_position: 5
---

# Compound Variants

To compound variants is define a custom class or custom defaults based on a selection of variants.

Look at the following example:

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
  compoundVariants: [
    {
      theme: 'h1',
      defaultTo: {
        size: 'xl',
        weight: 'bold',
      },
    },
    {
      theme: 'base',
      defaultTo: {
        size: 'base',
        weight: 'normal',
      },
    },
  ],
});

// Now we can use `theme` with no conflicts!
//
const Texts = <article>
  <Text theme="h1" /> {/* <p class="font-bold text-8xl" */}
  <Text theme="base" /> {/* <p class="text-8xl font-base"*/}
  <Text theme="h1" weight="normal" /> {/* <p class="font-normal text-8xl" */}
  <Text theme="h1" size="base" /> {/* <p class="text-base font-bold"*/}
</p>
```

## Usage

The compoundVariants map tells us what to select and what to apply. It takes a combination of variants keys and values and special `defaultTo` and `class` properties.

### Selection

Only 1 compound variant is selected at once. **One case will override other if it is matched by more variants**`

Example:

```typescript
const compoundVariant1 = { theme: 'h1', class: 'color-red' };
const compoundVariant2 = {
  theme: 'h1',
  color: 'yellow',
  class: 'color-yellow',
};
```

For props `{ theme: 'h1', color: 'yellow' }` the 2 will match, but only `compoundVariant2` will be applied as it matches more variants. `compoundVariant1` matches variant variant `theme` where `compoundVariant2` matches `theme` and `color`.

### **The `defaultTo` updates the defaultVariants**

For `{ defaultVariants: { weight: 'normal' } }` a compoundedVariant containing `{ defaultTo: { weight: 'bold' } }`, if matched, will override the `weight` default variant. This means that we can still set it, but the default is now updated for that custom selection.

### **The `class` appends classNames**

A compounded variant with `{ class: 'xyz' }` will add `xyz` to the evaluated classNames if matched.
