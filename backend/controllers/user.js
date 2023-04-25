const User  = require('../models/userModel');

exports.login = async (req, res) => {
    console.log('backend part before try block')
    try {
      const { username, password } = req.body;
      console.log('username i password u kontoleru ',username," ", password);
      const user = await User.findOne({ username });
      if (!user) {
        return res.status(400).json({
          message:
            "the username you entered is not connected to an account.",
        });
      }
      if (password !== user.password) {
        return res.status(400).json({
          message: "Invalid credentials. Please try again.",
        });
      }
    //   const check = await bcrypt.compare(password, user.password);
    //   if (!check) {
    //     return res.status(400).json({
    //       message: "Invalid credentials.Please try again.",
    //     });
    //   }
      const token = generateToken({ id: user._id.toString() }, "7d");
      res.send({
        id: user._id,
        username: user.username,
        token: token,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };