let referenceModel = require('../models/references');

//getting all References
module.exports.referenceGetAll = async (req, res, body) =>{
    try{
        let list = await referenceModel.find({});

        res.json({
            success: true,
            message: "Reference list retrieved successfully",
            data: list
        });
    }catch (error){
        console.log(error);
        next(error);
    }
}

//getting a reference by ID
module.exports.getReferenceByID = async (req, res, body) => {
    try{
        let reference = await referenceModel.find({_id: req.params.id});

        if(!reference){ //project not in the database
            throw new Error("Reference not found. Are you sure it exists?")
        }
        res.json({
            success: true,
            message: "Reference list retrieved successfully",
            data: reference
        });
    }catch (error){
        console.log(error);
        next(error);
    }
}

//adding a new reference
module.exports.addNewReference = async (req, res, body) => {
    try{
        let newReference = new referenceModel(req.body);
        
        let result = await referenceModel(newReference);
        console.log(result);

        res.json({
            success: true,
            message: "Reference added successfully",
            data: result
        });
    }catch (error){
        console.log(error);
        next(error);
    }
}

//edit a reference by ID
module.exports.editReferenceByID = async (req, res, body) => {
    try{
        let id = res.params.id;

        //since were making a new model, it will make a different id
        let updateReference = new referenceModel(req.body);
        //making the newly created model the same id
        updateReference._id = id;

        let result = await referenceModel.updateOne({_id:id}, updateReference);

        if (result.modifiedCount > 0){
            res.json({
                success: true,
                message: "Reference edited successfully",
            });
        }else{
            throw new Error('Reference not updated. Are you sure it exists?')
        }
    }catch (error){
        console.log(error);
        next(error);
    }
}

//deleting a refrence by ID
module.exports.deleteReferenceByID = async (req, res, body) => {
    try{
        let id = res.params.id;
        
        let result = await referenceModel.deleteOne({_id: id});

        if (result.deletedCount > 0){
            res.json({
                success: true,
                message: "Reference deleted successfully",
            });
        }else{
            throw new Error('Reference not deleted. Are you sure it exists?')
        }
    }catch (error){
        console.log(error);
        next(error);
    }
}