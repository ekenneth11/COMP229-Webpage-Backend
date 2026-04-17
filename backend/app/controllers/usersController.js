let usersModel = require('../models/users');

//getting all users
module.exports.usersGetAll = async (req, res, next) =>{
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
module.exports.getUserByID = async (req, res, next) => {
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
module.exports.addNewUser = async (req, res, next) => {
    try{
        let newUser = new usersModel(req.body);
        
        let result = await usersModel.create(newUser);
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
module.exports.editUserByID = async (req, res, next) => {
    try{
        let id = req.params.id;

        if (req.body.password) {
            let tempUser = new usersModel();
            tempUser.password = req.body.password;
            req.body.hashed_password = tempUser.hashed_password;
            req.body.salt = tempUser.salt;
            delete req.body.password;
        }

        let updatedUser = await usersModel.findByIdAndUpdate(
            id,
            { $set: req.body },
            { new: true, runValidators: true }
        );

        if (!updatedUser){
            throw new Error('User not updated. Are you sure it exists?')
        }

        res.json({
            success: true,
            message: "User edited successfully",
            data: updatedUser
        });
    }catch (error){
        console.log(error);
        next(error);
    }
}

//deleting a user by ID
module.exports.deleteUserByID = async (req, res, next) => {
    try{
        let id = req.params.id;
        
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
