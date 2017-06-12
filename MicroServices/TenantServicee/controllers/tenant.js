var express = require('express');
var tenantModel = require('../models/tenant');
var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var config = require('config');
var jwt    = require('jsonwebtoken')

exports.getAllTenants = function (req, res, next) {
    tenantModel.find({},"_id name").exec(function (err, data) {
        if (err) return next(err);
        return res.json(data);
    })
};

exports.getConfiguration = function (req, res, next) {
    var tenantId = req.params.tenantId
    tenantModel.findById(tenantId).exec(function (err, data) {
        if(err) return next(err);
        return res.json(data.configuration);
    })
}

exports.updateConfiguration = function (req, res, next) {
    var tenantId = req.params.tenantId;
    var config = req.body;
    tenantModel.update({_id: tenantId}, {$set: {configuration: config}}, function (err, numAffected) {
        if (err) return next(err);
        return res.json(numAffected);
    });
}