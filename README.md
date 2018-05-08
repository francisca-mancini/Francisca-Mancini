# Francisca-Mancini
New shopify Website with DVTK.

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

## Storefront API
We're using Shopify's storefront API to get/send data to the shop, using GraphQL and Apollo.

- [Storefront API](https://help.shopify.com/api/custom-storefronts/storefront-api/reference)
- [GraphQL](http://graphql.org/learn/)
- [Apollo](https://www.apollographql.com/docs/)

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

See `./tailwind-config.js` for the project's styleguide or check [the documentation](https://tailwindcss.com/docs).

## Contact
hello.bonhomme@gmail.com
