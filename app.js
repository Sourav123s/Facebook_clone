const express=require('express')
const app=express();
const morgan=require('morgan');
const cors=require('cors')
const port = process.env.PORT|| 7000


// const posts=[
//     {
//         username:'priya',
//         title:'post1'
//     },
//     {

//         username: 'rajdeep',
//         title: 'post2'

//     }
// ]

// app.use((express.json()))

// app.use('/',(req,res,next)=>{
//     // res.send('hello World')
//     next()
// });
// app.get('/post', (req, res) => {
//     res.send(posts)

// })

// app.get('/login',(req,res)=>{
//     res.send('in login')

// })

app.use(express.json());
app.use(express.urlencoded({
    extended:true,
}));
app.use(cors());
app.use('/api',require('./routes'))

app.listen(port,()=>{
    console.log(`The App is running on port http://localhost:${port}`);
})