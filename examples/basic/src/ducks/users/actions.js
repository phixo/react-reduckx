import axios from 'axios';
import { createAsyncAction } from 'react-reduckx';

import { FETCH_USERS } from './action-types';

const fetchUsers = createAsyncAction(FETCH_USERS, () =>
    axios.get('https://jsonplaceholder.typicode.com/users')
);

export { fetchUsers };
