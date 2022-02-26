# @ryanke/typescript-template

A simple template I use for new projects.

# included

- [swc](https://github.com/swc-project/swc) for stupidly fast `pnpm test` and `pnpm watch` with support for decorator metadata.
- [tsup](https://github.com/egoist/tsup) for stupidly fast `pnpm build`
  - tsup doesn't support decorator metadata.
- [eslint](https://eslint.org/) and [prettier](https://prettier.io/) (via [eslint-plugin-prettier](https://github.com/prettier/eslint-plugin-prettier)) for linting and formatting files

# todo

- Replace `tsup` with a tool that uses `swc` because `esbuild` that `tsup` uses doesn't support decorator metadata.
  - Currently `tsup` is my go-to because it's convenient and generates `.d.ts` files.
  - To use `swc`, we would have to find a `tsup`-like tool and that is easier said then done. 