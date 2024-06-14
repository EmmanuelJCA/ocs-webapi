import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiResponse } from '@nestjs/swagger';
import { Auth, UUIDParam } from '../../decorators/http.decorators';
import { SuppliesService } from './supplies.service';
import { MeasurementUnitDto } from './dtos/measurement-unit.dto';

@Controller('measurement-units')
@ApiTags('measurement-units')
export class MeasurementUnitController {
  constructor(private suppliesService: SuppliesService) {}

  @Get()
  @Auth([])
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    description: 'Get measurement units list',
    type: [MeasurementUnitDto],
  })
  async getMeasurementUnits(): Promise<MeasurementUnitDto[]> {
    const measurementUnitEntity = await this.suppliesService.findAllMeasurementUnits();

    return measurementUnitEntity.toDtos();
  }

  @Get(':id')
  @Auth([])
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get measurement unit',
    type: MeasurementUnitDto,
  })
  async getMeasurementUnit(@UUIDParam('id') id: Uuid): Promise<MeasurementUnitDto> {
    const measurementUnitEntity = await this.suppliesService.findOneMeasurementUnit(id);

    return measurementUnitEntity.toDto();
  }
}
