import { Body, Controller, Get, HttpCode, HttpStatus, ParseUUIDPipe, Post, Put, Query } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiResponse } from '@nestjs/swagger';
import { Auth, UUIDParam } from '../../decorators/http.decorators';
import { TreatmentService } from './treatment.service';
import { TreatmentDto, TreatmentSessionDto } from './dtos';
import { CreateTreatmentSessionDto } from './dtos/create-treatment-session.dto';
import { UpdateTreatmentSessionDto } from './dtos/update-treatment-session.dto';

@Controller('treatment-sessions')
@ApiTags('treatment-sessions')
export class TreatmentSessionsController {
  constructor(private treatmentService: TreatmentService) {}

  @Post()
  @Auth([])
  @HttpCode(HttpStatus.CREATED)
  @ApiOkResponse({ type: TreatmentDto, description: 'Successfully Registered' })
  async createTreatment(
    @Body() createTreatmentDto: CreateTreatmentSessionDto,
  ): Promise<TreatmentSessionDto> {
    const createdTreatment = await this.treatmentService.createTreatmentSession(createTreatmentDto);

    return createdTreatment.toDto();
  }

  @Get()
  @Auth([])
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    description: 'Get treatment sessions list',
    type: [TreatmentSessionDto],
  })
  async getTreatmentSessions(
    @Query('treatmentId', new ParseUUIDPipe({ version: '4', optional: true })) treatmentId?: Uuid
  ): Promise<TreatmentSessionDto[]> {
    const treatmentSessionEntity = await this.treatmentService.findAllTreatmentSessions(treatmentId);

    return treatmentSessionEntity.toDtos();
  }

  @Get(':id')
  @Auth([])
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get treatment session',
    type: TreatmentSessionDto,
  })
  async getTreatmentSession(@UUIDParam('id') id: Uuid): Promise<TreatmentSessionDto> {
    const treatmentSessionEntity = await this.treatmentService.findOneTreatmentSession(id);

    return treatmentSessionEntity.toDto();
  }

  @Put(':id')
  @Auth([])
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: TreatmentDto, description: 'Successfully Updated' })
  async UpdateTreatmentSessionDto(
    @UUIDParam('id') treatmentSessionId: Uuid,
    @Body() updateTreatmentSessionDto: UpdateTreatmentSessionDto,
  ): Promise<TreatmentSessionDto> {
    const updatedSession = await this.treatmentService.updateTreatmentSession(
      treatmentSessionId,
      updateTreatmentSessionDto,
    );

    return updatedSession.toDto();
  }
}
