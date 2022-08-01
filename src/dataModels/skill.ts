import { Inject, Service } from 'typedi';
import { SkillOutput } from './../outputs/skill';
import { SkillInput } from './../inputs/skill';

import Skill from '../models/skill';

@Service()
export default class SkillController {
    constructor(@Inject('logger') private logger) {}

    async getByKeyword(skillInput: SkillInput): Promise<SkillOutput | null> {
        const skills = await Skill.find({ title: { $regex: skillInput } });

        return skills;
    }
}
