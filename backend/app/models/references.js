let mongoose = require('mongoose');

let referencesModel = mongoose.Schema(
    {
        firstName: String,
        lastName: String,
        email: String,
        position: String,
        company: String
    },
    {
        collection: "references"
    }
);


// Ensure virtual fields are serialised.
projectsModel.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id
    }
});

module.exports = mongoose.model("References", referencesModel);