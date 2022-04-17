# Stichwind

Stitchwind is a **1.2kB**, Simple Styling Library that helps you set **when** a className should be applied to a component.

By providing Powerful Types through forward declarations, Stichwind aims to be simple yet powerful by limiting itself to be a organizer API, letting Tailwind handle the styling part.

# Install

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

const Button = w.button('text-sm', {
  variants: {
    color: {
      red: 'text-red-500',
      blue: 'text-blue-500',
    },
    size: {
      small: 'text-sm',
      large: 'text-lg',
    },
  },
  defaultProps: {
    size: 'small',
  },
});
type ButtonProps = W.infer<typeof Button>;
// { color: 'red' | 'blue', size?: 'small' | 'large' }
```
