var LocalStrategy = require('passport-local').Strategy;
var uuid = require('node-uuid');
var async = require('async');
var nodemailer = require('nodemailer');
var crypto = require('crypto');
var values = require('object.values');

var settings = require('./settings');
var api = require('./bin/api');

//config nodemailer
var smtpConfig = {
    host: settings.transporter.host,
    port: settings.transporter.port,
    secure: true, // use SSL
    auth: {
        user: settings.transporter.email,
        pass: settings.transporter.password
    }
};

var transporter = nodemailer.createTransport(smtpConfig);

module.exports = function(passport) {

    passport.serializeUser(function(user, done) {

        // if(!user.error){
        done(null, user.token);

    });

    passport.deserializeUser(function(req, token, done) {

        api.setToken(token);
        api.findResource(req, 'user').call('search', {
            'token': token
        }).then(function(user) {
            done(null, values(user)[0]);
        });
    });


    passport.use('local-login', new LocalStrategy({
            usernameField: 'username',
            passwordField: 'password',
            passReqToCallback: true
        },
        function(req, username, password, done) {

            var data = {};
            data.username = username;
            data.password = password;

            api.findResource(req, 'user').call('login', data).then(function(user) {
                console.log("user login", user)
                if (user.error) {
                    return done(null, false, req.flash('loginMessage', user.error));
                } else {
                    return done(null, user);
                }
            });
        }));

    passport.use('local-signup', new LocalStrategy({
            usernameField: 'username',
            passwordField: 'password',
            passReqToCallback: true
        },
        function(req, username, password, done) {
            var data = {};
            data.username = username;
            data.password = password;
            data.email = req.body.email;

            api.findResource(req, 'user').call('exist', { "username": username }).then(function(exist) {

                if (exist.error) {

                    return done(null, false, req.flash('signupMessage', "User already exist!"));

                } else {
                    api.findResource(req, 'user').call('create', data).then(function(user) {

                        // user = user[user.uuid];
                        return done(null, user)
                    });

                }
            });
        }));

};