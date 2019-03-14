import React from 'react';

import UserListItem from './UserListItem';

function UserList({ data }) {
    return (
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                </tr>
            </thead>
            <tbody>
                {data.map(user => (
                    <UserListItem key={user.id} user={user} />
                ))}
            </tbody>
        </table>
    );
}

export default UserList;
