import React, { useEffect } from 'react';
import { useRedux } from '../../helpers/store';

import * as UsersActions from '../../ducks/users/actions';
import * as UsersSelectors from '../../ducks/users/selectors';

import UserList from '../../components/users/UserList';

const mapState = state => ({
    userList: UsersSelectors.userListSelector(state),
});

const mapActions = {
    fetchUsers: UsersActions.fetchUsers,
};

export default () => {
    const [{ userList }, { fetchUsers }] = useRedux(mapState, mapActions);

    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <>
            <h1>Users</h1>
            <UserList data={userList} />
        </>
    );
};
