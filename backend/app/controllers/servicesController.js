let serviceModel = require('../models/services');

//getting all services
module.exports.serviceGetAll = async (req, res, body) =>{
    try{
        let list = await serviceModel.find({});

        res.json({
            success: true,
            message: "Service list retrieved successfully",
            data: list
        });
    }catch (error){
        console.log(error);
        next(error);
    }
}

//getting a service by ID
module.exports.getServiceByID = async (req, res, body) => {
    try{
        let service = await serviceModel.find({_id: req.params.id});

        if(!service){ //project not in the database
            throw new Error("Service not found. Are you sure it exists?")
        }
        res.json({
            success: true,
            message: "Service list retrieved successfully",
            data: service
        });
    }catch (error){
        console.log(error);
        next(error);
    }
}

//adding a new service
module.exports.addNewService = async (req, res, body) => {
    try{
        let newService = new serviceModel(req.body);
        
        let result = await serviceModel(newService);
        console.log(result);

        res.json({
            success: true,
            message: "Service added successfully",
            data: result
        });
    }catch (error){
        console.log(error);
        next(error);
    }
}

//edit a service by ID
module.exports.editServiceByID = async (req, res, body) => {
    try{
        let id = res.params.id;

        //since were making a new model, it will make a different id
        let updateService = new serviceModel(req.body);
        //making the newly created model the same id
        updateService._id = id;

        let result = await serviceModel.updateOne({_id:id}, updateService);

        if (result.modifiedCount > 0){
            res.json({
                success: true,
                message: "Service edited successfully",
            });
        }else{
            throw new Error('Service not updated. Are you sure it exists?')
        }
    }catch (error){
        console.log(error);
        next(error);
    }
}

//deleting a service by ID
module.exports.deleteServiceByID = async (req, res, body) => {
    try{
        let id = res.params.id;
        
        let result = await serviceModel.deleteOne({_id: id});

        if (result.deletedCount > 0){
            res.json({
                success: true,
                message: "Service deleted successfully",
            });
        }else{
            throw new Error('Service not deleted. Are you sure it exists?')
        }
    }catch (error){
        console.log(error);
        next(error);
    }
}