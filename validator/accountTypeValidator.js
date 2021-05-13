
module.exports=(info)=>{
    const{accountName,accountNumber}=info;
    let error={}
    if (!accountNumber) {
        error.accountNumber = 'Please provide your phone number...'
    }
    else if (accountNumber.length < 8 || accountNumber.length > 14) {
        error.accountNumber = 'Phone number must be 8 to 14 number...'
    }
    if (!accountName) {
        error.accountName = 'Name can not be empty...'
    }
    else if (accountName.length < 3 || accountName.length > 20) {
        error.accountName = 'Name must be 3 to 20 character...'
    }
    return error;
}