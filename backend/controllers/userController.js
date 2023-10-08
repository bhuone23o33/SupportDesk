const asyncHandler = require('express-async-handler');

const bcrypt = require('bcryptjs');
const User = require('../models/userModel.js');
// @desc   Register a user
// @route  /api/users
// @access  public 

const registerUser = asyncHandler(async(req,res)=>{
    // console.log(req.body);

    const {name,email,password} = req.body;
    // validation
    // if(!name || !email || !password){
    //     return res.status(400).json({message:`Please include all information`});
    // }
    if(!name || !email || !password){
        res.status(400);
        throw new Error('Please include all information');
    }

    // find if already exist
    const UserExists = await User.findOne({email});
    if(UserExists){
        res.status(400);
        throw new Error('User already exist');
    }

    // HashPassword
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password,salt);

    // create User
    const user = await User.create({
        name,
        email,
        password:hashedPassword,
    })

    if(user){
        res.status(201).json({
            _id:user._id,
            name:user.name,
            email:user.email,
        })
    }else{
        res.status(400);
        throw new Error('Invalid User data');
    }



    res.send('Register Route');
})

// @desc   login a user
// @route  /api/users/login
// @access  public 

const loginUser = asyncHandler(async(req,res)=>{
    res.send('Login Route');
})

module.exports = {
    registerUser,
    loginUser
}


