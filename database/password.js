const LocalStrategy = require('passport-local').Strategy;
const connection = require('./connection')
const bcrypt = require('bcrypt-nodejs')

module.exports = user;