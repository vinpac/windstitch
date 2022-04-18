---
sidebar_position: 3
---

# Create a Component

## Using a Tag name

```typescript
import { w } from 'windstitch';

const Button = w.button('bg-white');
```

## Using a Custom Component

```typescript
import { w } from 'windstitch';

const CustomComponent: React.FC<{ className: string }> = props => (
  <input {...props} type="checkbox" />
);

const Checkbox = w(CustomComponent, {
  className: 'rounded-full',
  variants: {
    checked: (yes: boolean) => (yes ? 'bg-indigo-500' : 'bg-white'),
  },
  defaultVariants: {
    // `checked` becomes optional
    checked: false,
  },
});
```
