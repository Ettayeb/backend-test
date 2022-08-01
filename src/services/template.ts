import { Service } from 'typedi';
import TemplateController from '../dataModels/template';
import { TemplateOutput } from './../outputs/template';

@Service()
export default class TemplateService {
    constructor(private readonly templateController: TemplateController) {}

    public async getAll(): Promise<TemplateOutput> {
        const templates = await this.templateController.getAll();
        return templates;
    }
}
