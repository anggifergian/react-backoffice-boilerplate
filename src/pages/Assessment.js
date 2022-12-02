import React, { useState } from 'react';
import styled from 'styled-components';

const Assessment = ({ className }) => {
  const [uuid, setUUID] = useState(1);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [gender, setGender] = useState('');
  const [listUsers, setListUsers] = useState([]);
  const [editStatus, setEditStatus] = useState({
    isEdit: false,
    uuid: null
  })

  const resetForm = () => {
    setName('');
    setEmail('');
    setPhone('');
    setGender('');
  }

  const isEmailExist = () => {
    return listUsers.find(user => user.email.indexOf(email) >= 0);
  }

  const onSubmitForm = async (e) => {
    e.preventDefault();

    if (!name || !email || !phone || !gender) {
      return alert('All input must be filled !')
    }

    if (isEmailExist()) {
      return alert('Email is already used !');
    }

    resetForm();
    setUUID(prev => prev + 1);
    setListUsers(prev => ([...prev, { uuid, name, email, phone, gender }]));
  };

  const onResetForm = (e) => {
    e.preventDefault();
    resetForm();
  };

  const handleSaveEdit = () => {
    const users = listUsers.map(user => {
      if (user.uuid === editStatus.uuid) {
        user['name'] = name;
        user['email'] = email;
        user['phone'] = phone;
        user['gender'] = gender;
      }
      return user;
    })

    setListUsers(users)
    setEditStatus({ isEdit: false, uuid: null });
  }

  const handleEdit = (uuid) => {
    const user = listUsers.find(user => user.uuid === uuid);
    
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setPhone(user.phone);
      setGender(user.gender);
      setEditStatus({ isEdit: true, uuid: user.uuid });
    }
  }

  const handleDelete = (uuid) => {
    const users = listUsers.filter(user => user.uuid !== uuid);
    setListUsers(users);
  }

  return <>
    <div className={className}>
      <h1>Users</h1>
      <form onSubmit={onSubmitForm} onReset={onResetForm}>
        <div className="form-group">
          <label>Name :</label>
          <input
            aria-label="name-input"
            type="text"
            name='name'
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="User Example"
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>Email :</label>
          <input
            aria-label="email-input"
            type="email"
            name='email'
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="username@example.com"
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>Phone :</label>
          <input
            aria-label="phone-input"
            type="tel"
            name='phone'
            value={phone}
            onChange={e => setPhone(e.target.value)}
            placeholder="081123123123"
            className="form-control"
          />
        </div>
        <p>Gender : </p>
        <select
          name='gender'
          aria-label="gender-input"
          className="form-control"
          value={gender}
          onChange={e => setGender(e.target.value)}
        >
          <option value="">Pick a gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
        <div className='button-group'>
          <button className='btn btn-secondary' type='reset'>Clear</button>
          {editStatus.isEdit ? (
            <button className='btn btn-secondary' type='button' onClick={handleSaveEdit}>Save</button>
          ) : (
            <button className='btn btn-secondary' type='submit'>Create</button>
          )}
        </div>
      </form>
      <br />
      <table aria-label="table-output">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Gender</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {listUsers.map(item => (
            <tr key={item.uuid}>
              <td>{item.uuid}</td>
              <td>{item.name}</td>
              <td>{item.email}</td>
              <td>{item.phone}</td>
              <td>{item.gender}</td>
              <td className='action-buttons'>
                <button className='btn btn-success btn-edit' onClick={() => handleEdit(item.uuid)}>Edit</button>
                <button className='btn btn-danger btn-delete' onClick={() => handleDelete(item.uuid)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </>;
};

export default styled(Assessment)`
   margin: 100px auto;
   width: 470px;

   input, select {
     margin-bottom: 10px;
     display: block;
     width: 100%;
   } 

   table, th, td {
     border: 1px solid black;
   }

   table {
     width: calc(100%);
     border-collapse: collapse;
   }

   td:not(:first-child) {
     max-width: 100px;
     overflow: hidden;
     text-overflow: ellipsis;
     white-space: nowrap;
   }

   p {
     margin-bottom: 2px;
   }

   .button-group {
     display: flex;
     justify-content: space-between;
     margin-top: 25px;
     button {
       width: 100px;
       height: 35px;
       cursor: pointer;
     }
   }

   select:invalid {
     color: #666;
   }
   select.grey {
     color: grey;
   }
   option[value=""][disabled] {
     color: grey;
   }
   option {
     color: #000;
   }

   td.action-buttons {
     text-align: center;
     padding: 3px 0px;
     max-width: initial;
     button {
       cursor: pointer;
       margin: 0px 3px;
     }
   }
 `;