import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Post, Put, UploadedFile } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiResponse } from '@nestjs/swagger';
import { Auth, UUIDParam } from '../../decorators/http.decorators';
import { PhysicianService } from './physician.service';
import { PhysicianDto } from './dtos/physician.dto';
import { RoleType } from '../../constants/role-type';
import { ApiFile } from '../../decorators/swagger.schema';
import { CreatePhysicianDto } from './dtos/create-physician.dto';
import { IFile } from '../../interfaces/file';
import { UpdatePhysicianDto } from './dtos/update-physician.dto';

@Controller('physicians')
@ApiTags('physicians')
export class PhysicianController {
  constructor(
    private readonly physicianService: PhysicianService,
  ) {}

  @Post()
  @Auth([RoleType.SUPER_ADMINISTRATOR, RoleType.ADMINISTRATOR])
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: PhysicianDto, description: 'Successfully Registered' })
  @ApiFile({ name: 'avatar' })
  async createUser(
    @Body() createUserDto: CreatePhysicianDto,
    @UploadedFile() file?: IFile,
  ): Promise<PhysicianDto> {
    const createdPhysician = await this.physicianService.create(createUserDto, file);

    return createdPhysician.toDto();
  }

  @Get()
  @Auth([])
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    description: 'Get physicians list',
    type: [PhysicianDto],
  })
  async getPatients(): Promise<PhysicianDto[]> {
    const physicianEntity = await this.physicianService.findAll();

    return physicianEntity.toDtos();
  }

  @Get(':id')
  @Auth([])
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get physician',
    type: PhysicianDto,
  })
  async getPatient(@UUIDParam('id') physicianId: Uuid): Promise<PhysicianDto> {
    const physician = await this.physicianService.findOne(physicianId);

    return physician.toDto();
  }

  @Put(':id')
  @Auth([RoleType.SUPER_ADMINISTRATOR, RoleType.ADMINISTRATOR])
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: PhysicianDto, description: 'Successfully Updated' })
  @ApiFile({ name: 'avatar' })
  async updateUser(
    @UUIDParam('id') physicianId: Uuid,
    @Body() createPhysicianIdDto: UpdatePhysicianDto,
    @UploadedFile() file?: IFile,
  ): Promise<PhysicianDto> {
    const updatedPhysicianId = await this.physicianService.update(
      physicianId,
      createPhysicianIdDto,
      file,
    );

    return updatedPhysicianId.toDto();
  }

  @Delete(':id')
  @Auth([RoleType.SUPER_ADMINISTRATOR, RoleType.ADMINISTRATOR])
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ description: 'Successfully Deleted' })
  async inactivateUser(@UUIDParam('id') physicianId: Uuid): Promise<void> {
    await this.physicianService.inactivate(physicianId);
  }
}
