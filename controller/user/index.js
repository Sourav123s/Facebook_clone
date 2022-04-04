const { hashPassword, verfiPassword } = require('../../services/password');
const User = require('../../models').user;
const jwt = require('jsonwebtoken');


async function chechkPassword(req, res) {
    try {
        const rb = req.body
        let user = await User.findOne({
            where: {
                Email: rb.Email,
            }
        })
        let Password = user.Password
        let chechkPassword = await verfiPassword(rb.Password, Password);

        if (chechkPassword) {
            delete user.dataValues.Password;

            let token = jwt.sign({
                id: user.id,
                First_Name: user.First_Name,
                Last_Name: user.Last_Name,
                Dob: user.Dob,
                Email: user.Email,
                Phone_Number: user.Phone_Number,
                Profile_pic: user.Profile_pic,
                Cover_Pic: user.Cover_Pic,
                About: user.About
            },
                'secrect_key',
                { expiresIn: '3h' }
            );

            return res.json({
                success: true,
                message: "sing In sucessfully",
                details: { user, token },
            })
        } else {
            return res.json({
                success: false,
                message: "wrong password ",
            });
        }

    } catch (error) {
        console.log(error);
    }
}

async function addUser(req, res) {
    try {
        const rb = req.body;
        let check_user = await User.findOne({
            where: {
                Email: rb.Email,
            }
        })
        if (check_user) {
            // Letter it will redirect to the password page and asking user for valid password
            res.json({
                sucess: false,
                data: check_user.Email,//this need to send by the user when it redirect to check password page
                message: "User Already Exists with this email",
            })
        }
        // upload the picture 
        let Profile_Pic = rb.Profile_pic
        let Cover_Pic = rb.Cover_Pic
        let Password = await hashPassword(rb.Password);
        let Dob = new Date(rb.Dob)

        let createUser = await User.create({
            First_Name: rb.First_Name,
            Last_Name: rb.Last_Name,
            Dob: Dob,
            Password: Password,
            Email: rb.Email,
            Phone_Number: rb.Phone_Number,
            Profile_pic: Profile_Pic,
            Cover_Pic: Cover_Pic,
            About: rb.About
        })

        return res.json({
            success: true,
            message: "Employee created successfully ",
            createUser,
        })
    } catch (error) {

    }
}

async function signIn(req, res) {
    //       return res.json({
    //     message:'sucessfully hit the api ',
    //     data:req.body
    // })
    try {

        const rb = req.body;
        let user = await User.findOne({
            where: {
                Email: rb.Email
            }
        })

        if (!user) {
            return res.json({
                success: false,
                message: 'No user are found with this email ',//Redirect the user to create new profile 
            })
        }
        let Password = user.Password
        let chechkPassword = await verfiPassword(rb.Password, Password);

        if (chechkPassword) {
            delete user.dataValues.Password;

            let token = jwt.sign({
                id: user.id,
                First_Name: user.First_Name,
                Last_Name: user.Last_Name,
                Dob: user.Dob,
                Email: user.Email,
                Phone_Number: user.Phone_Number,
                Profile_pic: user.Profile_pic,
                Cover_Pic: user.Cover_Pic,
                About: user.About
            },
                'secrect_key',
                { expiresIn: '3h' }
            );

            return res.json({
                success: true,
                message: "sing In sucessfully",
                details: { user, token },
            })
        } else {
            return res.json({
                success: false,
                message: "wrong password ",
            });
        }


    } catch (error) {

    }
}

function verifyjwtToken(req, res, next) {
    try {
        if (req.headers.authorization && req.headers.authorization.split(" ")[0] === "Bearer") {
            const token = req.headers.authorization.split(' ')[1];

            jwt.verify(token, 'secrect_key', (err, payload) => {
                if (err) {
                    throw err;
                }
                req.user = payload;
                next();
            });
        } else {
            return res.status(401).send('Unauthorize');
        }
    } catch (error) {
        console.log(error);
    }
}

async function userProfile(req, res) {
    try {
        const rb = req.user;

        const user = await User.findOne({
            where: {
                id: rb.id
            },
            attribute: []
        })

        if (user) {
            return res.json({
                success: true,
                message: 'User Sucessfully found ',
                data: user
            })
        } else {
            return res.json({
                success: false,
                message: 'User not found ',

            })
        }

    } catch (error) {
        console.log(error);
    }
}
module.exports = {
    addUser,
    verifyjwtToken,
    signIn,
    userProfile,
    chechkPassword,

}