import ComentsModel from "../models/Coments.js";

export const createComent = async (req,res) => {
    try {
        const postId = req.params.id
        const doc = new ComentsModel({
            text:req.body.text,
            imageUrl:req.body.imageUrl,
            postId,
            user:req.userId
        })
        const coment = await doc.save()
        res.json(coment)
    } catch (error) {
        res.status(500).json({
            message:'Не удалось создать комментарий'
        })
    }
}

export const deleteComent = async (req,res) => {
    try {
        const postId = req.params.id
        const id=req.body.id
        const doc = await ComentsModel.findById(id)
        if(doc.user._id.toString() !== req.userId){
            return res.status(500).json({
                message:'Вы не можете удалить чужой комментарий'
            })
        }
            await ComentsModel.findOneAndDelete({
                _id:req.body.id,
            })
            res.json({
                message:'коментарий удален'
            })
    } catch (error) {
        res.status(500).json({
            message:'нет доступа'
        })
    }
}
export const getAllComentsForOnePost = async (req,res) =>{
    try {
        const postId = req.params.id
        const coments = await ComentsModel.find({
            $or:[{postId}]
        }).populate("user").exec()
        res.json(coments)
    } catch (error) {
        res.status(500).json({
            message:"не удалось получить коментарии"
        })
    }
}