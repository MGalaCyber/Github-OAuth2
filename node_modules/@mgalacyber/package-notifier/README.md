<div align="center">
  <a href="https://www.npmjs.com/package/@mgalacyber/package-notifier">
    <img src="https://github.com/MGalaCyber/package-notifier/assets/87995243/0fa03c9f-97b4-4dac-8a93-4f6e1ab315ae"></img>
  </a>

[![https://nodei.co/npm/@mgalacyber/package-notifier.png?downloads=true&downloadRank=true&stars=true](https://nodei.co/npm/@mgalacyber/package-notifier.png?downloads=true&downloadRank=true&stars=true)](https://www.npmjs.com/package/@mgalacyber/package-notifier)
</div>

# PACKAGE NOTIFIER

**Package Notifier** is a simple utility that notifies users in the terminal when a package has been updated to a new version. Stay informed about the latest changes in your dependencies effortlessly.

## Features
- 🚀 Instantly receive notifications in the terminal about package updates.
- 📦 Keep track of changes in your dependencies to ensure you are always using the latest and greatest.
- 🔄 Easily integrate into your development workflow for seamless updates.

## Installation
npm:
```bash
$ npm install @mgalacyber/package-notifier
```
yarn:
```bash
$ yarn add @mgalacyber/package-notifier
```

## Simple to Use
## CommonJs (CJS) syntax
```js
const packageNotifier = require("@mgalacyber/package-notifier");
```
## ECMAScript Modules (ESM) syntax
```ts
import packageNotifier from "@mgalacyber/package-notifier";
```

## Example
```js
const packageFile = require("./package.json");

packageNotifier(packageFile);
```

## How It Works
**Package Notifier** compares the installed versions of your project's dependencies with the latest versions available on the npm registry. If updates are found, it provides clear and concise notifications in the terminal, making it easy for you to take action.
