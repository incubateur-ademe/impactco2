# Deploy react package

In the `getEquivalentIcon` method, you have to make sure that the `https://impactco2.fr` base path is hardcoded. Because the `process.env.NEXT_PUBLIC_URL` is read at runtime it can cause interferences (one day it would be nice to fix this)

Then run `pnpm webpack` to build the package inside the `/npm/react` directory. If you want to test it you can copy the content of the directory and put it in the other `node_modules` directory.

You have to bump the version in the `/npm/react/package.json`, depending on what modification you made.

Finally you can publish the package (2FA must be enabled) :

```
cd npm/react
npm publish
```
