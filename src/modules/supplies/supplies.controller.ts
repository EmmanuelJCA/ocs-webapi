import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiResponse } from '@nestjs/swagger';
import { Auth, UUIDParam } from '../../decorators/http.decorators';
import { SuppliesService } from './supplies.service';
import { SuppliesDto } from './dtos/supplies.dto';

@Controller('supplies')
@ApiTags('supplies')
export class SuppliesController {
  constructor(private suppliesService: SuppliesService) {}

  @Get()
  @Auth([])
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    description: 'Get supplies list',
    type: [SuppliesDto],
  })
  async getSupplies(): Promise<SuppliesDto[]> {
    const suppliesEntity = await this.suppliesService.findAll();

    return suppliesEntity.toDtos();
  }

  @Get(':id')
  @Auth([])
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get supplies',
    type: SuppliesDto,
  })
  async getOneSupplies(@UUIDParam('id') id: Uuid): Promise<SuppliesDto> {
    const suppliesEntity = await this.suppliesService.findOne(id);

    return suppliesEntity.toDto();
  }
}
