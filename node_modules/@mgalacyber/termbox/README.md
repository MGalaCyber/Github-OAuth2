# TERMINAL BOX

> Customize your console output, highlight important information, and organize content within neatly framed boxes.


## Installation
npm:
```bash
$ npm install @mgalacyber/termbox
```
yarn:
```bash
$ yarn add @mgalacyber/termbox
```

## Simple to Use
## CommonJs (CJS) syntax
```js
const termBox = require("@mgalacyber/termbox");
```
## ECMAScript Modules (ESM) syntax
```ts
import termBox from "@mgalacyber/termbox";
```

## Example
```js
let Head = "Lorem Ipsum";
let Body = "Lorem ipsum dolor sit amet.";
let Footer = "Lorem ipsum dolor sit amet.";

termBox([Head, Body, Footer]);
```