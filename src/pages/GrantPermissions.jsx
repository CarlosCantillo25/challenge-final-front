import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import userActions from "../redux/actions/userActions"
import { api, apiUrl, endpoints } from '../utils/api';

function GrantPermissions() {
  const dispatch = useDispatch();
  const { read_users, update_user } = userActions;
  const users = useSelector((store) => store.user.users);

  const [selectedUserId, setSelectedUserId] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    dispatch(read_users());
  }, [dispatch]);

  const handleUserSelect = (userId) => {
    setSelectedUserId(userId);
    const selectedUser = users.find((user) => user._id === userId);
    setIsAdmin(selectedUser.role === 2);
  };

  const handleAdminToggle = async () => {
    try {
      const updatedUser = { ...users.find((user) => user._id === selectedUserId), role: isAdmin ? 0 : 2 };

      const response = await api.put(apiUrl + endpoints.adminUp, updatedUser );
      console.log(response)

      dispatch(update_user(response.data));
      setIsAdmin(!isAdmin);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Manage Users</h2>
      <div>
        <h3>Users:</h3>
        <ul>
            {users && users.map((user) => (
              <li key={user._id} onClick={() => handleUserSelect(user._id)} style={{ backgroundColor: user._id === selectedUserId ? 'lightgray' : 'white' }} >
                <div className='bg-black m-2'>
                  {user.email} (Role: {user.role === 2 ? 'Admin' : 'User'})
                </div>
              </li>
            ))}
        </ul>
      </div>
      {selectedUserId && (
        <div>
          <h3>Selected User:</h3>
          <p>{users.find((user) => user._id === selectedUserId).email}</p>
          <p>Role: {isAdmin ? 'Admin' : 'User'}</p>
          <button onClick={handleAdminToggle}>
            {isAdmin ? 'Revoke Admin' : 'Grant Admin'}
          </button>
        </div>
      )}
    </div>
  );
}

export default GrantPermissions;
