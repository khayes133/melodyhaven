const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    try {
        const result = await mongodb.getDatabase().db().collection('posts').find();
        const posts = await result.toArray();

        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(posts);
    } catch (error) {
        console.error('Error in getAll:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const getAllfromUser = async (req, res) => {
    try {
        if (!ObjectId.isValid(req.params.userId)) {
            res.status(400).json({ error: 'Invalid ID' });
        }
        const userId = new ObjectId(req.params.userId);
        const result = await mongodb.getDatabase().db().collection('posts').find({userId: userId });
        const posts = await result.toArray();

        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(posts);
        
    } catch (error) {
        console.error('Error in getAllfromUser:', error);
        res.status(500).json({ error: 'Posts not found' });
    }
};

const getSingle = async (req, res) => {
    try {
        if (!ObjectId.isValid(req.params.postId)) {
            res.status(400).json({ error: 'Invalid ID' });
        }
        const postId = new ObjectId(req.params.postId);
        const result = await mongodb.getDatabase().db().collection('posts').find({ _id: postId });
        const posts = await result.toArray();

        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(posts[0]);
        
    } catch (error) {
        console.error('Error in getSingle:', error);
        res.status(500).json({ error: 'Post not found' });
    }
};

const createPost = async (req, res) => {
    if (!ObjectId.isValid(req.params.userId)) {
        res.status(400).json({ error: 'Invalid userId' });
    }

    if (!ObjectId.isValid(req.params.threadId)) {
        res.status(400).json({ error: 'Invalid threadId' });
    }

    const userId = new ObjectId(req.params.userId);
    const threadId = new ObjectId(req.params.threadId);

    const post = {
        userId: userId,
        postContent: req.body.postContent,
        threadId: threadId,
        date: new Date(),   
    };

    const response = await mongodb.getDatabase().db().collection('posts').insertOne(post);
    if (response.acknowledged) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Unknown error while creating post');
    }
};

const updatePost = async (req, res) => {

    if (!ObjectId.isValid(req.params.postId)) {
        res.status(400).json({ error: 'Invalid postId' });
    }

    const postId = new ObjectId(req.params.postId);

    const post = {
        postContent: req.body.postContent,
        date: new Date(),   
    };

    const response = await mongodb.getDatabase().db().collection('posts').replaceOne({ _id: postId }, post);
    if (response.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Unknown error while updating the post');
    }
};

const deletePost = async (req, res) => {
    if (!ObjectId.isValid(req.params.postId)) {
        res.status(400).json({ error: 'Invalid ID' });
    }
    const postId = new ObjectId(req.params.postId);
    const response = await mongodb.getDatabase().db().collection('posts').deleteOne({ _id: postId });
    if (response.deletedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Unknown error while deleting post');
    }
};

module.exports = {
    getAll,
    getAllfromUser,
    getSingle,
    createPost,
    updatePost,
    deletePost,
};