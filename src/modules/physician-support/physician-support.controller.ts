import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Post, Put, UploadedFile } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiResponse } from '@nestjs/swagger';
import { Auth, UUIDParam } from '../../decorators/http.decorators';
import { PhysicianSupportService } from './physician-support.service';
import { PhysicianSupportDto } from './dtos/physician-support.dto';
import { RoleType } from '../../constants/role-type';
import { ApiFile } from '../../decorators/swagger.schema';
import { CreatePhysicianSupportDto } from './dtos/create-physician-support.dto';
import { IFile } from '../../interfaces/file';
import { UpdatePhysicianSupportDto } from './dtos/update-physician-support.dto';

@Controller('physician-supports')
@ApiTags('physician-supports')
export class PhysicianSupportController {
  constructor(
    private readonly physicianSupportService: PhysicianSupportService,
  ) {}

  @Post()
  @Auth([RoleType.SUPER_ADMINISTRATOR, RoleType.ADMINISTRATOR])
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: PhysicianSupportDto, description: 'Successfully Registered' })
  @ApiFile({ name: 'avatar' })
  async createPhysicianSupport(
    @Body() createUserDto: CreatePhysicianSupportDto,
    @UploadedFile() file?: IFile,
  ): Promise<PhysicianSupportDto> {
    const createdPhysicianSupport = await this.physicianSupportService.create(createUserDto, file);

    return createdPhysicianSupport.toDto();
  }

  @Get()
  @Auth([])
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    description: 'Get physician supports list',
    type: [PhysicianSupportDto],
  })
  async getPhysicianSupports(): Promise<PhysicianSupportDto[]> {
    const physicianSupportEntity = await this.physicianSupportService.findAll();

    return physicianSupportEntity.toDtos();
  }

  @Get(':id')
  @Auth([])
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get physician support',
    type: PhysicianSupportDto,
  })
  async getPhysicianSupport(@UUIDParam('id') physicianId: Uuid): Promise<PhysicianSupportDto> {
    const physicianSupport = await this.physicianSupportService.findOne(physicianId);

    return physicianSupport.toDto();
  }

  @Put(':id')
  @Auth([RoleType.SUPER_ADMINISTRATOR, RoleType.ADMINISTRATOR])
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: PhysicianSupportDto, description: 'Successfully Updated' })
  @ApiFile({ name: 'avatar' })
  async updatePhysicianSupport(
    @UUIDParam('id') physicianSupportId: Uuid,
    @Body() createPhysicianIdDto: UpdatePhysicianSupportDto,
    @UploadedFile() file?: IFile,
  ): Promise<PhysicianSupportDto> {
    const updatedPhysicianSupport = await this.physicianSupportService.update(
      physicianSupportId,
      createPhysicianIdDto,
      file,
    );

    return updatedPhysicianSupport.toDto();
  }

  @Delete(':id')
  @Auth([RoleType.SUPER_ADMINISTRATOR, RoleType.ADMINISTRATOR])
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ description: 'Successfully Deleted' })
  async inactivateUser(@UUIDParam('id') physicianSupportId: Uuid): Promise<void> {
    await this.physicianSupportService.inactivate(physicianSupportId);
  }
}
