var express = require('express');
var tenantModel = require('../models/tenant');
var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
var config = require('config');
var jwt    = require('jsonwebtoken')

exports.getAllTenants = function (req, res, next) {
    var namequery = req.query.name;
    if(namequery){
        tenantModel.find({name:  { $regex : new RegExp(namequery, "i") }},"_id name").exec(function (err, data) {
            if (err) return next(err);
            if(data.length > 0){
                return res.json(data[0]);
            }else {
                return res.status(404).json("not found")
            }

        })
    }else {
        tenantModel.find({},"_id name").exec(function (err, data) {
            if (err) return next(err);
            return res.json(data);
        })
    }
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


//TEST ONLY
exports.delete = function (req, res, next) {
    var tenantId = req.params.tenantId;

    tenantModel.remove({ _id: tenantId }, function (err) {
        if (err) return handleError(err);
        // removed!
        return res.json("success")
    });
}