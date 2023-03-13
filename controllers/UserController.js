import UserModel from '../models/User.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
export const registerController = async (req, res) => {
  try {
    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const doc = new UserModel({
      name: req.body.name,
      email: req.body.email,
      avatarURL: req.body.avatarURL,
      passwordHash: hash,
    });

    const user = await doc.save();
    const token = jwt.sign(
      {
        _id: user._id,
      },
      process.env.SEKRET_KEY,
      {
        expiresIn: "30d",
      }
    );
    const { passwordHash, ...userData } = user._doc;
    res.json({
      ...userData,
      token,
    });
  } catch (error) {
    if (error.keyPattern.email) {
      return res.status(500).json({
        message: "Пользователь с такой почтой уже существует",
      });
    }
    res.status(500).json({
      message: "Ошибка при регестрации",
      error,
    });
  }
};
export const loginController = async (req, res) => {
  try {
    const user = await UserModel.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).json({
        message: "Неверные данные при входе",
      });
    }
    const isValidPassword = await bcrypt.compare(
      req.body.password,
      user._doc.passwordHash
    );
    if (!isValidPassword) {
      return res.status(404).json({
        message: "Неверные данные при входе!",
      });
    }
    const token = jwt.sign(
      {
        _id: user._id,
      },
      process.env.SEKRET_KEY,
      {
        expiresIn: "30d",
      }
    );
    const { passwordHash, ...userData } = user._doc;
    res.json({
      ...userData,
      token,
    });
  } catch (error) {
    res.status(500).json({
      message: "Не удалось авторизоваться",
      error,
    });
  }
};
export const authMeControler =  async (req,res)=>{
    try {

        const user = await UserModel.findById(req.userId)
        const {passwordHash,...userData} = user._doc
res.json(userData)
    } catch (error) {
        
    }
}
