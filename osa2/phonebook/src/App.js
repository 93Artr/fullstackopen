import React, { useState, useEffect } from 'react';
import contactService from './services/contacts';
import PersonForm from './components/PersonForm';
import Notification from './components/Notification';
import Persons from './components/Persons';
import Filter from './components/Filter';

const App = () => {
  const mainHeader = {
    textAlign: 'center',
    margin: 'auto',
    background: 'cadetblue',
    marginTop: 0,
    marginBottom: 0,
    paddingTop: 10,
    paddingBottom: 5,
    color: 'white',
  };
  const appStyle = {
    textAlign: 'center',
    maxWidth: '80%',
    width: '50rem',
    margin: 'auto',
    marginTop: 40,
    paddingTop: 20,
    paddingBottom: 20,
    border: 'solid',
    borderColor: 'gray',
    borderRadius: 20,
    borderWidth: 1,
    boxShadow: '1px 1px 2px gray',
  };

  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNumber] = useState('');
  const [nameFilter, setFilter] = useState('');
  const [notifyMessage, setNotifyMessage] = useState(null);
  const [notifyStatus, setNotifyStatus] = useState('success');

  useEffect(() => {
    // console.log('effect');
    contactService.getAll().then(contacts => {
      // console.log(contacts);
      setPersons(contacts);
    });
  }, []);

  const handleSubmit = e => {
    e.preventDefault();

    const personExists = persons.find(el => el.name === newName);

    const contactObject = {
      name: newName,
      number: newNumber,
    };

    if (personExists) {
      if (
        window.confirm(
          `${newName} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        contactService
          .update(personExists.id, contactObject)
          .then(returnedContact => {
            setNewName('');
            setNumber('');
            setNotifyStatus('success');
            setNotifyMessage(`${newName} has been updated`);
            setTimeout(() => {
              setNotifyMessage(null);
            }, 5000);
            setPersons(
              persons.map(person =>
                person.id !== personExists.id ? person : returnedContact
              )
            );
          });
      }
      return;
    }

    contactService
      .create(contactObject)
      .then(returnedContact => {
        // console.log(returnedContact);
        setNotifyStatus('success');
        setNotifyMessage(`${newName} has been added`);
        setTimeout(() => {
          setNotifyMessage(null);
        }, 5000);
        setPersons(persons.concat(returnedContact));
        setNewName('');
        setNumber('');
      })
      .catch(error => {
        setNotifyStatus('error');
        setNotifyMessage(
          `Information of ${newName} couldn't be added. ${error}`
        );
        setTimeout(() => {
          setNotifyMessage(null);
        }, 5000);
      });
  };

  const handleNewName = e => setNewName(e.target.value);

  const handleNumber = e => setNumber(e.target.value);

  const handleFilter = e => setFilter(e.target.value);

  const handleDelete = id => {
    // console.log(id);
    const currentPerson = persons.find(person => person.id === id).name;
    if (window.confirm(`Delete ${currentPerson}`)) {
      contactService
        .delContact(id)
        .then(_ => {
          setNotifyStatus('success');
          setNotifyMessage(`${currentPerson} has been removed`);
          setTimeout(() => {
            setNotifyMessage(null);
          }, 5000);
          setPersons(persons.filter(person => person.id !== id));
        })
        .catch(error => {
          setNotifyStatus('error');
          setNotifyMessage(
            `Information of ${currentPerson} has already been removed.`
          );
          setTimeout(() => {
            setNotifyMessage(null);
          }, 5000);
          setPersons(persons.filter(person => person.id !== id));
        });
    }
  };

  return (
    <div>
      <div style={mainHeader}>
        <h1>Phonebook</h1>
      </div>
      <div style={appStyle}>
        <Notification message={notifyMessage} status={notifyStatus} />
        <Filter value={nameFilter} handleFilter={handleFilter} />
        <h2>Add a new</h2>
        <PersonForm
          newName={newName}
          handleNewName={handleNewName}
          newNumber={newNumber}
          handleNumber={handleNumber}
          handleSubmit={handleSubmit}
        />
        <h2>Numbers</h2>
        <Persons
          persons={persons}
          nameFilter={nameFilter}
          handleDelete={handleDelete}
        />
      </div>
    </div>
  );
};

export default App;
