const { Schema, Types } = require('mongoose');

const feedbackSchema = new Schema(
    {
        feedbackId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
        },
        feedbackBody: {
            type: String,
            require: true,
            maxLength: 280,
        },
        username: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: timestamp => new Date(timestamp).toLocaleDateString(),
        },
    },
    {
        toJSON: {
            getters: true,
        },
        id: false,
    }
);

module.exports = feedbackSchema
