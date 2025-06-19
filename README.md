# Vandolie

Digital controversy mapping for high school students.

## Credentials

Created by Mathieu Jacomy, Matilde Ficozzi, Cathrine Hofmann Fried and Jesper Wad Larsen

Funded by [IT-Vest](https://www.it-vest.dk/)

This website is developed using [Astro](https://astro.build/).

## Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

## Cookbook

### How can I translate this application in another language?

The translations map are non-nested collections of strings, functions (to allow parameters) or React components (to allow customizing HTML in translations). They are all in the [`src/core/translations`](./src/core/translations) directory.

To translate the platform to another language, you must:

1. Translate one of the existing translations file in the `translations` directory to the language you want
2. Update all other translation files, to add translation for the new `"lang-XXX"` key, with `XXX` the new language code (this new key is used for the related "switch to language" header button)
3. Open [`src/core/translation.tsx`](./src/core/translation.tsx), and add you language codes to the `LANGUAGE_CODES`, `langToLocale` and `langToJSLocale` variables
4. Add an Astro redirection rule similar to the other ones in [`astro.config.mjs`](./astro.config.mjs) (because of [this bug 😢](https://github.com/withastro/astro/issues/12036))

### How can I update the list of all available sample datasets?

The sample datasets are all stored in the [`public/data`](./public/data) directory. They must all be CSV files, with three columns `"title"`, `"text"` and `"category"`, and **in that order** (the name of the columns actually don't matter that much, but the order does).

To add some additional CSV sample dataset, you must:

1. Add your CSV file in the `public/data` directory
2. Open [`src/core/consts.ts`](./src/core/consts.ts), and add your file name and a descriptive title to the `SAMPLES` variables

### How can I add some static contents?

The whole `src/components` and `src/core` source directories are almost exclusively dedicated to the interactive application part of this website. The static pages are fully handled with [Astro](https://astro.build/), and are all in the [`src/pages`](./src/pages) directory.

Also, `.astro` files are mainly HTML files, but with some additional capabilities (with JavaScript) to allow including some fragments from other files, handle translations, etc...
