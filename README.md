# Budget Tracker App

This is a [Capacitor](https://capacitorjs.com) app that allows you to track a personal budget that changes over time.

## Tech Stack

- [React](https://reactjs.org): Frontend Framework
  - React is a framework for building stateful web applications using TypeScript
  - Instead of writing HTML, CSS and JavaScript, you write React components that describe the UI, the state of the application and the logic that determines how the UI should change in response to state changes.
  - With Tailwind CSS you can then also write CSS that styles the components.
- [TypeScript](https://www.typescriptlang.org): Type-safe JavaScript
  - TypeScript is a superset of JavaScript that adds optional static typing to the language.
  - It allows you to write more robust and maintainable code by catching errors at compile time.
  - TypeScript only exists at development time and is transpiled to JavaScript at build time.
- [Tailwind CSS](https://tailwindcss.com): Utility-first CSS framework
  - Tailwind CSS adds a lot of small CSS classes to your application that you can use to style your components.
  - For example if you want to change the background color of a button, you can just add the class `bg-red-500` to the button to make it red.
  - This removes the need to write CSS for every button in your application.
- [Capacitor](https://capacitorjs.com): Cross-platform app development framework:
  - Capacitor is a framework that allows you to build cross-platform mobile apps using web technologies.
  - It provides a set of APIs that allow you to access device features such as the camera, the file system, the network, and more.
  - With Capacitor, you can build your app once and deploy it to multiple platforms, including iOS, Android, and the web.
  - It basically wraps any webapp into a browser.

## Development

### Prerequisites

- [Node.js](https://nodejs.org):
  - Node.js is a JavaScript runtime that allows you to run JavaScript code outside of a web browser.
  - It is used to run the application server and build the application.
  - It is recommended to use [NVM](https://github.com/nvm-sh/nvm) so you can install different versions of Node.js and switch between them easily.
  - But `Node.js 20` also works. 
- [Android Studio](https://developer.android.com/studio):
  - To build the Android app, you need to install Android Studio.
  - It also includes the Android SDK, which includes the Android platform tools and the Android emulator.

### Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/webertim/budget-tracker.git
   ```
