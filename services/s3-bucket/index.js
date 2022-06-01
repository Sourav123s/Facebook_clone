require('dotenv').config();
const express=require('express')
const multer=require('multer')
const multerS3= require('multer-s3');
const AWS=require('aws-sdk');


// AWS.config.update({
//     secretAccessKey: process.env.AWS_ACCESS_KEY_ID,   //set that in evn for aws acess key_id
//     acessKeyId: process.env.AWS_SECRET_ACCESS_KEY,    // set that in evn for aws secrect key
//     region: 'us-east-1'
// });

// const bucketName=''

// const s3=new AWS.S3({
//     apiVersion: '2006-03-01',
//     params: { Bucket: bucketName }
// });



// async function uploads(file, filename, folder = null, rawFileName = false){
//      try {
//          const params = {
//              Bucket: bucketName,
//              //Key:`${folder ? `${folder}/` : ''}${rawFileName ? `${filename}` : `${Date.now().toString()}-${filename}`}`,
//              Key: `${process.env.PIC_LINK}/${filename}`,
//              Body: file,
//              ContentType: 'image/jpeg',
//              ACL: 'public-read'
//          };
//          let fileResp = null;

//          await s3.upload(params, options)
//              .promise()
//              .then((res) => {
//                  console.log(res)
//                  fileResp = res;
//              }).catch(err => console.log(err))

//          return fileResp;




//      } catch (error) {
//          console.log(error);
//      }
//  }


//  module.exports=uploads


// Uploads File using express and multer s3 


var s3 = new AWS.S3({ 
    secretAccessKey: process.env.AWS_ACCESS_KEY_ID,   //set that in evn for aws acess key_id
    acessKeyId: process.env.AWS_SECRET_ACCESS_KEY
})

exports. upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: 'some-bucket',
        acl: 'public-read',
        metadata: function (req, file, cb) {
            cb(null, { fieldName: file.fieldname });
        },
        key: function (req, file, cb) {
            cb(null, Date.now().toString())
        }
    })
})

