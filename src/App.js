import React, { useState, useEffect } from 'react';
import { Button, EditableText, InputGroup, Toaster, Position } from '@blueprintjs/core';
import './App.css';

const toaster = Toaster.create({
  position: Position.TOP,
});

function App() {
  const [users, setUsers] = useState([]);
  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newContact, setNewContact] = useState('');
  const [newWebsite, setNewWebsite] = useState('');

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((response) => response.json())
      .then((json) => setUsers(json));
  }, []);

  function addUser() {
    const name = newName.trim();
    const email = newEmail.trim();
    const contact = newContact.trim();
    const website = newWebsite.trim();

    if (name && email && contact && website) {
      fetch("https://jsonplaceholder.typicode.com/users", {
        method: "POST",
        body: JSON.stringify({
          name,
          email,
          phone: contact,
          website
        }),
        headers: {
          "content-type": "application/json; charset=UTF-8"
        }
      })
        .then((response) => response.json())
        .then(data => {
          setUsers([...users, data]);
          toaster.show({
            message: "User Added Successfully",
            intent: "success",
            timeout: 3000
          });
          setNewName('');
          setNewEmail('');
          setNewContact('');
          setNewWebsite('');
        });
    }
  }

  function onChangeHandler(id, key, value) {
    setUsers(users =>
      users.map(user =>
        user.id === id ? { ...user, [key]: value } : user
      )
    );
  }

  function updateUser(id) {
    const user = users.find((user) => user.id === id);
    fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
      method: "PUT",
      body: JSON.stringify(user),
      headers: {
        "content-type": "application/json; charset=UTF-8"
      }
    })
      .then((response) => response.json())
      .then(data => {
        setUsers(users.map(u => u.id === id ? data : u));
        toaster.show({
          message: "User Updated Successfully",
          intent: "success",
          timeout: 3000
        });
      });
  }
function deleteUser(id){
  fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then(data => {
        setUsers((users) =>{
         return users.filter(user => user.id !== id)
        })
        toaster.show({
          message: "User Deleted Successfully",
          intent: "danger",
          timeout: 3000
        });
      });
}  return (
    <div className="App">
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Contact</th>
            <th>Websites</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map(u =>
            <tr key={u.id}>
              <td>{u.id}</td>
              <td><EditableText
                  onChange={value => onChangeHandler(u.id, 'name', value)} value={u.name}/></td>
              <td>
                <EditableText
                  onChange={value => onChangeHandler(u.id, 'email', value)}
                  value={u.email}
                />
              </td>
              <td>
                <EditableText
                  onChange={value => onChangeHandler(u.id, 'phone', value)}
                  value={u.phone}
                />
              </td>
              <td>
                <EditableText
                  onChange={value => onChangeHandler(u.id, 'website', value)}
                  value={u.website}
                />
              </td>
              <td>
                <Button intent='primary' onClick={() => updateUser(u.id)}>Update</Button>
                &nbsp;
                <Button intent='danger' onClick={() => deleteUser(u.id)}>Delete</Button>
              </td>
            </tr>
          )}
        </tbody>
        <tfoot>
          <tr>
            <td></td>
            <td>
              <InputGroup value={newName} onChange={e => setNewName(e.target.value)} placeholder="Enter your Name..." />
            </td>
            <td>
              <InputGroup value={newEmail} onChange={e => setNewEmail(e.target.value)} placeholder="Enter your Email..." />
            </td>
            <td>
              <InputGroup value={newContact} onChange={e => setNewContact(e.target.value)} placeholder="Enter your Contact..." />
            </td>
            <td>
              <InputGroup value={newWebsite} onChange={e => setNewWebsite(e.target.value)} placeholder="Enter your Website..." />
            </td>
            <td>
              <Button intent='success' onClick={addUser}>Add User</Button>
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}
export default App;
