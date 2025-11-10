const jwt = require("jsonwebtoken");
const User = require('../Modals/Signupmodal.js');
const bcrypt=require("bcrypt");

exports.registerUser = async(req,res)=>{
    const{username,email,password}=req.body;
    try{
        const userExists = await User.findOne((email));
        if(userExists) return res.status(400).json({message:"user already exits"});
         
        const hashpasswords = await bcrypt.hash(password,10);
        const user = await new User({username,email,password: hashpasswords });
        const userSave = await user.save();
        res.status(201),json(userSave);
    }catch(err){
        res.status(500).json({message: "servor error",error:err.message});
    }
}
exports.loginUser = async(req,res)=>{
    const{email,password}=req.body;

    try{
        const userAdd = await User.findOne({email});
        if(!userAdd){
            return res.status(401).json({message: "user not register"});
        }
        const idPasswordCorrect= await bcrypt.compare(password, userAdd.password);
        if (!idPasswordCorrect) {
            return res.status(401).json({ message: "Incorrect password" });
        }

        res.status(200).json({ message: "Login successful" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

exports.signupUser = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({
      username,
      email,
      password: hashedPassword
    });

    // Save to MongoDB
    await newUser.save();
    console.log('User saved successfully:', newUser._id); 
    // Return user (without password)
    const userData = {
      _id: newUser._id,
      username: newUser.username,
      email: newUser.email
    };

    res.status(201).json({ message: "Signup successful", user: userData });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
