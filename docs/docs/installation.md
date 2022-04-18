---
sidebar_position: 2
---

import Button from './installation-example.tsx'

# Install Windstitch

Install Windstitch from your terminal via npm or yarn.

```bash
# With npm
npm install windstitch

# With yarn
yarn add windstitch
```

### Import it

Import `styled` from `windstitch`.

```js
import { styled } from 'windstitch';
```

You can also import `w`, which works as an alias for `styled`

```typescript
import { w } from 'windstitch';
```

### Use it

Use the `w` function to create a component and add styles to it.

```jsx line=3-11
import { w } from '@wind/react';

export const Button = w.button(`
  text-center font-medium ring-opacity-30
  hover:shadow-outline focus:outline-none focus:ring-4
`);
```

### Render it

Finally, render the component.

:::tip

☝️ Try Switching the Website's Theme to see how the component behaves.

:::

<Preview>
  <Button />
</Preview>

```jsx line=5
const Button = w.button(
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
      color: 'gray',
    },
  }
);
```

### Adding `displayName`

Now, it's recommended to manually set a `displayName` to your component.

```jsx
const Button = w.button('text-md');
Button.displayName = 'Button';
```
