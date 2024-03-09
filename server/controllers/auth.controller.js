import { errorHandler } from '../utils/error.js';
import User from './../models/user.model.js';
import bcryptjs from 'bcryptjs';

export const signup = async (req,res,next) =>{
    // console.log(req.body);

    const {username , email , password} = req.body;

    if(!username || !email || !password || username === '' || email === '' || password === ''){
        next(errorHandler(400, 'All fields are required'))
    }
    
    const hashpassword = bcryptjs.hashSync(password, 10);
    const newUser =new User({
        username,email , password : hashpassword,
    })

    try{
        await newUser.save();
    res.json({message : 'Signup successfully'});
    }catch(err){
        next(err);
    }

    


}