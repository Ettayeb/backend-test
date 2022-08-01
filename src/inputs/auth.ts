import * as joi from '@hapi/joi';
import { Joi } from 'celebrate';
import 'joi-extract-type';

const signUp = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().required(),
});

const login = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required(),
});

export const validateLogin = login;
export const validateSignUp = signUp;

export type SignUpInput = joi.extractType<typeof signUp>;
export type LoginInput = joi.extractType<typeof login>;
