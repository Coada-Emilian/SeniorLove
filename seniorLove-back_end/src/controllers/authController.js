// Purpose: Handle user registration and login processes

import 'dotenv/config';
import Joi from 'joi';
import jsonwebtoken from 'jsonwebtoken';
import computeAge from '../utils/computeAge.js';
import { User, Hobby } from '../models/index.js';
import { Scrypt } from '../auth/Scrypt.js';

// Auth controller object
const authController = {
  // Add a user
  addUser: async (req, res) => {
    // If no body, return an error
    if (!req.body) {
      return res.status(400).json({
        message: 'Request body is missing. Please provide the necessary data.',
      });
    }

    // Joi schema configuration
    const registerSchema = Joi.object({
      name: Joi.string().max(50).required(),
      birth_date: Joi.date().required(),
      description: Joi.string(),
      gender: Joi.string().max(10).valid('male', 'female', 'other').required(),
      email: Joi.string().email({ minDomainSegments: 2 }).required(),
      password: Joi.string().min(12).max(255).required(),
      repeat_password: Joi.valid(Joi.ref('password')).required(),
      hobbies: Joi.array().items(Joi.number().integer().min(1)).required(),
    });

    // Validate the body via the schema
    const { error } = registerSchema.validate(req.body);

    if (error) {
      return res.status(400).json({ message: error.message });
    }

    const {
      name,
      birth_date,
      description,
      gender,
      email,
      password,
      repeat_password,
      hobbies,
    } = req.body;

    // Age control via the computeAge function
    if (computeAge(birth_date) < 60) {
      return res.status(400).json({
        message: 'Registration is restricted to individuals aged 60 and above.',
      });
    }

    // Check if the password and the repeated password are the same
    if (password !== repeat_password) {
      return res.status(400).json({
        message: 'Passwords do not match. Please try again.',
      });
    }

    // Check if email already exists
    const potentialExistingUser = await User.findOne({
      where: { email },
    });
    // If the email already exists, return an error
    if (potentialExistingUser) {
      return res.status(400).json({
        message:
          'This email address is already registered. Please use a different email or log in.',
      });
    }

    // Handle file upload (optional picture)
    let picture_url = null;
    let picture_id = null;

    // If there is a file, set the picture and picture_id variables
    if (req.file) {
      picture_url = req.file.path;
      picture_id = req.file.filename;
    }

    // Create a new user via the User model
    const createdUser = await User.create({
      name,
      birth_date,
      description,
      picture_url,
      picture_id,
      gender,
      email,
      password: Scrypt.hash(repeat_password),
    });

    // Fetch hobbies from the database
    const userHobbies = await Hobby.findAll({
      where: { id: hobbies },
    });

    // Associate hobbies with the user via the addHobbies method from Sequelize
    await createdUser.addHobbies(userHobbies);

    // Return a success message
    res.status(201).json({ message: 'ok' });
  },

  // Connect a user
  loginUser: async (req, res) => {
    // Joi schema configuration
    const loginSchema = Joi.object({
      email: Joi.string()
        .max(255)
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'fr'] } })
        .required(),
      password: Joi.required(),
    });

    // Validate the body via the schema
    const { email, password } = req.body;

    const { error } = loginSchema.validate(req.body);

    if (error) {
      return res.status(401).json({ message: error.message });
    }

    const foundUser = await User.findOne({
      where: { email: email },
    });

    if (
      !foundUser ||
      foundUser.status === 'banned' ||
      foundUser.status === 'pending'
    ) {
      return res.status(401).json({
        blocked: true,
        message:
          'Unauthorized access. Please check your credentials and try again.',
      });
    }

    // Compare the password with the hashed password
    const isGood = Scrypt.compare(password, foundUser.password);

    if (!isGood) {
      return res.status(401).json({
        message:
          'Unauthorized access. Please check your credentials and try again.',
      });
    }

    // Create a JWT token
    const jwtContent = { userId: foundUser.id };

    const token = jsonwebtoken.sign(jwtContent, process.env.TOKEN_KEY, {
      expiresIn: '3h',
      algorithm: 'HS256',
    });

    res.status(200).json({
      id: foundUser.id,
      name: foundUser.name,
      picture_url: foundUser.picture_url,
      token,
    });
  },
};

export default authController;
