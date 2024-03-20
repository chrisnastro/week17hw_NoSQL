const { Comment, User, Feedback } = require('../models');
const { Types } = require('mongoose');

const CommentController = {
    async getAllComments(req, res) {
        try {
            const comments = await Comment.find({});
            res.json(comments);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async getCommentById(req, res) {
        try {
            const comment = await Comment.findOne({ _id: req.params.commentId });
            if (!comment) {
                res.status(404).json({ message: "Comment not found!" });
            } else {
                res.json(comment);
            }
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async createComment(req, res) {
        
    }
}