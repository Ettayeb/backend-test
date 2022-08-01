import * as joi from '@hapi/joi';
import 'joi-extract-type';
import { Joi } from 'celebrate';

const skill = Joi.object({
    title: Joi.string().required(),
});

export const validateSkill = skill;

export type SkillInput = joi.extractType<typeof skill>;
