# Francisca-Mancini
New shopify Website with DVTK.
<br />
<br />

## Next.js
We're using Next.js to get a full server-side rendered app.
See the config file at `./next.config.js` or check [the documentation](https://nextjs.org/docs).

#### Installation
`$ yarn`

#### Run dev server
`$ yarn dev`

#### Build for production
`$ yarn build`

#### Run production server
`$ yarn start`
<br />
<br />

## Storefront API
We're using Shopify's storefront API to get/send data to the shop, using GraphQL and Apollo.

- [Storefront API](https://help.shopify.com/api/custom-storefronts/storefront-api/reference)
- [GraphQL](http://graphql.org/learn/)
- [Apollo](https://www.apollographql.com/docs/)
<br />
<br />

## Tailwind.css
We're using Tailwind style system here to help us reduce the final stylesheet. Use it with CSSModules to compose existing classNames.

Example:
```css
.element {
  composes:
    global(text-black) /* color: black; */
    global(bg-white) /* background-color: white; */
    global(p-2) /* padding: 20px; */
  ;
}
```

See `./tailwind.config.js` for the project's styleguide or check [the documentation](https://tailwindcss.com/docs).
<br />
<br />

## Component structure
We're dividing components in 3 category:

### Atoms
Single UI elements, like `<Heading />` that would display titles or `<Spacing />` that would manage spacings.

### Molecules
Complex components that are made of multiple **Atoms**.

### Organisms
Components that fetch **data** and are made of **Atoms** and **Molecules**, they are mostly page specific but can be re-used across the app.
<br />
<br />

## Storybook
Everytime we build a new **Atom** or **Molecule** (not needed for Organisms) we create a story for that component. It makes it easier to keep track of each component and its props.

In the same component's folder just add a `ComponentName.stories.js`.

See [storybook documentation](https://storybook.js.org/basics/introduction/)
<br />
<br />

## Contact
hello.bonhomme@gmail.com
