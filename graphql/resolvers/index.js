const bcrypt = require("bcryptjs");
const Event = require("../../models/event");
const User = require("../../models/user");

const user = async (userId) => {
  try {
    const user = await User.findById(userId);
    return {
      ...user._doc,
      _id: user.id,
      createdEvent: events.bind(this, user._doc.createdEvent),
    };
  } catch (error) {
    console.log("Something went wrong");
  }
};
const events = async (eventIds) => {
  try {
    const events = await Event.find({ _id: { $in: eventIds } });
    return events.map((event) => {
      return {
        ...event._doc,
        _id: event.id,
        creator: user.bind(this, event._doc.creator),
      };
    });
  } catch (error) {
    console.log("Something went wrong");
  }
};
module.exports = {
  // events: async () => {
  //   const event = await Event.find();
  //   return event;
  // },
  events: async () => {
    try {
      const event = await Event.find().then((events) => {
        return events.map((event) => {
          return {
            ...event._doc,
            // _id: event._doc._id.toString(),
            _id: event.id,
            creator: user.bind(this, event._doc.creator),
          };
        });
      });
    } catch (error) {
      console.log("erro", error);
    }
  },

  createEvent: (args) => {
    const event = new Event({
      title: args.eventInput.title,
      description: args.eventInput.description,
      price: +args.eventInput.price,
      date: new Date(args.eventInput.date),
      creator: "655b3198e13c5b862ce62394",
    });

    return event
      .save()
      .then(async (res) => {
        const existing_user = await User.findById("655b3198e13c5b862ce62394");
        if (!existing_user) {
          throw new Error("No user exist");
        }

        existing_user.createdEvent.push(event);
        await existing_user.save();
        console.log("save success", res);
        return { ...res._doc, creator: user.bind(this, res._doc.creator) };
      })
      .catch((error) => {
        console.log("Saving event failed");
        throw error;
      });

    // const event = {
    //   _id: Math.random().toString(),
    //   title: args.eventInput.title,
    //   description: args.eventInput.description,
    //   price: +args.eventInput.price,
    //   date: args.eventInput.date,
    // };
    // events.push(event);
    // return event;
  },
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
};
