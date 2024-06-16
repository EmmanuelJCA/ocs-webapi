import { Controller, HttpCode, HttpStatus, Get } from '@nestjs/common';
import { ApiOkResponse, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SpecializationDto } from './dtos/specialization.dto';
import { Auth, UUIDParam } from '../../decorators';
import { PhysicianSupportService } from './physician-support.service';

@Controller('physician-support-specializations')
@ApiTags('physician-support-specializations')
export class PhysicianSupportSpecializationController {
  constructor(private physicianSupportService: PhysicianSupportService) {}

  @Get()
  @Auth([])
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    description: 'Get specialization list',
    type: [SpecializationDto],
  })
  async getSpecializations(): Promise<SpecializationDto[]> {
    const specializationEntity = await this.physicianSupportService.findAllSpecializations();

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
    const specializationEntity = await this.physicianSupportService.findOneSpecialization(specializationId);

    return specializationEntity.toDto();
  }
}
