import React from 'react';

const AlertMessage = ({error}) => {
    
    return (
        <div className="alert alert-warning  w-100 m-1">
             {error.flashMessage}
        </div>
    );
};

export default AlertMessage;