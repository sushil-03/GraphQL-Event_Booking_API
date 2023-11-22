const Event = require("../../models/event");
const { user } = require("./merge");
const User = require("../../models/user");

module.exports = {
  // events: async () => {
  //   const event = await Event.find();
  //   return event;
  // },
  events: async () => {
    try {
      const events = await Event.find();

      return events.map((event) => {
        return {
          ...event._doc,
          // _id: event._doc._id.toString(),
          _id: event.id,
          creator: user.bind(this, event._doc.creator),
        };
      });
    } catch (error) {
      console.log("erro", error);
    }
  },

  createEvent: async (args, req) => {
    if (!req.isAuth) {
      throw new Error("User not login ");
    }
    const event = new Event({
      title: args.eventInput.title,
      description: args.eventInput.description,
      price: +args.eventInput.price,
      date: new Date(args.eventInput.date),
      creator: "655b3198e13c5b862ce62394",
    });

    let createdEvent;
    try {
      const res = await event.save();
      createdEvent = {
        ...res._doc,
        _id: res.id,
        creator: user.bind(this, res._doc.creator),
      };
      const existing_user = await User.findById("655b3198e13c5b862ce62394");
      if (!existing_user) {
        throw new Error("No user exist");
      }

      existing_user.createdEvent.push(event);
      await existing_user.save();
      return createdEvent;
    } catch (error) {
      console.log("Saving event failed");
    }
  },
};
