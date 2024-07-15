import { Body, Controller, Get, HttpCode, HttpStatus, Post, Put } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiResponse, ApiCreatedResponse, ApiAcceptedResponse } from '@nestjs/swagger';
import { Auth, UUIDParam } from '../../decorators/http.decorators';
import { CancerStageDto } from './dtos/cancer-stage.dto';
import { CancerService } from './cancer.service';
import { CancerTypeDto } from './dtos/cancer-type.dto';
import { CreateCancerTypeDto } from './dtos/create-cancer-type.dto';
import { UpdateCancerTypeDto } from './dtos/update-cancer-type.dto';
import { RoleType } from '../../constants/role-type';

@Controller('cancer')
@ApiTags('cancer')
export class CancerController {
  constructor(private cancerService: CancerService) {}

  @Post('/types')
  @Auth([RoleType.ADMINISTRATOR, RoleType.SUPER_ADMINISTRATOR])
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse({ type: CancerTypeDto })
  async createCancerType(
    @Body() createCancerTypeDto: CreateCancerTypeDto,
  ): Promise<CancerTypeDto> {
    const cancerTypeEntityEntity =
      await this.cancerService.createCancerType(
        createCancerTypeDto,
      );

    return cancerTypeEntityEntity.toDto();
  }

  @Get('/types')
  @Auth([])
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    description: 'Get cancer types list',
    type: [CancerTypeDto],
  })
  async getTypes(): Promise<CancerTypeDto[]> {
    const typeEntity = await this.cancerService.findAllCancerTypes();

    return typeEntity.toDtos();
  }

  @Get('/types/:id')
  @Auth([])
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get cancer types',
    type: CancerTypeDto,
  })
  async getType(@UUIDParam('id') id: Uuid): Promise<CancerTypeDto> {
    const typeEntity = await this.cancerService.findOneCancerType(id);

    return typeEntity.toDto();
  }

  @Get('/stages')
  @Auth([])
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    description: 'Get cancer stages list',
    type: [CancerStageDto],
  })
  async getStages(): Promise<CancerStageDto[]> {
    const stageEntity = await this.cancerService.findAllCancerStages();

    return stageEntity.toDtos();
  }

  @Get('/stages/:id')
  @Auth([])
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get cancer stage',
    type: CancerStageDto,
  })
  async getStage(@UUIDParam('id') id: Uuid): Promise<CancerStageDto> {
    const stageEntity = await this.cancerService.findOneCancerStage(id);

    return stageEntity.toDto();
  }

  @Put('/types/:id')
  @Auth([RoleType.ADMINISTRATOR, RoleType.SUPER_ADMINISTRATOR])
  @ApiAcceptedResponse({ type: CancerTypeDto })
  async updateCancerType(
    @UUIDParam('id') id: Uuid,
    @Body() updateCancerTypeDto: UpdateCancerTypeDto,
  ): Promise<CancerTypeDto> {
    const cancerTypeEntity =
      await this.cancerService.updateCancerType(
        id,
        updateCancerTypeDto,
      );

    return cancerTypeEntity.toDto();
  }
}
