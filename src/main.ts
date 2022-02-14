import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { NestFactory } from '@nestjs/core';
import { join } from 'path';
import { AppModule } from './app.module';
import * as expressEjsLayouts from 'express-ejs-layouts';
import * as methodOverride from 'method-override';
import * as session from 'express-session';
const flash = require("connect-flash");

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useGlobalPipes(new ValidationPipe())

  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.use(
    session({
      secret: "anjay", //express session by default store in memory so it will cause memory leaks, so for best practice in production see the documentation
      resave: false,
      saveUninitialized: false,
      cookie: {maxAge: 3600000} // you should learn redis
    })
  );
    app.use(flash());
  app.setViewEngine('ejs');
  app.use(methodOverride("_method"));
  app.use(expressEjsLayouts);

  await app.listen(3000);
}
bootstrap();
