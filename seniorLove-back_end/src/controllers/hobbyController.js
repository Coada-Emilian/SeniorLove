// Purpose: Controller for hobbies

import { Hobby } from '../models/index.js';

// Hobby controller object
const hobbyController = {
  // Get all hobbies
  getAllHobbies: async (req, res) => {
    const hobbiesList = await Hobby.findAll({ attributes: ['id', 'name'] });
    // If no hobbies are found, return an error
    if (!hobbiesList) {
      return res
        .status(404)
        .json({
          message:
            'No hobbies found. Please try again later or check your search criteria.',
        });
    }
    // Send the result as is
    res.status(200).json(hobbiesList);
  },
};

export default hobbyController;
