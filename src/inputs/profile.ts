import * as joi from '@hapi/joi';
import { Joi } from 'celebrate';
import 'joi-extract-type';

const profileInputUpdate = Joi.object({
    _id: Joi.string().hex().length(24).optional(),
    userId: Joi.string().hex().length(24).required(),
    headline: Joi.string().required(),
    birthDate: Joi.string().required(),
    fullName: Joi.string().required(),
    photo: Joi.string().required(),
    proEmail: Joi.string().required(),
    summary: Joi.string().required(),
    phone: Joi.string().required(),
    address: Joi.string().required(),
    skills: Joi.string().required(),
    experiences: Joi.string().required(),
    education: Joi.string().required(),
    certifications: Joi.string().required(),
    interests: Joi.string().required(),
    createdAt: Joi.string().optional(),
    updatedAt: Joi.string().optional(),
    __v: Joi.optional(),
});

const profileInputAdd = Joi.object({
    _id: Joi.string().hex().length(24).optional(),
    userId: Joi.string().hex().length(24).required(),
    headline: Joi.string().required(),
    birthDate: Joi.string().required(),
    fullName: Joi.string().required(),
    proEmail: Joi.string().required(),
    summary: Joi.string().required(),
    phone: Joi.string().required(),
    address: Joi.string().required(),
    skills: Joi.string().required(),
    experiences: Joi.string().required(),
    education: Joi.string().required(),
    certifications: Joi.string().required(),
    interests: Joi.string().required(),
    createdAt: Joi.string().optional(),
    updatedAt: Joi.string().optional(),
    __v: Joi.optional(),
});

const pdf = Joi.object({
    userId: Joi.string().hex().length(24).required(),
    template: Joi.string().hex().length(24).required(),
});

export const validateProfileUpdate = profileInputUpdate;
export const validateProfileAdd = profileInputAdd;
export const validatePDF = pdf;

export type ProfileInputAdd = joi.extractType<typeof profileInputAdd>;
export type PDFInput = joi.extractType<typeof validatePDF>;
