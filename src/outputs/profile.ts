import * as joi from '@hapi/joi';
import 'joi-extract-type';
import JoiObjectId from 'joi-objectid';
const myJoiObjectId = JoiObjectId(joi);

const profile = joi.object({
    _id: myJoiObjectId().required(),
    userId: myJoiObjectId().required(),
    headline: joi.string().required(),
    fullName: joi.string().required(),
    photo: joi.string().required(),
    proEmail: joi.string().required(),
    summary: joi.string().required(),
    phone: joi.number().required(),
    address: joi.string().required(),
    skills: joi.array().items(myJoiObjectId().required()),
    experiences: joi
        .array()
        .optional()
        .items(
            joi.object({
                title: joi.string().required(),
                company: joi.string().required(),
                startDate: joi.string().required(),
                endDate: joi.string().required(),
            }),
        ),
    education: joi
        .array()
        .optional()
        .items(
            joi.object({
                diploma: joi.string().required(),
                university: joi.string().required(),
                startDate: joi.string().required(),
                endDate: joi.string().required(),
            }),
        ),
    certifications: joi
        .array()
        .optional()
        .items(
            joi.object({
                title: joi.string().required(),
                date: joi.string().required(),
            }),
        ),
    interests: joi.string().required(),
});

const pdf = joi.binary();
export type ProfileOutput = joi.extractType<typeof profile>;

export type PDFOutput = joi.extractType<typeof pdf>;
