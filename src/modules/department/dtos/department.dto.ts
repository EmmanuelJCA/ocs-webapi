import { AbstractDto } from '../../../common/dto/abstract.dto';
import { ClassField, StringField } from '../../../decorators';
import { DepartmentEntity } from '../entities/department.entity';
import { SpecializationDto } from './specialization.dto';

export class DepartmentDto extends AbstractDto {
  @StringField()
  name!: string;

  @ClassField(() => SpecializationDto)
  specializations!: SpecializationDto[];

  constructor(department: DepartmentEntity) {
    super(department);
    this.name = department.name;
    this.specializations = department.specializations
  }
}
