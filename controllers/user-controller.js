const { User, Thought } = require('../models');

const userController = {
    getAllUsers(req, res) {
        User.find({})
        .then(userData => res.json(userData))
        .catch(err => res.status(500).json(err));
    },

    getUserById(req, res) {
        User.findById(req.params.userId)
        .then(userData => res.json(userData))
        .catch(err => res.status(500).json(err));
    },

    createUser({ body }, res) {
        User.create(body)
          .then((userData) => res.json(userData))
          .catch((err) => res.json(err));
      },

    // createUser(req, res) {
    //     User.create(req.body)
    //     .then(userData => res.json(userData))
    //     .catch(err => res.status(500).json(err));
    // },

    updateUserById(req, res) {
        User.findOneAndUpdate(req.params.id, req.body, { new: true })
        .then(userData => {
            if (!userData) {
                return res.status(404).json({ message: "User Not Found"});
            }
            res.json(userData);
        })
        .catch(err => res.status(500).json(err));
    },

    deleteUserById(req, res) {
        User.findOneAndDelete(req.params.id)
        .then(userData => {
            if (!userData) {
                return res.status(404).json({ message: "User Not Found"});
            }
            res.json({ message: "User Deleted!" });
        })
        .catch(err => res.status(500).json(err));
    },

    addFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $addToSet: { friends: req.body.friendId || req.params.friendId }},
            { new: true }
        )
        .then(userData => {
            if (!userData) {
                return res.status(404).json({ message: "User Not Found" });
            }
            res.json(userData);
        })
        .catch(err => res.status(500).json(err));
    },
    
    deleteFriend({ params }, res) {
        User.findOneAndUpdate(
            { _id: params.userId },
            { $pull: { friends: params.friendId }},
            { new: true }
        )
        .then((dbUserData) => {
            if (!dbUserData) {
                return res.status(404).json({ message: "Cannot find User ID!"});
            }
            const deleted = !dbUserData.friends.includes(params.friendId);
            if (deleted) {
                res.json({ message: "Friend deleted!", dbUserData });
            } else {
                res.json(dbUserData);
            }
        })
        .catch((err) => res.status(404).json(err));
    },
};

module.exports = userController;