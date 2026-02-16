let ProjectsModel = require('../models/projects');

//returns all the projects in the database
module.exports.projectsGetAll = async (req, res, body) =>{
    try{
        let list = await ProjectsModel.find({});

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

//returns project by ID
module.exports.projectsGetID = async (req, res, body) => {
    try{
        let project = await ProjectsModel.find({_id: req.params.id});

        if(!project){ //project not in the database
            throw new Error("Project not found. Are you sure it exists?")
        }
        res.json({
            success: true,
            message: "Project list retrieved successfully",
            data: project
        });
    }catch (error){
        console.log(error);
        next(error);
    }
}

//adding a new project to the database
module.exports.projectsNewItem = async (req, res, body) => {
    try{
        let newProject = new ProjectsModel(req.body);
        
        let result = await ProjectsModel(newProject);
        console.log(result);

        res.json({
            success: true,
            message: "Project added successfully",
            data: result
        });
    }catch (error){
        console.log(error);
        next(error);
    }
}

//update a project by ID
module.exports.projectsUpdateByID = async (req, res, body) => {
    try{
        let id = res.params.id;

        //since were making a new model, it will make a different id
        let updateProject = new ProjectsModel(req.body);
        //making the newly created model the same id
        updateProject._id = id;

        let result = await ProjectsModel.updateOne({_id:id}, updateProject);

        if (result.modifiedCount > 0){
            res.json({
                success: true,
                message: "Project edited successfully",
            });
        }else{
            throw new Error('Project not updated. Are you sure it exists?')
        }
    }catch (error){
        console.log(error);
        next(error);
    }
}

module.exports.projectsDeleteByID = async (req, res, body) => {
    try{
        let id = res.params.id;
        
        let result = await ProjectsModel.deleteOne({_id: id});

        if (result.deletedCount > 0){
            res.json({
                success: true,
                message: "Project deleted successfully",
            });
        }else{
            throw new Error('Project not deleted. Are you sure it exists?')
        }
    }catch (error){
        console.log(error);
        next(error);
    }
}