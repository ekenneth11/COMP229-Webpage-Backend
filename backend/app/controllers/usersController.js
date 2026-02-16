let usersModel = require('../models/users');

//getting all users
module.exports.usersGetAll = async (req, res, body) =>{
    try{
        let list = await usersModel.find({});

        res.json({
            success: true,
            message: "User list retrieved successfully",
            data: list
        });
    }catch (error){
        console.log(error);
        next(error);
    }
}

//getting a user by ID
module.exports.getUserByID = async (req, res, body) => {
    try{
        let user = await usersModel.find({_id: req.params.id});

        if(!user){ //project not in the database
            throw new Error("User not found. Are you sure it exists?")
        }
        res.json({
            success: true,
            message: "User list retrieved successfully",
            data: user
        });
    }catch (error){
        console.log(error);
        next(error);
    }
}

//adding a new user
module.exports.addNewUser = async (req, res, body) => {
    try{
        let newUser = new usersModel(req.body);
        
        let result = await usersModel(newService);
        console.log(result);

        res.json({
            success: true,
            message: "User added successfully",
            data: result
        });
    }catch (error){
        console.log(error);
        next(error);
    }
}

//edit a user by ID
module.exports.editUserByID = async (req, res, body) => {
    try{
        let id = res.params.id;

        //since were making a new model, it will make a different id
        let updateUser = new usersModel(req.body);
        //making the newly created model the same id
        updateReference._id = id;

        let result = await usersModel.updateOne({_id:id}, updateUser);

        if (result.modifiedCount > 0){
            res.json({
                success: true,
                message: "User edited successfully",
            });
        }else{
            throw new Error('User not updated. Are you sure it exists?')
        }
    }catch (error){
        console.log(error);
        next(error);
    }
}

//deleting a user by ID
module.exports.deleteUserByID = async (req, res, body) => {
    try{
        let id = res.params.id;
        
        let result = await usersModel.deleteOne({_id: id});

        if (result.deletedCount > 0){
            res.json({
                success: true,
                message: "User deleted successfully",
            });
        }else{
            throw new Error('User not deleted. Are you sure it exists?')
        }
    }catch (error){
        console.log(error);
        next(error);
    }
}
