import { Router, Request, Response, NextFunction } from 'express';
import { Container } from 'typedi';
import ProfileService from '../../services/profile';
import { validateProfileAdd, validateProfileUpdate, validatePDF } from '../../inputs/profile';

import isAuth from '../middlewares/isAuth';
import { celebrate } from 'celebrate';
import { Logger } from 'winston';

const route = Router();

export default (app: Router) => {
    app.use('/profile', route);

    route.post(
        '/',
        celebrate({ body: validateProfileAdd }),
        isAuth,
        async (req: Request, res: Response, next: NextFunction) => {
            const logger: Logger = Container.get('logger');
            logger.debug('Calling Add profile endpoint with body: %o', req.body);

            try {
                const profileServiceInstance = Container.get(ProfileService);
                // integrating the photo into req.body
                req.body.photo = req.files.photo;

                req.body.experiences = JSON.parse(req.body.experiences);
                req.body.education = JSON.parse(req.body.education);
                req.body.skills = JSON.parse(req.body.skills);
                req.body.certifications = JSON.parse(req.body.certifications);

                const profile = await profileServiceInstance.add(req.body as ProfileInput);
                return res.status(201).json(profile);
            } catch (e) {
                logger.error('error: %o', e);
                return next({ message: 'Error: Please contact the support team to solve this.' });
            }
        },
    );

    route.put(
        '/:id',
        isAuth,
        celebrate({ body: validateProfileUpdate }),
        async (req: Request, res: Response, next: NextFunction) => {
            const logger: Logger = Container.get('logger');
            logger.debug('Calling Update profile endpoint with body: %o', req.body);

            try {
                const profileServiceInstance = Container.get(ProfileService);
                // integrating the photo into req.body

                if (!req.body.photo && (!req.files || !req.files.photo)) {
                    throw new Error('User should upload his photo');
                }
                if (!req.body.photo) {
                    req.body.photo = req.files.photo;
                }
                req.body.experiences = JSON.parse(req.body.experiences);
                req.body.education = JSON.parse(req.body.education);
                req.body.skills = JSON.parse(req.body.skills);
                req.body.certifications = JSON.parse(req.body.certifications);

                const profile = await profileServiceInstance.update(req.body as ProfileInput);
                return res.status(201).json(profile);
            } catch (e) {
                logger.error('error: %o', e);
                return next({ message: 'Error: Please contact the support team to solve this.' });
            }
        },
    );

    route.get('/:id', isAuth, async (req: Request, res: Response, next: NextFunction) => {
        const logger: Logger = Container.get('logger');
        logger.debug('Calling Getting single profile endpoint with params: %o', req.params.id);

        try {
            if (req.params.id === req.payload._id) {
                const profileServiceInstance = Container.get(ProfileService);
                const profile = await profileServiceInstance.getOne(req.payload._id);
                return res.status(200).json(profile);
            } else {
                throw new Error('Try to re-login please.');
            }
        } catch (e) {
            logger.error('error: %o', e);
            return next({ message: 'Error: Please contact the support team to solve this.' });
        }
    });

    route.post(
        '/pdf',
        celebrate({ body: validatePDF }),
        isAuth,
        async (req: Request, res: Response, next: NextFunction) => {
            const logger: Logger = Container.get('logger');
            logger.debug('Calling PDF generation endpoint with body: %o', req.body);

            try {
                const profileServiceInstance = Container.get(ProfileService);

                const result = await profileServiceInstance.generatePDF(req.body);
                return res.status(200).json(result);
            } catch (e) {
                logger.error('error: %o', e);
                return next({ message: 'Error: Please contact the support team to solve this.' });
            }
        },
    );
};
