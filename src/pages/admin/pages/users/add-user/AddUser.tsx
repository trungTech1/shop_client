import React, { useState } from 'react';
import './addUser.scss';

interface Address {
  id: number;
  address: string;
}

const AddUser: React.FC = () => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [password, setPassword] = useState('');
  const [avatar, setAvatar] = useState<File | null>(null);
  const [phone, setPhone] = useState('');
  const [addresses, setAddresses] = useState<Address[]>([{ id: 1, address: '' }]);
  const [role, setRole] = useState('');

  const handleAddressChange = (id: number, value: string) => {
    setAddresses(addresses.map(address => (address.id === id ? { ...address, address: value } : address)));
  };

  const addAddressField = () => {
    setAddresses([...addresses, { id: addresses.length + 1, address: '' }]);
  };

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setAvatar(event.target.files[0]);
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Handle form submission logic here
    const userData = {
      userName,
      email,
      fullName,
      password,
      avatar,
      phone,
      addresses,
      role,
    };
    console.log('New User Details:', userData);
  };

  return (
    <div className="add-user">
      <h1 className="title">Add User</h1>
      <form className="user-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="userName">User Name</label>
          <input type="text" id="userName" value={userName} onChange={(e) => setUserName(e.target.value)} required />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className="form-group">
          <label htmlFor="fullName">Full Name</label>
          <input type="text" id="fullName" value={fullName} onChange={(e) => setFullName(e.target.value)} required />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <div className="form-group">
          <label htmlFor="avatar">Avatar</label>
          <input type="file" id="avatar" accept="image/*" onChange={handleAvatarChange} />
          {avatar && <img src={URL.createObjectURL(avatar)} alt="Avatar" className="avatar-preview" />}
        </div>
        <div className="form-group">
          <label htmlFor="phone">Phone</label>
          <input type="text" id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Addresses</label>
          {addresses.map(address => (
            <input
              key={address.id}
              type="text"
              value={address.address}
              onChange={(e) => handleAddressChange(address.id, e.target.value)}
              required
            />
          ))}
          <button type="button" onClick={addAddressField}>Add Address</button>
        </div>
        <div className="form-group">
          <label htmlFor="role">Role</label>
          <select id="role" value={role} onChange={(e) => setRole(e.target.value)} required>
            <option value="" disabled>Select a role</option>
            <option value="admin">Admin</option>
            <option value="user">User</option>
            <option value="manager">Manager</option>
            {/* Add more roles as needed */}
          </select>
        </div>
        <button type="submit" className="submit-button">Add User</button>
      </form>
    </div>
  );
};

export default AddUser;
