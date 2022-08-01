import expressLoader from './express';
import dependencyInjector from './dependencyInjector';
import mongooseLoader from './mongoose';
import Logger from './logger';

export default async ({ expressApp }) => {
    const mongoConnection = await mongooseLoader();
    Logger.info('DB loaded and connected!');
    await dependencyInjector();
    Logger.info('Dependency Injector loaded');

    expressLoader({ app: expressApp });
    Logger.info('Express loaded');

    Logger.info('Server fully loaded');
};
