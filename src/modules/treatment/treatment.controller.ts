import { Body, Controller, Get, HttpCode, HttpStatus, ParseUUIDPipe, Post, Put, Query } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiResponse } from '@nestjs/swagger';
import { Auth, UUIDParam } from '../../decorators/http.decorators';
import { TreatmentService } from './treatment.service';
import { CreateTreatmentDto, TreatmentDto, UpdateTreatmentDto } from './dtos';

@Controller('treatments')
@ApiTags('treatments')
export class TreatmentsController {
  constructor(private treatmentService: TreatmentService) {}

  @Post()
  @Auth([])
  @HttpCode(HttpStatus.CREATED)
  @ApiOkResponse({ type: TreatmentDto, description: 'Successfully Registered' })
  async createTreatment(
    @Body() createTreatmentDto: CreateTreatmentDto,
  ): Promise<TreatmentDto> {
    const createdTreatment = await this.treatmentService.create(createTreatmentDto);

    return createdTreatment.toDto();
  }

  @Get()
  @Auth([])
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    description: 'Get treatments list',
    type: [TreatmentDto],
  })
  async getTreatments(
    @Query('diagnosticId', new ParseUUIDPipe({ version: '4', optional: true })) diagnosticId?: Uuid
  ): Promise<TreatmentDto[]> {
    const treatmentEntity = await this.treatmentService.findAll(diagnosticId);

    return treatmentEntity.toDtos();
  }

  @Get(':id')
  @Auth([])
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get treatment',
    type: TreatmentDto,
  })
  async getTreatment(@UUIDParam('id') id: Uuid): Promise<TreatmentDto> {
    const treatmentEntity = await this.treatmentService.findOne(id);

    return treatmentEntity.toDto();
  }

  @Put(':id')
  @Auth([])
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: TreatmentDto, description: 'Successfully Updated' })
  async UpdateTreatmentDto(
    @UUIDParam('id') treatmentId: Uuid,
    @Body() updateTreatmentDto: UpdateTreatmentDto,
  ): Promise<TreatmentDto> {
    const updatedAppointment = await this.treatmentService.update(
      treatmentId,
      updateTreatmentDto,
    );

    return updatedAppointment.toDto();
  }
}
