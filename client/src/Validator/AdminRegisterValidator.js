

export const registerErrorChecker = (user) => {
    const { name, phone, email, username, password, confirmPassword } = user;
    let error = {}
    if (!name) {
        error.flashMessage = 'Name can not be empty...'
    }
    else if (name.length < 3 || name.length > 20) {
        error.flashMessage = 'Name must be 3 to 20 character...'
    }
    else if (!phone) {
        error.flashMessage = 'Please provide your phone number...'
    }
    else if (phone.length < 8 || phone.length > 14) {
        error.flashMessage = 'Phone number must be 8 to 14 number...'
    }
    else if (!email) {
        error.flashMessage = 'Email can not be empty...'
    }
    else if (email.length < 7 || email.length > 30) {
        error.flashMessage = 'Name must be 7 to 30 character...'
    }
    else if (!username) {
        error.flashMessage = 'Username can not be empty...'
    }
    else if (username.length < 3 || username.length > 20) {
        error.flashMessage = 'Username must be 3 to 20 character...'
    }
    else if (!password) {
        error.flashMessage = 'Password can not be empty...'
    }
    else if (password.length < 6 || password.length > 30) {
        error.flashMessage = 'Password must be 6 to 30 character...'
    }
    else if (!confirmPassword) {
        error.flashMessage = 'Confirmpassword can not be empty...'
    }
    else if (confirmPassword.length < 6 || confirmPassword.length > 30) {
        error.flashMessage = 'Password must be 6 to 30 character...'
    }
    else if (password !== confirmPassword) {
        error.flashMessage = 'Password doesn\'t match...'
    }
 
    return error;

}