import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiOkResponse, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AppointmentService } from './appointment.service';
import { Auth, UUIDParam } from '../../decorators/http.decorators';
import { AppointmentReasonDto } from './dtos/appointment-reason.dto';

@Controller('appointment-reasons')
@ApiTags('appointment-reasons')
export class AppointmentReasonController {
  constructor(private appointmentService: AppointmentService) {}

  @Get()
  @Auth([])
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    description: 'Get appointment reason list',
    type: [AppointmentReasonDto],
  })
  async getAppointmentReasons(): Promise<AppointmentReasonDto[]> {
    const reasonEntity = await this.appointmentService.findReasons();

    return reasonEntity.toDtos();
  }

  @Get(':id')
  @Auth([])
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get appointment',
    type: AppointmentReasonDto,
  })
  async getAppointmentReason(@UUIDParam('id') reasonId: Uuid): Promise<AppointmentReasonDto> {
    const reason = await this.appointmentService.findOneReason(reasonId);

    return reason.toDto();
  }
}
