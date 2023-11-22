const User = require("../../models/user");
const Event = require("../../models/event");
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
const singleEvent = async (eventId) => {
  try {
    const event = await Event.findOne(eventId);
    return {
      ...event._doc,
      _id: event.id,
      creator: user.bind(this, event.creator),
    };
  } catch (error) {}
};

exports.user = user;
exports.singleEvent = singleEvent;
exports.events = events;
