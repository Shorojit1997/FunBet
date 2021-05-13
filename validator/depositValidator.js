


module.exports = (user) => {
    const { method,transferTo,transferFrom ,transactionId } = user;
    let error = {}
    if(!method){
        error.method='Please provide your method';
    }
    else if(method>=20){
        error.method='Please provide valid method name...'
    }
    if(!transferTo){
        error.transferTo='Please provide your phone number';
    }
    else if(transferTo.length<=8 ||transferTo.length>=14){
        error.transferTo='Please provide valid phone number'
    }
    if(!transferFrom){
        error.transferFrom='Please provide your phone number';
    }
    else if(transferFrom.length<=8 ||transferFrom.length>=14){
        error.transferFrom='Please provide valid phone number'
    }
    if(!transactionId){
        error.transactionId='Transaction Id must provide for deposit';
    }
    else if(transactionId.length<=2 ||transactionId.length>=20){
        error.transferTo='Please provide valid transaction id'
    }
    
    return error;

}