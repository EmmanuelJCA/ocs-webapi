import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiResponse } from '@nestjs/swagger';
import { Auth, UUIDParam } from '../../decorators/http.decorators';
import { CancerStageDto } from './dtos/cancer-stage.dto';
import { CancerService } from './cancer.service';
import { CancerTypeDto } from './dtos/cancer-type.dto';

@Controller('cancer')
@ApiTags('cancer')
export class CancerController {
  constructor(private cancerService: CancerService) {}

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
}
