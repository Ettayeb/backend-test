import * as joi from '@hapi/joi';
import 'joi-extract-type';
import JoiObjectId from 'joi-objectid';
const myJoiObjectId = JoiObjectId(joi);

const templates = joi.array().items(
    joi.object({
        _id: myJoiObjectId().required(),
        title: joi.string().required(),
        pug: joi.string().required(),
        scss: joi.string().required(),
        photo: joi.string().required(),
    }),
);

export type TemplateOutput = joi.extractType<typeof templates>;
