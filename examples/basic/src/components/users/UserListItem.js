import React from 'react';

function UserListItem({ user }) {
    return (
        <tr>
            <td>{user.id}</td>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>{user.phone}</td>
        </tr>
    );
}

export default UserListItem;
