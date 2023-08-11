import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import userActions from "../redux/actions/userActions"
import { api, apiUrl, endpoints } from '../utils/api';
import Swal from 'sweetalert2';

function GrantPermissions() {
  const dispatch = useDispatch();
  const { read_users, update_user } = userActions;
  const users = useSelector((store) => store.user.users);

  const [selectedUserId, setSelectedUserId] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

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

      const response = await api.put(apiUrl + endpoints.adminUp + selectedUserId, updatedUser );
      console.log(response)

      Swal.fire({
        icon: "success",
        title: "Permissions granted!",
      });

      dispatch(update_user(response.data));
      setIsAdmin(!isAdmin);
    } catch (error) {
      console.error(error);
    }
  };

  const filteredUsers = users.filter(user => (user.role === 0 || user.role == 1) && user.email.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className='flex flex-col w-full justify-around items-center p-4 h-[60vh]'>
      <h2 className='font-semibold text-lg mb-4'>GRANT ADMINISTRATOR PERMISSIONS</h2>
      <div className='flex flex-col justify-around items-center'>
        <div className="mb-4">
          <input type="text" placeholder="Search by email" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="border-2 p-2 rounded-xl w-[500px]" />
        </div>
        <div className='flex'>
          <ul>
            {filteredUsers.slice(0, 5).map((user) => (
              <li key={user._id} onClick={() => handleUserSelect(user._id)} className='m-4' >
                <div className='border-2 p-3 rounded-xl' style={{ backgroundColor: user._id === selectedUserId ? 'lightblue' : 'white' }}>
                  {user.email} (Role: {user.role === 2 ? 'Admin' : 'User'})
                </div>
              </li>
            ))}
          </ul>
          {selectedUserId && (
            <div className='m-4'>
              <button onClick={handleAdminToggle} className={`p-2 border-2 font-semibold rounded-xl ${isAdmin ? 'bg-red-400' : 'bg-green-300'}`}>
                {isAdmin ? 'Remove Permissions' : 'Grant Permissions'}
              </button>
            </div>
          )}
        </div>
        </div>
    </div>
  );
}

export default GrantPermissions;