let mongoose = require('mongoose');

let usersModel = mongoose.Schema(
    {
        firstName: String,
        lastName: String,
        email: String,
        password: String,
        created: Date,
        updated: Date
    },
    {
        collection: "users"
    }
);


// Ensure virtual fields are serialised.
usersModel.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id
    }
});

module.exports = mongoose.model("Users", usersModel);