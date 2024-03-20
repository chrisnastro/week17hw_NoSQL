const router = require('express').Router();
const {
    getAllComments,
    getCommentById,
    createComment,
    deleteComment,
    updateCommentById,
    createFeedback,
    deleteFeedback,
} = require('../../controllers/comment-controller');

router.route('/').get(getAllComments).post(createComment);
router.route('/:commentId').get(getCommentById).put(updateCommentById).delete(deleteComment);
router.route('/:commentId/feedback').post(createFeedback);
router.route('/:commentId/feedback/:feedbackId').delete(deleteFeedback);

module.exports = router;