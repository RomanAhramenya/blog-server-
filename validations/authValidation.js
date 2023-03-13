import {body} from 'express-validator'

export const registerValidation = [
    body('name','Укажите имя (минимум 2 символа)').isLength({min:2}),
    body('email','Неверный формат почты').isEmail(),
    body('password','Пароль должен быть минимум 5 символов').isLength({min:5}),
    body('avatarUrl','Неверная ссылка на аватар').optional().isURL(),
]
export const loginValidation = [ 
    body('email','Неверный формат почты').isEmail(),
    body('password','Пароль должен быть минимум 5 символов').isLength({min:5}),
]