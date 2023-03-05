# U-Fret Browser Extension

<div align="center">
  <br>
 <img src="https://raw.githubusercontent.com/MakotoUwaya/ufret-chrome-extension/main/public/images/icon128.png" alt="U-Fret Browser Extension" width="128">
  <br>
  <h2>
    U-Fret Browser Extension <br>
    React & TypeScript
    <br>
  </h2>
</div>

<p align="center">A cross-platform (Chrome, Firefox, Edge, Opera, Brave) web browser extension. </p>
<hr />

<p align="center">
  <a href="#features">Features</a> ·
  <a href="#browser-support">Browser Support</a> ·
  <a href="#quick-start">Quick Start</a>
</p>

## Features

- Remove Ad at each pages(as much as possible).
- Select original key on a page of scores.
- Scrolls automatically when you open a page of scores.

## Browser Support

| [![Chrome](https://raw.github.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png)](/) | [![Firefox](https://raw.github.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png)](/) | [![Edge](https://raw.github.com/alrra/browser-logos/master/src/edge/edge_48x48.png)](/) | [![Opera](https://raw.github.com/alrra/browser-logos/master/src/opera/opera_48x48.png)](/) | [![Brave](https://raw.github.com/alrra/browser-logos/master/src/brave/brave_48x48.png)](/) |
| --------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------ |
| ✔                                                                                             | ✔ (Beta)                                                                                         | ✔                                                                                       | ✔                                                                                          | ✔                                                                                          |

## Quick Start

Ensure you have

- [Node.js](https://nodejs.org) v14 or later installed
  - Recommended v18.12.1
- [Yarn](https://yarnpkg.com) installed
  - Recommended v1.22.19

Then run the following:

- `yarn install` to install dependencies.
- `yarn dev` to start the development server.
- `yarn build` to build an unpacked extension.

- **Load extension in Chrome (Chromium)**

  - Go to the browser address bar and type `chrome://extensions`
  - Check the `Developer Mode` button to enable it.
  - Click on the `Load Unpacked Extension` button.
  - Select your `dist` folder in the project root.

- **Load extension in Firefox**

  - Go to the browser address bar and type `about://debugger`
  - Click on the `Load Temporary Add-on` button.
  - Select your `dist_firefox` folder in the project root.

### Available Commands

- `yarn clean` to remove dist folder. `dev` and `build` commands call this command.
- `yarn ci:test` to run lint & unit test & type checking in ci environment. `ci:test:lint`, `ci:test:style`, `ci:test:unit` commands also available.
- `yarn format` to fix code with eslint, prettier.
- `yarn lint` to call ESLint, Prettier.
- `yarn test` for testing.
