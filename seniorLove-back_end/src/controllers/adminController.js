//Purpose: Admin controller for the admin routes.

import Joi from 'joi';
import { v2 as cloudinary } from 'cloudinary';
import { Admin, User, Hobby, Event } from '../models/index.js';
import { Scrypt } from '../auth/Scrypt.js';
import computeAge from '../utils/computeAge.js';
import { Event_hobby } from '../models/associative_tables/Event_hobby.js';

// Admin controller object
const adminController = {
  // Admin login page rendering
  index: async (req, res) => {
    res.status(200).render('loginPage');
  },

  // Admin login process
  login: async (req, res) => {
    // Schema definition for the request body
    const loginSchema = Joi.object({
      email: Joi.string()
        .max(255)
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'fr'] } })
        .required(),
      password: Joi.string().required(),
    });

    // Extract email and password from the request body
    const { email, password } = req.body;

    // Check if email and password are provided
    if (!email || !password) {
      // Return an error response if email or password is missing
      return res.status(400).render('errorPage', {
        error:
          "L'email et le mot de passe sont requis. Veuillez fournir les deux pour continuer.",
        statusCode: 400,
      });
    }

    // Validate the request body via the loginSchema
    const { error } = loginSchema.validate(req.body);

    // Return an error response if the request body is invalid
    if (error) {
      return res.status(400).render('loginPage', {
        error:
          "Le format de l'email est incorrect. Veuillez entrer une adresse email valide.",
        statusCode: 400,
      });
    }

    // Find the admin by email in the database
    const foundAdmin = await Admin.findOne({
      where: { email: email },
    });

    // Return an error response if the admin is not found
    if (!foundAdmin) {
      return res.status(401).render('loginPage', {
        error:
          'Email et/ou mot de passe invalide. Veuillez vérifier vos informations et réessayer.',
        statusCode: 401,
      });
    }

    // Compare the passwords via the Scrypt.compare method
    const isGood = await Scrypt.compare(password, foundAdmin.password);

    // Return an error response if the password is incorrect
    if (!isGood) {
      // Return an error response if the password is incorrect
      return res.status(401).render('loginPage', {
        error:
          'Email et/ou mot de passe invalide. Veuillez vérifier vos informations et réessayer.',
        statusCode: 404,
      });
    } else {
      // Set the session variables for the admin if the login is successful
      req.session.admin = true;
      req.session.adminId = foundAdmin.id;
    }
    // Redirect to dashboard or another page after successful login
    return res.status(200).redirect('/admin/users/pending');
  },

  // Admin logout process
  logout: async (req, res) => {
    // Destroy the session
    req.session.destroy((err) => {
      // Return an error response if the logout fails
      if (err) {
        return res.status(500).render('errorPage', {
          error:
            'Échec de la déconnexion. Veuillez réessayer ou contacter le support si le problème persiste.',
          statusCode: 500,
        });
      }
      // Clear the session cookie and redirect to the login page
      res.clearCookie('connect.sid');
      res.redirect('/admin');
    });
  },

  // Admin users dashboard rendering
  renderAllUsers: async (req, res) => {
    // Check if the user is an admin via the session variable
    if (req.session.admin) {
      // Find all users via the User model
      const users = await User.findAll({
        attributes: ['id', 'name', 'birth_date', 'status'],
        order: [
          ['status', 'ASC'],
          ['id', 'ASC'],
        ],
      });

      // Check if the users array is not empty
      if (users) {
        // Set the displayAll locals variable to true
        res.locals.displayAll = true;
      }

      // Compute the age of each user via the computeAge function
      const usersWithAge = users.map((user) => ({
        ...user.toJSON(),
        age: computeAge(user.birth_date),
      }));
      // Render the users page with the users data
      return res.status(200).render('usersPage', { users: usersWithAge });
    } else {
      return res.status(401).redirect('/admin');
    }
  },

  // Admin pending users dashboard rendering
  renderPendingUsers: async (req, res) => {
    // Check if the user is an admin via the session variable
    if (req.session.admin) {
      // Find all users with status 'pending' via the User model
      const pendingUsers = await User.findAll({
        where: {
          status: 'pending',
        },
        attributes: ['id', 'name', 'birth_date', 'status'],
        order: [['id', 'ASC']],
      });

      if (!pendingUsers) {
        return res.status(404).render('errorPage', {
          error: 'Aucun utilisateur en attente trouvé.',
          statusCode: 404,
        });
      }

      // Compute the age of each user via the computeAge function
      const pendingUsersWithAge = pendingUsers.map((user) => ({
        ...user.toJSON(),
        age: computeAge(user.birth_date),
      }));
      // Render the users page with the users data
      return res
        .status(200)
        .render('usersPage', { users: pendingUsersWithAge });
    } else {
      return res.status(401).redirect('/admin');
    }
  },

  // Admin banished users dashboard rendering
  renderBanishedUsers: async (req, res) => {
    // Check if the user is an admin via the session variable
    if (req.session.admin) {
      // Find all users with status 'banned' via the User model
      const banishedUsers = await User.findAll({
        where: {
          status: 'banned',
        },
        attributes: ['id', 'name', 'birth_date', 'status'],
        order: [['id', 'ASC']],
      });

      // Compute the age of each user via the computeAge function
      const banishedUsersWithAge = banishedUsers.map((user) => ({
        ...user.toJSON(),
        age: computeAge(user.birth_date),
      }));

      // Render the users page with the users data
      return res
        .status(200)
        .render('usersPage', { users: banishedUsersWithAge });
    } else {
      return res.status(401).redirect('/admin');
    }
  },

  // Admin single user page rendering
  renderUser: async (req, res) => {
    // Check if the user is an admin via the session variable
    if (req.session.admin) {
      // Extract the user ID from the request parameters
      const { id } = req.params;

      // Return an error response if the user ID is missing
      if (!id) {
        return res.status(400).render('errorPage', {
          error:
            'Identifiant utilisateur manquant. Veuillez fournir un ID utilisateur valide.',
          statusCode: 400,
        });
      } else if (isNaN(id)) {
        return res.status(400).render('errorPage', {
          error:
            'Identifiant utilisateur invalide. Veuillez fournir un ID utilisateur valide.',
          statusCode: 400,
        });
      }

      // Find the user by ID via the User model, including associated hobbies
      const user = await User.findByPk(id, {
        include: [
          {
            model: Hobby,
            as: 'hobbies',
          },
        ],
      });
      // Return an error response if the user is not found
      if (!user) {
        return res.status(404).render('errorPage', {
          error:
            "Utilisateur non trouvé. Veuillez vérifier l'identifiant fourni.",
          statusCode: 404,
        });
      }

      // Compute the age of the user via the computeAge function
      const userAge = computeAge(user.birth_date);
      // Create a new user object with the age property
      const newUser = {
        ...user.toJSON(),
        age: userAge,
      };

      // Render the user page with the user data
      return res.status(200).render('userPage', { user: newUser });
    } else {
      return res.status(401).redirect('/admin');
    }
  },

  // Admin user status update
  updateUserStatus: async (req, res) => {
    // Check if the user is an admin via the session variable
    if (req.session.admin) {
      const { id } = req.params;

      if (!id) {
        return res.status(400).render('errorPage', {
          error:
            'Identifiant utilisateur manquant. Veuillez fournir un ID utilisateur.',
          statusCode: 400,
        });
      } else if (isNaN(id)) {
        return res.status(400).render('errorPage', {
          error:
            'Identifiant utilisateur invalide. Veuillez fournir un ID utilisateur valide.',
          statusCode: 400,
        });
      }

      // Extract the status from the request body
      const { status } = req.body;

      // Validate the status
      if (status) {
        // Find the user by id via the User model, including associated hobbies
        const user = await User.findByPk(id, {
          include: [
            {
              model: Hobby,
              as: 'hobbies',
            },
          ],
        });

        // Return an error response if the user is not found
        if (!user) {
          return res.status(404).render('errorPage', {
            error:
              "Utilisateur non trouvé. Veuillez vérifier l'identifiant fourni.",
            statusCode: 404,
          });
        }

        // Update the status of the user
        await user.update({
          status,
        });

        // Redirect to the user page after the status update
        return res.status(204);
      }
    } else {
      return res.status(401).redirect('/admin');
    }
  },

  // Admin user deletion
  deleteUser: async (req, res) => {
    // Check if the user is an admin via the session variable
    if (req.session.admin) {
      // Extract the user ID from the request parameters
      const { id } = req.params;

      // Return an error response if the user ID is missing
      if (!id) {
        return res.status(400).render('errorPage', {
          error:
            'Identifiant utilisateur manquant. Veuillez fournir un ID utilisateur.',
          statusCode: 400,
        });
      } else if (isNaN(id)) {
        return res.status(400).render('errorPage', {
          error:
            'Identifiant utilisateur invalide. Veuillez fournir un ID utilisateur valide.',
          statusCode: 400,
        });
      }

      // Find the user by id
      const user = await User.findByPk(id);

      // Return an error response if the user is not found
      if (!user) {
        return res.status(404).render('errorPage', {
          error:
            "Utilisateur non trouvé. Veuillez vérifier l'identifiant fourni.",
          statusCode: 404,
        });
      }

      // Delete the user picture from the Cloudinary storage
      if (user.picture_id) {
        await cloudinary.uploader.destroy(user.picture_id);
      }

      // Delete the user
      await user.destroy();

      // Redirect to the users page after the user deletion
      res
        .status(200)
        .json({ message: 'The user has been successfully deleted.' });
    } else {
      return res.status(401).redirect('/admin');
    }
  },

  // Admin events dashboard rendering
  renderEvents: async (req, res) => {
    // Check if the user is an admin via the session variable
    if (req.session.admin) {
      // Find all events via the Event model
      const events = await Event.findAll({
        attributes: ['id', 'name', 'date'],
        order: [['date', 'ASC']],
      });

      // Render the events page with the events data
      return res.status(200).render('eventsPage', { events });
    } else {
      return res.status(401).redirect('/admin');
    }
  },

  // Admin create event page rendering
  renderCreateEvent: async (req, res) => {
    // Check if the user is an admin via the session variable
    if (req.session.admin) {
      // Find all hobbies via the Hobby model
      const hobbies = await Hobby.findAll({
        attributes: ['id', 'name'],
        order: [['name', 'ASC']],
      });

      // Render the create event page with the hobbies data
      return res.status(200).render('eventPage', { hobbies });
    } else {
      return res.status(401).redirect('/admin');
    }
  },

  // Admin event creation
  createEvent: async (req, res) => {
    // Check if the user is an admin
    if (req.session.admin) {
      // Joi schema configuration for the event data
      const eventSchema = Joi.object({
        name: Joi.string().required(),
        date: Joi.date().required(),
        location: Joi.string().required(),
        time: Joi.string().required(),
        hobbies: Joi.array().items(Joi.number()).required(),
        description: Joi.string().required(),
      });

      const { error } = eventSchema.validate(req.body);
      if (error) {
        return res.status(400).render('errorPage', {
          error: error.message,
          statusCode: 400,
        });
      }

      // Extract event details from the request body
      const { name, date, location, time, hobbies, description } = req.body;

      // Extract file details from the request
      const picture_url = req.file.path; // Path to the uploaded image
      const picture_id = req.file.filename; // Filename for the uploaded image

      // Extract admin ID from the session
      const adminId = req.session.adminId;

      // Validate that all required fields are provided
      if (!name || !date || !location || !time || !description || !adminId) {
        return res.status(400).render('errorPage', {
          error:
            "Les données de l'événement sont manquantes. Veuillez fournir tous les détails nécessaires.",
          statusCode: 400,
        });
      }

      // Create a new event in the database via the Event model
      const newEvent = await Event.create({
        name,
        location,
        description,
        picture_url,
        picture_id,
        date,
        time,
        adminId,
      });

      // Check if hobbies is an array with elements
      if (Array.isArray(hobbies) && hobbies.length > 0) {
        // Find all hobbies via the Hobby model where the ID is in the hobbies array
        const eventHobbies = await Hobby.findAll({
          where: { id: hobbies },
        });
        // Add hobbies to the event via the addHobbies method from Sequelize
        await newEvent.addHobbies(eventHobbies); // Add hobbies to the event
      }

      // Redirect to the events page after the event creation
      return res.status(204).redirect('/admin/events');
    } else {
      // If not an admin, redirect to login page
      return res.status(401).redirect('/admin');
    }
  },

  // Admin event deletion
  deleteEvent: async (req, res) => {
    // Check if the user is an admin
    if (req.session.admin) {
      // Extract the event ID from the request parameters
      const { id } = req.params;

      // Return an error response if the event ID is missing
      if (!id) {
        return res.status(400).render('errorPage', {
          error:
            "Identifiant de l'événement manquant. Veuillez fournir un ID d'événement valide.",
          statusCode: 400,
        });
      } else if (isNaN(id)) {
        return res.status(400).render('errorPage', {
          error:
            "Identifiant de l'événement invalide. Veuillez fournir un ID d'événement valide.",
          statusCode: 400,
        });
      }

      // Find the event by ID via the Event model
      const event = await Event.findByPk(id);
      // Return an error response if the event is not found
      if (!event) {
        return res.status(404).render('errorPage', {
          error:
            "Événement non trouvé. Veuillez vérifier l'identifiant fourni.",
          statusCode: 404,
        });
      }
      // Delete the event picture from the Cloudinary storage if a picture_id exists
      if (event.picture_id) {
        const cloudinaryId = event.picture_id;
        await cloudinary.uploader.destroy(cloudinaryId);
      }
      // Delete the event from the database and return a success message
      await event.destroy();

      res
        .status(204)
        .json({ message: 'The event has been deleted successfully' });
    } else {
      // If not an admin, redirect to login page
      return res.status(401).redirect('/admin');
    }
  },

  // Admin event modification page rendering
  renderUpdateEvent: async (req, res) => {
    // Check if the user is an admin
    if (req.session.admin) {
      // Extract the event ID from the request parameters
      const { id } = req.params;
      // Return an error response if the event ID is missing
      if (!id) {
        return res.status(400).render('errorPage', {
          error:
            "Identifiant de l'événement manquant. Veuillez fournir un ID d'événement.",
          statusCode: 400,
        });
      } else if (isNaN(id)) {
        return res.status(400).render('errorPage', {
          error:
            "Identifiant de l'événement invalide. Veuillez fournir un ID d'événement valide.",
          statusCode: 400,
        });
      }
      // Find the event by ID via the Event model, including associated hobbies
      const event = await Event.findByPk(id, {
        include: [
          {
            model: Hobby,
            as: 'hobbies',
            attributes: ['id', 'name'],
            through: { attributes: [] },
          },
        ],
      });
      // Return an error response if the event is not found
      if (!event) {
        return res.status(404).render('errorPage', {
          error:
            "Événement non trouvé. Veuillez vérifier l'identifiant fourni.",
          statusCode: 404,
        });
      }
      // Find all hobbies via the Hobby model
      const allHobbies = await Hobby.findAll({
        attributes: ['id', 'name'],
      });

      // Create an empty array of all hobbies data and fill it
      const allHobbiesData = [];
      allHobbies.forEach((hobby) => {
        allHobbiesData.push(hobby.dataValues);
      });

      // Create an empty array of filtered hobbies and fill it
      const filteredHobbies = [];
      event.hobbies.forEach((hobby) => {
        filteredHobbies.push(hobby.dataValues.name);
      });

      // Create an empty array of hobbies that are checked and fill it
      const checkedHobbies = [];
      event.hobbies.forEach((hobby) => {
        checkedHobbies.push(hobby.dataValues);
      });

      // Create an array of hobbies that are unchecked
      const uncheckedHobbies = allHobbiesData.filter(
        (hobby) => !filteredHobbies.includes(hobby.name)
      );

      if (event) {
        res.locals.updateEvent = true;
      }
      return res
        .status(200)
        .render('eventPage', { event, uncheckedHobbies, checkedHobbies });
    } else {
      return res.status(401).redirect('/admin');
    }
  },

  // Admin event update process
  updateEvent: async (req, res) => {
    // Check if the user is an admin
    if (req.session.admin) {
      // Extract event details from the request body
      const { name, date, location, time, hobbies, description } = req.body;

      // Validate that all required fields are provided
      if (!name || !date || !location || !time || !description) {
        return res.status(400).render('errorPage', {
          error:
            "Données de l'événement manquantes. Veuillez fournir tous les détails requis.",
          statusCode: 400,
        });
      }

      // Find the event to update via the Event model including associated hobbies
      const eventToUpdate = await Event.findByPk(req.params.id, {
        include: [
          {
            model: Hobby,
            as: 'hobbies',
          },
        ],
      });

      // Initialize picture and picture_id with the existing values from the event
      let picture_url = eventToUpdate.picture_url;
      let picture_id = eventToUpdate.picture_id;

      // Check if a new file was uploaded
      if (req.file) {
        // Extract the old public ID for the image from the existing picture_id
        const oldPictureId = eventToUpdate.picture_id;

        // Update picture path and ID with the new file details
        picture_url = req.file.path;
        picture_id = req.file.filename;

        // Delete the old image from Cloudinary storage
        await cloudinary.uploader.destroy(oldPictureId);
      }

      // Update the event with the new details
      await eventToUpdate.update({
        name,
        location,
        description,
        picture_url,
        picture_id,
        date,
        time,
      });

      // Remove existing Event_hobby associations for the event
      await Event_hobby.destroy({
        where: {
          event_id: eventToUpdate.id,
        },
      });

      // Check if hobbies is an array with elements
      if (Array.isArray(hobbies) && hobbies.length > 0) {
        // Map hobbies to an array of Event_hobby entries
        const hobbiesArray = hobbies.map((hobbyId) => ({
          event_id: eventToUpdate.id,
          hobby_id: hobbyId,
        }));
        // Bulk create Event_hobby associations
        await Event_hobby.bulkCreate(hobbiesArray);
        // Check if hobbies is a single value
      } else if (hobbies) {
        // Create a single hobby association
        const hobby = {
          event_id: eventToUpdate.id,
          hobby_id: hobbies,
        };
        // Create the Event_hobby association with the single hobby association
        await Event_hobby.create(hobby);
      }

      // Respond with a success message and updated event data
      return res.status(200).json({
        message: 'The event has been modified successfully',
        event: eventToUpdate,
      });
    } else {
      // If not an admin, redirect to login page
      return res.status(401).redirect('/admin');
    }
  },

  // Admin 404 error page rendering
  render404Error: async (req, res) => {
    return res.status(404).render('errorPage', {
      error: 'Page not found',
      statusCode: 404,
    });
  },
};

export default adminController;
