// Purpose: Handle all requests related to messages between users

import Joi from 'joi';
import { Op } from 'sequelize';

import { isActiveUser } from '../utils/checkUserStatus.js';
import { User_message, User } from '../models/index.js';

// Message controller object
const messageController = {
  // Get all user messages
  getAllUserMessages: async (req, res) => {
    // Get id
    const id = parseInt(req.user.userId, 10);
    // Check if id is a number
    if (isNaN(id)) {
      return res
        .status(400)
        .json({ message: 'This ID is not valid. Please provide a valid ID.' });
    }

    // Recuperate the messages that have the sender_id or receiver_id equal to the id via the User_message model
    // Include the sender and receiver data
    const messages = await User_message.findAll({
      where: { [Op.or]: [{ sender_id: id }, { receiver_id: id }] },
      attributes: { exclude: 'updated_at' },
      include: [
        { association: 'sender', attributes: ['id', 'name', 'picture_url'] },
        { association: 'receiver', attributes: ['id', 'name', 'picture_url'] },
      ],
    });

    // If no messages are found, return an error
    if (!messages) {
      return res.status(404).json({
        message:
          'No messages found. Please try again later or check your search criteria.',
      });
    }

    // Send the result as is
    res.status(200).json(messages);
  },
  // Get all user contacts and their messages
  getAllUserContacts: async (req, res) => {
    // Get id
    const id = parseInt(req.user.userId, 10);

    // Check if id is a number
    if (isNaN(id)) {
      return res
        .status(400)
        .json({ message: 'This ID is not valid. Please provide a valid ID.' });
    }

    // Check user exists and is not pending or banned
    const user = await User.findByPk(id);
    if (!user || user.status === 'pending' || user.status === 'banned') {
      return res.status(401).json({
        blocked: true,
        message:
          'This account is blocked or pending approval. Please contact support.',
      });
    }

    // Get users as contacts that have received messages from user or sent messages to user
    // via the User model including the received and sent messages and the sender data
    const contacts = await User.findAll({
      include: [
        {
          model: User_message,
          as: 'received_messages',
          where: { sender_id: id },
          required: false,
          attributes: { exclude: ['updated_at'] },
          include: {
            association: 'sender',
            attributes: ['id', 'name', 'picture_url'],
          },
        },
        {
          model: User_message,
          as: 'sent_messages',
          where: { receiver_id: id },
          required: false,
          attributes: { exclude: ['updated_at'] },
          include: {
            association: 'sender',
            attributes: ['id', 'name', 'picture_url'],
          },
        },
      ],
      attributes: ['id', 'name', 'picture_url'],
      where: {
        [Op.or]: [
          { '$received_messages.id$': { [Op.ne]: null } }, // Users who received messages from you
          { '$sent_messages.id$': { [Op.ne]: null } }, // Users you sent messages to
        ],
      },
      order: [
        [
          { model: User_message, as: 'received_messages' },
          'created_at',
          'DESC',
        ],
        [{ model: User_message, as: 'sent_messages' }, 'created_at', 'DESC'],
      ],
    });

    // If no contacts are found, return an error
    if (contacts.length === 0) {
      return res.status(404).json({ message: 'No contacts found.' });
    }

    // Generate a new arrau for formatted contacts
    const formattedContacts = [];

    // Loop through contacts and format them
    contacts.forEach((converser) => {
      const converserObject = {
        id: converser.id,
        name: converser.name,
        picture_url: converser.picture_url,
        messages: [
          ...converser.received_messages,
          ...converser.sent_messages,
        ].sort((a, b) => a.created_at - b.created_at),
      };
      formattedContacts.push(converserObject);
    });

    // Send the formatted contacts if request is successful
    res.status(200).json(formattedContacts);
  },
  // Get all messages between two users
  sendMessageToUser: async (req, res) => {
    // Get user id and parse it
    const id = parseInt(req.user.userId, 10);

    // Check if id is a number
    if (isNaN(id)) {
      return res.status(400).json({ message: 'this id is not valid' });
    }

    // Check if user exists via the User model using the id
    const user = await User.findByPk(id);

    // Check if user exists and is not pending or banned
    if (!user || user.status === 'pending' || user.status === 'banned') {
      return res.status(401).json({
        blocked: true,
        message:
          'This account is blocked or pending approval. Please contact support.',
      });
    }

    // Convert receiver id to number before checking
    req.body.receiver_id = parseInt(req.body.receiver_id, 10);

    // Create a schema for the message
    const messageSchema = Joi.object({
      message: Joi.string().required(),
      receiver_id: Joi.number().integer().min(1).invalid(id).required(),
    });

    // Validate the message body
    const { error } = messageSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.message });
    }

    // Once the message body is validated, check if the receiver is an active user
    const { message, receiver_id } = req.body;

    // Check if the receiver is an active user
    if (!(await isActiveUser(req.body.receiver_id))) {
      // If the receiver is not an active user, return an error
      return res
        .status(403)
        .json({ message: 'The specified receiver could not be found.' });
    }

    // Create a new message using the User_message model
    const messageSent = await User_message.create({
      message,
      sender_id: id,
      receiver_id,
    });

    // If the request is ok send the message as a json response
    res.status(201).json(messageSent);
  },
};

export default messageController;
