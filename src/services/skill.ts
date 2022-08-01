import { Service } from 'typedi';
import SkillController from '../dataModels/skill';
import { SkillInput } from './../inputs/skill';
import { SkillOutput } from './../outputs/skill';

@Service()
export default class SkillService {
    constructor(private readonly skillController: SkillController) {}

    public async getByKeyword(data: SkillInput): Promise<SkillOutput> {
        const skills = await this.skillController.getByKeyword(data);
        return skills;
    }
}
