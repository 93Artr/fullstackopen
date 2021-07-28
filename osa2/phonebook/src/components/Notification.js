import React from 'react';

const Notification = ({ message, status }) => {
  if (message === null) {
    return null;
  }

  const notifyStyle = {
    color: 'green',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    marginTop: 0,
    width: '80%',
    marginLeft: 'auto',
    marginRight: 'auto',
  };

  if (status === 'success') {
    notifyStyle.color = 'green';
    notifyStyle.borderColor = 'green';
  } else if (status === 'error') {
    notifyStyle.color = 'red';
    notifyStyle.borderColor = 'red';
  }

  return <div style={notifyStyle}>{message}</div>;
};

export default Notification;
