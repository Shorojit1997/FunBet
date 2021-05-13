const SendMessage = require('../../models/SendMessage')
const ReceiveMessage = require('../../models/ReceiveMessage');
const Club = require('../../models/Clubinfo');
const dateformat =require('dateformat')

const clubGetController = async (req, res, next) => {
    const messageType = req.params.slug;
    try {
        let club = await Club.findById(req.club._id);
        let messagelist=[];
        if (messageType === 'send') {
            let mlist = await ReceiveMessage.find({ '_id': { $in: club.sendMessage } }).limit(100).sort({'_id':-1})
            messagelist=arrayFilter(mlist)
        }
        else if (messageType === 'receive') {
            let mlist = await SendMessage.find({ '_id': { $in: club.receiveMessage } }).limit(100).sort({'_id':-1});
            messagelist=arrayFilter(mlist)
        }


        return res.status(200).json({
            flashMessage: 'Successfully send to admin.',
            messagelist
        })

    } catch (e) {
        return res.status(400).json({
            flashMessage: 'Please try again.'
        })

    }
}

const clubPostController = async (req, res, next) => {
    const { message } = req.body;
    try {
        let club = await Club.findById(req.club._id);
        let receve = new ReceiveMessage({
            message: message,
            username: req.club.clubName,
            userId: req.club._id
        })

        club.sendMessage.push(receve._id);
        await club.save();
        await receve.save();

        return res.status(200).json({
            flashMessage: 'Successfully send to admin'
        })

    } catch (e) {
        return res.status(400).json({
            flashMessage: 'Please try again'
        })

    }
}



module.exports = { clubPostController, clubGetController }


const arrayFilter=(elements)=>{
    return elements.map((item,index)=>{
        return{
            col1:index+1,
            col2:'Admin',
            col3:dateformat(item.createdAt, "dd-mm-yy"),
            col4:dateformat(item.createdAt, "h:MM TT"),
            col5:item.message
        }
    })
}