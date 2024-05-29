import { Controller, HttpCode, HttpStatus, Get } from '@nestjs/common';
import { ApiOkResponse, ApiResponse, ApiTags } from "@nestjs/swagger";
import { DepartmentService } from './department.service';
import { DepartmentDto } from './dtos';
import { Auth, UUIDParam } from '../../decorators';

@Controller('departments')
@ApiTags('departments')
export class DepartmentController {
  constructor(private departmentService: DepartmentService) {}

  @Get()
  @Auth([])
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    description: 'Get departments list',
    type: [DepartmentDto],
  })
  async getDepartments(): Promise<DepartmentDto[]> {
    const departmentEntity = await this.departmentService.findAll();

    return departmentEntity.toDtos();
  }

  @Get(':id')
  @Auth([])
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get department',
    type: DepartmentDto,
  })
  async getDepartment(@UUIDParam('id') departmentId: Uuid): Promise<DepartmentDto> {
    const departmentEntity = await this.departmentService.findOne(departmentId);

    return departmentEntity.toDto();
  }
}
