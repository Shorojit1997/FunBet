

module.exports = (user) => {
    const { name, phone, email, password, confirmPassword, clubName } = user;
    let error = {}
    if (!name) {
        error.name = 'Name can not be empty...'
    }
    else if (name.length < 3 || name.length > 20) {
        error.name = 'Name must be 3 to 20 character...'
    }

    if (!phone) {
        error.phone = 'Please provide your phone number...'
    }
    else if (phone.length < 8 || phone.length > 14) {
        error.phone = 'Phone number must be 8 to 14 number...'
    }

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

    if (!confirmPassword) {
        error.confirmPassword = 'Confirmpassword can not be empty...'
    }
    else if (confirmPassword.length < 6 || confirmPassword.length > 30) {
        error.confirmPassword = 'Password must be 6 to 30 character...'
    }
    else if (password !== confirmPassword) {
        error.confirmPassword = 'Password doesn\'t match...'
    }

    if (!clubName) {
        error.clubName = 'Club name can not be empty...'
    }
    return error;

}