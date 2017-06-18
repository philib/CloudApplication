var express = require('express');
var tenantModel = require('../models/tenant');
var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
var config = require('config');
var jwt = require('jsonwebtoken')

exports.register = function (req, res, next) {
    var tenant = new tenantModel();
    tenant.name = req.body.name;
    tenant.password = req.body.password;

    tenant.save(function (err, data) {
        if (err) {
            return next(err)
        }
        return res.json(data);
    });
}

exports.login = function (req, res, next) {
    var tenant = req.body.name;
    var password = req.body.password;

    tenantModel.findOne({name: tenant}).exec(function (err, data) {
        if (err) return next(err);
        bcrypt.compare(password, data.password).then(function (success) {
            if (success) {
                var token = jwt.sign(data, config.JWTSecret, {
                    expiresIn: "365d" // expires after 1 year
                });
                return res.json({
                    success: true,
                    message: 'Enjoy your token!',
                    tenant: data,
                    token: token
                });
            } else {
                return res.status(401).json({msg: "Password or Name wrong"})
            }
        });
    })
}