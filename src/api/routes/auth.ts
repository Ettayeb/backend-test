import { Router, Request, Response, NextFunction } from 'express';
import { Container } from 'typedi';
import AuthService from '../../services/auth';
import { LoginInput, SignUpInput, validateLogin, validateSignUp } from '../../inputs/auth';
import { celebrate } from 'celebrate';
import { Logger } from 'winston';

const route = Router();

export default (app: Router) => {
    app.use('/auth', route);

    route.post(
        '/signup',
        celebrate({ body: validateSignUp }),
        async (req: Request, res: Response, next: NextFunction) => {
            const logger: Logger = Container.get('logger');
            logger.debug('Calling Sign-Up endpoint with body: %o', req.body);

            try {
                const authServiceInstance = Container.get(AuthService);
                const { user, token } = await authServiceInstance.signUp(req.body as SignUpInput);
                return res.status(201).json({ user, token });
            } catch (e) {
                logger.error('error: %o', e);
                return next({ message: 'Error: Please contact the support team to solve this.' });
            }
        },
    );

    route.post(
        '/login',
        celebrate({ body: validateLogin }),
        async (req: Request, res: Response, next: NextFunction) => {
            const logger: Logger = Container.get('logger');
            logger.debug('Calling Sign-In endpoint with body: %o', req.body);
            try {
                const authServiceInstance = Container.get(AuthService);
                const { user, token } = await authServiceInstance.logIn(req.body as LoginInput);
                return res.json({ user, token }).status(200);
            } catch (e) {
                logger.error('error: %o', e);
                return next(e);
            }
        },
    );
};
