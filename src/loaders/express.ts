import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import fileupload from 'express-fileupload';
import path from 'path';
import config from '../config';
import routes from '../api';
export default ({ app }: { app: express.Application }) => {
    /**
     * Health Check endpoints
     */
    app.get('/status', (_req, res) => {
        res.status(200).end();
    });
    app.head('/status', (_req, res) => {
        res.status(200).end();
    });

    // Useful if you're behind a reverse proxy (Heroku, Bluemix, AWS ELB, Nginx, etc)
    // It shows the real origin IP in the heroku or Cloudwatch logs
    app.enable('trust proxy');

    // The magic package that prevents frontend developers going nuts
    // Alternate description:
    // Enable Cross Origin Resource Sharing to all origins by default
    app.use(cors());

    // Security
    app.use(helmet());

    // "Lets you use HTTP verbs such as PUT or DELETE in places where the client doesn't support it."
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    app.use(require('method-override')());

    // Transforms the raw string of req.body into json
    app.use(express.json());
    // File uploads
    app.use(
        fileupload({
            createParentPath: true,
        }),
    );

    // Load API routes
    app.use(config.RestApi.prefix, routes());
    app.use(express.static('public'));

    /// catch 404 and forward to error handler
    app.use((_req, _res, next) => {
        const err = new Error('Not Found');
        err['status'] = 404;
        next(err);
    });

    /// error handlers
    app.use((err, req, res, next) => {
        /**
         * Handle 401 thrown by express-jwt library
         */
        if (err.name === 'UnauthorizedError') {
            return res.status(err.status).send({ message: err.message }).end();
        }
        return next(err);
    });
    app.use((err, req, res, next) => {
        res.status(err.status || 500);
        console.log(err);
        res.json({
            message: err.message,
        });
    });
};
