import { Router } from 'express';
import auth from './routes/auth';
import profile from './routes/profile';
import skill from './routes/skill';
import template from './routes/template';

// guaranteed to get dependencies

export default () => {
    const app = Router();
    auth(app);
    profile(app);
    skill(app);
    template(app);

    return app;
};
