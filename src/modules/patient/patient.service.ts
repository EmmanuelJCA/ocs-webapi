import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PatientEntity } from './entities/patient.entity';
import { Repository } from 'typeorm';
import { CreatePatientDto } from './dtos/create-patient.dto';
import { Transactional } from 'typeorm-transactional';
import { PersonService } from '../person/person.service';
import { UpdatePatientDto } from './dtos/update-patient.dto';

@Injectable()
export class PatientService {
  constructor(
    @InjectRepository(PatientEntity)
    private patientRepository: Repository<PatientEntity>,
    private personService: PersonService,
  ) {}

  @Transactional()
  async create({ email, ...personalInfo }: CreatePatientDto, returnExisting: boolean = false): Promise<PatientEntity> {
    if (returnExisting) {
      const existingEmail = await this.patientRepository.findOne({
        relations: ['person'],
        where: {
          email,
          person: {
            identification: personalInfo.identification
          }
        },
      });

      if (existingEmail) return existingEmail;
    }

    const existingEmail = await this.patientRepository.findOneBy({ email });

    if (existingEmail) {
      throw new BadRequestException('El correo electrónico ya está registrado');
    }

    let personEntity = await this.personService.findOneBy({ identification: personalInfo.identification });

    if (!personEntity) {
      personEntity = await this.personService.create(personalInfo);
    }

    const patientEntity = this.patientRepository.create({ email });
    patientEntity.person = personEntity;

    await this.patientRepository.save(patientEntity);
    return patientEntity;
  }

  async findAll(): Promise<PatientEntity[]> {
    return this.patientRepository.find();
  }

  async findOne(id: Uuid): Promise<PatientEntity> {
    const personEntity = await this.patientRepository.findOneBy({ id });
    if (!personEntity) {
      throw new NotFoundException('Paciente no encontrado');
    }
    return personEntity;
  }

  @Transactional()
  async update(id: Uuid, { email, ...personalInfo }: UpdatePatientDto): Promise<PatientEntity> {
    const patientEntity = await this.findOne(id);

    if (email && email !== patientEntity.email) {
      const existingEmail = await this.patientRepository.findOneBy({ email: email ?? '' });

      if (existingEmail) {
        throw new BadRequestException('El correo electrónico ya está registrado');
      }
    }

    const person = await this.personService.update(patientEntity.person.id, personalInfo);

    this.patientRepository.merge(patientEntity, {
      email,
      person
    });

    await this.patientRepository.save(patientEntity);
    return patientEntity;
  }
}
