const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    try {
        const result = await mongodb.getDatabase().db().collection('albums').find();
        const albums = await result.toArray();

        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(albums);
    } catch (error) {
        console.error('Error in getAll:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const getSingle = async (req, res) => {
    try {
        if (!ObjectId.isValid(req.params.id)) {
            res.status(400).json({ error: 'Invalid ID' });
        }
        const albumId = new ObjectId(req.params.id);
        const result = await mongodb.getDatabase().db().collection('albums').find({ _id: albumId });
        const albums = await result.toArray();

        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(albums[0]);
        
    } catch (error) {
        console.error('Error in getSingle:', error);
        res.status(500).json({ error: 'User not found' });
    }
};

const createAlbum = async (req, res) => {
    const album = {
        artist: req.body.artist,
        albumName: req.body.albumName,
        coverImage: req.body.coverImage,
        recordLabel: req.body.recordLabel,
        // Number of Threads was not added to the model because
        // it should not be hard coded. It should be calculated
        // with a subquery.
    };

    const response = await mongodb.getDatabase().db().collection('albums').insertOne(album);
    if (response.acknowledged) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Unknown error while creating album');
    }
};

const updateAlbum = async (req, res) => {
    const albumId = new ObjectId(req.params.id);
    const album = {
        artist: req.body.artist,
        albumName: req.body.albumName,
        coverImage: req.body.coverImage,
        recordLabel: req.body.recordLabel,
    };

    const response = await mongodb.getDatabase().db().collection('albums').replaceOne({ _id: albumId }, album);
    if (response.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Unknown error while updating album');
    }
};

const deleteAlbum = async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json({ error: 'Invalid ID' });
    }
    const albumId = new ObjectId(req.params.id);
    const response = await mongodb.getDatabase().db().collection('albums').deleteOne({ _id: albumId });
    if (response.deletedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Unknown error while deleting album');
    }
};


module.exports = {
    getAll,
    getSingle,
    createAlbum,
    updateAlbum,
    deleteAlbum
};