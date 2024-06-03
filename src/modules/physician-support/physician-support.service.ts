import { BadRequestException, Injectable, NotFoundException, } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PhysicianSupportEntity } from './entities/physician-support.entity';
import { Repository } from 'typeorm';
import { CreatePhysicianSupportDto } from './dtos/create-physician-support.dto';
import { Transactional } from 'typeorm-transactional';
import { UserService } from '../user/user.service';
import { DepartmentService } from '../department/department.service';
import { IFile } from '../../interfaces/file';
import { UpdatePhysicianSupportDto } from './dtos/update-physician-support.dto';

@Injectable()
export class PhysicianSupportService {
  constructor(
    @InjectRepository(PhysicianSupportEntity)
    private physicianSupportRepository: Repository<PhysicianSupportEntity>,
    private userService: UserService,
    private departmentService: DepartmentService,
  ) {}

  @Transactional()
  async create(
    { specializationsIds, ...personalInfo }: CreatePhysicianSupportDto,
    file?: IFile,
  ): Promise<PhysicianSupportEntity> {
    const specializations =
    await this.departmentService.findSupportSpecializationsByIds(
      specializationsIds,
    );

    if (specializations.length !== specializationsIds.length) {
      throw new BadRequestException('Especialidades no válidos');
    }

    const user = await this.userService.createUser(personalInfo, file, true);
    const physicianSupportEntity = this.physicianSupportRepository.create();

    physicianSupportEntity.user = user;
    physicianSupportEntity.specializations = specializations;

    await this.physicianSupportRepository.save(physicianSupportEntity);
    return physicianSupportEntity;
  }

  async findAll(): Promise<PhysicianSupportEntity[]> {
    return this.physicianSupportRepository.find({ relations: ['user', 'physicianSupportSpecialization', 'user.oncologyCenters'] });
  }

  async findOne(id: Uuid): Promise<PhysicianSupportEntity> {
    const physicianEntity = await this.physicianSupportRepository.findOne({
      relations: ['user', 'physicianSupportSpecialization', 'user.oncologyCenters'],
      where: {id}
    });
    if (!physicianEntity) {
      throw new NotFoundException('Ayudante Médico no encontrado no encontrada');
    }

    return physicianEntity;
  }

  @Transactional()
  async update(id: Uuid, updatePhysicianSupportDto: UpdatePhysicianSupportDto, file?: IFile,): Promise<PhysicianSupportEntity> {
    const physicianSupportEntity = await this.findOne(id);

    const { specializationsIds, ...personalInfo } = updatePhysicianSupportDto;

    const user = await this.userService.updateUser(physicianSupportEntity.user.id, personalInfo, file);

    if (specializationsIds) {
      const specializations =
      await this.departmentService.findSupportSpecializationsByIds(
        specializationsIds,
      );

      physicianSupportEntity.specializations = specializations;
    }

    await this.physicianSupportRepository.save(physicianSupportEntity);

    physicianSupportEntity.user = user;

    return physicianSupportEntity;
  }

  async inactivate(id: Uuid): Promise<PhysicianSupportEntity> {
    const physicianSupportEntity = await this.findOne(id);

    this.userService.inactivateUser(physicianSupportEntity.user.id);

    return physicianSupportEntity;
  }

}
