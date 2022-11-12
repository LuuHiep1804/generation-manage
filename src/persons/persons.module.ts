import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PersonSchema } from 'src/models/person.schema';
import { PersonsController } from './persons.controller';
import { PersonsService } from './persons.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Person', schema: PersonSchema },
    ])
  ],
  controllers: [PersonsController],
  providers: [PersonsService]
})
export class PersonsModule {}
