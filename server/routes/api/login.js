var express = require('express');
var router = express.Router();
var JSONAPISerializer = require('jsonapi-serializer').Serializer;
var users = [{
    id: "1",
    username: "Nicholas",
    lastName: "McClay",
    email: "nmcclay@nickmcclay.com",
    password: 'Secret',
    role: 'admin'
}];
var serializer = new JSONAPISerializer('users', {
    attributes: ['firstName', 'lastName', 'email'],
});
module.exports = users;