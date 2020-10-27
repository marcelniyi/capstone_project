import Comments from '../models/comments';
import jwt from 'jsonwebtoken';

export const addComments = async (req, res) => {
      const comment = req.body;
      if(comment){
        const exist = await Comments.findOne({ comment: comment.comment, blog: req.params.id});
        if(exist){
          res.status(409).json({status: 409, errer: "Comment already sent"})
          return
        }
        const addComment = new Comments({
          comment: comment.comment,
          blog: req.params.id,
          user: req.data.user.id,
        })
        try {
          const result = await addComment.save();
          res.status(201).json(result);
        }catch(err) {
          throw new Error(err);
        }

      } else {
        res.status(400).json({status: 400, err: "Invalid data"})
      }

}

export const listComments = async (req, res) => {
  const comments = await Comments.find({});
  try {
    res.send(comments);
  } catch (err) {
    res.status(500).send(err);
  }
}
