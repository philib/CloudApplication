var express = require('express');
var http = require('http')
var lexruntime = require('aws-sdk/clients/lexruntime');
var config = require('config');
var tenantModel = require('../models/tenant');
var mongoose = require('mongoose');

var intent_News = "Intent_News"
var intent_CarWorkshop = "Intent_CarWorkshop"
var intent_CarRetailer = "Intent_CarRetailer"
var intent_CarTypes = "Intent_CarTypes"

var lex = new lexruntime({
    endpoint: 'https://runtime.lex.us-east-1.amazonaws.com',
    region: 'us-east-1',
    accessKeyId: config.AWS_Lex.accessKeyId,
    secretAccessKey: config.AWS_Lex.secretAccessKey
})

exports.answer = function (req, res, next) {
    var tenantId = req.params.tenantId;
    var msg = req.query.msg;
    var lex_intent = "";
    var response = {
        msg: String,
        data: Object,
        intent: String
    };
    var params = {
        botAlias: 'latest', /* required */
        botName: 'CarBot', /* required */
        inputText: msg, /* required */
        userId: 'STRING_VALUE', /* required */
        sessionAttributes: {
            '<String>': 'STRING_VALUE',
            /* '<String>': ... */
        }
    };

    lex.postText(params, function (err, data) {
        if (err) console.log(err, err.stack);
        else {
            //we need to call tenantsService here and get config,
            //depending on intent we will return the different config params
            getConfiguration(tenantId, function (configuration) {
                response.msg = "sorry, could you repeat that ?";
                response.data = null;
                response.intent = "No_Intent";
                if (data.intentName === intent_News) {
                    response.msg = "";
                    response.data = configuration.news;
                    response.intent = intent_News;
                } else if (data.intentName === intent_CarTypes) {
                    response.msg = "";
                    response.data = configuration.cars;
                    response.intent = intent_CarTypes;
                } else if (data.intentName === intent_CarWorkshop) {
                    response.msg = "";
                    response.data = configuration.repairService;
                    response.intent = intent_CarWorkshop;
                } else if (data.intentName === intent_CarRetailer) {
                    response.msg = "";
                    response.data = configuration.reseller;
                    response.intent = intent_CarRetailer;
                }
                var history = {
                    sessionToken: "",
                    userInput: msg,
                    botOutput: JSON.stringify(response)
                }
                saveConversation(tenantId, history);
                return res.json(response);
            })
        }
    });
};

var getConfiguration = function (tenantId, cb) {
    tenantModel.findById(tenantId).exec(function (err, data) {
        if (err) cb(err);
        cb(data.configuration);
    })
};

var saveConversation = function (tenantId, history) {
    tenantModel.update({_id: tenantId}, {$addToSet: {'configuration.chatHistory': history}}, function (err, result) {
        console.log(result)
    })
}

