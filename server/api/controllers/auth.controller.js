const User = require("../models/user");
exports.register = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email) {
      return res.status(400).json({ message: "Email are required." });
    } else if (!password) {
      return res.status(400).json({ message: "password are required." });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "Email already exists." });
    }
    //create new user
    const userData = req.body;
    const user = await new User(userData).save();

    // Return a successful response
    return res.status(201).json({
      user: {
        user_id: user._id,
        email: email,
      },
      message: "User created successfully.",
    });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const registerUser = await User.findOne({ email });
    if (!registerUser) {
      return res.status(400).json({ message: "Email doesn't exist" });
    } else if (registerUser.password !== password) {
      return res.status(400).json({ message: "Password didn't match" });
    }
    return res.status(201).json({
      message: "user login successfully",
      token: "khaskdhaskdhaksdhakshdad",
    });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
