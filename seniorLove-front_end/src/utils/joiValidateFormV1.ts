// eslint-disable-next-line import/no-extraneous-dependencies
import Joi from 'joi';

// Joi schema configuration (no picture in schema)
const formV1Schema = Joi.object({
  name: Joi.string()
    .max(50)
    .regex(/^(?!.*\d).+$/)
    .required()
    .messages({
      'string.pattern.base':
        'Le champ prénom doit être une chaîne de caractères !',
      'string.empty': 'Le champ prénom est obligatoire !',
      'string.max': 'Le nom doit être inférieur ou égal à 50 caractères.',
      'any.required': 'Le champ prénom est requis.',
    }),

  age: Joi.number().min(60).max(100).required().messages({
    'number.base': "L'age n'est pas valide",
    'number.min': 'Vous devez avoir plus de 60 ans pour vous inscrire',
    'number.max': 'Vous devez avoir moins de 100 ans pour vous inscrire',
    'any.required': 'Merci de renseigner votre date de naissance !',
  }),

  // description: Joi.string(),
  gender: Joi.string()
    .max(10)
    .valid('male', 'female', 'other')
    .required()
    .messages({
      'any.only': "Le genre renseigné n'est pas valide.",
      'string.empty': 'Merci de renseigner votre genre !',
    }),
});

export default formV1Schema;
