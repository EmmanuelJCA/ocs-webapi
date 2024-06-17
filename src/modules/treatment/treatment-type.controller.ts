import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiResponse } from '@nestjs/swagger';
import { Auth, UUIDParam } from '../../decorators/http.decorators';
import { TreatmentService } from './treatment.service';
import { TreatmentTypeDto } from './dtos/treatment-type.dto';

@Controller('treatment-types')
@ApiTags('treatment-types')
export class TreatmentTypeController {
  constructor(private treatmentService: TreatmentService) {}

  @Get()
  @Auth([])
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    description: 'Get treatment types list',
    type: [TreatmentTypeDto],
  })
  async getTreatmentTypes(): Promise<TreatmentTypeDto[]> {
    const treatmentTypesEntity = await this.treatmentService.findAllTreatmentTypes();

    return treatmentTypesEntity.toDtos();
  }

  @Get(':id')
  @Auth([])
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get treatment type',
    type: TreatmentTypeDto,
  })
  async getTreatmentType(@UUIDParam('id') id: Uuid): Promise<TreatmentTypeDto> {
    const treatmentTypeEntity = await this.treatmentService.findOneTreatmentType(id);

    return treatmentTypeEntity.toDto();
  }
}
