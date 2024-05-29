import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PersonEntity } from './entities/person.entity';
import { FindOptionsWhere, Repository } from 'typeorm';
import { CreatePersonDto } from './dtos/create-person.dto';
import { UpdatePersonDto } from './dtos/update-person.dto';

@Injectable()
export class PersonService {
  constructor(
    @InjectRepository(PersonEntity)
    private personRepository: Repository<PersonEntity>,
  ) {}

  async create(person: CreatePersonDto): Promise<PersonEntity> {
    const existingPhone = await this.findOneBy({ phone: person.phone });

    if (existingPhone) {
      throw new BadRequestException('El número de teléfono ya está registrado');
    }

    const personEntity = this.personRepository.create(person);
    await this.personRepository.save(personEntity);
    return personEntity;
  }

  async findAll(): Promise<PersonEntity[]> {
    return this.personRepository.find();
  }

  async findOne(id: Uuid): Promise<PersonEntity> {
    const personEntity = await this.personRepository.findOneBy({ id });
    if (!personEntity) {
      throw new NotFoundException('Persona no encontrada');
    }
    return personEntity;
  }

  async findOneBy(findData: FindOptionsWhere<PersonEntity> | FindOptionsWhere<PersonEntity>[]): Promise<PersonEntity | null> {
    return this.personRepository.createQueryBuilder('person')
      .leftJoinAndSelect('person.user', 'user')
      .where(findData)
      .getOne();
  }

  async update(id: Uuid, person: UpdatePersonDto): Promise<PersonEntity> {
    const personEntity = await this.findOne(id);

    if (person.phone && person.phone !== personEntity.phone) {
      const existingPhone = await this.findOneBy({ phone: person.phone });

      if (existingPhone) {
        throw new BadRequestException('El número de teléfono ya está registrado');
      }
    }

    if (person.identification && person.identification !== personEntity.identification) {
      const existingIdentification = await this.findOneBy({ identification: person.identification });

      if (existingIdentification) {
        throw new BadRequestException('La cédula ya está registrada');
      }
    }

    this.personRepository.merge(personEntity, person);
    await this.personRepository.save(personEntity);
    return personEntity;
  }
}
