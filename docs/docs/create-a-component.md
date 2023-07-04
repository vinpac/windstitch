---
sidebar_position: 3
---

# Create a component

You can either create a component using a **tag** or using **another component**.

### Component

Use the `w` function to create a component and add styles to it.

```jsx line=3-11
import { w, W } from 'windstitch';

export const Button = w.button(
  `
  hover:shadow-outline text-center
  font-medium focus:outline-none
  focus:ring-4 ring-opacity-30
`,
  {
    variants: {
      color: {
        gray: `
          bg-gray-300
          hover:bg-gray-400
          dark:bg-gray-700
          dark:hover:bg-gray-600
          text-gray-900
          dark:text-white
          ring-gray-400
        `,
        violet: `
          bg-violet-500
          hover:bg-violet-400
          dark:bg-violet-700
          dark:hover:bg-violet-600
          text-white
          dark:text-white
          ring-violet-400
        `,
      },
      size: {
        xs: 'px-1.5 py-0.5 rounded text-xs',
        sm: 'px-2 py-1 rounded-md text-sm',
        base: 'px-3 py-2 rounded-md text-base',
        md: 'px-4 py-3 rounded-md text-lg',
        lg: 'px-5 py-4 rounded-lg text-lg',
        xl: 'px-6 py-5 rounded-lg text-xl',
      },
    },
    defaultVariants: {
      size: 'base',
    },
  }
);
export type ButtonProps = W.Infer<typeof Button>;
```

### Render it

Finally, render the component.

```typescript
<Button color="gray" />
```

:::tip

☝️ Try Switching the Website's Theme to see how the component behaves.

:::

<Preview>
  <Button />
</Preview>

### Adding `displayName`

It's recommended to manually set a `displayName` to your component.

```jsx
const Button = w.button('text-md');
Button.displayName = 'Button';
```

## Using a Tag name

```typescript
import { w, W } from 'windstitch';

const Button = w.button('default-class', {
  variants: {},
  defaultVariants: {},
  compoundVariants: [],
  defaultProps: {},
});

Button.displayName = 'Button';

export type ButtonProps = W.Infer<typeof Button>;
```

## Using a Custom Component

```typescript
import { w, W } from 'windstitch';

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
Checkbox.displayName = 'Checkbox';

export type CheckboxProps = W.Infer<typeof Checkbox>;
```
