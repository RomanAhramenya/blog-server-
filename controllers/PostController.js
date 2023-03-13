import PostModel from "../models/Post.js";

export const getAllPostsController = async (req, res) => {
  try {
    //
    const posts = await PostModel.find().populate("user").exec();
    res.json(posts);
  } catch (error) {
    res.status(500).json({
      message: "Не удалось получить статьи",
    });
  }
};

export const getOnePostController = async (req, res) => {
  try {
    const postId = req.params.id;

    const post = await PostModel.findOneAndUpdate(
      {
        _id: postId,
      },
      {
        $inc: { viewsCount: 1 },
      },
      {
        new: true,
      }
    ).populate("user");
    res.json(post);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Не удалось получить статьи",
    });
  }
};

export const createPostController = async (req, res) => {
  try {
    const doc = new PostModel({
      title: req.body.title,
      text: req.body.text,
      tags: req.body.tags,
      imageUrl: req.body.imageUrl,
      user: req.userId,
    });
    const post = await doc.save();

    res.json(post);
  } catch (error) {
    res.status(500).json({
      message: "Не удалось создать пост",
    });
  }
};

export const deletePostController = async (req, res) => {
  try {
    const postId = req.params.id;
    await PostModel.findOneAndDelete({
      _id: postId,
    });
    res.json({
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      message: "Не удалось удалить статью",
    });
  }
};

export const updatePostController = async (req, res) => {
  try {
    const postId = req.params.id;
    const doc = await PostModel.findByIdAndUpdate(
      {
        _id: postId,
      },
      {
        "title":req.body.title,
        "text":req.body.text,
        "tags":req.body.tags,
        "imageUrl":req.body.imageUrl,
      },
      {
        returnDocument:'after'
      }

    );
        const post = await doc.save()
        res.json(post)
  } catch (error) {
    res.status(500).json({
        message:'Не удалось обновить статью'
    })
  }
};
