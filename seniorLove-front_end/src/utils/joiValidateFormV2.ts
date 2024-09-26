// eslint-disable-next-line import/no-extraneous-dependencies
import Joi from 'joi';

// Joi schema configuration (no picture in schema)
const formV2Schema = Joi.array()
  .items(
    Joi.number().integer().min(1).messages({
      'number.base': 'Entrée non valide',
      'number.min': 'Entrée non valide',
      'number.integer': 'Entrée non valide',
    })
  )
  .required()
  .min(1)
  .messages({
    'array.base': "Les centres d'intérêts doivent être une liste.",
    'array.min': "Veuillez indiquer au moins un centre d'intérêt.",
    'any.required': "Veuillez fournir une liste de centres d'intérêts.",
  });
  
export default formV2Schema;
