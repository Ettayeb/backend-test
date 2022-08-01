import { Inject, Service } from 'typedi';
import { TemplateOutput } from './../outputs/template';

import Template from '../models/template';

@Service()
export default class SkillController {
    constructor(@Inject('logger') private logger) {}

    async getAll(): Promise<TemplateOutput | null> {
        const templates = await Template.find({});

        return templates;
    }
}
