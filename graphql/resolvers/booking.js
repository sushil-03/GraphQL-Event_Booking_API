const Event = require("../../models/event");
const User = require("../../models/user");
const { user, singleEvent } = require("./merge");
const Booking = require("../../models/booking");
module.exports = {
  // events: async () => {
  //   const event = await Event.find();
  //   return event;
  // },

  bookings: async (args, req) => {
    if (!req.isAuth) {
      throw new Error("User not login ");
    }
    try {
      const bookings = await Booking.find();
      return bookings.map((booking) => {
        return {
          ...booking._doc,
          _id: booking.id,
          user: user.bind(this, booking._doc.user),
          event: singleEvent.bind(this, booking._doc.event),
          createdAt: new Date(booking._doc.createdAt).toISOString(),
          updatedAt: new Date(booking._doc.updatedAt).toISOString(),
        };
      });
    } catch (error) {
      throw error;
    }
  },

  bookEvent: async (args, req) => {
    if (!req.isAuth) {
      throw new Error("User not login ");
    }
    const fetchedEvent = await Event.findOne({ _id: args.eventId });
    const booking = new Booking({
      user: "655b3198e13c5b862ce62394",
      event: fetchedEvent,
    });
    const result = await booking.save();
    console.log("results", result);
    console.log("*************************8");

    console.log("results", result.createdAt);
    return {
      ...result,
      _id: result.id,
      user: user.bind(this, booking._doc.user),
      event: singleEvent.bind(this, booking._doc.event),
      createdAt: new Date(result.createdAt).toISOString(),
      updatedAt: new Date(result.updatedAt).toISOString(),
    };
  },
  cancelBooking: async (args, req) => {
    if (!req.isAuth) {
      throw new Error("User not login ");
    }
    try {
      const booking = await Booking.findById(args.eventId).populate("event");
      console.log("booking", booking);
      const event = {
        ...booking.event._doc,
        _id: booking.event._id,
        creator: user.bind(this, booking.event._doc.creator),
      };

      await Booking.deleteOne({ _id: args.bookingId });
      return event;
    } catch (error) {
      throw error;
    }
  },
};
