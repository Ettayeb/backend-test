import { Service } from 'typedi';
import { Types } from 'mongoose';
import ProfileController from '../dataModels/profile';
import { ProfileInput } from '../inputs/profile';
import { PDFInput } from '../inputs/profile';

import { ProfileOutput } from '../outputs/profile';

@Service()
export default class ProfileService {
    constructor(private readonly profileController: ProfileController) {}

    public async add(data: ProfileInput): Promise<ProfileOutput> {
        const profile = await this.profileController.add(data);

        return profile;
    }
    public async update(data: ProfileInput): Promise<ProfileOutput> {
        const profile = await this.profileController.update(data);

        return profile;
    }
    public async getOne(_id: Types.ObjectId): Promise<ProfileOutput> {
        const profile = await this.profileController.getOne(_id);

        return profile;
    }

    public async generatePDF(data: PDFInput): Promise<ProfileOutput> {
        const result = await this.profileController.generatePDF(data);

        return result;
    }
}
