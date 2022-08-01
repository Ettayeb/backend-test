import { Router, Request, Response, NextFunction } from 'express';
import { Container } from 'typedi';
import SkillService from '../../services/skill';
import { SkillInput, validateSkill } from './../../inputs/skill';
import isAuth from '../middlewares/isAuth';
import { celebrate } from 'celebrate';
import { Logger } from 'winston';

const route = Router();

export default (app: Router) => {
    app.use('/skills', route);

    route.post(
        '/search',
        celebrate({ body: validateSkill }),
        isAuth,
        async (req: Request, res: Response, next: NextFunction) => {
            const logger: Logger = Container.get('logger');
            logger.debug('Calling Search endpoint with body: %o', req.body);

            try {
                const SkillServiceInstance = Container.get(SkillService);
                const skills = await SkillServiceInstance.getByKeyword(req.body.title as SkillInput);
                return res.status(201).json(skills);
            } catch (e) {
                logger.error('error: %o', e);
                return next({ message: 'Error: Please contact the support team to solve this.' });
            }
        },
    );
};
