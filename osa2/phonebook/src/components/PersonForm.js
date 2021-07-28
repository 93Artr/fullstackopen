import React from "react";
import Button from "./Button";

const PersonForm = ({
  newName,
  handleNewName,
  newNumber,
  handleNumber,
  handleSubmit,
}) => {
  return (
    <div>
      <form className="form-add">
        <div>
          <input placeholder="Name:" value={newName} onChange={handleNewName} />
        </div>
        <div>
          <input
            placeholder="Number:"
            value={newNumber}
            onChange={handleNumber}
          />
        </div>
        <div>
          <Button handler={handleSubmit} text="Add" />
        </div>
      </form>
    </div>
  );
};

export default PersonForm;
