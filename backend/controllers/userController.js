const asyncHandler = require('express-async-handler');
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


