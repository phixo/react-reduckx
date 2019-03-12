# react-reduckx

[![Build Status](https://travis-ci.org/phixo/react-reduckx.svg?branch=master)](https://travis-ci.org/phixo/react-reduckx) [![codecov](https://codecov.io/gh/phixo/react-reduckx/branch/master/graph/badge.svg)](https://codecov.io/gh/phixo/react-reduckx) [![david-dm](https://david-dm.org/phixo/react-reduckx.svg)](https://david-dm.org/phixo/react-reduckx) [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT) [![Greenkeeper badge](https://badges.greenkeeper.io/phixo/react-reduckx.svg)](https://greenkeeper.io/) [![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

[![NPM](https://nodei.co/npm/react-reduckx.png)](https://nodei.co/npm/react-reduckx/)

🦆 A lightweight and powerful Redux kit to easily manage state in React applications 🦆

[Installation](#installation) |
[Background](#background) |
[Usage](#usage) |
[License](#license)

## Installation

With [npm](https://npmjs.org/) installed, run

```

\$ npm install react-reduckx

```

Or with [yarn](https://yarnpkg.com/) installed, run

```

\$ yarn add react-reduckx

```

### Peer dependencies

This library uses the following peer dependencies, which will probably already
be included in your project while it's using React

-   [prop-types](https://github.com/facebook/prop-types): 15.7.2
-   [react](https://github.com/facebook/react): 16.8.3
-   [react-dom](https://github.com/facebook/react/tree/master/packages/react-dom): 16.8.3

To create state selectors, add [reselect](https://github.com/reduxjs/reselect) to your project. It comes with state memoization out of the box.

## Background

While developing large-scale React applications, state-management can become messy and hard to follow where it flows. Whilst there are many good solutions like: [redux](https://github.com/reduxjs/redux), [react-redux](https://github.com/reduxjs/react-redux) combined with middlewares like [redux-thunk](https://github.com/reduxjs/redux-thunk) and [redux-logger](https://github.com/LogRocket/redux-logger) and so on, your project can become quite large in bundle-size and leaning too much on 3rd party dependencies.
With `react-reduckx` you get the nescessary bits of these dependencies in one small single toolkit!

## Usage

### Store

Start by creating a store file in your project. The store initially needs to be feeded with reducer methods and the initial state of the application.
Be sure to export the `ReduxProvider` and the `useRedux`-[hook](https://reactjs.org/docs/hooks-intro.html) that the store creates.

Note: For the sake of showing that one can combine reducers, the store file below shows how to combine `profile` and `users` into a single reducer. We continue the example with only using `users`.

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

### Setting up your ducks 🦆

Ducks are your actors of choice in `react-reduckx`. Let's say, we have an `users` state branch and we want to fire an action related to `users` in our app and reduce the state when it resolves (or not). As a result we also want to use these state changes in our React components, by using `selectors`.
Toss in a `users` folder and create the following files:

```
src
└─── ducks
     └─── users
          │  action-types.js
          │  actions.js
          │  reducers.js
          │  selectors.js
```

#### Example ducks

```js
// action-types.js
const PREFIX = 'USERS';

const FETCH_USERS = `${PREFIX}/FETCH_USERS`;

export { FETCH_USERS };
```

```js
// actions.js
import { asyncAction } from 'react-reduckx';
import { FETCH_USERS } from './action-types';

// Create an async action to fetch users
const fetchUsers = asyncAction(FETCH_USERS, req =>
    req.get('https://jsonplaceholder.typicode.com/users')
);

export { fetchUsers };
```

```js
// reducers.js
import { asyncActionReducer, createReducer } from 'react-reduckx';
import { FETCH_USERS } from './action-types';

const initialState = {
    isPending: 0,
    items: [],
};

// Define our 'user' state reducer methods, based on action-type.
// asyncActionReducer will create async action-types:
// FETCH_USERS_PENDING, FETCH_USERS_SUCCESS, FETCH_USERS_FAIL
// One can add (sub) reducers with: onPending, onSuccess, onFail
const actionsMap = {
    ...asyncActionReducer(FETCH_USERS, {
        onSuccess: (state, { payload }) => ({
            items: payload,
        }),
    }),
};

export default createReducer(initialState, actionsMap);
```

To make selectors work, we only need a tiny library called [reselect](https://github.com/reduxjs/reselect).

```js
// selectors.js
import { createSelector } from 'reselect';

const branchSelector = state => state.users;

const userListSelector = createSelector(
    branchSelector,
    state => state && state.items
);

export { userListSelector };
```

### UserList

```js
// UsersList.js
// Just output the fetched data from a Higher Order Component (container).
import React from 'react';

function UserList({ data }) {
    return <pre>{JSON.stringify(data, null, 2)}</pre>;
}

export default UserList;
```

### UsersContainer

```js
// UsersContainer.js
import React, { useEffect } from 'react';
import { useRedux } from '../../helpers/store';

import * as UsersActions from '../../ducks/users/actions';
import * as UsersSelectors from '../../ducks/users/selectors';

import UserList from '../../components/UserList';

// Define what we need from our state.
const mapState = state => ({
    userList: UsersSelectors.userListSelector(state),
});

// Describe the actions we want to use
const mapActions = {
    fetchUsers: UsersActions.fetchUsers,
};

export default () => {
    // Use the useRedux hook to map the state props and actions
    const [{ userList }, { fetchUsers }] = useRedux(mapState, mapActions);

    // Fetch the users async
    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <>
            <UserList data={userList} />
        </>
    );
};
```

### App

Once all is setup, we're good to go and can launch our application!
For this we need the `ReduxProdiver` we exposed from our store, wrap the app's children with it so these will have access to the Redux state context by using the `useRedux`-hook.

```js
// app.js
import React from 'react';
import ReactDOM from 'react-dom';

import { ReduxProvider } from './store';

import UsersContainer from './containers/Users';

// Create the app by wrapping your components with the Redux provider.
// By doing this all children will have access to the Redux state context.
function App() {
    return (
        <ReduxProvider>
            <UsersContainer />
        </ReduxProvider>
    );
}

ReactDOM.render(<App />, document.getElementById('root'));
```

## License

The `react-reduckx` package is distributed under the MIT License.
Check the [LICENSE](LICENSE) file for details.
