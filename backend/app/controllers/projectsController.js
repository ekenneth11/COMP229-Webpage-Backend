let projectsModel = require('../models/projects');

//getting all projects
module.exports.projectsGetAll = async (req, res, next) =>{
    try{
        let list = await projectsModel.find({});

        res.json({
            success: true,
            message: "Projects list retrieved successfully",
            data: list
        });
    }catch (error){
        console.log(error);
        next(error);
    }
}

//getting a projects by ID
module.exports.projectsGetID = async (req, res, next) => {
    try{
        let projects = await projectsModel.find({_id: req.params.id});

        if(!projects){ //project not in the database
            throw new Error("Projects not found. Are you sure it exists?")
        }
        res.json({
            success: true,
            message: "Projects list retrieved successfully",
            data: projects
        });
    }catch (error){
        console.log(error);
        next(error);
    }
}

//adding a new projects
module.exports.projectsNewItem = async (req, res, next) => {
    try{
        let newProjects = new projectsModel(req.body);
        
        let result = await projectsModel.create(newProjects);
        console.log(result);

        res.json({
            success: true,
            message: "Projects added successfully",
            data: result
        });
    }catch (error){
        console.log(error);
        next(error);
    }
}

//edit a projects by ID
module.exports.projectsUpdateByID = async (req, res, next) => {
    try{
        let id = req.params.id;

        //since were making a new model, it will make a different id
        let updateProjects = new projectsModel(req.body);
        //making the newly created model the same id
        updateProjects._id = id;

        let result = await projectsModel.updateOne({_id:id}, updateProjects);

        if (result.modifiedCount > 0){
            res.json({
                success: true,
                message: "Projects edited successfully",
            });
        }else{
            throw new Error('Projects not updated. Are you sure it exists?')
        }
    }catch (error){
        console.log(error);
        next(error);
    }
}

//deleting a projects by ID
module.exports.projectsDeleteByID = async (req, res, next) => {
    try{
        let id = req.params.id;
        
        let result = await projectsModel.deleteOne({_id: id});

        if (result.deletedCount > 0){
            res.json({
                success: true,
                message: "Projects deleted successfully",
            });
        }else{
            throw new Error('Projects not deleted. Are you sure it exists?')
        }
    }catch (error){
        console.log(error);
        next(error);
    }
}
