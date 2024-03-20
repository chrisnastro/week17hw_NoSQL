const { Schema, model } = require('mongoose');
const feedbackSchema = require('./Feedback');

const commentSchema = new Schema(
    {
        commentText: {
            type: String,
            require: true,
            minlength: 1,
            maxlength: 280,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: timestamp => new Date(timestamp).toLocaleString(),
        },
        username: {
            type: String,
            required: true,
        },
        feedback: [feedbackSchema],
    },
    {
        toJSON: {
            getters: true,
            virtuals: true,
        },
        id: false,
    }
);

commentSchema.virtual('commentCount').get(function() {
    this.reactions.length;
});

const Comment = model('Comment', commentSchema)

module.exports = Comment