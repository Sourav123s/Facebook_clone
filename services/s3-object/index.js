require('dotenv').config();
const AWS=require('aws-sdk');


const s3=new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

const bucketName = 'traqworx-files';

exports.getObject= async ({ptah})=>{
    var getPramas={
        Bucket:bucketName, // bucket name 
        Key: path    //path to the object you are looking for 
    }
    let objectData = null;

    await s3.getObject(getPramas)
        .promise()
        .then(function (data) {
            // Handle any error and exit
            // if (err)
            //     throw new Error(err);

            // No error happened
            // Convert Body from a Buffer to a String
            objectData = data.Body.toString('utf-8'); // Use the encoding necessary
        })
        .catch(err => console.log(err));

    return objectData;
}