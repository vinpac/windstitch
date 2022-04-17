---
sidebar_position: 2
---

import Button from './installation-example.tsx'

# Install Stichwind

Install Stichwind from your terminal via npm or yarn.

```bash
# With npm
npm install stichwind

# With yarn
yarn add stichwind
```

### Import it

Import `styled` from `stichwind`.

```js
import { styled } from 'stichwind';
```

You can also import `w`, which works as an alias for `styled`

```typescript
import { w } from 'stichwind';
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
    defaultProps: {
      size: 'base',
      color: 'gray',
    },
  }
);
```

### Adding `displayName`

You can manually set a `displayName` to your component or use the `group` function to create multiple components with automatic `displayName`.

```jsx
const Button = w.button('text-md')
Button.displayName = 'Button'
// or
const s = group({ Button: w.button('text-md') })
<s.Button />
```

Refer to the [API page](/docs/api) to learn more about each of them.
