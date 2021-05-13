const User = require('../models/User')

module.exports = (user) => {
    const {  email, password} = user;
    let error = {}
 
    if (!email) {
        error.email = 'Email can not be empty...'
    }
    else if (email.length < 7 || email.length > 30) {
        error.email = 'Name must be 7 to 30 character...'
    }

    if (!password) {
        error.password = 'Password can not be empty...'
    }
    else if (password.length < 6 || password.length > 30) {
        error.password = 'Password must be 6 to 30 character...'
    }

    return error;

}