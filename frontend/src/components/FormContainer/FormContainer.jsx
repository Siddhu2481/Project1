import React from 'react';

import './FormContainer.scss';

const FormContainer = ({ children }) => {
  return (
    <div className='app__signin container'>
        <div className="app__signin-form">
            {children}
        </div>
    </div>
  )
}

export default FormContainer