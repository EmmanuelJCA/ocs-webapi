import { Body, Controller, Get, HttpCode, HttpStatus, Post, Put } from '@nestjs/common';
import { ApiOkResponse, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PatientDto } from './dtos/patient.dto';
import { CreatePatientDto } from './dtos/create-patient.dto';
import { PatientService } from './patient.service';
import { Auth, UUIDParam } from '../../decorators';
import { UpdatePatientDto } from './dtos/update-patient.dto';

@Controller('patients')
@ApiTags('patients')
export class PatientController {
  constructor(private patientService: PatientService) {}

  @Post()
  @Auth([])
  @HttpCode(HttpStatus.CREATED)
  @ApiOkResponse({ type: PatientDto, description: 'Successfully Registered' })
  async createPatient(
    @Body() createPatientDto: CreatePatientDto,
  ): Promise<PatientDto> {
    const createdPatient = await this.patientService.create(createPatientDto);

    return createdPatient.toDto();
  }

  @Get()
  @Auth([])
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    description: 'Get patients list',
    type: [PatientDto],
  })
  async getPatients(): Promise<PatientDto[]> {
    const patientEntity = await this.patientService.findAll();

    return patientEntity.toDtos();
  }

  @Get(':id')
  @Auth([])
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get patient',
    type: PatientDto,
  })
  async getPatient(@UUIDParam('id') patientId: Uuid): Promise<PatientDto> {
    const patient = await this.patientService.findOne(patientId);

    return patient.toDto();
  }

  @Put(':id')
  @Auth([])
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: PatientDto, description: 'Successfully Updated' })
  async updatePatient(
    @UUIDParam('id') patientId: Uuid,
    @Body() updatePatientDto: UpdatePatientDto,
  ): Promise<PatientDto> {
    const updatedUser = await this.patientService.update(
      patientId,
      updatePatientDto,
    );

    return updatedUser.toDto();
  }
}
