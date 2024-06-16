import { Controller, HttpCode, HttpStatus, Get } from '@nestjs/common';
import { ApiOkResponse, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SpecializationDto } from './dtos/specialization.dto';
import { Auth, UUIDParam } from '../../decorators';
import { PhysicianService } from './physician.service';

@Controller('physician-specializations')
@ApiTags('physician-specializations')
export class PhysicianSpecializationController {
  constructor(private physicianService: PhysicianService) {}

  @Get()
  @Auth([])
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    description: 'Get specialization list',
    type: [SpecializationDto],
  })
  async getSpecializations(): Promise<SpecializationDto[]> {
    const specializationEntity = await this.physicianService.findAllSpecializations();

    return specializationEntity.toDtos();
  }

  @Get(':id')
  @Auth([])
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get specialization',
    type: SpecializationDto,
  })
  async getSpecialization(@UUIDParam('id') specializationId: Uuid): Promise<SpecializationDto> {
    const specializationEntity = await this.physicianService.findOneSpecialization(specializationId);

    return specializationEntity.toDto();
  }
}
