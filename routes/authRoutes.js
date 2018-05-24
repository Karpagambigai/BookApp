const express = require('express');
const mongoose = require('mongoose');
const debug = require('debug')('app:authRoutes');
const passport = require('passport');

const db = mongoose.connect('mongodb://localhost/libraryApp');
const User = require('../../models/libraryUserModel.js');

const authRouter = express.Router();

function router(nav) {
    authRouter.route('/signUp')
        .post((req, res) => {
             const usertocreate = new User(req.body);
             usertocreate.save((err, useradded) => {
              if (err) {
                res.status(500).send(err);
              }
              else {
                req.login(useradded, () => {
                  res.redirect('/auth/profile');
                });
              }
             });
        });
    authRouter.route('/signIn')
        .get((req, res) => {
            res.render('signin', {
                nav,
                title: 'Sign In'
            });
        })
        .post(passport.authenticate('local', {
            successRedirect: '/auth/profile',
            failureRedirect: '/'
        }));
    authRouter.route('/profile')
        .all((req, res, next) => {
            if (req.user) {
                next();
            } else {
                res.redirect('/');
            }
        })
        .get((req, res) => {
            debug(req.body);
            res.json(req.user);
        });
    return authRouter;
}

module.exports = router;
