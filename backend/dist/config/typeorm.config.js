"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeOrmConfig = exports.typeOrmAsyncConfig = void 0;
const config_1 = require("@nestjs/config");
exports.typeOrmAsyncConfig = {
    imports: [config_1.ConfigModule],
    inject: [config_1.ConfigService],
    useFactory: async () => {
        return {
            type: 'mysql',
            host: process.env.DB_HOST,
            port: process.env.DB_PORT,
            username: process.env.DB_USERNAME,
            database: process.env.DB_DATABASE,
            password: process.env.DB_PASSWORD,
            entities: [__dirname + '/../**/*.entity.{js,ts}'],
            migrations: [__dirname + '/../database/migrations/*{.ts,.js}'],
            extra: {
                charset: 'utf8mb4_unicode_ci',
            },
            synchronize: false,
            logging: false,
        };
    },
};
exports.typeOrmConfig = {
    type: 'mysql',
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    entities: [__dirname + '/../**/*.entity.{js,ts}'],
    migrations: [__dirname + '/../database/migrations/*{.ts,.js}'],
    extra: {
        charset: 'utf8mb4_unicode_ci',
    },
    synchronize: false,
    logging: true,
};
//# sourceMappingURL=typeorm.config.js.map