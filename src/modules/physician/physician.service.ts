import { BadRequestException, Injectable, NotFoundException, } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PhysicianEntity } from './entities/physician.entity';
import { Repository } from 'typeorm';
import { CreatePhysicianDto } from './dtos/create-physician.dto';
import { Transactional } from 'typeorm-transactional';
import { UserService } from '../user/user.service';
import { DepartmentService } from '../department/department.service';
import { IFile } from '../../interfaces/file';
import { UpdatePhysicianDto } from './dtos/update-physician.dto';

@Injectable()
export class PhysicianService {
  constructor(
    @InjectRepository(PhysicianEntity)
    private physicianRepository: Repository<PhysicianEntity>,
    private userService: UserService,
    private departmentService: DepartmentService,
  ) {}

  @Transactional()
  async create(
    { specializationsIds, ...personalInfo }: CreatePhysicianDto,
    file?: IFile,
  ): Promise<PhysicianEntity> {
    const specializations =
    await this.departmentService.findSpecializationsByIds(
      specializationsIds,
    );

    if (specializations.length !== specializationsIds.length) {
      throw new BadRequestException('Especialidades no válidos');
    }

    const user = await this.userService.createUser(personalInfo, file, true);
    const physicianEntity = this.physicianRepository.create();

    physicianEntity.user = user;
    physicianEntity.physicianSpecialization = specializations;

    await this.physicianRepository.save(physicianEntity);
    return physicianEntity;
  }

  async findAll(): Promise<PhysicianEntity[]> {
    return this.physicianRepository.find({ relations: ['user', 'physicianSpecialization', 'user.oncologyCenters'] });
  }

  async findOne(id: Uuid): Promise<PhysicianEntity> {
    const physicianEntity = await this.physicianRepository.findOne({
      relations: ['user', 'physicianSpecialization', 'user.oncologyCenters'],
      where: {id}
    });
    if (!physicianEntity) {
      throw new NotFoundException('Médico no encontrado no encontrada');
    }

    return physicianEntity;
  }

  @Transactional()
  async update(id: Uuid, updatePhysicianDto: UpdatePhysicianDto, file?: IFile,): Promise<PhysicianEntity> {
    const physicianEntity = await this.findOne(id);

    const { specializationsIds, ...personalInfo } = updatePhysicianDto;

    const user = await this.userService.updateUser(physicianEntity.user.id, personalInfo, file);

    if (specializationsIds) {
      const specializations =
      await this.departmentService.findSpecializationsByIds(
        specializationsIds,
      );

      physicianEntity.physicianSpecialization = specializations;
    }

    await this.physicianRepository.save(physicianEntity);

    physicianEntity.user = user;

    return physicianEntity;
  }

  async inactivate(id: Uuid): Promise<PhysicianEntity> {
    const physicianEntity = await this.findOne(id);

    this.userService.inactivateUser(physicianEntity.user.id);

    return physicianEntity;
  }

}
