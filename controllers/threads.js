const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    try {
        const result = await mongodb.getDatabase().db().collection('threads').find();
        const threads = await result.toArray();

        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(threads);
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
        const result = await mongodb.getDatabase().db().collection('threads').find({userId: userId });
        const threads = await result.toArray();

        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(threads);
        
    } catch (error) {
        console.error('Error in getAllfromUser:', error);
        res.status(500).json({ error: 'Threads not found' });
    }
};

const getSingle = async (req, res) => {
    try {
        if (!ObjectId.isValid(req.params.threadId)) {
            res.status(400).json({ error: 'Invalid ID' });
        }
        const threadId = new ObjectId(req.params.threadId);
        const result = await mongodb.getDatabase().db().collection('threads').find({ _id: threadId });
        const threads = await result.toArray();

        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(threads[0]);
        
    } catch (error) {
        console.error('Error in getSingle:', error);
        res.status(500).json({ error: 'Thread not found' });
    }
};

const createThread = async (req, res) => {
    if (!ObjectId.isValid(req.params.userId)) {
        res.status(400).json({ error: 'Invalid userId' });
    }

    if (!ObjectId.isValid(req.params.albumId)) {
        res.status(400).json({ error: 'Invalid albumId' });
    }

    const userId = new ObjectId(req.params.userId);
    const albumId = new ObjectId(req.params.albumId);

    const thread = {
        userId: userId,
        threadTitle: req.body.threadTitle,
        threadContent: req.body.threadContent,
        albumId: albumId,
        date: new Date(),   
    };

    const response = await mongodb.getDatabase().db().collection('threads').insertOne(thread);
    if (response.acknowledged) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Unknown error while creating Thread');
    }
};

const updateThread = async (req, res) => {

    if (!ObjectId.isValid(req.params.albumId)) {
        res.status(400).json({ error: 'Invalid albumId' });
    }

    const albumId = new ObjectId(req.params.albumId);
    const threadId = new ObjectId(req.params.threadId);

    const thread = {
        threadTitle: req.body.threadTitle,
        threadContent: req.body.threadContent,
        albumId: albumId,
        date: new Date(),   
    };

    const response = await mongodb.getDatabase().db().collection('threads').replaceOne({ _id: threadId }, thread);
    if (response.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Unknown error while updating the thread');
    }
};

const deleteThread = async (req, res) => {
    if (!ObjectId.isValid(req.params.threadId)) {
        res.status(400).json({ error: 'Invalid ID' });
    }
    const threadId = new ObjectId(req.params.threadId);
    const response = await mongodb.getDatabase().db().collection('threads').deleteOne({ _id: threadId });
    if (response.deletedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Unknown error while deleting thread');
    }
};


module.exports = {
    getAll,
    getAllfromUser,
    getSingle,
    createThread,
    updateThread,
    deleteThread
};