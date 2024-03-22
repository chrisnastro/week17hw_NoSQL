const router = require('express').Router();
const {
    getAllUsers,
    getUserById,
    createUser,
    updateUserById,
    deleteUserById,
    addFriend,
    deleteFriend,
} = require ('../../controllers/user-controller');

router.route('/').get(getAllUsers).post(createUser);
router.route('/:userId').get(getUserById).delete(deleteUserById);
router.route('/:userId').put(updateUserById);
router.route('/:userId/friends/:friendId').post(addFriend).delete(deleteFriend);

module.exports = router;