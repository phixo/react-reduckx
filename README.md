# react-reduckx &middot; [![Build Status](https://travis-ci.org/phixo/react-reduckx.svg?branch=master)](https://travis-ci.org/phixo/react-reduckx) [![codecov](https://codecov.io/gh/phixo/react-reduckx/branch/master/graph/badge.svg)](https://codecov.io/gh/phixo/react-reduckx) [![david-dm](https://david-dm.org/phixo/react-reduckx.svg)](https://david-dm.org/phixo/react-reduckx)

🦆 A lightweight and powerful Redux kit to easily manage state in React applications 🦆

[Usage](#usage) |
[API](#api) |
[Installation](#installation) |
[License](#license)

## Usage

### Store

```js
// store.js
import { combineReducers, createStore } from 'react-reduckx';

import profileReducer from '../ducks/profile/reducers';
import usersReducer from '../ducks/users/reducers';

// Combine multiple reducers with their own state branch
const rootReducer = combineReducers({
    profile: profileReducer,
    users: usersReducer,
});

// Hydrate persisted data or data received from the server
const initialState = {};

// Expose Redux provider and useRedux hook
export const { ReduxProvider, useRedux } = createStore(
    rootReducer,
    initialState
);
```

### App

```js
// app.js
import React from 'react';
import ReactDOM from 'react-dom';

import { ReduxProvider } from './store';

import ProfileContainer from './containers/Profile';
import UsersContainer from './containers/Users';

// Create the app by wrapping your components with the Redux provider.
// By doing this all children will have access to the Redux state context.
function App() {
    return (
        <ReduxProvider>
            <ProfileContainer />
            <UsersContainer />
        </ReduxProvider>
    );
}

ReactDOM.render(<App />, document.getElementById('root'));
```

### _TODO_: Set up your ducks 🦆

## API

## Installation

With [npm](https://npmjs.org/) installed, run

```

\$ npm install react-reduckx

```

Or with [yarn](https://yarnpkg.com/) installed, run

```

\$ yarn add react-reduckx

```

## Peer dependencies

This library uses the following peer dependencies, which will probably already
be included in your project while it's using React

-   [prop-types](https://github.com/facebook/prop-types): 15.7.2
-   [react](https://github.com/facebook/react): 16.8.3
-   [react-dom](https://github.com/facebook/react/tree/master/packages/react-dom): 16.8.3

## License

The `react-reduckx` package is distributed under the MIT License.
Check the [LICENSE](LICENSE) file for details.

```

```
