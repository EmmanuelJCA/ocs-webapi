import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PersonController } from './person.controller';
import { PersonService } from './person.service';
import { PersonEntity } from './entities/person.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PersonEntity])],
  exports: [PersonService],
  providers: [PersonService],
  controllers: [PersonController],
})
export class PersonModule {}
