
const multer = require('multer');
const path=require('path')


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/images')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now()+'-'+file.originalname)
    }
  })


const uploads=multer({
    storage,
    limits:{
        fileSize:1024*1024*10
    },
    fileFilter:(req,file,cb)=>{
        const types=/jpg|png|jpeg|gif|JPG|PNG|JPEG|GIF/;
        const extName=types.test(path.extname(file.originalname).toLowerCase());
        const mimType=types.test(file.mimetype);
        if(extName && mimType) cb(null,true);
        else{
            cb(new Error('Please select only image picture'))
        }
    }

})


module.exports=uploads;