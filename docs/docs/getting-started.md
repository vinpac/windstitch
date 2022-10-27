---
sidebar_position: 2
---

import Button from './installation-example.tsx'

# Getting started

Windstitch is a **1.4kB**, Simple Styling Library that helps you set **when** a className should be applied to a component.

By providing Powerful Types through forward declarations, Windstitch aims to be simple yet powerful by limiting itself to be a organizer API, letting Tailwind handle the styling part.

> Although **there's no connection between this lib and [TailwindCSS](https://tailwindcss.com/docs/installation)**, I HIGHLY recommend [installing and using it](<(https://tailwindcss.com/docs/installation)>) with this windstitch.

## Instalation

Install Windstitch from your terminal via npm or yarn.

```bash
# With npm
npm install windstitch

# With yarn
yarn add windstitch
```

## How to use it

Import `w` from `windstitch`.

```js
import { w } from 'windstitch';
// same as import { styled } from 'windstitch';
```

If you want to use `windstitch` power but for string classNames, just import wx.

```typescript
import { wx } from 'windstitch';
```
