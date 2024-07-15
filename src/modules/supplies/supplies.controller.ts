import { Body, Controller, Get, HttpCode, HttpStatus, Post, Put } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiResponse, ApiCreatedResponse, ApiAcceptedResponse } from '@nestjs/swagger';
import { Auth, UUIDParam } from '../../decorators/http.decorators';
import { SuppliesService } from './supplies.service';
import { SuppliesDto } from './dtos/supplies.dto';
import { CreateSuppliesDto } from './dtos/create-supplies.dto';
import { UpdateSuppliesDto } from './dtos/update-supplies.dto';
import { RoleType } from '../../constants/role-type';

@Controller('supplies')
@ApiTags('supplies')
export class SuppliesController {
  constructor(private suppliesService: SuppliesService) {}

  @Post()
  @Auth([RoleType.ADMINISTRATOR, RoleType.SUPER_ADMINISTRATOR])
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse({ type: SuppliesDto })
  async createSupplies(
    @Body() createSuppliesDto: CreateSuppliesDto,
  ): Promise<SuppliesDto> {
    const suppliesEntity =
      await this.suppliesService.create(
        createSuppliesDto,
      );

    return suppliesEntity.toDto();
  }

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

  @Put(':id')
  @Auth([RoleType.ADMINISTRATOR, RoleType.SUPER_ADMINISTRATOR])
  @ApiAcceptedResponse({ type: SuppliesDto })
  async updateSupplies(
    @UUIDParam('id') id: Uuid,
    @Body() updateSuppliesDto: UpdateSuppliesDto,
  ): Promise<SuppliesDto> {
    const suppliesEntity =
      await this.suppliesService.update(
        id,
        updateSuppliesDto,
      );

    return suppliesEntity.toDto();
  }
}
