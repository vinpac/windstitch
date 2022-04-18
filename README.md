![Windstitch](https://github.com/vinpac/windstitch/blob/main/docs/static/img/banner.jpg?raw=true)

# Windstitch

Windstitch is a **1.2kB**, Simple Styling Library that helps you set **when** a className should be applied to a component.

By providing Powerful Types through forward declarations, Windstitch aims to be simple yet powerful by limiting itself to be a organizer API, letting Tailwind handle the styling part.

![Usage](https://github.com/vinpac/windstitch/blob/main/docs/static/img/example.gif?raw=true)

# Install

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
  defaultVariants: {
    size: 'small',
  },
});
type ButtonProps = W.infer<typeof Button>;
// { color: 'red' | 'blue', size?: 'small' | 'large' }
```
