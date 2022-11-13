import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PersonsModule } from './persons/persons.module';
import 'dotenv/config';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.DATABASE_URL || 'mongodb+srv://hiepluu184201:Hiep184*@generation.w5h1xfc.mongodb.net/?retryWrites=true&w=majority'),
    PersonsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
