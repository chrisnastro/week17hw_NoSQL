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
        try {
            const comment = await Comment.create(req.body);
            res.status(201).json(comment);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async deleteComment(req, res) {
        try {
            const comment = await Comment.findByIdAndDelete({ _id: req.params.commentId });
            res.status(200).json(comment);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async updateCommentById(req, res) {
        try {
            const comment = await Comment.findByIdAndUpdate(req.params.commentId, req.body, {
                new: true,
            });
            if (!comment) {
                res.status(404).json({ message: "Comment Not Found!" });
            } else {
                res.json(comment);
            }
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async createFeedback(req, res) {
        try {
            const comment = await Comment.findOneAndUpdate(
                {_id: req.params.commentId},
                {$addtoSet: {feedback: req.body}},
                {runValidators: true, new: true}
            );
            comment ? res.json(comment) : res.status(404).json({message: notFound});
        }catch (err) {
            res.status(500).json(err);
        }
    },

    async deleteFeedback(req, res) {
        try {
            const comment = await Comment.findOneAndUpdate(
                {_id: req.params.commentId},
                {$pull: {feedback: {feedbackId: req.params.feedbackId}}},
                {runValidators: true, new: true}
            );
            comment ? res.json(comment) : res.status(404).json({message: notFound});
        } catch (err) {
            res.status(500).json(err)
        }
    },
};

module.exports = CommentController;