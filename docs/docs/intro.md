---
sidebar_position: 1
---

# Introduction

<img src="/img/banner.jpg" style={{ marginBottom: '24px' }} />

Windstitch is a **1.2kb**, Simple Styling Library that helps you set **when** a className should be applied to a component.

By providing Powerful Types through forward declarations, Windstitch aims to be simple yet powerful by limiting itself to be a organizer API, letting Tailwind handle the styling part.

---

## Performance

### Zero Runtime

Windstitch is purely a `className` joiner function attached to a component. You do not need to add any Provider, Context or anything at all. Just install it and start using.

## Key Features

### Variants

[Stitches](https://stitches.dev/docs/introduction#variants) introduces variants as a first-class citizen, so you can design composable component APIs. Windstitch drinks from that to use the `variants` pattern as the form of declaring your styles.

### Theming

[Theming is handled entirely by Tailwind](https://tailwindcss.com/docs/theme). Nothing different here

### Utils

Windstitch offers you 2 way of declaring variants. You can either use a [`Record` or a `Function`](/docs/add-variants). So you can easily use create any utils that you want.

```typescript
const textSize = {
  small: 'text-sm',
  large: 'text-lg',
} as const;

const isVisuallyEven = (value: boolean) =>
  value ? 'bg-gray-100 dark:bg-gray-900' : 'bg-gray-200 dark:bg-gray-800';

const Td = w.td('px-2 py-2', {
  variants: {
    textSize,
    isVisuallyEven,
  },
});
```

### Responsive Variants

[Tailwind rocks when the subject is Responsiveness](https://tailwindcss.com/docs/responsive-design). Just use it as you wish:

```jsx
const Button = w.button('px-2 py-2 w-full lg:text-lg xl:w-auto');
```

### Developer Experience

#### Powerfull Types

```typescript
const Button = w.button('text-sm', {
  variants: {
    color: { red: '', blue: '' },
    size: { small: '', large: '' },
  },
  defaultVariants: {
    size: 'small',
  },
});
type ButtonProps = W.infer<typeof Button>;
```

`ButtonProps` have all native `button` props with `{ color: 'red' | 'blue', size?: 'small' | 'large' }`. You can set the `as` to set which component should be rendered. It also changes the expected prop types

```typescript
<Button as="a" href="" />
// Now ButtonProps have all native `a` props merged the variants props.
// So passing `href` is now accepted
// And all callbacks now an anchor is expected
```

#### Simple API

```typescript
w('a', { className: 'text-sm', variants: { ... } })
w(Component, { className: '...', variants: { ... } })
w.a('text-sm', { variants: { ... } })
w.a('text-sm')
```

---

## Credits

Stitch has just be borned. It was created by me, [Vinicius Pacheco](https://vinpac.io/). I go by [vinpac on GitHub](https://github.com/vinpac).
