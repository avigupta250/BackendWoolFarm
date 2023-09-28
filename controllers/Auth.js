

const User=require("../models/User");
const jwt = require("jsonwebtoken")
const Profile=require("../models/Profile");
const bcrypt=require("bcrypt")









exports.signup = async (req, res) => {
    try {
        const {
            firstName,
            lastName,
            email,
            password,
            confirmPassword,
            accountType,
         
        } = req.body

        // check all details are present or not
        if (!firstName ||
            !lastName ||
            !email ||
            !password ||
            !confirmPassword ||
            !accountType) {
            return res.status(403).send({
                success: false,
                message: "All feilds are required"
            })
        }

        // password and comfirm password should be shame
        if (password !== confirmPassword) {
            return res.status(403).send({
                success: false,
                message: "Password and confirm do not match"
            })
        }

        // check if user is already register
        const existingUser = await User.findOne({ email })
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User already exist .Please login to continue"
            })
        }

        // Find the OTP for email
        // const otpResponse = await OTP.find({ email });
        // console.log("OTP response", response);

        // if (response.length === 0) {
        //     // OTP not found for the email
        //     return res.status(400).json({
        //         success: false,
        //         message: "The OTP is not valid"
        //     })
        // } else if (otp !== response.otp) {
        //     // invalid OTP
        //     return res.status(400).json({
        //         success: false,
        //         message: "The OTP is not valid",
        //     })
        // }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10)

      

        const profileDetails = await Profile.create({
            phoneNumber: null,
            gender: null,
            pinCode: null,
            dateOfBirth: null,
            city: null,
            state:null,
            country: null,

        })

        const user = await User.create({

            firstName,
            lastName,
            email,
            password,
            image: "",
            password:hashedPassword,
            accountType,
            additionalDetails:profileDetails._id


        })

        return res.status(200).json({
            success: true,
            user,
            message: "User registered succesfully"
        })


    }
    catch (error) {

        console.log(error)
        return res.status(500).json({
            success: false,
            message: "User cannot be registered.Please try again"
        })

    }
}





exports.login = async (req, res) => {
    try {
        // get email and password from req body
        const { email, password } = req.body

        // check if email or password is missing
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "please fill up all the required fields"
            })
        }

        // Find user with provided email
        const user = await User.findOne({ email }).populate("additionalDetails")

        // If user not found with provided email
        if (!user) {
            // Return 401 Unauthorized status code with error message
            return res.status(401).json({
                success: false,
                message: `User is not Registered with Us Please SignUp to Continue`,
            })
        }
        console.log(password);
        // Generate JWT token and compare passowrrd
        if (await bcrypt.compare(password, user.password)) {
            const token = jwt.sign(
                { email: user.email, id: user._id, role: user.accountType },
                process.env.JWT_SECRET,
                {
                    expiresIn: "24h"
                }
            )

            user.token = token
            // user.password = undefined
            // Set cookie for token and return success response
            const options = {
                expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
                httpOnly: true,
            }
            console.log(user)
            res.cookie("token", token, options).status(200).json({
                success: true,
                token,
                user,
                message: `User Login Success`,
                
            })
        }
        else {
            return res.status(401).json({
                success: false,
                message: `Password is incorrect`,
            })
        }
    } catch (error) {
        console.error(error)
        // Return 500 Internal Server Error status code with error message
        return res.status(500).json({
            success: false,
            message: `Login Failure Please Try Again`,
        })
    }

}


// controller for changing password

