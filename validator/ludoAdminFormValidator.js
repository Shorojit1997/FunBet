

module.exports = (user) => {
    let { rating, winningPossibility, minimumBetsAmount } = user;
    rating=rating.trim();
    winningPossibility=winningPossibility.trim();
    minimumBetsAmount=minimumBetsAmount.trim();

    // console.log(rating,winningPossibility,minimumBetsAmount)
    let error = {}

    if (!rating) {
        error.rating = 'Rating can not be empty...'
    }
    else {
        for (var i = 0; i < rating.length; i++) {
            if (rating[i] === '.')
                continue;
            if (rating[i] < '0' || rating[i] > '9') {
                error.rating = 'Rating must be a number'
            }

        }
    }

    if (!minimumBetsAmount) {
        error.minimumBetsAmount = 'Number can not be empty...'
    }
    else {
        for (var i = 0; i < minimumBetsAmount.length; i++) {
            if (minimumBetsAmount[i] < '0' || minimumBetsAmount[i] > '9') {
                error.minimumBetsAmount = 'Minimum bets amount must be an integer number'
            }

        }
    }

    if (!winningPossibility) {
        error.winningPossibility = 'Amount can not be empty...'
    }
    else {
        for (var i = 0; i < winningPossibility.length; i++) {
            if (winningPossibility[i] < '0' || winningPossibility[i] > '9') {
                error.winningPossibility = 'Amount must be integer number'
            }
        }
    }

    return error;

}
