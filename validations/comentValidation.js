import {body} from 'express-validator'

export const createComentValidation = [
    body('text','Ведите коментарий').isLength({min:1}).isString(),
    body('imageurl',"не верная ссылка").optional().isURL()
]