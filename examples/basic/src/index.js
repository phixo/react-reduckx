import React from 'react';
import ReactDOM from 'react-dom';

import { ReduxProvider } from './helpers/store';
import UsersContainer from './containers/users';

function App() {
    return (
        <ReduxProvider>
            <UsersContainer />
        </ReduxProvider>
    );
}

ReactDOM.render(<App />, document.getElementById('root'));
