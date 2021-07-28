import React from 'react';
import Button from './Button';

const Persons = ({ persons, nameFilter, handleDelete }) => {
  const personsStyle = {
    listStyle: 'none',
  };
  return (
    <div>
      <ul style={personsStyle}>
        {persons
          .filter(person =>
            person.name.toLowerCase().includes(nameFilter.toLowerCase())
          )
          .map(person => (
            <li key={person.name}>
              {person.name} {person.number}{' '}
              <Button handler={() => handleDelete(person.id)} text="delete" />
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Persons;
