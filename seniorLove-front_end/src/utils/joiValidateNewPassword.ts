import Joi from 'joi';

const newPasswordSchema = Joi.object({
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
});

export default newPasswordSchema;
