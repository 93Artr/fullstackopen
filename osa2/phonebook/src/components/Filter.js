import React from 'react';

const Filter = ({ nameFilter, handleFilter }) => {
  return (
    <div>
      filter shown with <input value={nameFilter} onChange={handleFilter} />
    </div>
  );
};

export default Filter;
