const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");
const User = require("../models/userModels");

const userRegister = async (req, res) => {
  //   1. email exists or not?
  const emailExist = await User.exists({ email: req.body.email });
  const phoneNumberExist = await User.exists({
    phoneNumber: req.body.phoneNumber,
  });

  if (emailExist) return res.status(409).send({ msg: "Email already exist!" });
  if (phoneNumberExist)
    return res.status(409).send({ msg: "PhoneNumber already exist!" });

  // yes exists:
  //-------> return msg email taken
  // no exists:
  //2. password hash
  req.body.password = await bcrypt.hash(req.body.password, saltRounds);
  //3. save to db
  User.create(req.body);
  res.send({ msg: req.body.fullName + " created successfully" });
};

let userID = "";

const userLogin = async (req, res) => {
  const { phoneNumber, password } = req.body;
  //STEP 1: check if email exists
  const user = await User.findOne({ phoneNumber });

  if (!user) return res.status(401).send({ msg: "Invalid Email!!" });

  userID = user.phoneNumber;
  //STEP 2: Compare the password

  const isPasswordMatched = await bcrypt.compare(password, user.password);

  if (!isPasswordMatched)
    return res.status(401).send({ msg: "Invalid Password!!" });

  //STEP 3: Generate unique token for the user to mark that he is logged in
  const token = jwt.sign({ phoneNumber }, process.env.SECRET_KEY);

  res.send({
    token,
    user,
    msg: "login!!",
  });
};

const userData = async (req, res) => {
  try {
    const { phoneNumber } = req.params;
    const user = await User.findOne({ phoneNumber });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving user", error });
  }
};

const senduserdata = async (req, res) => {
  try {

    const userData = await User.find();

    res.status(200).json(userData);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({
      message: 'Error fetching data',
      error: error.message,
    });
  }
};


const removeUser = async (req, res) => {
  const { id } = req.body;

  try {
    const userID = await User.findById(id);

    if (!userID) {
      return res.status(404).json({ error: "News not user" });
    }

    await User.findByIdAndDelete(id);

    // Send the success response
    return res.status(200).json({ message: "user deleted successfully" });
  } catch (error) {
    console.error("Error removing user:", error);

    // Ensure only one response is sent
    if (!res.headersSent) {
      return res.status(500).json({ error: "Failed to remove user" });
    }
  }
};



module.exports = { userRegister, userData, userLogin, senduserdata,removeUser };
