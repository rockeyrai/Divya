const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const User = require('../models/userModels');



const userRegister= async (req, res) => {
//   1. email exists or not?
        const emailExist = await User.exists({email: req.body.email})
        if(emailExist) return res.status(409).send({msg: "Email already exist!"})
        // yes exists: 
            //-------> return msg email taken
        // no exists:
            //2. password hash
            req.body.password = await bcrypt.hash(req.body.password, saltRounds);
            //3. save to db
            User.create(req.body)
            res.send({msg: req.body.fullName + " created successfully"})
  
}

module.exports = {userRegister}
