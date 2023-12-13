const router = require('express').Router();
const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;

passport.use(new GitHubStrategy({
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: `https://melody-haven.onrender.com/auth/github/callback`
    },
    function(accessToken, refreshToken, profile, done) {
        process.nextTick(function() {
            return done(null, profile);
        })
    }
));

router.get('/', function (req, res) {
    if(!req.user) {
        res.send('Use /auth/github/ to login.');
    } else {
        res.send('Hello ' + req.user.displayName);
    }
    
})

router.get('/github', passport.authenticate('github', { scope: [ 'user:email' ]}));

router.get('/github/callback', passport.authenticate('github', { failureRedirect: '/api-docs', session: false }),
    function(req, res) {
        req.session.user = req.user;
        res.redirect('/');
    }
);

router.get('/logout', function(req, res) {
    req.session.destroy(function (err) {
        res.redirect('/');
    })
})

module.exports = router;