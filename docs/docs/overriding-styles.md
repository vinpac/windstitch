---
sidebar_position: 6
---

# Overriding Styles

In a ideal world our design system supports every single case without going off rails. But, in the real world, we need to go off of it sometimes. Either for a specific and unique case or for better maintainability reasons.

## Overrinding a Style

Let's consider this case:

> I have a Button with strict colors. For a specific page, I want to set its color to a custom value. It's for a campaign

You might think, why not just set a new `bg` className?

```typescript
const Button = w.button('bg-gray-500')
<Button className="bg-gray-200">
// renders to <button className="bg-gray-500 bg-gray-200">
```

As classnames ignore the attribute order, just passing a new classname to a component won't work. There's no way to know on this case which style will be applied. It will depend on the output css.

### Use the Important Modifier

You can make any utility important by adding a ! character to the beginning:

```typescript
const Button = w.button('bg-gray-500')
<Button className="!bg-gray-200">
// renders to <button className="bg-gray-500 !bg-gray-200">
// bg-gray-200 is guaranteed to be applied
```

Refer to the [Important Modifier on TailwindCSS Docs](https://tailwindcss.com/docs/configuration#important-modifier).

## 🚧 Overriding a Variant 🚧

:::caution

THIS IS IN BETA TEST and will soon be added.

Let's say you have a `Button` component which has a `color` variant that accepts both `"gray"` or `"red"` colors. Now, on `ButtonV2` you want to:

- Render the old Button
- Remove red color
- Change gray color

To do that you can simply override a variant.

```typescript
const color =  as const
const Button = w.button('bg-gray-500', {
  variants: {
    color: {
      gray: 'bg-gray-500',
      red: 'bg-red-500',
    }
  }
})

// Adds a new variant
const ButtonV2 = w(Button, {
  variants: {
    color: {
      // red is removed since is not declared here
      gray: 'bg-gray-600', // this will overide
      blue: 'bg-blue-500' // this will be added
      // if you want to copy a previous style, you will need to import it
      // from the previous component
      // const color = { gray: 'bg-gray-500' }
      // gray: `${color.gray} new-styles`
    }
  }
})

// Adds a new style
<Button color="gray" /> // <button class="bg-gray-500" >
<ButtonV2 color="gray" /> // <button class="bg-gray-600" >
<Button color="red" /> // <button class="bg-red-500" >
<ButtonV2 color="red" /> // Error: `color` should be either `blue` or `gray`
<ButtonV2 color="blue" /> // <button class="bg-blue-500" >
```
