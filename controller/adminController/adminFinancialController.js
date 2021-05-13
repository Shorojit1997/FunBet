const Financial = require('../../models/Financial')

const financeGetController = async (req, res, next) => {
    try {
        let finance = await Financial.findOne({ 'searchTag': "finance" })
        if (finance==null) {
            let newFinance = new Financial({
            });
            await newFinance.save();
            return res.status(200).json({
                finance: newFinance
            })
        }
        return res.status(200).json({
            finance: finance
        })
    }
    catch (e) {

        return res.status(400).json({
            flashMessage: 'Sometings happed error'
        })
    }
}
const adminFinancePostController = async (req, res, next) => {
    let { minimumDeposit, maximumDeposit, minimumWithdraw, maximumWithdraw, clubCommission, sponsorCommission } = req.body;
    try {
        let finance = await Financial.findOne({ 'searchTag': "finance" })
        if (finance==null) {
            let newFinance = new Financial({});
            await newFinance.save();
            return res.status(200).json({
                finance: newFinance
            })
        }
        if (parseInt(minimumDeposit) > 0) { finance.minimumDeposit = minimumDeposit; }
        if (parseInt(maximumDeposit) > 0) { finance.maximumDeposit = maximumDeposit; }

        if (parseInt(minimumWithdraw) > 0) { finance.minimumWithdraw = minimumWithdraw; }
        if (parseInt(maximumWithdraw) > 0) { finance.maximumWithdraw = maximumWithdraw; }
        if (parseInt(clubCommission) > 0) { finance.clubCommission = clubCommission; }
        if (parseInt(sponsorCommission) > 0) { finance.sponsorCommission = sponsorCommission; }

        await finance.save();
        return res.status(200).json({
            finance: finance
        })
    } catch (e) {
        return res.status(400).json({
            flashMessage: 'Sometings happed error'
        })
    }
}

module.exports={financeGetController,adminFinancePostController}