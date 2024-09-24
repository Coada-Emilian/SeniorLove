// Purpose: Handle user related requests and responses

import Joi from 'joi';
import { Op } from 'sequelize';
import { v2 as cloudinary } from 'cloudinary';
import multer from 'multer';

import { isActiveUser } from '../utils/checkUserStatus.js';
import { User, Hobby, Event, User_hobby } from '../models/index.js';
import computeAge from '../utils/computeAge.js';
import { Scrypt } from '../auth/Scrypt.js';
import { userPhotoStorage } from '../cloudinary/index.js';

// Multer configuration to use Cloudinary storage
multer({ storage: userPhotoStorage });

// User controller object
const userController = {
  // Get all users
  getAllUsers: async (req, res) => {
    // Get the user ID to exclude from the list
    const excludedUserId = req.user.userId;

    // Check if the ID is a number
    if (isNaN(id)) {
      return res
        .status(400)
        .json({ message: 'This ID is not valid. Please provide a valid ID.' });
    }

    // Get all active users from the database via the User model
    const allUsers = await User.findAll({
      where: {
        status: 'active',
        id: { [Op.not]: excludedUserId },
      },
      attributes: ['id', 'name', 'birth_date', 'picture'],
    });

    // If no users are found, return an error
    if (!allUsers) {
      return res.status(404).json({
        message:
          'No users found. Please try again later or check your search criteria.',
      });
    }

    // Map over the users and add the computed age via the computeAge function
    const usersWithAge = allUsers.map((user) => ({
      // Convert Sequelize model instance to a plain object
      ...user.toJSON(),
      // Add computed age
      age: computeAge(user.birth_date),
    }));

    // Send the result as is
    res.status(200).json(usersWithAge);
  },
  // Get one user
  getOneUser: async (req, res) => {
    // Get the userId in params, and check if it's a number
    const userId = parseInt(req.params.userId, 10);

    // Check if the ID is a number
    if (isNaN(userId)) {
      return res
        .status(400)
        .json({ message: 'This ID is not valid. Please provide a valid ID.' });
    }

    // Check if the user is active
    if (!(await isActiveUser(userId))) {
      return res.status(401).json({
        blocked: true,
        message:
          'This account is blocked or pending approval. Please contact support.',
      });
    }

    // Get the user from the database via the User model including hobbies and events
    const foundUser = await User.findByPk(userId, {
      include: [
        { association: 'hobbies', attributes: ['id', 'name'] },
        {
          association: 'events',
          attributes: ['id', 'name', 'location', 'picture', 'date', 'time'],
        },
      ],
    });

    // If no user is found, return an error
    if (!foundUser) {
      return res.status(404).json({ message: 'The user was not found.' });
    }

    // Destructure the user object to get the needed properties
    const {
      id,
      name,
      birth_date,
      description,
      gender,
      picture,
      hobbies,
      events,
    } = foundUser;

    // Prepare the user object to be sent
    const userProfileToSend = {
      id,
      name,
      birth_date,
      age: computeAge(birth_date),
      description,
      gender,
      picture,
      hobbies,
      events,
    };

    // Send the user object
    res.status(200).json(userProfileToSend);
  },
  // Get connected user
  getConnectedUser: async (req, res) => {
    // Get the ID and make sure it's a number
    const id = parseInt(req.user.userId, 10);

    // Check if the ID is a number
    if (isNaN(id)) {
      return res
        .status(400)
        .json({ message: 'This ID is not valid. Please provide a valid ID.' });
    }

    // Get the user from the database via the User model including hobbies and events
    const foundUser = await User.findByPk(id, {
      attributes: [
        'id',
        'name',
        'birth_date',
        'description',
        'gender',
        'picture',
        'email',
        'status',
      ],
      include: [
        {
          association: 'events',
          attributes: ['id', 'name', 'location', 'picture', 'date', 'time'],
        },
        {
          association: 'hobbies',
          attributes: { exclude: ['created_at', 'updated_at'] },
        },
      ],
    });

    // If no user is found or if it's status is not pending or banned, return an error
    if (
      !foundUser ||
      foundUser.status === 'pending' ||
      foundUser.status === 'banned'
    ) {
      return res.status(401).json({
        blocked: true,
        message:
          'This account is blocked or pending approval. Please contact support.',
      });
    }

    // Prepare the user object to be sent with the computed age
    const userToSend = {
      ...foundUser.toJSON(),
      age: computeAge(foundUser.birth_date),
    };

    // Send the user data
    res.status(200).json(userToSend);
  },
  // Update user profile
  updateUserProfile: async (req, res) => {
    // Get the ID and make sure it's a number
    const id = parseInt(req.user.userId, 10);

    // Check if the ID is a number
    if (isNaN(id)) {
      return res
        .status(400)
        .json({ message: 'This ID is not valid. Please provide a valid ID.' });
    }

    // Define the hobby schema using Joi
    const hobbySchema = Joi.object({
      id: Joi.number().integer().min(1).optional(),
      name: Joi.string().optional(),
      users_hobbies: Joi.any().optional(),
    });

    // Define the hobbies array schema using Joi
    const hobbiesArraySchema = Joi.array().items(hobbySchema).optional();

    // Define the user update schema using Joi
    const updateUserSchema = Joi.object({
      name: Joi.string().max(50).optional(),
      birth_date: Joi.date()
        .less(new Date(new Date().setFullYear(new Date().getFullYear() - 60)))
        .optional(),
      description: Joi.string().optional(),
      gender: Joi.string().max(10).valid('male', 'female', 'other').optional(),
      picture: Joi.string().max(255).optional(),
      picture_id: Joi.string().max(255).optional(),
      email: Joi.string().max(255).email({ minDomainSegments: 2 }).optional(),
      new_password: Joi.string().min(12).max(255).optional(),
      repeat_new_password: Joi.string()
        .valid(Joi.ref('new_password'))
        .optional(),
      old_password: Joi.string()
        .when('new_password', {
          is: Joi.exist(),
          then: Joi.required(),
          otherwise: Joi.optional(),
        })
        .optional(),
      hobbies: hobbiesArraySchema.optional(),
    }).min(1);

    // Validate the request body against the schema
    const { error } = updateUserSchema.validate(req.body);

    if (error) {
      const errorMessages = error.details.map((detail) => detail.message);
      console.log('Validation error:', errorMessages);
      return res.status(400).json({ messages: errorMessages });
    }

    // Get the user from the database via the User model including hobbies
    const foundUser = await User.findByPk(id, {
      include: [
        {
          model: Hobby,
          as: 'hobbies',
          attributes: ['id', 'name'],
        },
      ],
    });

    // If no user is found or if it's status is not pending or banned, return an error
    if (!foundUser) {
      console.log('User not found');
      return res.status(404).json({ message: 'The user was not found.' });
    }

    if (foundUser.status === 'pending' || foundUser.status === 'banned') {
      return res.status(401).json({
        blocked: true,
        message:
          'This account is blocked or pending approval. Please contact support.',
      });
    }

    // Destructure the request body to get the needed properties
    const {
      name,
      birth_date,
      description,
      gender,
      picture,
      picture_id,
      new_password,
      old_password,
      hobbies,
      repeat_new_password,
      email,
    } = req.body;

    // Prepare the new profile object
    const newProfile = {
      name: name || foundUser.name,
      birth_date: birth_date || foundUser.birth_date,
      description: description || foundUser.description,
      gender: gender || foundUser.gender,
      picture: picture || foundUser.picture,
      picture_id: picture_id || foundUser.picture_id,
      email: email || foundUser.email,
    };

    // If new password is provided, check if old password is provided
    if (new_password) {
      if (!old_password) {
        return res.status(400).json({
          message: 'Old password is required to change the password.',
        });
      }

      // Check if the old password is valid
      const isOldPasswordValid = await Scrypt.compare(
        old_password,
        foundUser.password
      );

      // If the old password is not valid, return an error
      if (!isOldPasswordValid) {
        return res.status(400).json({ message: 'Incorrect old password' });
      }

      // Check if the new password and repeat new password match
      if (new_password !== repeat_new_password) {
        return res.status(400).json({ message: 'New passwords do not match' });
      }

      // Hash the new password
      const hashedNewPassword = await Scrypt.hash(new_password);
      // Update the new profile object with the new password
      newProfile.password = hashedNewPassword;
    }

    // Update the user with the new profile
    await foundUser.update(newProfile);

    // If hobbies are provided, update the user's hobbies

    // Remove all user's hobbies
    await User_hobby.destroy({
      where: {
        user_id: foundUser.id,
      },
    });

    // Add the new hobbies
    if (Array.isArray(hobbies) && hobbies.length > 0) {
      const hobbiesArray = hobbies.map((hobby) => ({
        user_id: foundUser.id,
        hobby_id: hobby.id,
      }));
      await User_hobby.bulkCreate(hobbiesArray);
    }

    // Get the updated user from the database via the User model including hobbies and events
    const updatedUser = await User.findByPk(id, {
      include: [
        {
          model: Hobby,
          as: 'hobbies',
          attributes: ['id', 'name'],
        },
        {
          association: 'events',
          attributes: ['id', 'name', 'location', 'picture', 'date', 'time'],
        },
      ],
    });

    // Send the updated user object with the computed age
    return res.status(200).json({
      id: updatedUser.id,
      name: updatedUser.name,
      birth_date: updatedUser.birth_date,
      description: updatedUser.description,
      gender: updatedUser.gender,
      picture: updatedUser.picture,
      email: updatedUser.email,
      hobbies: updatedUser.hobbies,
      age: computeAge(updatedUser.birth_date),
      events: updatedUser.events,
    });
  },
  // Delete user
  deleteUser: async (req, res) => {
    // Get the user ID to delete and make sure it's a number
    const userId = parseInt(req.user.userId, 10);

    // Check if the ID is a number
    if (isNaN(id)) {
      return res
        .status(400)
        .json({ message: 'This ID is not valid. Please provide a valid ID.' });
    }
    // Proceed with deletion
    await User.destroy({
      where: { id: userId },
    });
    // Return a 204 No Content response
    res.status(204).end();
  },
  getAllSameInterestUsers: async (req, res) => {
    // Get the id, and check if it's a number
    const myId = parseInt(req.user.userId);

    // Check if the ID is a number
    if (isNaN(myId)) {
      return res
        .status(400)
        .json({ message: 'This ID is not valid. Please provide a valid ID.' });
    }

    // get all hobbies of the user
    const myHobbies = await User_hobby.findAll({ where: { user_id: myId } });

    // Create an empty array in which to store my hobbies ids
    const myHobbiesIdArray = [];

    myHobbies.forEach((hobby) => {
      myHobbiesIdArray.push(hobby.hobby_id);
    });

    // Get all active users with the same hobbies via the User model including hobbies
    const mySuggestions = await User.findAll({
      attributes: ['id', 'name', 'gender', 'birth_date', 'picture'],
      include: {
        association: 'hobbies',
        attributes: [],
        where: { id: myHobbiesIdArray },
      },
      where: {
        id: { [Op.not]: myId },
        status: 'active',
      },
    });

    // Prepare an empty array to store the users to send
    const mySuggestionsToSendArray = [];

    // Map over the users and add the computed age via the computeAge function and push to the array
    mySuggestions.forEach((user) => {
      const userObject = {
        id: user.id,
        name: user.name,
        gender: user.gender,
        birth_date: user.birth_date,
        age: computeAge(user.birth_date),
        picture: user.picture,
      };
      mySuggestionsToSendArray.push(userObject);
    });

    // Send the result as is
    res.status(200).json(mySuggestionsToSendArray);
  },
  // Add user to event
  addUserToEvent: async (req, res) => {
    // Get the event ID and user ID, and check if they are numbers
    const eventId = parseInt(req.params.eventId, 10);
    const userId = parseInt(req.user.userId, 10);

    // Check if the event ID is a number
    if (isNaN(eventId)) {
      return res.status(400).json({
        message: 'This event ID is not valid. Please provide a valid event ID.',
      });
    }

    // Check if the user ID is a number
    if (isNaN(userId)) {
      return res.status(400).json({
        message: 'This user ID is not valid. Please provide a valid user ID.',
      });
    }

    // Check if the user is active
    if (!(await isActiveUser(userId))) {
      return res.status(403).json({
        blocked: true,
        message:
          'This account is blocked or pending approval. Please contact support.',
      });
    }

    // Get the event from the database via the Event model
    const event = await Event.findByPk(eventId);

    // If no event is found, return an error
    if (!event) {
      return res.status(404).json({ message: 'The event was not found' });
    }

    // Get the user from the database via the User model
    const user = await User.findByPk(userId);

    // If no user is found, return an error
    if (!user) {
      return res.status(404).json({ message: 'The user was not found' });
    }

    // Add the user to the event
    await user.addEvent(event);
    // Return a 204 No Content response
    res.status(204).end();
  },
  // Remove user from event
  removeUserFromEvent: async (req, res) => {
    // Get the event ID and user ID, and check if they are numbers
    const eventId = parseInt(req.params.eventId, 10);
    const userId = parseInt(req.user.userId, 10);

    // Check if the user ID is a number
    if (isNaN(userId)) {
      return res.status(400).json({
        message: 'This user ID is not valid. Please provide a valid user ID.',
      });
    }

    // Check if the user is active
    if (!(await isActiveUser(userId))) {
      return res.status(403).json({
        blocked: true,
        message:
          'This account is blocked or pending approval. Please contact support.',
      });
    }

    // Get the event from the database via the Event model
    const event = await Event.findByPk(eventId);

    // If no event is found, return an error
    if (!event) {
      return res.status(404).json({ message: 'The event was not found' });
    }

    // Get the user from the database via the User model
    const user = await User.findByPk(userId);

    // If no user is found, return an error
    if (!user) {
      return res.status(404).json({ message: 'The user was not found' });
    }

    // Remove the user from the event
    await user.removeEvent(event);
    // Return a 204 No Content response
    res.status(204).end();
  },
  // Upload user image
  uploadUserImage: async (req, res) => {
    // Get the user ID and make sure it's a number
    const id = parseInt(req.user.userId, 10);

    // Check if the user ID is a number
    if (isNaN(id)) {
      return res.status(400).json({
        message: 'This ID is not valid. Please provide a valid ID.',
      });
    }

    // Check if a file is uploaded
    if (!req.file) {
      return res.status(400).json({
        message: 'No file detected. Please upload a file to continue.',
      });
    }

    // Get the file path and filename
    const { path: filePath, filename } = req.file;

    // Retrieve user to get the old picture ID
    const user = await User.findByPk(userId);
    // If no user is found, return an error
    if (!user) {
      throw new Error('User not found. Please try with a different ID.');
    }

    // If there is an existing picture, remove it from Cloudinary
    if (user.picture_id) {
      try {
        await cloudinary.uploader.destroy(user.picture_id);
      } catch (err) {
        console.error(
          'Error deleting old picture from Cloudinary:',
          err.message
        );
      }
    }

    // Update user's picture URL and picture ID
    user.picture = filePath;
    user.picture_id = filename;

    // Save the user
    await user.save();
    // Return success response
    res.status(200).json({
      message: 'Photo updated successfully',
      pictureUrl: req.file.path,
      pictureId: req.file.filename,
    });
  },
};

export default userController;
