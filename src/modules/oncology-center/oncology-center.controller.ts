import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Put,
} from '@nestjs/common';
import {
  ApiAcceptedResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';

import { RoleType } from '../../constants';
import { Auth, UUIDParam } from '../../decorators';
import { CreateOncologyCenterDto } from './dtos/create-oncology-center.dto';
import { OncologyCenterDto } from './dtos/oncology-center.dto';
import { UpdateOncologyCenterDto } from './dtos/update-oncology-center.dto';
import { OncologyCenterService } from './oncology-center.service';

@Controller('oncology-centers')
@ApiTags('oncology-centers')
export class OncologyCenterController {
  constructor(private oncologyCenterService: OncologyCenterService) {}

  @Post()
  @Auth([RoleType.SUPER_ADMINISTRATOR])
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse({ type: OncologyCenterDto })
  async createOncologyCenter(
    @Body() createOncologyCenterDto: CreateOncologyCenterDto,
  ): Promise<OncologyCenterDto> {
    const oncologyCenterEntity =
      await this.oncologyCenterService.createOncologyCenter(
        createOncologyCenterDto,
      );

    return oncologyCenterEntity.toDto();
  }

  @Get()
  @Auth([])
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: [OncologyCenterDto] })
  async getOncologyCenters(): Promise<OncologyCenterDto[]> {
    const oncologyCenters =
      await this.oncologyCenterService.getOncologyCenters();

    return oncologyCenters.toDtos();
  }

  @Get(':id')
  @Auth([])
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: OncologyCenterDto })
  async getOncologyCenter(
    @UUIDParam('id') id: Uuid,
  ): Promise<OncologyCenterDto> {
    const oncologyCenterEntity =
      await this.oncologyCenterService.getOncologyCenter(id);

    return oncologyCenterEntity.toDto();
  }

  @Put(':id')
  @Auth([RoleType.SUPER_ADMINISTRATOR])
  @ApiAcceptedResponse({ type: OncologyCenterDto })
  async updateOncologyCenter(
    @UUIDParam('id') id: Uuid,
    @Body() updateOncologyCenterDto: UpdateOncologyCenterDto,
  ): Promise<OncologyCenterDto> {
    const oncologyCenterEntity =
      await this.oncologyCenterService.updateOncologyCenter(
        id,
        updateOncologyCenterDto,
      );

    return oncologyCenterEntity.toDto();
  }

  @Delete(':id')
  @Auth([RoleType.SUPER_ADMINISTRATOR, RoleType.ADMINISTRATOR])
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ description: 'Successfully Deleted' })
  async inactivateOncologyCenter(@UUIDParam('id') id: Uuid): Promise<void> {
    await this.oncologyCenterService.inactivateOncologyCenter(id);
  }
}
