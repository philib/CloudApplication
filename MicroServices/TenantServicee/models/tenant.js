var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');

var Company = {
    name: String,
    address: String,
    openings: [{
        day: String,
        from: String,
        until: String,
    }]
}

var TenantSchema = new Schema({
    _id: Schema.Types.ObjectId,
    name: {type: String, unique: true},
    password: String,
    configuration: {
        bot_url: String,
        logo: String,
        botName: String,
        backgroundColor: String,
        cars: [{
            name: String,
            description: String
        }],
        reseller: [Company],
        repairService: [Company],
        news: [{
            date: Date,
            title: String,
            description: String
        }],
        chatHistory: [{
            sessionToken: String,
            userInput: String,
            botOutput: String
        }]
    },
    created: Date,
    updated: Date
});

TenantSchema.pre('save', function (next) {
    var user = this;
    var currentDate = Date.now();

    this._id = mongoose.Types.ObjectId();

    if (!this.created) {
        this.created = currentDate;
    }
    this.updated = currentDate;

    bcrypt.hash(this.password, 10, function (err, hash) {
        if (err) return next(err);
        user.password = hash;
        next();
    });
});

module.exports = mongoose.model('Tenant', TenantSchema);