// eslint-disable-next-line prettier/prettier, import/no-extraneous-dependencies
import Joi from 'joi';

const formV4Schema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .pattern(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/ // Regex pour une adresse e-mail basique
    )
    .required()
    .messages({
      'string.base': 'Veuillez entrer une adresse mail valide !',
      'string.email': 'Veuillez entrer une adresse mail valide !',
      'string.pattern.base': 'Veuillez entrer une adresse mail valide !',
      'any.required': 'Veuillez entrer une adresse mail !',
    }),
  password: Joi.string()
    .min(12)
    .max(36)
    .pattern(/^(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{12,36}$/)
    .required()
    .messages({
      'string.base': 'Veuillez entrer une adresse mail valide !',
      'string.min': 'Le mot de passe doit contenir au moins 12 caractères.',
      'string.max':
        'Le mot de passe est trop long, entrez un mot de passe plus court.',
      'string.empty': 'Veuillez indiquer votre mot de passe et le confirmer.',
      'any.required': 'Veuillez entrer un mot de passe.',
      'string.pattern.base':
        'Le mot de passe doit contenir au moins une majuscule, un chiffre et un caractère spécial.',
    }),
  repeatPassword: Joi.any().valid(Joi.ref('password')).required().messages({
    'any.only': 'Le mot de passe et sa confirmation doivent être identiques.',
    'any.required': 'Veuillez confirmer votre mot de passe.',
  }),
});

export default formV4Schema;
