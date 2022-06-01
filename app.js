const express=require('express')
const app=express();
const morgan=require('morgan');
const cors=require('cors')
const port = process.env.PORT|| 7000


app.use(express.json());
app.use(express.urlencoded({
    extended:true,
}));
app.use(cors());
app.use('/api',require('./routes'))

app.listen(port,()=>{
    console.log(`The App is running on port http://localhost:${port}`);
})
