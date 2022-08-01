import * as joi from '@hapi/joi';
import 'joi-extract-type';
import JoiObjectId from 'joi-objectid';
const myJoiObjectId = JoiObjectId(joi);

const skill = joi.array().items(
    joi.object({
        _id: myJoiObjectId().required(),
        title: joi.string().required(),
    }),
);

export type SkillOutput = joi.extractType<typeof skill>;
