import Joi from 'joi';

export const registerSchema = Joi.object({
    name: Joi.string()
        .min(3)
        .max(10)
        .required()
        .messages({
            'string.base': 'name must be a string',
            'string.empty': 'name is required',
            'string.min': 'name must be at least 3 characters long',
            'string.max': 'name must be less than 10 characters long',
        }),

    lastName: Joi.string()
        .min(3)
        .max(10)
        .required()
        .messages({
            'string.base': 'lastName must be a string',
            'string.empty': 'lastName is required',
            'string.min': 'lastName must be at least 3 characters long',
            'string.max': 'lastName must be less than 10 characters long',
        }),

    email: Joi.string()
        .min(6)
        .max(50)
        .email()
        .required()
        .messages({
            'string.base': 'email must be a string',
            'string.empty': 'email is required',
            'string.min': 'email must be at least 6 characters long',
            'string.max': 'email must be less than 50 characters long',
            'string.email': 'email must be a valid email',
        }),

    password: Joi.string()
        .min(6)
        .max(20)
        .pattern(/(?=.*[A-Z])/, 'uppercase')
        .pattern(/(?=.*\d)/, 'number')
        .required()
        .messages({
            'string.base': 'Password must be a string',
            'string.empty': 'Password is required',
            'string.min': 'Password must be at least 6 characters long',
            'string.max': 'Password must be less than 20 characters long',
            'string.pattern.name': 'Password must contain at least one uppercase letter, one number, and one special character',
        }),

    phone: Joi.string()
        .min(10)
        .max(10)
        .pattern(/^\d+$/, 'numbers')
        .required()
        .messages({
            'string.base': 'phone must be a string',
            'string.empty': 'phone is required',
            'string.min': 'phone must be at least 10 characters long',
            'string.max': 'phone must be less than 10 characters long',
            'string.pattern.name': 'phone must contain only numbers',
        }),

    address: Joi.string()
        .min(3)
        .max(50)
        .required()
        .messages({
            'string.base': 'adress must be a string',
            'string.empty': 'adress is required',
            'string.min': 'adress must be at least 3 characters long',
            'string.max': 'adress must be less than 50 characters long',
        }),
});

export const loginSchema = Joi.object({
    email: Joi.string()
        .min(6)
        .max(50)
        .email()
        .required()
        .messages({
            'string.base': 'email must be a string',
            'string.empty': 'email is required',
            'string.min': 'email must be at least 6 characters long',
            'string.max': 'email must be less than 50 characters long',
            'string.email': 'email must be a valid email',
        }),

    password: Joi.string()
        .min(6)
        .max(20)
        .pattern(/(?=.*[A-Z])/, 'uppercase')
        .pattern(/(?=.*\d)/, 'number')
        .required()
        .messages({
            'string.base': 'Password must be a string',
            'string.empty': 'Password is required',
            'string.min': 'Password must be at least 6 characters long',
            'string.max': 'Password must be less than 20 characters long',
            'string.pattern.name': 'Password must contain at least one uppercase letter, one number, and one special character',
        }),
});