"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const path_1 = require("path");
const app_module_1 = require("./app.module");
const session = require("express-session");
const contains_1 = require("./contains");
const dotenv = require("dotenv");
const port = contains_1.PORT || 9000;
async function bootstrap() {
    dotenv.config();
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors();
    app.setGlobalPrefix('/v1/api');
    app.useStaticAssets((0, path_1.join)(__dirname, '..', 'uploads'), { prefix: '/image/' });
    app.use(session({
        secret: 'my-secret-key',
        resave: true,
        saveUninitialized: true,
    }));
    app.listen(port, () => {
        console.log(`Server is running on site http://localhost:${port}`);
    });
}
bootstrap();
//# sourceMappingURL=main.js.map