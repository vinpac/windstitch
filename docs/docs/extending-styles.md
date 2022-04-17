---
sidebar_position: 5
---

# Extending Styles

As TailwindCSS is a classname based library, you can just pass new styles to any component to extend it. Such as:

```typescript
const Button = w.button('bg-gray-500')

// Adds a new variant
const ButtonV2 = styled(Button, { variants: { margin: { small: 'mb-5'  } }})

// Adds a new style
<Button className="mb-5" />
```
