const authRoutes=require('./authRoutes')
const userRoutes=require('./userRoute')
const adminRoutes=require('./adminRoutes')
const gameRoute=require('./gameRoute');
const clubRoutes=require('./clubRoutes')

const authetiCateMiddleware = require('../../middleware/authenticateCheacker.js')
// const authetiCateMiddleware=[authenticateJWT,isAuthenticated]


const routes=
[
    {
        path:'/api/user',
        handeler:userRoutes,
    },
    {
        path:'/api/admin',
        handeler:adminRoutes
    },
    {
        path:'/api/admin',
        handeler:gameRoute
    },
    ,
    {
        path:'/api/club',
        handeler:clubRoutes
    },
    // {
    //     path:'/',
    //     handeler: (req,res,next)=>{
    //         res.status('201').json('Hello i am from server baby');
    //     },
    // },

]

module.exports=(app)=>{
    routes.map(route=>{
        if(route.path!=='/'){
            app.use(route.path,route.handeler)
        }
        else{
            app.get(route.path,route.handeler);
        }
    })
}