// eslint-disable-next-line prettier/prettier, import/no-extraneous-dependencies
import Joi from 'joi';

const formV3Schema = Joi.object({
  descriptionInputValue: Joi.string().min(1).required().messages({
    'string.base': 'Veuillez entrez une chaîne de caractères valide',
    'string.min': 'Merci de renseigner votre description !.',
    'string.empty': 'Merci de renseigner votre description !',
    'any.required': 'Merci de renseigner votre description !',
  }),

  pictureFile: Joi.object().required().messages({
    'object.base': 'Veuillez ajouter une photo !',
    'object.empty': 'Veuillez ajouter une photo !',
    'object.required': 'Veuillez ajouter une photo !',
  }),
});

export default formV3Schema;
