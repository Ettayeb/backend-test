import { Router, Request, Response, NextFunction } from 'express';
import { Container } from 'typedi';
import TemplateService from '../../services/template';
import { TemplateOutput } from './../../outputs/template';
import isAuth from '../middlewares/isAuth';
import { celebrate, Joi } from 'celebrate';
import { Logger } from 'winston';

const route = Router();

export default (app: Router) => {
    app.use('/templates', route);

    route.get('/', isAuth, async (req: Request, res: Response, next: NextFunction) => {
        const logger: Logger = Container.get('logger');
        logger.debug('Calling Gettinf all templates endpoint with body: %o', req.body);

        try {
            const TemplateServiceInstance = Container.get(TemplateService);
            const templates = await TemplateServiceInstance.getAll();
            return res.status(201).json(templates);
        } catch (e) {
            logger.error('error: %o', e);
            return next({ message: 'Error: Please contact the support team to solve this.' });
        }
    });
};
