const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../../models/user");
module.exports = {
  // events: async () => {
  //   const event = await Event.find();
  //   return event;
  // },

  createUser: async (args) => {
    const existingUser = await User.findOne({
      email: args.userInput.email,
    });
    if (existingUser) {
      throw new Error("User exist already");
    }
    const updatePassword = await bcrypt.hash(args.userInput.password, 12);
    const user = new User({
      email: args.userInput.email,
      password: updatePassword,
    });

    return user
      .save()
      .then((res) => {
        console.log("user save success", res);
        return { ...res._doc, password: null, _id: res.id };
      })
      .catch((error) => {
        console.log("Saving event failed");
        throw error;
      });
  },
  login: async ({ email, password }) => {
    console.log(email, password);
    const user = await User.findOne({ email: email });
    if (!user) {
      throw new Error("User doesn't not exist");
    }
    const isEqual = await bcrypt.compare(password, user.password);
    if (!isEqual) {
      throw new Error("Password doesn't match");
    }
    const token = jwt.sign(
      {
        userId: user.id,
        email: user.email,
      },
      "somesupersecretKey",
      {
        expiresIn: "1h",
      }
    );
    return {
      userId: user.id,
      token: token,
      tokenExpiration: 1,
    };
  },
};
