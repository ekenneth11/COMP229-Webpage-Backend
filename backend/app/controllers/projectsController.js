let projectsModel = require('../models/projects');
let userModel = require('../models/user');

//getting all projects
module.exports.projectsGetAll = async (req, res, next) =>{
    try{
        let list = await projectsModel.find({}).populate('owner');

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
        let projects = await projectsModel.find({_id: req.params.id}).populate('owner');

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
        // If owner is provided, look up the user by email to get their ObjectId
        if (req.body.owner) {
            const user = await userModel.findOne({ email: req.body.owner });
            if (!user) {
                throw new Error(`User with email "${req.body.owner}" not found`);
            }
            req.body.owner = user._id; // Store the ObjectId, not the email string
        }

        let newProjects = new projectsModel(req.body);
        
        let result = await projectsModel.create(newProjects);
        console.log(result);

        // Populate the owner before returning so frontend gets user details
        let populatedResult = await projectsModel.findById(result._id).populate('owner');

        res.json({
            success: true,
            message: "Projects added successfully",
            data: populatedResult
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

        // If owner is being updated, look up the user by email to get their ObjectId
        if (req.body.owner) {
            const user = await userModel.findOne({ email: req.body.owner });
            if (!user) {
                throw new Error(`User with email "${req.body.owner}" not found`);
            }
            req.body.owner = user._id; // Store the ObjectId, not the email string
        }

        let updateProjects = new projectsModel(req.body);
        updateProjects._id = id;

        let result = await projectsModel.updateOne({_id:id}, updateProjects);

        if (result.modifiedCount > 0){
            // Return the updated project with populated owner
            let updatedProject = await projectsModel.findById(id).populate('owner');
            res.json({
                success: true,
                message: "Projects edited successfully",
                data: updatedProject
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
