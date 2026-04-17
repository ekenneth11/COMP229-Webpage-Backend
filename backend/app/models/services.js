let mongoose = require('mongoose');

let servicesModel = mongoose.Schema(
    {
        title: String,
        description: String,
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    },
    {
        collection: "services"
    }
);


// Ensure virtual fields are serialised.
servicesModel.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id
    }
});

module.exports = mongoose.model("Services", servicesModel);