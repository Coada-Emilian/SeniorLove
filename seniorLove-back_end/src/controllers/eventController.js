// Purpose: Controller for events

import { Event, Hobby } from '../models/associations.js';

// Event controller object
const eventController = {
  // Get all events
  getAllEvents: async (req, res) => {
    // Get all events via the Event model while including the Hobby model
    const allEvents = await Event.findAll({
      include: [{ model: Hobby, as: 'hobbies' }],
      order: [['date', 'ASC']],
    });
    // If no events are found, return an error
    if (!allEvents) {
      return res.status(404).json({
        message:
          'No events found. Please try again later or check your search criteria.',
      });
    }
    // Send the result as is
    res.status(200).json(allEvents);
  },

  // Get one event
  getOneEvent: async (req, res) => {
    // Get the id from the request parameters
    const id = parseInt(req.params.eventId);
    // Check if the id is a number
    if (isNaN(id)) {
      return res
        .status(400)
        .json({ message: 'This ID is not valid. Please provide a valid ID.' });
    }
    // Get one event by id via the Event model while including the Hobby model
    const oneEvent = await Event.findByPk(id, {
      include: [{ model: Hobby, as: 'hobbies' }],
    });
    // If the event does not exist, return an error
    if (!oneEvent) {
      return res
        .status(404)
        .json({ message: 'Event not found. Please check the ID provided.' });
    }
    res.status(200).json(oneEvent);
  },
};

export default eventController;
