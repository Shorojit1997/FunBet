

module.exports = (user) => {
    const { tossNum, catchAmount } = user;
    let error = {}
 
    if (!tossNum) {
        error.tossNum = 'Number can not be empty...'
    }
    else{
       for(var i=0;i<tossNum.length;i++)
         {
             if(tossNum[i]<'0' || tossNum[i]>'9'){
                 console.log(tossNum[i]);
                 error.tossNum='Tossnumber must be number'
             }
              
         }
    }

    if (!catchAmount) {
        error.catchAmount = 'Amount can not be empty...'
    }
    else {
        for(var i=0;i<catchAmount.length;i++)
         {
             if(catchAmount[i]<'0' || catchAmount[i]>'9'){
                 error.catchAmount='Amount must be number'
             }
              
         }
    }

    return error;

}
