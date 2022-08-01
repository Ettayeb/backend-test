import { Inject, Service } from 'typedi';
import { Types } from 'mongoose';
import config from '../config';
import { ProfileInput, PDFInput } from '../inputs/profile';
import { ProfileOutput, PDFOutput } from '../outputs/profile';

import Profile from '../models/profile';
import Template from './../models/template';
import generatePDF from './../helpers/pdf';
@Service()
export default class ProfileController {
    constructor(@Inject('logger') private logger) {}

    async add(profileInput: ProfileInput): Promise<ProfileOutput | null> {
        const exist = await Profile.findOne({ userId: profileInput.userId });

        if (exist) {
            const profile = await Profile.findOneAndUpdate({ userId: profileInput.userId }, profileInput);
            return profile;
        } else {
            const profile = new Profile(profileInput);
            const file = profileInput.photo;
            const fileName = new Date().getTime() + file.name;
            const location = './public/uploads/' + fileName;
            file.mv(location);
            profile.photo = config.hostname + '/uploads/' + fileName;
            await profile.save();
            return profile;
        }
    }

    async update(profileInput: ProfileInput): Promise<ProfileOutput | null> {
        if (typeof profileInput.photo === 'string') {
            const profile = await Profile.findOneAndUpdate({ userId: profileInput.userId }, profileInput);
            return profile;
        } else {
            const file = profileInput.photo;
            const fileName = new Date().getTime() + file.name;
            const location = './public/uploads/' + fileName;
            file.mv(location);
            profileInput.photo = config.hostname + '/uploads/' + fileName;
            const profile = await Profile.findOneAndUpdate({ userId: profileInput.userId }, profileInput);
            return profile;
        }
    }

    async getOne(_id: Types.ObjectId): Promise<ProfileOutput | null> {
        const profile = await Profile.findOne({ userId: _id }).populate('skills');
        return profile;
    }

    async generatePDF(data: PDFInput): Promise<PDFOutput | null> {
        const profile = await Profile.findOne({ userId: data.userId }).populate('skills');
        const template = await Template.findOne({ _id: data.template });
        const PDF = generatePDF(profile, template);

        return PDF;
    }
}
