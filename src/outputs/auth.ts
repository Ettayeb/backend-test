import * as joi from '@hapi/joi';
import 'joi-extract-type';
import JoiObjectId from 'joi-objectid';
const myJoiObjectId = JoiObjectId(joi);

const loggedInUser = joi.object({
    user: joi.object({
        _id: myJoiObjectId().required,
        firstName: joi.string().required(),
        lastName: joi.string().required(),
        email: joi.string().required(),
    }),

    token: joi.string().required(),
});

export type LoggedInUser = joi.extractType<typeof loggedInUser>;
