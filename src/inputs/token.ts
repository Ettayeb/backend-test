import * as joi from '@hapi/joi';
import 'joi-extract-type';

const userAddress = joi.object({
    postCode: joi.string().required(),
    startDate: joi.date().required(),
    endDate: joi.date().required(),
});

const user = joi.object({
    name: joi.string().required(),
    phoneNumber: joi.number().optional(),
    addresses: joi.array().items(userAddress).required(),
});

export type User = joi.extractType<typeof user>;
export type UserAddress = joi.extractType<typeof userAddress>;
