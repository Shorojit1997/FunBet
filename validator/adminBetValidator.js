


const matchSetValidator = (info) => {
    const { teamA, teamB, playStatus, gameType, turnamentName, gameDate, gameTime } = info;

    let error = {}
    if (!teamA) {
        error.teamA = "Please provide first team name."
    }
    if (!teamB) {
        error.teamB = "Please provide Second team name."
    }
    if (!playStatus) {
        error.playStatus = "Please provide play status."
    }
    if (!gameType) {
        error.gameType = "Please provide game type."
    }
    if (!turnamentName) {
        error.turnamentName = "Please provide turnament name."
    }

    return error;
}


const optionSetValidator = (info) => {
    let { rating, option } = info;
    rating = rating.trim();
    option = option.trim();

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

    if (!option) {
        error.option = 'Number can not be empty...'
    }


    return error;

}

module.exports = { matchSetValidator, optionSetValidator }