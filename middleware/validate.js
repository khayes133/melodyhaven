const validator = require('../helper/validate');

// Create saveUser, saveAlbum, saveThread middleware functions
// that will be used to validate the request body

const saveUser = async (req, res, next) => {
    const validationRule = {
        email: 'required|email',
        username: 'required|string',
        name: 'required|string',
        avatarImg: 'required|string',
    };
    
    await validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            res.status(412)
                .send({
                    success: false,
                    message: 'Validation failed',
                    data: err
                });
        } else {
            next();
        }
    }).catch( err => console.log(err))
};

const saveAlbum = async (req, res, next) => {
    const validationRule = {
        artist: 'required',
        albumName: 'required|string',
        coverImage: 'required|string',
        recordLabel: 'required|string',
    };
    
    await validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            res.status(412)
                .send({
                    success: false,
                    message: 'Validation failed',
                    data: err
                });
        } else {
            next();
        }
    }).catch( err => console.log(err))
};

const saveThread = async (req, res, next) => {
    const validationRule = {
        threadTitle: 'required|email',
        threadContent: 'required|string',
    };
    
    await validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            res.status(412)
                .send({
                    success: false,
                    message: 'Validation failed',
                    data: err
                });
        } else {
            next();
        }
    }).catch( err => console.log(err))
};

const savePost = async (req, res, next) => {
    const validationRule = {
        postContent: 'required|string',
    };
    
    await validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            res.status(412)
                .send({
                    success: false,
                    message: 'Validation failed',
                    data: err
                });
        } else {
            next();
        }
    }).catch( err => console.log(err))
};

module.exports = {
    saveUser,
    saveAlbum,
    saveThread,
    savePost
};