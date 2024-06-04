import { Controller, Post, HttpCode, HttpStatus, Body, Get, Put } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiResponse } from '@nestjs/swagger';
import { AppointmentService } from './appointment.service';
import { Auth, UUIDParam } from '../../decorators/http.decorators';
import { AppointmentDto } from './dtos/appointment.dto';
import { CreateAppointmentDto } from './dtos/create-appointment.dto';
import { UpdateAppointmentDto } from './dtos/update-appointment.dto';

@Controller('appointments')
@ApiTags('appointments')
export class AppointmentController {
  constructor(private appointmentService: AppointmentService) {}

  @Post()
  @Auth([])
  @HttpCode(HttpStatus.CREATED)
  @ApiOkResponse({ type: AppointmentDto, description: 'Successfully Registered' })
  async createAppointment(
    @Body() createAppointmentDto: CreateAppointmentDto,
  ): Promise<AppointmentDto> {
    const createdAppointment = await this.appointmentService.create(createAppointmentDto);

    return createdAppointment.toDto();
  }

  @Get()
  @Auth([])
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    description: 'Get appointment list',
    type: [AppointmentDto],
  })
  async getAppointments(): Promise<AppointmentDto[]> {
    const appointmentEntity = await this.appointmentService.findAll();

    return appointmentEntity.toDtos();
  }

  @Get(':id')
  @Auth([])
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get appointment',
    type: AppointmentDto,
  })
  async getAppointment(@UUIDParam('id') appointmentId: Uuid): Promise<AppointmentDto> {
    const patient = await this.appointmentService.findOne(appointmentId);

    return patient.toDto();
  }

  @Put(':id')
  @Auth([])
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: AppointmentDto, description: 'Successfully Updated' })
  async UpdateAppointmentDto(
    @UUIDParam('id') appointmentId: Uuid,
    @Body() updateAppointmentDto: UpdateAppointmentDto,
  ): Promise<AppointmentDto> {
    const updatedAppointment = await this.appointmentService.update(
      appointmentId,
      updateAppointmentDto,
    );

    return updatedAppointment.toDto();
  }
}
