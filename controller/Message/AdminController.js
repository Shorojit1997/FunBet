const SendMessage = require('../../models/SendMessage')
const ReceiveMessage = require('../../models/ReceiveMessage');
const Club=require('../../models/Clubinfo')
const dateformat =require('dateformat')


const getSendController = async (req, res, next) => {
    try {
        let sendmessage=await SendMessage.find({}).limit(100).sort({'_id':-1});
        return res.status(200).json({
            sendMessage:arrayFilter1(sendmessage)
        })


    } catch (e) {
        return res.status(400).json({
            flashMessage:'Please try again'
        })

    }
}
const getReceiveController = async (req, res, next) => {
    // console.log('yes')
    try {
        let receiveMessage=await ReceiveMessage.find({}).limit(100).sort({'_id':-1});
        return res.status(200).json({
            receiveMessage:arrayFilter(receiveMessage)
        })


    } catch (e) {
        return res.status(400).json({
            flashMessage:'Please try again'
        })

    }
}

const clubPostController = async (req, res, next) => {
    const slug=req.params.slug;
    const {message}=req.body;
   
    try {
        let club=await Club.findById({'_id':slug});
        let sendMessage= new SendMessage({
            message:message,
            username:club.clubName,
            userId:club._id
        })
        club.receiveMessage.push(sendMessage._id);
        await club.save();
        await sendMessage.save();
        return res.status(200).json({
            flashMessage:'Successfully send to admin'
        })

    } catch (e) {
        return res.status(400).json({
            flashMessage:'Please try again'
        })

    }
}

const DeleteMessageController = async (req, res, next) => {
    const userId=req.params.slug;
    const {messageId}=req.body;
    try {
        let club=await Club.findById(userId);
        club.sendMessage.pull(club._id);
        await SendMessage.findByIdAndDelete(messageId);

        await club.save();
        return res.status(200).json({
            flashMessage:'Successfully deleted'
        })

    } catch (e) {
        return res.status(400).json({
            flashMessage:'Please try again'
        })

    }
}





module.exports={getSendController,getReceiveController,clubPostController,DeleteMessageController}


const arrayFilter=(elements)=>{
    return elements.map((item,index)=>{
        return{
            col1:index+1,
            col2:item.username,
            col3:dateformat(item.createdAt, "dd-mm-yy"),
            col4:dateformat(item.createdAt, "h:MM TT"),
            col5:item.message,
            col6:item.userId
        }
    })
}

const arrayFilter1=(elements)=>{
    return elements.map((item,index)=>{
        return{
            col1:index+1,
            col2:item.username,
            col3:dateformat(item.createdAt, "dd-mm-yy"),
            col4:dateformat(item.createdAt, "h:MM TT"),
            col5:item.message,
            col6:{ 
                userId:item.userId,
                _id:item._id
            }
        }
    })
}