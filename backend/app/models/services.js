let mongoose = require('mongoose');

let servicesModel = mongoose.Schema(
    {
        title: String,
        description: String,
    },
    {
        collection: "services"
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

module.exports = mongoose.model("Services", servicesModel);