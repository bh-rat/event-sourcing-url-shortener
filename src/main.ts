import { NestFactory } from '@nestjs/core';
import { ApplicationModule } from './app.module';
import {connect} from 'mongoose';

import { MONGO_URL } from './config';


async function connectToDatabase() {
  await connect(MONGO_URL);
}

async function bootstrap() {
  // Connect to the database
  connectToDatabase();

  const app = await NestFactory.create(ApplicationModule);
  app.listen(3000, () => console.log('Application is listening on port 3000.'));
}
bootstrap();
