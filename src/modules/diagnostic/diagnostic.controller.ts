import { Body, Controller, Delete, Get, HttpCode, HttpStatus, ParseUUIDPipe, Post, Put, Query } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiResponse } from '@nestjs/swagger';
import { Auth, UUIDParam } from '../../decorators/http.decorators';
import { DiagnosticService } from './diagnostic.service';
import { DiagnosticDto } from './dtos/diagnostic.dto';
import { CreateDiagnosticDto } from './dtos/create-diagnostic.dto';
import { UpdateDiagnosticDto } from './dtos/update-diagnostic.dto';

@Controller('diagnostic')
@ApiTags('diagnostic')
export class DiagnosticController {
  constructor(private diagnosticService: DiagnosticService) {}

  @Post()
  @Auth([])
  @HttpCode(HttpStatus.CREATED)
  @ApiOkResponse({ type: DiagnosticDto, description: 'Successfully Registered' })
  async createDiagnostic(
    @Body() createDiagnosticDto: CreateDiagnosticDto,
  ): Promise<DiagnosticDto> {
    const diagnosticEntity = await this.diagnosticService.create(createDiagnosticDto);

    return diagnosticEntity.toDto();
  }

  @Get()
  @Auth([])
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    description: 'Get diagnostics list',
    type: [DiagnosticDto],
  })
  async getDiagnostics(@Query('patientId', new ParseUUIDPipe({ version: '4', optional: true })) patientId?: Uuid): Promise<DiagnosticDto[]> {
    const diagnosticEntity = await this.diagnosticService.findAll(patientId);

    return diagnosticEntity.toDtos();
  }

  @Get(':id')
  @Auth([])
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get diagnostic',
    type: DiagnosticDto,
  })
  async getDiagnostic(@UUIDParam('id') id: Uuid): Promise<DiagnosticDto> {
    const diagnosticEntity = await this.diagnosticService.findOne(id);

    return diagnosticEntity.toDto();
  }

  @Put(':id')
  @Auth([])
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: DiagnosticDto, description: 'Successfully Registered' })
  async updateDiagnostic(
    @UUIDParam('id') id: Uuid,
    @Body() updateDiagnosticDto: UpdateDiagnosticDto,
  ): Promise<DiagnosticDto> {
    const diagnosticEntity = await this.diagnosticService.update(id, updateDiagnosticDto);

    return diagnosticEntity.toDto();
  }

  @Delete(':id')
  @Auth([])
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ description: 'Successfully Deleted' })
  async closeDiagnostic(@UUIDParam('id') id: Uuid): Promise<void> {
    await this.diagnosticService.close(id);
  }
}
