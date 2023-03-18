import jwt from 'jsonwebtoken'
import User from '../models/User.js';

export default async (req,res,next) => {
    const user = await User.findById(req.userId)
    const {passwordHash,...userData} = user._doc
    if(userData.role === 'ADMIN'){

            next()
    }else{
      return  res.status(403).json({
            message: 'Вы не являетесь администартором'
        })
    }
}